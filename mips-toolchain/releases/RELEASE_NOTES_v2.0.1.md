# MIPSduino Assembler v2.0.1 - Release Notes

## 🎨 What's New in v2.0.1

### Beautiful Professional Banner
The toolchain now features a stunning boxed banner design:

```
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

    MIPSduino Assembler v2.0
    Build • Simulate • Upload • Debug
```

### VS Code Extension Improvements
- ✨ **Refactored codebase**: Cleaner, more maintainable code
- 🚀 **Better performance**: Removed redundant logic
- 📝 **Improved readability**: Modern ES6+ syntax
- 🎯 **Simplified menus**: Streamlined user interface
- 🐛 **Bug fixes**: Fixed escape sequence issues in banner

### CLI Improvements
- 🎨 **Professional banner**: Matches extension design
- 📦 **Better packaging**: Optimized build process
- ✅ **Verified functionality**: All commands tested and working

## 📦 Available Downloads

### Linux
- **Debian/Ubuntu (.deb)**: `MIPSduino_2.0.0_amd64.deb` (15 MB)
- **RedHat/Fedora (.rpm)**: `MIPSduino-2.0.0-1.x86_64.rpm` (12 MB)
- **Standalone Binary (.tar.gz)**: `MIPSduino-2.0.0-linux-x86_64.tar.gz` (12 MB)

### Windows
- **Installer**: `MIPSduino_Setup.exe` (4.3 MB) - Professional NSIS installer
- **Portable**: `MIPSduino.exe` (254 KB) - Standalone executable

### VS Code Extension
- **Extension Package**: `MIPSduino-2.0.1.vsix` (884 KB) ⭐ **NEW**

### Source Code
- **Source Archive**: `MIPSduino-2.0.0-source.tar.gz` (1.8 MB)

## 🔧 Installation

### Linux (Debian/Ubuntu)
```bash
sudo dpkg -i MIPSduino_2.0.0_amd64.deb
```

### Linux (RedHat/Fedora)
```bash
sudo rpm -i MIPSduino-2.0.0-1.x86_64.rpm
```

### Windows
Run `MIPSduino_Setup.exe` and follow the installer wizard.

### VS Code Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Click the `...` menu → "Install from VSIX..."
4. Select `MIPSduino-2.0.1.vsix`

## ✨ Features

### Command-Line Interface
- ✅ **Run**: Execute MIPS assembly files
- ✅ **Build**: Compile to hex, binary, or Arduino format
- ✅ **Symbols**: View symbol table and memory addresses
- ✅ **Memory**: Dump memory segments
- ✅ **Registers**: Show register states
- ✅ **Upload**: Send to hardware via serial
- ✅ **GUI**: Launch MARS simulator

### VS Code Extension
- 🎨 **Syntax Highlighting**: Full MIPS assembly support
- ⌨️ **Keyboard Shortcuts**: Quick access to all commands
- 📝 **Code Snippets**: 15+ templates
- 🚀 **One-Click Actions**: Run, build, upload from editor
- 🎯 **Integrated Terminal**: Beautiful output display

## 🔐 Checksums (SHA256)

All release files have been verified with SHA256 checksums.
See `SHA256SUMS.txt` in the releases directory.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Built on [MARS MIPS Simulator](http://courses.missouristate.edu/KenVollmar/mars/)
- Developed by Anon Open Source
- IRON CORE EDITION

---

**Version**: 2.0.1  
**Release Date**: December 21, 2025  
**Repository**: https://github.com/anonoss/IronCoreAssembler
