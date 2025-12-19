# Hardware Demo: Bit Shifting Pattern
# This program generates a pattern that could be used to drive 8 LEDs
# connected to a microprocessor or Arduino.

.data
    pattern_msg: .asciiz "Current Pattern: "
    newline: .asciiz "\n"

.text
.globl main

main:
    li $t0, 1          # Initial pattern: 00000001
    li $t1, 8          # Number of shifts
    li $t2, 0          # Counter

loop:
    # Print message
    li $v0, 4
    la $a0, pattern_msg
    syscall

    # Print current pattern in decimal (or hex if preferred)
    li $v0, 1
    move $a0, $t0
    syscall

    # Print newline
    li $v0, 4
    la $a0, newline
    syscall

    # Shift left by 1
    sll $t0, $t0, 1
    
    # Increment counter
    addi $t2, $t2, 1
    
    # If counter < 8, repeat
    blt $t2, $t1, loop

    # Reset and exit
    li $v0, 10
    syscall
