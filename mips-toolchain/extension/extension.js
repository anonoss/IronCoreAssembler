const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

let pty;
let terminal;

const BANNER = `\x1b[96m\x1b[1m    ___                      ______                
   /  _/________  ____      / ____/___  ________  
   / / / ___/ __ \/ __ \    / /   / __ \/ ___/ _ \ 
 _/ / / /  / /_/ / / / /   / /___/ /_/ / /  /  __/ 
/___//_/   \____/_/ /_/    \____/\\____/_/  \\___/  
                                                    
\x1b[0m\x1b[94m    MIPSduino Assembler v2.0\x1b[0m
\x1b[96m    Powered by MicroCoreASM Hardware Integration\x1b[0m`;

class MIPSduinoPty {
    constructor() {
        this.writeEmitter = new vscode.EventEmitter();
        this.onDidWrite = this.writeEmitter.event;
        this.closeEmitter = new vscode.EventEmitter();
        this.onDidClose = this.closeEmitter.event;
        this.isReady = false;
        this.pendingRun = null;
    }

    open() {
        this.isReady = true;
        if (this.pendingRun) {
            const { cmd, args, cwd, type, filePath } = this.pendingRun;
            this.pendingRun = null;
            this.execute(cmd, args, cwd, type, filePath);
        }
    }

    close() {
        this.isReady = false;
    }

    run(cmd, args, cwd, type, filePath) {
        if (this.isReady) {
            this.execute(cmd, args, cwd, type, filePath);
        } else {
            this.pendingRun = { cmd, args, cwd, type, filePath };
        }
    }

    execute(cmd, args, cwd, type, filePath) {
        // Clear screen and print banner
        this.writeEmitter.fire('\x1b[2J\x1b[3J\x1b[H');
        this.writeEmitter.fire(BANNER.replace(/\n/g, '\r\n') + '\r\n\r\n');

        const child = cp.spawn(cmd, args, {
            cwd,
            shell: false,
            env: { ...process.env, MIPSX_NO_BANNER: '1' }
        });

        child.stdout.on('data', (data) => {
            this.writeEmitter.fire(data.toString().replace(/\r?\n/g, '\r\n'));
        });

        child.stderr.on('data', (data) => {
            this.writeEmitter.fire(data.toString().replace(/\r?\n/g, '\r\n'));
        });

        child.on('close', (code) => {
            if (code === 0) {
                showPostProcessMenu(type, filePath);
            } else {
                this.writeEmitter.fire(`\r\n\x1b[91mProcess exited with code ${code}\x1b[0m\r\n`);
            }
        });
    }

    handleInput(data) {
        // Press any key to clear/reset if needed
    }
}

function showPostProcessMenu(lastType, filePath) {
    const options = [];
    if (lastType === 'build') options.push("📄 View Hex File");
    options.push("🔍 Show Symbol Table (Addresses)");
    options.push("💾 Show Memory Map");
    options.push("📊 Show Register States");
    options.push("🛠️ Build for MicroCoreASM");
    options.push("↑ Upload to Hardware");
    options.push("🖥️ Open MARS GUI");

    vscode.window.showInformationMessage(
        `MIPSduino: ${lastType.toUpperCase()} complete. What's next?`,
        ...options
    ).then(selection => {
        if (selection === "📄 View Hex File") {
            const hexPath = filePath.replace(/\.(asm|s|mips)$/, '.hex');
            vscode.workspace.openTextDocument(hexPath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        } else if (selection === "🔍 Show Symbol Table (Addresses)") {
            vscode.commands.executeCommand('mipsduino.showSymbols');
        } else if (selection === "💾 Show Memory Map") {
            vscode.commands.executeCommand('mipsduino.showMemory');
        } else if (selection === "📊 Show Register States") {
            vscode.commands.executeCommand('mipsduino.showRegisters');
        } else if (selection === "🛠️ Build for MicroCoreASM") {
            vscode.commands.executeCommand('mipsduino.build');
        } else if (selection === "↑ Upload to Hardware") {
            vscode.commands.executeCommand('mipsduino.upload');
        } else if (selection === "🖥️ Open MARS GUI") {
            vscode.commands.executeCommand('mipsduino.openMars');
        }
    });
}

function showMainMenu() {
    const items = [
        { label: "▶ Code Running", description: "Run the current MIPS file", action: 'run' },
        { label: "🔍 Address (Symbol Table)", description: "Show label addresses", action: 'symbols' },
        { label: "💾 Memory Address Map", description: "Dump memory segments", action: 'memory' },
        { label: "📊 Register States", description: "Show final register values", action: 'registers' },
        { label: "🛠️ Build for MicroCoreASM", description: "Generate hardware files", action: 'build' },
        { label: "↑ Upload to Hardware", description: "Send to microprocessor", action: 'upload' },
        { label: "🖥️ Open MARS GUI", description: "Launch full simulator", action: 'gui' }
    ];

    vscode.window.showQuickPick(items, {
        placeHolder: "MIPSduino: Select an action",
        matchOnDescription: true
    }).then(selection => {
        if (selection) {
            if (selection.action === 'gui') {
                vscode.commands.executeCommand('mipsduino.openMars');
            } else if (selection.action === 'symbols') {
                vscode.commands.executeCommand('mipsduino.showSymbols');
            } else if (selection.action === 'memory') {
                vscode.commands.executeCommand('mipsduino.showMemory');
            } else if (selection.action === 'registers') {
                vscode.commands.executeCommand('mipsduino.showRegisters');
            } else {
                executeCommand(selection.action);
            }
        }
    });
}

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('mipsduino.mainMenu', () => showMainMenu()),
        vscode.commands.registerCommand('mipsduino.run', () => executeCommand('run')),
        vscode.commands.registerCommand('mipsduino.build', () => executeCommand('build')),
        vscode.commands.registerCommand('mipsduino.upload', () => executeCommand('upload')),
        vscode.commands.registerCommand('mipsduino.showSymbols', () => executeCommand('symbols')),
        vscode.commands.registerCommand('mipsduino.showMemory', () => executeCommand('memory')),
        vscode.commands.registerCommand('mipsduino.showRegisters', () => executeCommand('registers')),
        vscode.commands.registerCommand('mipsduino.openMars', () => executeCommand('gui'))
    );
}

