const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

let outputChannel;

function activate(context) {
    outputChannel = vscode.window.createOutputChannel("MIPSduino Assembler");

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('mipsduino.run', runMipsFile),
        vscode.commands.registerCommand('mipsduino.build', buildMipsFile),
        vscode.commands.registerCommand('mipsduino.showSymbols', showSymbolTable)
    );

    outputChannel.appendLine('MIPSduino Assembler Extension Activated');
}

function getExecutablePath() {
    // Check user configuration first
    const config = vscode.workspace.getConfiguration('mipsduino');
    const userPath = config.get('executablePath');

    if (userPath && fs.existsSync(userPath)) {
        return userPath;
    }

    // Try to find in workspace
    const workspaceFolder = vscode.workspace.workspaceFolders ?
        vscode.workspace.workspaceFolders[0].uri.fsPath : null;

    if (workspaceFolder) {
        const workspacePath = path.join(workspaceFolder, 'mips-toolchain', 'build', 'dist', 'MIPSduino');
        if (fs.existsSync(workspacePath)) {
            return workspacePath;
        }
    }

    // Try system PATH
    const systemCmd = process.platform === 'win32' ? 'MIPSduino.exe' : 'MIPSduino';
    return systemCmd;
}

function runMipsFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'mips') {
        vscode.window.showWarningMessage('Current file is not a MIPS assembly file');
        return;
    }

    const filePath = document.fileName;

    // Save the file first
    document.save().then(() => {
        const config = vscode.workspace.getConfiguration('mipsduino');

        if (config.get('showOutputOnRun')) {
            outputChannel.show(true);
        }

        if (config.get('clearOutputBeforeRun')) {
            outputChannel.clear();
        }

        outputChannel.appendLine(`${'='.repeat(60)}`);
        outputChannel.appendLine(`Running: ${path.basename(filePath)}`);
        outputChannel.appendLine(`${'='.repeat(60)}\n`);

        const execPath = getExecutablePath();
        const workspaceFolder = vscode.workspace.workspaceFolders ?
            vscode.workspace.workspaceFolders[0].uri.fsPath : path.dirname(filePath);

        // Verify executable exists or is in PATH
        try {
            if (execPath !== 'MIPSduino' && execPath !== 'MIPSduino.exe' && !fs.existsSync(execPath)) {
                throw new Error('Executable not found');
            }
        } catch (e) {
            const msg = "MIPSduino toolchain not found. Please install it to run MIPS code.";
            const action = "Download Toolchain";
            vscode.window.showErrorMessage(msg, action).then(selection => {
                if (selection === action) {
                    vscode.env.openExternal(vscode.Uri.parse('https://github.com/mipsduino/MIPSduino/releases'));
                }
            });
            return;
        }

        // Determine if we're using Python script or compiled executable
        const isPythonScript = execPath.endsWith('.py');
        let cmd, args;

        if (isPythonScript) {
            cmd = process.platform === 'win32' ? 'python' : 'python3';
            args = [execPath, 'run', filePath];
        } else {
            cmd = execPath;
            args = ['run', filePath];
        }

        const child = cp.spawn(cmd, args, {
            cwd: workspaceFolder,
            shell: process.platform === 'win32'
        });

        child.stdout.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.stderr.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.on('error', (error) => {
            outputChannel.appendLine(`\nError: ${error.message}`);
            if (error.code === 'ENOENT') {
                vscode.window.showErrorMessage(`MIPSduino not found in system PATH. Please install the toolchain.`);
            } else {
                vscode.window.showErrorMessage(`Failed to run MIPSduino: ${error.message}`);
            }
        });

        child.on('close', (code) => {
            outputChannel.appendLine(`\n${'='.repeat(60)}`);
            outputChannel.appendLine(`Process exited with code ${code}`);
            outputChannel.appendLine(`${'='.repeat(60)}`);
        });
    });
}

