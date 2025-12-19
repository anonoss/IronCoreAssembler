#!/bin/bash
# IronCore MIPS-X Terminal Setup
source ~/.bashrc

# Colors
CYAN='\033[0;36m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# Add alias for mipsx
alias mipsx='python3 /home/kyim/IronCoreAssembler/mips-toolchain/cli/mipsx.py'

# Print welcome message
echo -e "${CYAN}${BOLD}"
echo "    ___                      ______                "
echo "   /  _/________  ____      / ____/___  ________  "
echo "   / / / ___/ __ \/ __ \    / /   / __ \/ ___/ _ \ "
echo " _/ / / /  / /_/ / / / /   / /___/ /_/ / /  /  __/ "
echo "/___/_/   \____/_/ /_/____ \____/\____/_/   \___/  "
echo "                    /_____/                        "
echo -e "${NC}${BLUE}    MIPS-X Toolchain | IronCore Assembler v2.0${NC}"
echo -e "    ${CYAN}All copyright owned by Anon Open Source${NC}"
echo ""
echo -e "${BOLD}Welcome to IronCore!${NC}"
echo -e "Type ${BOLD}mipsx${NC} to open the interactive menu."
echo -e "Type ${BOLD}mipsx build <file.asm> -f all${NC} for hardware export."
echo ""
