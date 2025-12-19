.data
    space: .asciiz " "
    newline: .asciiz "\n"

.text
.globl main

main:
    # Initialize counter i = 0
    li $t0, 0
    # Set limit = 5
    li $t1, 5

loop:
    # Check if i == 5
    beq $t0, $t1, end_loop

    # Print i
    li $v0, 1
    move $a0, $t0
    syscall

    # Print space
    li $v0, 4
    la $a0, space
    syscall

    # Increment i
    addi $t0, $t0, 1

    # Jump back to loop
    j loop

end_loop:
    # Print newline
    li $v0, 4
    la $a0, newline
    syscall

    # Exit
    li $v0, 10
    syscall
