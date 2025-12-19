#!/bin/bash
# Complete Release Builder for MIPSduino Assembler
# This script creates all distribution packages

set -e  # Exit on error

echo "======================================"
echo "MIPSduino Assembler Release Builder"
echo "======================================"
echo ""

# Navigate to script directory
cd "$(dirname "$0")"
SCRIPT_DIR=$(pwd)
BUILD_DIR="$SCRIPT_DIR"
RELEASE_DIR="$SCRIPT_DIR/../releases"
VERSION="2.0.0"

# Create release directory
mkdir -p "$RELEASE_DIR"

echo "Step 1: Building executable..."
echo "------------------------------"
if [ -f "build.sh" ]; then
    ./build.sh
else
    echo "Error: build.sh not found"
    exit 1
fi

if [ ! -f "dist/MIPSduino" ]; then
    echo "Error: Executable build failed"
    exit 1
fi
echo "✓ Executable built successfully"
echo ""

echo "Step 2: Creating .deb package..."
echo "--------------------------------"
if [ -f "package_deb.sh" ]; then
    ./package_deb.sh
    if [ -f "MIPSduino_${VERSION}_amd64.deb" ]; then
        cp MIPSduino_${VERSION}_amd64.deb "$RELEASE_DIR/"
        echo "✓ .deb package created: $RELEASE_DIR/MIPSduino_${VERSION}_amd64.deb"
    fi
else
    echo "Warning: package_deb.sh not found, skipping .deb"
fi
echo ""

echo "Step 3: Creating .rpm package..."
echo "--------------------------------"
if [ -f "package_rpm.sh" ]; then
    ./package_rpm.sh
    if [ -f "MIPSduino-${VERSION}-1.x86_64.rpm" ]; then
        cp MIPSduino-${VERSION}-1.x86_64.rpm "$RELEASE_DIR/"
        echo "✓ .rpm package created: $RELEASE_DIR/MIPSduino-${VERSION}-1.x86_64.rpm"
    fi
else
    echo "Warning: package_rpm.sh not found, skipping .rpm"
fi
echo ""

echo "Step 4: Creating standalone binary archive..."
echo "----------------------------------------------"
BINARY_ARCHIVE="$RELEASE_DIR/MIPSduino-${VERSION}-linux-x86_64.tar.gz"
tar -czf "$BINARY_ARCHIVE" -C dist MIPSduino
echo "✓ Binary archive created: $BINARY_ARCHIVE"
echo ""

echo "Step 5: Packaging VS Code extension..."
echo "---------------------------------------"
EXTENSION_DIR="$SCRIPT_DIR/../extension"
if [ -d "$EXTENSION_DIR" ]; then
    cd "$EXTENSION_DIR"
    
    # Package the extension
    npx @vscode/vsce package -o "$RELEASE_DIR/MIPSduino-${VERSION}.vsix"
    echo "✓ VS Code extension packaged: $RELEASE_DIR/MIPSduino-${VERSION}.vsix"
    
    cd "$BUILD_DIR"
else
    echo "Warning: Extension directory not found"
fi
echo ""

echo "Step 6: Creating source archive..."
echo "-----------------------------------"
cd "$SCRIPT_DIR/.."
SOURCE_ARCHIVE="$RELEASE_DIR/MIPSduino-${VERSION}-source.tar.gz"
tar -czf "$SOURCE_ARCHIVE" \
    --exclude='build/build' \
    --exclude='build/dist' \
    --exclude='build/rpmbuild' \
    --exclude='build/*.deb' \
    --exclude='build/*.rpm' \
    --exclude='build/*.spec' \
    --exclude='releases' \
    --exclude='extension/node_modules' \
    --exclude='.git' \
    cli/ extension/ build/*.sh build/*.bat README.md
echo "✓ Source archive created: $SOURCE_ARCHIVE"
echo ""

echo "Step 7: Generating checksums..."
echo "--------------------------------"
cd "$RELEASE_DIR"
rm -f SHA256SUMS.txt
sha256sum * > SHA256SUMS.txt 2>/dev/null || true
echo "✓ Checksums generated: $RELEASE_DIR/SHA256SUMS.txt"
echo ""

echo "======================================"
echo "Release Build Complete!"
echo "======================================"
echo ""
echo "Release files created in: $RELEASE_DIR"
echo ""
ls -lh "$RELEASE_DIR"
echo ""
echo "Available packages:"
echo "  - Linux (.deb): MIPSduino_${VERSION}_amd64.deb"
echo "  - Linux (.rpm): MIPSduino-${VERSION}-1.x86_64.rpm"
echo "  - Linux (binary): MIPSduino-${VERSION}-linux-x86_64.tar.gz"
echo "  - VS Code Extension: MIPSduino-${VERSION}.vsix"
echo "  - Source Code: MIPSduino-${VERSION}-source.tar.gz"
echo ""
echo "Note: Windows .exe must be built on Windows using build_windows.bat"
echo "      macOS binary must be built on macOS using build_macos.sh"
