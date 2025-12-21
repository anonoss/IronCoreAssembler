const vscode = require('vscode');

function activate(context) {
    console.log('MIPSduino Assembler (Web) is now active!');

    const showWebWarning = (feature) => {
        vscode.window.showInformationMessage(
            `MIPSduino: ${feature} is currently only available in the Desktop version of VS Code, Cursor, or Antigravity.`,
            "Learn More"
        ).then(selection => {
            if (selection === "Learn More") {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/anonoss/IronCoreAssembler'));
            }
        });
    };

    context.subscriptions.push(
        vscode.commands.registerCommand('mipsduino.mainMenu', () => {
            const items = [
                { label: "▶ Code Running", description: "Desktop Only", action: 'run' },
                { label: "🔍 Address (Symbol Table)", description: "Desktop Only", action: 'symbols' },
                { label: "💾 Memory Address Map", description: "Desktop Only", action: 'memory' },
                { label: "📊 Register States", description: "Desktop Only", action: 'registers' },
                { label: "🛠️ Build for MicroCoreASM", description: "Desktop Only", action: 'build' },
                { label: "↑ Upload to Hardware", description: "Desktop Only", action: 'upload' },
                { label: "🖥️ Open MARS GUI", description: "Desktop Only", action: 'gui' }
            ];

            vscode.window.showQuickPick(items, {
                placeHolder: "MIPSduino (Web): Select an action",
                matchOnDescription: true
            }).then(selection => {
                if (selection) {
                    showWebWarning(selection.label);
                }
            });
        }),
        vscode.commands.registerCommand('mipsduino.run', () => showWebWarning("Code Running")),
        vscode.commands.registerCommand('mipsduino.build', () => showWebWarning("Building")),
        vscode.commands.registerCommand('mipsduino.upload', () => showWebWarning("Hardware Upload")),
        vscode.commands.registerCommand('mipsduino.showSymbols', () => showWebWarning("Symbol Table")),
        vscode.commands.registerCommand('mipsduino.showMemory', () => showWebWarning("Memory Map")),
        vscode.commands.registerCommand('mipsduino.showRegisters', () => showWebWarning("Register States")),
        vscode.commands.registerCommand('mipsduino.openMars', () => showWebWarning("MARS GUI"))
    );
}

function deactivate() { }

module.exports = { activate, deactivate };
