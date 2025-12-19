const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

let outputChannel;

function activate(context) {
    outputChannel = vscode.window.createOutputChannel("MIPS-X");

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('mips-x.run', runMipsFile),
        vscode.commands.registerCommand('mips-x.build', buildMipsFile),
        vscode.commands.registerCommand('mips-x.showSymbols', showSymbolTable)
    );

    outputChannel.appendLine('MIPS-X Extension Activated');
}

function getExecutablePath() {
    // Check user configuration first
    const config = vscode.workspace.getConfiguration('mipsx');
    const userPath = config.get('executablePath');

    if (userPath && fs.existsSync(userPath)) {
        return userPath;
    }

    // Try to find in workspace
    const workspaceFolder = vscode.workspace.workspaceFolders ?
        vscode.workspace.workspaceFolders[0].uri.fsPath : null;

    if (workspaceFolder) {
        const workspacePath = path.join(workspaceFolder, 'mips-toolchain', 'build', 'dist', 'mipsx');
        if (fs.existsSync(workspacePath)) {
            return workspacePath;
        }
    }

    // Try system PATH
    const systemCmd = process.platform === 'win32' ? 'mipsx.exe' : 'mipsx';
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
        const config = vscode.workspace.getConfiguration('mipsx');

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
            vscode.window.showErrorMessage(`Failed to run MIPS-X: ${error.message}`);
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
        outputChannel.appendLine(`Building: ${path.basename(filePath)}`);
        outputChannel.appendLine(`Output: ${path.basename(outputPath)}\n`);

        const execPath = getExecutablePath();
        const workspaceFolder = vscode.workspace.workspaceFolders ?
            vscode.workspace.workspaceFolders[0].uri.fsPath : path.dirname(filePath);

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
    vscode.window.showInformationMessage('Symbol table feature coming soon!');
    // This could be enhanced to parse MARS output and show symbols in a tree view
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
