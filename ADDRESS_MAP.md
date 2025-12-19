# 🗺️ Memory Address Map - task1_corrected.asm

## 📍 Data Segment Addresses

| Label | Address      | Size  | Type     | Content |
|-------|--------------|-------|----------|---------|
| arr1  | `0x10010000` | 8B    | .word    | 5, 20 (two 32-bit integers) |
| arr2  | `0x10010008` | 8B    | .half    | 7, -2, 8, -6 (four 16-bit integers) |
| arr3  | `0x10010010` | 100B  | .space   | Reserved space (uninitialized) |
| str1  | `0x10010074` | 20B   | .asciiz  | "This is a message\0" |
| str2  | `0x10010088` | 28B   | .asciiz  | "Another important string\0" |

### Address Calculation Breakdown:

```
arr1: 0x10010000                    (start of data segment)
      └─ 2 words × 4 bytes = 8 bytes

arr2: 0x10010008                    (0x10010000 + 8)
      └─ 4 halfwords × 2 bytes = 8 bytes

arr3: 0x10010010                    (0x10010008 + 8)
      └─ 100 bytes reserved

str1: 0x10010074                    (0x10010010 + 100)
      └─ "This is a message" = 18 chars + null = 19 bytes
      └─ Aligned to 20 bytes (word boundary)

str2: 0x10010088                    (0x10010074 + 20)
      └─ "Another important string" = 25 chars + null = 26 bytes
      └─ Aligned to 28 bytes (word boundary)
```

---

## 🔧 Text Segment Addresses

| Label | Address      | Type | Description |
|-------|--------------|------|-------------|
| main  | `0x00400000` | Code | Program entry point |

### Instruction Addresses:

```
0x00400000:  la   $t0, arr1        # Load address of arr1
0x00400004:  lw   $t1, 0($t0)      # Load first word (5)
0x00400008:  lw   $t2, 4($t0)      # Load second word (20)
0x0040000c:  la   $t3, arr2        # Load address of arr2
0x00400010:  lh   $t4, 0($t3)      # Load first halfword (7)
0x00400014:  la   $a0, str1        # Load address of str1
0x00400018:  li   $v0, 4           # System call for print string
0x0040001c:  syscall               # Execute syscall
0x00400020:  li   $v0, 10          # System call for exit
0x00400024:  syscall               # Execute syscall
```

Each MIPS instruction is **4 bytes** (32 bits).

---

## 🧠 Complete MIPS Memory Layout

```
┌─────────────────────────────────────────┐
│  0x00000000 - 0x003fffff                │
│  Reserved                                │
├─────────────────────────────────────────┤
│  0x00400000 - 0x0ffffffc                │  ← TEXT SEGMENT
│  .text (Code/Instructions)              │     (Your program code)
│  • main: 0x00400000                     │
├─────────────────────────────────────────┤
│  0x10000000 - 0x1000ffff                │
│  Reserved                                │
├─────────────────────────────────────────┤
│  0x10010000 - 0x1003ffff                │  ← DATA SEGMENT
│  .data (Global/Static Data)             │     (Your variables)
│  • arr1:  0x10010000                    │
│  • arr2:  0x10010008                    │
│  • arr3:  0x10010010                    │
│  • str1:  0x10010074                    │
│  • str2:  0x10010088                    │
├─────────────────────────────────────────┤
│  0x10040000 - 0x7ffffffc                │  ← HEAP
│  Dynamic Memory (malloc, etc.)          │     (grows upward →)
├─────────────────────────────────────────┤
│  0x7ffffffc - 0x7fffeffc                │  ← STACK
│  Function calls, local variables        │     (grows downward ←)
└─────────────────────────────────────────┘
```

---

## 📊 Memory Access Examples

### Accessing arr1 (words):
```assembly
la   $t0, arr1          # $t0 = 0x10010000
lw   $t1, 0($t0)        # Load from 0x10010000 → $t1 = 5
lw   $t2, 4($t0)        # Load from 0x10010004 → $t2 = 20
```

### Accessing arr2 (halfwords):
```assembly
la   $t0, arr2          # $t0 = 0x10010008
lh   $t1, 0($t0)        # Load from 0x10010008 → $t1 = 7
lh   $t2, 2($t0)        # Load from 0x1001000a → $t2 = -2
lh   $t3, 4($t0)        # Load from 0x1001000c → $t3 = 8
lh   $t4, 6($t0)        # Load from 0x1001000e → $t4 = -6
```

### Accessing strings:
```assembly
la   $a0, str1          # $a0 = 0x10010074
li   $v0, 4             # Print string syscall
syscall                 # Prints "This is a message"
```

---

## 🔍 How to View Exact Addresses

### Method 1: Using the Script (Terminal)
```bash
./show_addresses.sh task1_corrected.asm
```

### Method 2: MARS GUI (Most Accurate)
```bash
./mars_with_symbols.sh task1_corrected.asm
```
Then:
1. Press **F3** to assemble
2. Go to **Tools → Symbol Table**
3. See exact addresses assigned by MARS

### Method 3: Manual Calculation
- Data segment starts at `0x10010000`
- Each `.word` = 4 bytes
- Each `.half` = 2 bytes
- Each `.byte` = 1 byte
- Strings are null-terminated and word-aligned

---

## 💡 Key Points

1. **Data Segment** starts at `0x10010000`
2. **Text Segment** starts at `0x00400000`
3. **Word alignment**: Addresses are typically aligned to 4-byte boundaries
4. **String storage**: `.asciiz` includes null terminator (`\0`)
5. **Size matters**: 
   - `.word` = 32 bits = 4 bytes
   - `.half` = 16 bits = 2 bytes
   - `.byte` = 8 bits = 1 byte

---

**Generated:** December 2, 2025  
**For:** COAL Lab - Lab 5  
**File:** task1_corrected.asm
