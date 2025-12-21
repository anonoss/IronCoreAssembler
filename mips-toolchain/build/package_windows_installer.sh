#!/bin/bash
# Script to build Windows Installer using NSIS on Linux
# Requires: makensis (sudo apt-get install nsis)

set -e

echo "Building Windows Installer..."

# Navigate to build directory
cd "$(dirname "$0")"

# Check if MIPSduino.exe exists in dist
if [ ! -f "dist/MIPSduino.exe" ]; then
    echo "Error: dist/MIPSduino.exe not found."
    echo "Please ensure the Windows executable is placed in build/dist/"
    exit 1
fi

# Run NSIS
makensis installer.nsi

# Check if installer was created
if [ -f "MIPSduino_Setup.exe" ]; then
    echo "Success! Installer created: MIPSduino_Setup.exe"
    
    # Move to releases folder
    mkdir -p ../releases
    mv MIPSduino_Setup.exe ../releases/
    echo "Moved to ../releases/MIPSduino_Setup.exe"
else
    echo "Error: Installer creation failed."
    exit 1
fi
