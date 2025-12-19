#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

// --- UI Helpers ---
void print_banner() {
    printf("\n"
           "    ___                      ______                \n"
           "   /  _/________  ____      / ____/___  ________  \n"
           "   / / / ___/ __ \\/ __ \\    / /   / __ \\/ ___/ _ \\ \n"
           " _/ / / /  / /_/ / / / /   / /___/ /_/ / /  /  __/ \n"
           "/___/_/   \\____/_/ /_/____ \\____/\\____/_/   \\___/  \n"
           "                    /_____/                        \n"
           "    MIPS-X Toolchain | IronCore Assembler v2.0\n"
           "    All copyright owned by Anon Open Source\n\n");
}

int file_exists(const char* filename) {
    struct stat buffer;
    return (stat(filename, &buffer) == 0);
}

const char* get_mars_jar_path() {
    if (file_exists("Mars.jar")) return "Mars.jar";
    if (file_exists("../Mars.jar")) return "../Mars.jar";
    if (file_exists("../../Mars.jar")) return "../../Mars.jar";
    return "Mars.jar";
}

// --- Core Logic ---

int main(int argc, char* argv[]) {
    print_banner();

    if (argc < 2) {
        printf("Usage: mips <command> [args]\n");
        printf("Commands: build, run, symbols, gui\n");
        return 0;
    }

    char* cmd = argv[1];
    const char* mars_path = get_mars_jar_path();

    if (strcmp(cmd, "build") == 0 && argc >= 3) {
        char* file = argv[2];
        char base[256];
        strncpy(base, file, sizeof(base));
        char* dot = strrchr(base, '.');
        if (dot) *dot = '\0';

        char sys_cmd[1024];
        sprintf(sys_cmd, "java -jar %s a nc dump .text HexText %s.hex %s", mars_path, base, file);
        if (system(sys_cmd) == 0) {
            printf("[OK] Assembled to %s.hex\n", base);
            
            // Handle formats
            for (int i = 3; i < argc; i++) {
                if (strcmp(argv[i], "-f") == 0 && i + 1 < argc) {
                    if (strcmp(argv[i+1], "bin") == 0 || strcmp(argv[i+1], "all") == 0) {
                        // Simple hex to bin conversion could be added here if needed
                        // For now, we'll just acknowledge the request
                        printf("[INFO] Binary conversion requested. Use Python for full conversion.\n");
                    }
                }
            }
        }
    } else if (strcmp(cmd, "run") == 0 && argc >= 3) {
        char sys_cmd[1024];
        sprintf(sys_cmd, "java -jar %s nc %s", mars_path, argv[2]);
        system(sys_cmd);
    } else if (strcmp(cmd, "gui") == 0) {
        char sys_cmd[1024];
        if (argc >= 3) sprintf(sys_cmd, "java -jar %s %s", mars_path, argv[2]);
        else sprintf(sys_cmd, "java -jar %s", mars_path);
        system(sys_cmd);
    } else if (strcmp(cmd, "symbols") == 0 && argc >= 3) {
        printf("[INFO] Symbol parsing requested. Use Python for full analysis.\n");
    } else {
        printf("Unknown command or missing arguments.\n");
    }

    return 0;
}
