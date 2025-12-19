.data
    msg: .asciiz "Hello, MIPS-X User!\n"

.text
.globl main

main:
    # Print string
    li $v0, 4
    la $a0, msg
    syscall

    # Exit
    li $v0, 10
    syscall
