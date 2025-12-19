#!/bin/bash
cd "$(dirname "$0")"

# Ensure the binary exists
if [ ! -f "dist/mipsx" ]; then
    echo "Error: dist/mipsx not found. Run build.sh first."
    exit 1
fi

# Create a temporary directory for building to avoid spaces in path
BUILD_ROOT=$(mktemp -d)
RPMBUILD_DIR="$BUILD_ROOT/rpmbuild"
mkdir -p "$RPMBUILD_DIR"/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

# Copy source (executable) to SOURCES
cp dist/mipsx "$RPMBUILD_DIR/SOURCES/"

# Copy spec file to SPECS
cp mipsx_rpm.spec "$RPMBUILD_DIR/SPECS/"

# Build RPM
# We use --nocheck to avoid some permission issues if possible, though mostly unrelated.
# The main fix is the path.
rpmbuild --define "_topdir $RPMBUILD_DIR" -bb "$RPMBUILD_DIR/SPECS/mipsx_rpm.spec"

# Move result
find "$RPMBUILD_DIR/RPMS" -name "*.rpm" -exec cp {} . \;
echo "RPM package created in current directory."

# Cleanup
rm -rf "$BUILD_ROOT"
