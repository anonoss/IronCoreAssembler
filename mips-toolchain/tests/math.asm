.data
    newline: .asciiz "\n"

.text
.globl main

main:
    # Load numbers
    li $t0, 15
    li $t1, 27

    # Add them
    add $t2, $t0, $t1

    # Print result (42)
    li $v0, 1
    move $a0, $t2
    syscall

    # Print newline
    li $v0, 4
    la $a0, newline
    syscall

    # Exit
    li $v0, 10
    syscall
