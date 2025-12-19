# MIPSduino Toolchain

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-lightgrey)

A modern, cross-platform toolchain for MIPS Assembly development, powered by MARS.

## 📥 Downloads

**Latest Release: v2.0.0**

| Platform | File | Description |
|----------|------|-------------|
| **Linux (Debian/Ubuntu)** | [**MIPSduino_2.0.0_amd64.deb**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/MIPSduino_2.0.0_amd64.deb) | `.deb` installer |
| **Windows** | [**MIPSduino.exe**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/MIPSduino.exe) | Executable file |
| **VS Code** | [**MIPSduino-2.0.0.vsix**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/MIPSduino-2.0.0.vsix) | Extension |

> **Note:** Java Runtime Environment (JRE) 8 or higher is required.

---

## 🌟 Features

### Command-Line Interface (CLI) v2.0
- ✅ **Run MIPS Assembly**: Execute `.asm` files directly from terminal
- ✅ **Build/Assemble**: Compile to machine code (Hex, Binary, or Arduino Header)
- ✅ **Microprocessor Ready**: Export raw `.bin` files for hardware loading
- ✅ **Arduino Support**: Export `.h` headers with instruction arrays
- ✅ **Symbol Table**: Integrated address mapping and symbol analysis
- ✅ **Cross-Platform**: Works on Linux, Windows, and macOS

### VS Code Extension
- ✨ **Syntax Highlighting**: Full MIPS assembly language support
- 🚀 **One-Click Execution**: Run code with `Ctrl+Shift+R`
- 🔨 **Build Command**: Assemble with `Ctrl+Shift+B`
- 📝 **Code Snippets**: 15+ templates for common patterns
- 🎨 **IntelliSense**: Auto-completion and suggestions

## 📦 Installation Instructions

### Linux
```bash
sudo dpkg -i MIPSduino_2.0.0_amd64.deb
```

### Windows
1. Download `MIPSduino.exe`.
2. Add it to your PATH.

### VS Code Extension
1. Open VS Code.
2. Extensions → `...` menu → "Install from VSIX...".
3. Select `MIPSduino-2.0.0.vsix`.

## 🚀 Usage

### CLI Commands
```bash
# Run a MIPS assembly file
MIPSduino run program.asm

# Build for Arduino
MIPSduino build program.asm -f arduino -o program.h

# Build for Microprocessor (Binary)
MIPSduino build program.asm -f bin

# Show symbol table
MIPSduino symbols program.asm
```

### VS Code Extension
1. Open any `.asm` file.
2. Press `Ctrl+Shift+R` to run.
3. Or right-click → "MIPSduino: Run Current File".

## 📚 Documentation

### CLI Reference
```
MIPSduino run <file.asm> [--no-gui]
    Run a MIPS assembly file

MIPSduino build <file.asm> [-f format] [-o output]
    Assemble to machine code
    Formats: hex, bin, arduino, all
    -o, --output    Output file path

MIPSduino symbols <file.asm>
    Show symbol table and memory addresses
```

## 🛠️ Building from Source

### Prerequisites
- Python 3.x
- Java Runtime Environment (JRE) 8+
- PyInstaller: `pip install pyinstaller`

### Build Steps
```bash
cd build/
./build.sh
```

## 📄 License
MIT License - See LICENSE file for details

## 🙏 Acknowledgments
- Built on top of [MARS](http://courses.missouristate.edu/KenVollmar/mars/)
- Inspired by modern development tools and IDEs

---
**Copyright**: All copyright owned by Anon Open Source
