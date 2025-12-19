#!/bin/bash
# macOS Build Script for MIPS-X
# Prerequisites: Python 3.x, Java JRE, PyInstaller

echo "Building MIPS-X for macOS..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if PyInstaller is installed
if ! python3 -c "import PyInstaller" &> /dev/null; then
    echo "Installing PyInstaller..."
    pip3 install pyinstaller
fi

# Navigate to build directory
cd "$(dirname "$0")"

# Build the executable
echo "Creating macOS executable..."
pyinstaller --onefile --name mipsx --add-data "../../Mars.jar:." ../cli/mipsx.py

if [ -f "dist/mipsx" ]; then
    echo ""
    echo "========================================"
    echo "Build successful!"
    echo "Executable location: dist/mipsx"
    echo "========================================"
    echo ""
    echo "To install system-wide:"
    echo "  sudo cp dist/mipsx /usr/local/bin/"
else
    echo "Build failed!"
    exit 1
fi