function buildMipsFile() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'mips') {
        vscode.window.showWarningMessage('Current file is not a MIPS assembly file');
        return;
    }

    const filePath = document.fileName;
    const outputPath = filePath.replace(/\.(asm|s|mips)$/, '.hex');

    document.save().then(() => {
        outputChannel.show(true);
        outputChannel.clear();
        outputChannel.appendLine(`Building for MicroCoreASM: ${path.basename(filePath)}`);
        outputChannel.appendLine(`Output: ${path.basename(outputPath)}\n`);

        const execPath = getExecutablePath();
        const workspaceFolder = vscode.workspace.workspaceFolders ?
            vscode.workspace.workspaceFolders[0].uri.fsPath : path.dirname(filePath);

        // Verify executable exists or is in PATH
        try {
            if (execPath !== 'MIPSduino' && execPath !== 'MIPSduino.exe' && !fs.existsSync(execPath)) {
                throw new Error('Executable not found');
            }
        } catch (e) {
            const msg = "MIPSduino toolchain not found. Please install it to build MIPS code.";
            const action = "Download Toolchain";
            vscode.window.showErrorMessage(msg, action).then(selection => {
                if (selection === action) {
                    vscode.env.openExternal(vscode.Uri.parse('https://github.com/mipsduino/MIPSduino/releases'));
                }
            });
            return;
        }

        const isPythonScript = execPath.endsWith('.py');
        let cmd, args;

        if (isPythonScript) {
            cmd = process.platform === 'win32' ? 'python' : 'python3';
            args = [execPath, 'build', filePath, '-o', outputPath];
        } else {
            cmd = execPath;
            args = ['build', filePath, '-o', outputPath];
        }

        const child = cp.spawn(cmd, args, {
            cwd: workspaceFolder,
            shell: process.platform === 'win32'
        });

        child.stdout.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.stderr.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.on('error', (error) => {
            outputChannel.appendLine(`Error: ${error.message}`);
            vscode.window.showErrorMessage(`Build failed: ${error.message}`);
        });

        child.on('close', (code) => {
            if (code === 0) {
                outputChannel.appendLine(`\n✓ Build successful: ${outputPath}`);
                vscode.window.showInformationMessage(`Build successful: ${path.basename(outputPath)}`);
            } else {
                outputChannel.appendLine(`\n✗ Build failed with code ${code}`);
                vscode.window.showErrorMessage('Build failed');
            }
        });
    });
}

function showSymbolTable() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'mips') {
        vscode.window.showWarningMessage('Current file is not a MIPS assembly file');
        return;
    }

    const filePath = document.fileName;

    document.save().then(() => {
        outputChannel.show(true);
        outputChannel.clear();
        outputChannel.appendLine(`Symbol Table for: ${path.basename(filePath)}`);
        outputChannel.appendLine(`${'='.repeat(60)}\n`);

        const execPath = getExecutablePath();
        const workspaceFolder = vscode.workspace.workspaceFolders ?
            vscode.workspace.workspaceFolders[0].uri.fsPath : path.dirname(filePath);

        const isPythonScript = execPath.endsWith('.py');
        let cmd, args;

        if (isPythonScript) {
            cmd = process.platform === 'win32' ? 'python' : 'python3';
            args = [execPath, 'symbols', filePath];
        } else {
            cmd = execPath;
            args = ['symbols', filePath];
        }

        const child = cp.spawn(cmd, args, {
            cwd: workspaceFolder,
            shell: process.platform === 'win32'
        });

        child.stdout.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.stderr.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.on('error', (error) => {
            outputChannel.appendLine(`\nError: ${error.message}`);
        });

        child.on('close', (code) => {
            outputChannel.appendLine(`\n${'='.repeat(60)}`);
            outputChannel.appendLine(`Process exited with code ${code}`);
            outputChannel.appendLine(`${'='.repeat(60)}`);
        });
    });
}

function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}

module.exports = {
    activate,
    deactivate
}
