# MIPSduino Assembler

A modern, high-performance MIPS Assembly development environment featuring the **MIPSduino Assembler v2.0** with **MicroCoreASM** hardware integration.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-lightgrey)

## 🚀 What's New in v2.0

- **Integrated Toolchain**: All utility scripts consolidated into a single powerful `MIPSduino` CLI.
- **MicroCoreASM Ready**: Export raw binary files (`.bin`) for direct loading into hardware.
- **Arduino Support**: Export C/C++ header files (`.h`) containing instruction arrays for Arduino/ESP32 projects.
- **Enhanced Symbols**: Detailed memory address mapping and symbol table analysis integrated into the CLI.
- **Premium UI**: Clean, colorized terminal output for a better developer experience.
- **Performance Optimized**: Faster assembly and conversion processes.

## 📦 Quick Start

### Installation

**Windows:**
1. Download [**MIPSduino_Setup.exe**](mips-toolchain/releases/MIPSduino_Setup.exe).
2. Run the installer (it will add MIPSduino to your system PATH).
3. Open a new terminal and type `MIPSduino` to verify.

**Linux (Debian/Ubuntu):**
```bash
sudo dpkg -i MIPSduino_2.0.0_amd64.deb
```

**VS Code Extension:**
```bash
code --install-extension MIPSduino-2.0.0.vsix
```

### Usage

**Run MIPS assembly:**
```bash
MIPSduino run program.asm
```

**Build for MicroCoreASM (Hardware/Arduino):**
```bash
# Export to all formats (hex, bin, h)
MIPSduino build program.asm

# Export specifically for Arduino
MIPSduino build program.asm -f arduino -o program.h
```

**Show Symbol Table & Addresses:**
```bash
MIPSduino symbols program.asm
```

## 🔌 Hardware Integration Guide (MicroCoreASM)

### 📟 Using with Microprocessors
To load your MIPS code into a hardware microprocessor or FPGA:
1.  **Generate Binary**: Run `MIPSduino build program.asm -f bin`.
2.  **Output**: This creates a `program.bin` file containing raw machine code.
3.  **Loading**: Use your hardware programmer or bootloader to flash this binary directly into the instruction memory (starting at address `0x00400000` by default).

### ♾️ Using with Arduino
To use MIPS instructions within an Arduino/ESP32 sketch:
1.  **Generate Header**: Run `MIPSduino build program.asm -f arduino -o mips_code.h`.
2.  **Include**: Copy `mips_code.h` to your Arduino project folder.
3.  **Code**:
    ```cpp
    #include "mips_code.h"

    void setup() {
        Serial.begin(115200);
        // Access the instructions
        for(int i = 0; i < program_len; i++) {
            Serial.println(program[i], HEX);
        }
    }
    ```
4.  **Execution**: You can now use this array to feed a MIPS emulator or a custom soft-core running on your microcontroller.

## 🛠️ Development

### Prerequisites
- Python 3.x
- Java Runtime Environment (JRE) 8+
- For building: PyInstaller (`pip install pyinstaller`)

### Building from Source
```bash
cd mips-toolchain/build
./build.sh
```

## 📁 Project Structure

```
IronCoreAssembler/
├── mips-toolchain/          # MIPSduino Assembler Toolchain Source
│   ├── cli/                 # Redesigned CLI (MIPSduino.py)
│   ├── extension/           # VS Code extension
│   ├── build/               # Build & Packaging scripts
│   └── releases/            # Distribution packages
├── Mars.jar                 # MARS simulator core
├── SYMBOL_GUIDE.md          # Symbol table guide
├── ADDRESS_MAP.md           # Address mapping reference
└── MARS_GUIDE.md            # MARS usage guide
```

## 🌟 Features

### MIPSduino CLI v2.0
- **Run**: Execute MIPS Assembly files (CLI or GUI mode)
- **Build**: Assemble to Hex, Binary, or Arduino-ready C headers (MicroCoreASM)
- **Symbols**: Integrated symbol table and memory address mapping
- **Cross-Platform**: Native support for Linux, Windows, and macOS
- **Standalone**: No Python required after building

### VS Code Extension
- ✨ Syntax highlighting for MIPS assembly
- 🚀 One-click execution (`Ctrl+Shift+R`)
- 🔨 Build command (`Ctrl+Shift+B`)
- 📝 15+ code snippets for common patterns
- 🎨 IntelliSense and auto-completion

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 2.0.0  
**Last Updated**: December 19, 2025  
**Copyright**: MIPSduino Team & Anon Open Source
