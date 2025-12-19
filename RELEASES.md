# Releases - IronCore MIPS-X Toolchain

## [v2.0.0] - 2025-12-19

### 🚀 Major Redesign & Hardware Support
This release marks a significant milestone for the IronCoreAssembler project, transforming it from a collection of scripts into a professional, integrated toolchain.

### ✨ New Features
- **Microprocessor Ready**: Export raw binary files (`.bin`) for direct loading into hardware.
- **Arduino/ESP32 Support**: Export C/C++ header files (`.h`) containing instruction arrays for embedded projects.
- **Integrated CLI**: All utility scripts (`show_symbols`, `show_addresses`, etc.) have been consolidated into the `mipsx` command.
- **Enhanced Symbol Analysis**: Integrated memory address mapping and symbol table visualization.
- **Premium Terminal UI**: Clean, colorized output with a professional banner and status indicators.

### 🛠️ Improvements
- **Consolidated Architecture**: Reduced file count by removing redundant shell scripts.
- **Performance**: Optimized assembly and conversion logic for faster builds.
- **User Experience**: Simplified command structure and improved help documentation.
- **Documentation**: Fully updated READMEs and guides for the new v2.0 workflow.

### 📦 Downloads & Links

#### 📥 Direct Downloads
- 🐧 **Linux (.deb)**: [**mipsx_2.0.0_amd64.deb**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/mipsx_2.0.0_amd64.deb)
- 📦 **Linux (.rpm)**: [**mipsx-2.0.0-1.x86_64.rpm**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/mipsx-2.0.0-1.x86_64.rpm)
- 📂 **Linux (Standalone)**: [**mipsx-2.0.0-linux-x86_64.tar.gz**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/mipsx-2.0.0-linux-x86_64.tar.gz)
- 🪟 **Windows (.exe)**: [**mips.exe**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/mips.exe)
- 📝 **VS Code Extension**: [**mips-x-2.0.0.vsix**](https://github.com/anonoss/IronCoreAssembler/releases/download/v2.0.0/mips-x-2.0.0.vsix)

> **Note**: These links will become active once you create the `v2.0.0` release on GitHub and upload the files from the `mips-toolchain/releases` folder.

#### 📖 Documentation & Setup
- 🛠️ **[How to Setup (README)](https://github.com/anonoss/IronCoreAssembler#quick-start)**
- 📟 **[Microprocessor Integration Guide](https://github.com/anonoss/IronCoreAssembler#-using-with-microprocessors)**
- ♾️ **[Arduino Usage Guide](https://github.com/anonoss/IronCoreAssembler#-using-with-arduino)**

---

## [v1.0.0] - 2025-12-04
- Initial release of the MIPS-X Toolchain.
- Basic assembly and execution support.
- VS Code extension integration.    
- Collection of utility shell scripts.

---

**Version**: 2.0.0  
**Last Updated**: December 19, 2025  
**Copyright**: All copyright owned by Anon Open Source
