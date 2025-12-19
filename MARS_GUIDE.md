# MARS MIPS Simulator - Setup Complete! 🚀

## ✅ Installation Summary

MARS (MIPS Assembler and Runtime Simulator) has been successfully installed in:
`/home/kyim/COAL Lab/lab5/Mars.jar`

**Version:** MARS 4.5 (August 2014)
**Size:** 4.0 MB
**Java Version Required:** Java Runtime Environment (JRE) - ✅ Already installed

---

## 🎯 Quick Start Guide

### Option 1: Using the Helper Script (Recommended)
```bash
# Run MARS GUI (interactive mode)
./run_mars.sh

# Run a specific assembly file
./run_mars.sh task1_corrected.asm
```

### Option 2: Using Java Directly
```bash
# Open MARS GUI
java -jar Mars.jar

# Run an assembly file directly
java -jar Mars.jar <your_file.asm>

# Example:
java -jar Mars.jar task1_corrected.asm
```

---

## 📝 Your Assembly Files

### Original File: `task1.asm`
**Issue Found:** Line 2 has incorrect syntax
```assembly
arr1: .word 5:20  # ❌ Invalid syntax
```

**Should be:**
```assembly
arr1: .word 5, 20  # ✅ Correct syntax (two separate values)
```

### Corrected File: `task1_corrected.asm` ✅
- Fixed syntax errors
- Added a complete `.text` section with a `main` label
- Includes example code that:
  - Loads data from arrays
  - Prints a string to console
  - Properly exits the program

**Output when run:**
```
MARS 4.5  Copyright 2003-2014 Pete Sanderson and Kenneth Vollmar

This is a message
```

---

## 🔧 MARS Features

### GUI Mode
When you open MARS GUI, you can:
1. **Edit** - Write and edit assembly code
2. **Assemble** - Compile your code (F3)
3. **Run** - Execute your program (F5)
4. **Step** - Debug line by line (F7)
5. **View Registers** - Monitor CPU registers
6. **View Memory** - Inspect data and text segments

### Command Line Mode
- Automatically assembles and runs the program
- Displays output directly in terminal
- Useful for quick testing and automation

---

## 📚 Common MARS Commands

### Data Directives
```assembly
.data                    # Start data segment
.word 1, 2, 3           # 32-bit integers
.half 5, -6             # 16-bit integers
.byte 'A', 'B'          # 8-bit values
.space 100              # Reserve bytes
.asciiz "Hello"         # Null-terminated string
.ascii "World"          # String without null
```

### Text Directives
```assembly
.text                   # Start code segment
.globl main            # Make main globally visible
main:                  # Label for entry point
```

### System Calls (syscall)
```assembly
li $v0, 1              # Print integer ($a0)
li $v0, 4              # Print string ($a0)
li $v0, 5              # Read integer (result in $v0)
li $v0, 8              # Read string
li $v0, 10             # Exit program
syscall                # Execute system call
```

---

## 🐛 Debugging Tips

1. **Always include a .text section** with a `main:` label
2. **End programs with exit syscall** (li $v0, 10; syscall)
3. **Use proper syntax** for data declarations
4. **Check register usage** - Don't overwrite important values
5. **Use comments** to document your code

---

## 📂 File Structure

```
/home/kyim/COAL Lab/lab5/
├── Mars.jar                 # MARS simulator (4.0 MB)
├── run_mars.sh             # Helper script
├── task1.asm               # Original file (has syntax error)
├── task1_corrected.asm     # Fixed version with working code
└── MARS_GUIDE.md           # This guide
```

---

## 🚀 Next Steps

1. **Fix your original file** or use the corrected version
2. **Open MARS GUI** to explore the interactive features:
   ```bash
   ./run_mars.sh
   ```
3. **Load your file** in the GUI (File → Open)
4. **Assemble** your code (Run → Assemble or F3)
5. **Execute** your program (Run → Go or F5)
6. **Experiment** with the debugger and register views

---

## 💡 Example: Complete MIPS Program

```assembly
.data
message: .asciiz "Hello, MIPS World!\n"
number: .word 42

.text
.globl main
main:
    # Print string
    la $a0, message
    li $v0, 4
    syscall
    
    # Load and print number
    lw $a0, number
    li $v0, 1
    syscall
    
    # Exit
    li $v0, 10
    syscall
```

---

## 📞 Need Help?

- **MARS Documentation:** Available in Help menu of GUI
- **MIPS Reference:** Green card (available in MARS Help)
- **Common Errors:** Check the Messages pane in MARS GUI

---

**Installation Date:** December 2, 2025
**Status:** ✅ Ready to use!
