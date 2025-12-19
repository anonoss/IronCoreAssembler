#!/bin/bash
cd "$(dirname "$0")"
mkdir -p dist
# Note: On Windows, use ; instead of : for --add-data
pyinstaller --onefile --name mipsx --add-data "../../Mars.jar:." ../cli/mipsx.py
