#!/bin/bash
cd "$(dirname "$0")"

VERSION="2.0.0"
ARCH="amd64"
PKG_NAME="MIPSduino"
DIR="${PKG_NAME}_${VERSION}_${ARCH}"

# Clean up previous build
rm -rf "$DIR"

mkdir -p "$DIR/DEBIAN"
mkdir -p "$DIR/usr/local/bin"
mkdir -p "$DIR/usr/share/mipsduino"

# Copy executable
if [ -f "dist/MIPSduino" ]; then
    cp dist/MIPSduino "$DIR/usr/local/bin/"
else
    echo "Error: dist/MIPSduino not found. Run build.sh first."
    exit 1
fi

# Copy Mars.jar
cp ../../Mars.jar "$DIR/usr/share/mipsduino/"

# Create control file
cat > "$DIR/DEBIAN/control" <<EOF
Package: mipsduino
Version: $VERSION
Section: devel
Priority: optional
Architecture: $ARCH
Maintainer: MIPSduino Team <support@mipsduino.org>
Description: MIPSduino Assembler (MicroCoreASM)
 A modern toolchain for MIPS assembly, wrapping MARS with hardware integration.
EOF

# Create postinst script
cat > "$DIR/DEBIAN/postinst" <<EOF
#!/bin/bash
chmod +x /usr/local/bin/MIPSduino
echo "======================================================"
echo " MIPSduino Assembler installed successfully!"
echo " You can now run 'MIPSduino' from your terminal."
echo " Don't forget to install the VS Code extension!"
echo "======================================================"
EOF
chmod 755 "$DIR/DEBIAN/postinst"

# Build .deb
dpkg-deb --root-owner-group --build "$DIR"
echo "Created ${DIR}.deb"
