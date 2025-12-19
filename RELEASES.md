# Releases - MIPSduino Assembler Toolchain

## [v2.0.0] - 2025-12-19

### 🚀 Major Redesign & MicroCoreASM Support
This release marks a significant milestone for the project, transforming it into a professional, integrated toolchain named **MIPSduino Assembler** with native **MicroCoreASM** hardware integration.

### ✨ New Features
- **MicroCoreASM Ready**: Export raw binary files (`.bin`) for direct loading into hardware.
- **Arduino/ESP32 Support**: Export C/C++ header files (`.h`) containing instruction arrays for embedded projects.
- **Integrated CLI**: All utility scripts have been consolidated into the `MIPSduino` command.
- **Enhanced Symbol Analysis**: Integrated memory address mapping and symbol table visualization.
- **Premium Terminal UI**: Clean, colorized output with a professional banner and status indicators.

### 🛠️ Improvements
- **Consolidated Architecture**: Reduced file count by removing redundant shell scripts.
- **Performance**: Optimized assembly and conversion logic for faster builds.
- **User Experience**: Simplified command structure and improved help documentation.
- **Documentation**: Fully updated READMEs and guides for the new v2.0 workflow.

### 📦 Downloads & Links

#### 📥 Direct Downloads
- 🐧 **Linux (.deb)**: [**MIPSduino_2.0.0_amd64.deb**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino_2.0.0_amd64.deb)
- 📦 **Linux (.rpm)**: [**MIPSduino-2.0.0-1.x86_64.rpm**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino-2.0.0-1.x86_64.rpm)
- 📂 **Linux (Standalone)**: [**MIPSduino-2.0.0-linux-x86_64.tar.gz**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino-2.0.0-linux-x86_64.tar.gz)
- 🪟 **Windows (Installer)**: [**MIPSduino_Setup.exe**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino_Setup.exe)
- 🪟 **Windows (Standalone)**: [**MIPSduino.exe**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino.exe)
- 📝 **VS Code Extension**: [**MIPSduino-2.0.0.vsix**](https://github.com/mipsduino/MIPSduino/releases/download/v2.0.0/MIPSduino-2.0.0.vsix)

> **Note**: These links will become active once you create the `v2.0.0` release on GitHub and upload the files from the `mips-toolchain/releases` folder.
> **Windows Users**: We recommend using the **MIPSduino_Setup.exe** installer. It automatically sets up the system PATH so you can run `MIPSduino` from any terminal.

#### 📖 Documentation & Setup
- 🛠️ **[How to Setup (README)](https://github.com/mipsduino/MIPSduino#quick-start)**
- 📟 **[MicroCoreASM Integration Guide](https://github.com/mipsduino/MIPSduino#-using-with-microprocessors)**
- ♾️ **[Arduino Usage Guide](https://github.com/mipsduino/MIPSduino#-using-with-arduino)**

---

## [v1.0.0] - 2025-12-04
- Initial release of the MIPS-X Toolchain.
- Basic assembly and execution support.
- VS Code extension integration.    
- Collection of utility shell scripts.

---

**Version**: 2.0.0  
**Last Updated**: December 19, 2025  
**Copyright**: MIPSduino Team & Anon Open Source
