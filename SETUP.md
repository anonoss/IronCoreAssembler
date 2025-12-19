# Quick Setup Guide

This guide will help you get IronCoreAssembler up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Java Runtime Environment (JRE) 8 or higher**
- **Python 3.x** (for building from source)
- **Node.js and npm** (for VS Code extension development)

### Installing Prerequisites

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install default-jre python3 python3-pip nodejs npm
```

**Linux (Red Hat/Fedora):**
```bash
sudo dnf install java-latest-openjdk python3 python3-pip nodejs npm
```

**macOS:**
```bash
brew install java python node
```

**Windows:**
- Download Java from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- Download Python from [python.org](https://www.python.org/downloads/)
- Download Node.js from [nodejs.org](https://nodejs.org/)

## 🚀 For Users (Pre-built Releases)

If you just want to use the tools, download pre-built packages from the `mips-toolchain/releases/` directory.

### Install CLI Tool

**Linux (Debian/Ubuntu):**
```bash
cd mips-toolchain/releases
sudo dpkg -i mipsx_1.0_amd64.deb
```

**Linux (Red Hat/Fedora):**
```bash
cd mips-toolchain/releases
sudo rpm -i mipsx-1.0-1.x86_64.rpm
```

**Linux (Standalone Binary):**
```bash
cd mips-toolchain/releases
tar -xzf mipsx-1.0.0-linux-x86_64.tar.gz
sudo mv mipsx /usr/local/bin/
```

### Install VS Code Extension

```bash
cd mips-toolchain/releases
code --install-extension mips-x-1.0.0.vsix
```

### Verify Installation

```bash
# Check CLI
mipsx --help

# Check Java
java -version
```

## 🛠️ For Developers (Building from Source)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/IronCoreAssembler.git
cd IronCoreAssembler
```

### 2. Install Python Dependencies

```bash
pip install pyinstaller
```

### 3. Build the CLI Tool

**Linux/macOS:**
```bash
cd mips-toolchain/build
./build.sh
```

**Windows:**
```cmd
cd mips-toolchain\build
build_windows.bat
```

The compiled binary will be in `mips-toolchain/build/dist/mipsx` (or `mipsx.exe` on Windows).

### 4. Install CLI Tool Locally

**Linux/macOS:**
```bash
sudo cp mips-toolchain/build/dist/mipsx /usr/local/bin/
```

**Windows:**
Copy `mipsx.exe` to a directory in your PATH.

### 5. Build VS Code Extension

```bash
cd mips-toolchain/extension

# Install dependencies
npm install

# Package the extension
npm run package
```

This creates `mips-x-1.0.0.vsix` in the extension directory.

### 6. Install VS Code Extension

```bash
code --install-extension mips-x-1.0.0.vsix
```

## 📦 Creating Release Packages (Linux Only)

To create all distribution packages:

```bash
cd mips-toolchain/build
./create_release.sh
```

This creates:
- `.deb` package (Debian/Ubuntu)
- `.rpm` package (Red Hat/Fedora)
- Binary archive (`.tar.gz`)
- VS Code extension (`.vsix`)
- Source archive
- SHA256 checksums

All packages will be in `mips-toolchain/releases/`.

## ✅ Testing Your Installation

### Test CLI Tool

Create a simple MIPS program `hello.asm`:

```mips
.data
    msg: .asciiz "Hello, MIPS!\n"

.text
    .globl main
main:
    # Print string
    li $v0, 4
    la $a0, msg
    syscall
    
    # Exit
    li $v0, 10
    syscall
```

Run it:
```bash
mipsx run hello.asm
```

### Test VS Code Extension

1. Open VS Code
2. Open `hello.asm`
3. Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
4. Check the output panel

### Test Utility Scripts

```bash
# Show symbol table
./show_symbols.sh hello.asm

# Show memory addresses
./show_addresses.sh hello.asm

# Run with MARS directly
./run_mars.sh hello.asm
```

## 🔧 Troubleshooting

### "Java not found" Error

Make sure Java is installed and in your PATH:
```bash
java -version
```

If not installed, see Prerequisites section above.

### "mipsx: command not found"

The CLI tool is not in your PATH. Either:
- Install it system-wide (see installation steps)
- Run it with full path: `./mipsx run program.asm`
- Add the directory to PATH

### VS Code Extension Not Working

1. Check if extension is installed:
   ```bash
   code --list-extensions | grep mips
   ```

2. Reload VS Code window: `Ctrl+Shift+P` → "Reload Window"

3. Check extension settings: Search for "MIPS-X" in VS Code settings

### Build Errors

**Missing PyInstaller:**
```bash
pip install pyinstaller
```

**Missing npm packages:**
```bash
cd mips-toolchain/extension
npm install
```

## 📚 Next Steps

- Read the [README.md](README.md) for full documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Explore the [guides](.) for MIPS programming help:
  - `SYMBOL_GUIDE.md` - Symbol tables
  - `ADDRESS_MAP.md` - Memory mapping
  - `MARS_GUIDE.md` - MARS simulator

## 💡 Quick Tips

- Use `mipsx --help` to see all CLI options
- Type `main` in VS Code to get a program template
- Press `Ctrl+Space` in VS Code for code suggestions
- Check `mips-toolchain/extension/snippets/` for all available snippets

---

**Need Help?** Open an issue on GitHub or check the documentation!
