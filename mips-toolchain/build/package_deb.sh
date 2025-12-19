#!/bin/bash
cd "$(dirname "$0")"

VERSION="2.0.0"
ARCH="amd64"
PKG_NAME="mipsx"
DIR="${PKG_NAME}_${VERSION}_${ARCH}"

# Clean up previous build
rm -rf "$DIR"

mkdir -p "$DIR/DEBIAN"
mkdir -p "$DIR/usr/local/bin"

# Copy executable
if [ -f "dist/mipsx" ]; then
    cp dist/mipsx "$DIR/usr/local/bin/"
else
    echo "Error: dist/mipsx not found. Run build.sh first."
    exit 1
fi

# Create control file
cat > "$DIR/DEBIAN/control" <<EOF
Package: $PKG_NAME
Version: $VERSION
Section: devel
Priority: optional
Architecture: $ARCH
Maintainer: MIPS-X Team <support@mipsx.org>
Description: MIPS-X Assembler and Runtime
 A modern toolchain for MIPS assembly, wrapping MARS.
EOF

# Build .deb
dpkg-deb --build "$DIR"
echo "Created ${DIR}.deb"
