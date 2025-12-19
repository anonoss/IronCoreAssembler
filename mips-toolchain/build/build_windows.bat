@echo off
REM Windows Build Script for MIPS-X
REM Prerequisites: Python 3.x, Java JRE, PyInstaller

echo Building MIPS-X for Windows...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if PyInstaller is installed
pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo Installing PyInstaller...
    pip install pyinstaller
)

REM Navigate to build directory
cd /d "%~dp0"

REM Build the executable
echo Creating Windows executable...
pyinstaller --onefile --name mipsx --add-data "../../Mars.jar;." --icon=NONE ../cli/mipsx.py

if exist "dist\mipsx.exe" (
    echo.
    echo ========================================
    echo Build successful!
    echo Executable location: dist\mipsx.exe
    echo ========================================
    echo.
    echo To install system-wide, copy mipsx.exe to a directory in your PATH
    echo Example: copy dist\mipsx.exe C:\Windows\System32\
) else (
    echo Build failed!
    exit /b 1
)

pause
