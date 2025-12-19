@echo off
REM Windows Build Script for MIPSduino Assembler
REM Prerequisites: Python 3.x, Java JRE, PyInstaller

echo ========================================
echo Building MIPSduino Assembler for Windows...
echo ========================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if Java is installed (Required for MARS)
java -version >nul 2>&1
if errorlevel 1 (
    echo Warning: Java is not installed. MIPSduino requires Java to run MARS.
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
echo Creating Standalone Windows Executable...
echo (This bundles Python, Mars.jar, and MicroCoreASM integration)
pyinstaller --onefile --name MIPSduino --add-data "../../Mars.jar;." --icon=NONE ../cli/MIPSduino.py

REM Optional: Build C++ Wrapper if compiler exists
where g++ >nul 2>&1
if %errorlevel% equ 0 (
    echo Compiling C++ Wrapper...
    g++ -O3 MIPSduino_wrapper.cpp -o dist/MIPSduino_cpp.exe -lstdc++fs
)

if exist "dist\MIPSduino.exe" (
    echo.
    echo ========================================
    echo Build successful!
    echo Executable location: dist\MIPSduino.exe
    echo ========================================
    echo.
    echo This is the MIPSduino "All-in-One" executable.
    echo It includes the MicroCoreASM hardware export tools.
    echo.
    echo NOTE: If Windows Defender flags this file, it is a FALSE POSITIVE.
    echo PyInstaller apps are sometimes flagged because they bundle scripts.
    echo You can safely "Run anyway" or add an exclusion.
    echo.
    echo To install system-wide, copy MIPSduino.exe to a directory in your PATH.
) else (
    echo Build failed!
    exit /b 1
)

pause