function getExecutablePath() {
    const config = vscode.workspace.getConfiguration('mipsduino');
    const userPath = config.get('executablePath');
    if (userPath && fs.existsSync(userPath)) return path.resolve(userPath);

    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : null;
    if (workspaceFolder) {
        const paths = [
            path.join(workspaceFolder, 'mips-toolchain', 'cli', 'MIPSduino.py'),
            path.join(workspaceFolder, 'cli', 'MIPSduino.py'),
            path.join(workspaceFolder, 'MIPSduino.py')
        ];
        for (const p of paths) if (fs.existsSync(p)) return path.resolve(p);
    }
    return process.platform === 'win32' ? 'MIPSduino.exe' : 'MIPSduino';
}

function executeCommand(type) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'mips') return;

    const filePath = editor.document.fileName;
    const execPath = getExecutablePath();
    const isPythonScript = execPath.endsWith('.py');
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : path.dirname(filePath);
    const config = vscode.workspace.getConfiguration('mipsduino');

    let cmd, args;
    if (type === 'run') {
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'run', filePath, '--no-gui'];
        } else {
            cmd = execPath;
            args = ['run', filePath, '--no-gui'];
        }
    } else if (type === 'build') {
        const outputPath = filePath.replace(/\.(asm|s|mips)$/, '.hex');
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'build', filePath, '-o', outputPath];
        } else {
            cmd = execPath;
            args = ['build', filePath, '-o', outputPath];
        }
    } else if (type === 'upload') {
        const port = config.get('hardwarePort') || 'COM3';
        const baud = config.get('baudRate') || 9600;
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'upload', filePath, '--port', port, '--baud', baud.toString()];
        } else {
            cmd = execPath;
            args = ['upload', filePath, '--port', port, '--baud', baud.toString()];
        }
    } else if (type === 'symbols') {
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'symbols', filePath];
        } else {
            cmd = execPath;
            args = ['symbols', filePath];
        }
    } else if (type === 'memory') {
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'memory', filePath];
        } else {
            cmd = execPath;
            args = ['memory', filePath];
        }
    } else if (type === 'registers') {
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'registers', filePath];
        } else {
            cmd = execPath;
            args = ['registers', filePath];
        }
    } else if (type === 'gui') {
        if (isPythonScript) {
            cmd = pythonCmd;
            args = [execPath, 'gui', filePath];
        } else {
            cmd = execPath;
            args = ['gui', filePath];
        }
    }

    editor.document.save().then(() => {
        if (!terminal || terminal.exitStatus !== undefined) {
            pty = new MIPSduinoPty();
            terminal = vscode.window.createTerminal({ name: "MIPSduino Assembler", pty });
        }
        terminal.show(true);
        pty.run(cmd, args, workspaceFolder, type, filePath);
    });
}

function deactivate() {
    if (terminal) terminal.dispose();
}

module.exports = { activate, deactivate }
