const vscode = require('vscode');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');

let pty;
let terminal;

/* =========================
   ATTRACTIVE TERMINAL BANNER
   ========================= */
const BANNER = `\x1b[96m\x1b[1m
╔═════════════════════════════════════════════════════════════════════════╗
║                                                                         ║
║   ███╗   ███╗ ██╗ ██████╗  ███████╗ ██████╗  ██╗   ██╗ ██╗ ███╗   ██╗   ║
║   ████╗ ████║ ██║ ██╔══██╗ ██╔════╝ ██╔══██╗ ██║   ██║ ██║ ████╗  ██║   ║
║   ██╔████╔██║ ██║ ██████╔╝ ███████╗ ██║  ██║ ██║   ██║ ██║ ██╔██╗ ██║   ║
║   ██║╚██╔╝██║ ██║ ██╔═══╝  ╚════██║ ██║  ██║ ██║   ██║ ██║ ██║╚██╗██║   ║
║   ██║ ╚═╝ ██║ ██║ ██║      ███████║ ██████╔╝ ╚██████╔╝ ██║ ██║ ╚████║   ║
║   ╚═╝     ╚═╝ ╚═╝ ╚═╝      ╚══════╝ ╚═════╝   ╚═════╝  ╚═╝ ╚═╝  ╚═══╝   ║
║                                                                         ║
║                    MicroCoreASM Hardware-Aware Assembler                ║
║                                IRON CORE EDITION                        ║
║                                                                         ║
╚═════════════════════════════════════════════════════════════════════════╝
\x1b[0m
\x1b[94m    MIPSduino Assembler - 2025 Edition\x1b[0m
\x1b[96m    Build • Simulate • Upload • Debug\x1b[0m
`;

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
        this.writeEmitter.fire('\x1b[2J\x1b[3J\x1b[H');
        this.writeEmitter.fire(BANNER.replace(/\n/g, '\r\n') + '\r\n\r\n');

        const child = cp.spawn(cmd, args, {
            cwd,
            shell: false,
            env: { ...process.env, MIPSX_NO_BANNER: '1' }
        });

        child.stdout.on('data', data => {
            this.writeEmitter.fire(data.toString().replace(/\r?\n/g, '\r\n'));
        });

        child.stderr.on('data', data => {
            this.writeEmitter.fire(data.toString().replace(/\r?\n/g, '\r\n'));
        });

        child.on('close', code => {
            if (code === 0) {
                showPostProcessMenu(type, filePath);
            } else {
                this.writeEmitter.fire(`\r\n\x1b[91mProcess exited with code ${code}\x1b[0m\r\n`);
            }
        });
    }

    handleInput(_) {}
}

function showPostProcessMenu(lastType, filePath) {
    const options = [];
    if (lastType === 'build') options.push("📄 View Hex File");
    options.push(
        "🔍 Show Symbol Table",
        "💾 Show Memory Map",
        "📊 Show Register States",
        "🛠️ Build for MicroCoreASM",
        "↑ Upload to Hardware",
        "🖥️ Open MARS GUI"
    );

    vscode.window.showInformationMessage(
        `MIPSduino: ${lastType.toUpperCase()} complete. What's next?`,
        ...options
    ).then(selection => {
        if (!selection) return;
        if (selection === "📄 View Hex File") {
            const hexPath = filePath.replace(/\.(asm|s|mips)$/, '.hex');
            vscode.workspace.openTextDocument(hexPath).then(doc => vscode.window.showTextDocument(doc));
        } else {
            const map = {
                "🔍 Show Symbol Table": 'mipsduino.showSymbols',
                "💾 Show Memory Map": 'mipsduino.showMemory',
                "📊 Show Register States": 'mipsduino.showRegisters',
                "🛠️ Build for MicroCoreASM": 'mipsduino.build',
                "↑ Upload to Hardware": 'mipsduino.upload',
                "🖥️ Open MARS GUI": 'mipsduino.openMars'
            };
            vscode.commands.executeCommand(map[selection]);
        }
    });
}

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('mipsduino.mainMenu', showMainMenu),
        vscode.commands.registerCommand('mipsduino.run', () => executeCommand('run')),
        vscode.commands.registerCommand('mipsduino.build', () => executeCommand('build')),
        vscode.commands.registerCommand('mipsduino.upload', () => executeCommand('upload')),
        vscode.commands.registerCommand('mipsduino.showSymbols', () => executeCommand('symbols')),
        vscode.commands.registerCommand('mipsduino.showMemory', () => executeCommand('memory')),
        vscode.commands.registerCommand('mipsduino.showRegisters', () => executeCommand('registers')),
        vscode.commands.registerCommand('mipsduino.openMars', () => executeCommand('gui'))
    );
}

function showMainMenu() {
    vscode.window.showQuickPick([
        { label: "▶ Run Code", action: 'run' },
        { label: "🔍 Symbol Table", action: 'symbols' },
        { label: "💾 Memory Map", action: 'memory' },
        { label: "📊 Register States", action: 'registers' },
        { label: "🛠️ Build", action: 'build' },
        { label: "↑ Upload", action: 'upload' },
        { label: "🖥️ MARS GUI", action: 'gui' }
    ], { placeHolder: "MIPSduino: Select an action" })
    .then(sel => sel && executeCommand(sel.action));
}

function getExecutablePath() {
    const config = vscode.workspace.getConfiguration('mipsduino');
    const userPath = config.get('executablePath');
    if (userPath && fs.existsSync(userPath)) return path.resolve(userPath);
    return process.platform === 'win32' ? 'MIPSduino.exe' : 'MIPSduino';
}

function executeCommand(type) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== 'mips') return;

    const filePath = editor.document.fileName;
    const execPath = getExecutablePath();
    const isPython = execPath.endsWith('.py');
    const python = process.platform === 'win32' ? 'python' : 'python3';

    const cmd = isPython ? python : execPath;
    const args = isPython ? [execPath, type, filePath] : [type, filePath];

    editor.document.save().then(() => {
        if (!terminal || terminal.exitStatus !== undefined) {
            pty = new MIPSduinoPty();
            terminal = vscode.window.createTerminal({ name: "MIPSduino Assembler", pty });
        }
        terminal.show(true);
        pty.run(cmd, args, path.dirname(filePath), type, filePath);
    });
}

function deactivate() {
    if (terminal) terminal.dispose();
}

module.exports = { activate, deactivate };
