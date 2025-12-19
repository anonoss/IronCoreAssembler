#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

#ifdef _WIN32
#include <windows.h>
#endif

// --- UI Helpers ---
void print_banner() {
    printf("\n"
           "    ___                      ______                \n"
           "   /  _/________  ____      / ____/___  ________  \n"
           "   / / / ___/ __ \\/ __ \\    / /   / __ \\/ ___/ _ \\ \n"
           " _/ / / /  / /_/ / / / /   / /___/ /_/ / /  /  __/ \n"
           "/___/_/   \\____/_/ /_/____ \\____/\\____/_/   \\___/  \n"
           "                    /_____/                        \n"
           "    MIPSduino Assembler v2.0\n"
           "    Powered by MicroCoreASM Hardware Integration\n\n");
}

int file_exists(const char* filename) {
    struct stat buffer;
    return (stat(filename, &buffer) == 0);
}

const char* get_mars_jar_path() {
    if (file_exists("Mars.jar")) return "Mars.jar";
    if (file_exists("../Mars.jar")) return "../Mars.jar";
    if (file_exists("../../Mars.jar")) return "../../Mars.jar";
    
#ifdef _WIN32
    static char local_path[MAX_PATH];
    GetModuleFileNameA(NULL, local_path, MAX_PATH);
    char* last_slash = strrchr(local_path, '\\');
    if (last_slash) {
        strcpy(last_slash + 1, "Mars.jar");
        if (file_exists(local_path)) return local_path;
    }
#endif

    return "Mars.jar";
}

int check_java() {
#ifdef _WIN32
    return system("java -version > nul 2>&1") == 0;
#else
    return system("java -version > /dev/null 2>&1") == 0;
#endif
}

void show_help() {
    printf("MIPSduino Assembler v2.0.0 (MicroCoreASM)\n");
    printf("Usage: MIPSduino <command> [options] <file>\n\n");
    printf("Commands:\n");
    printf("  build <file>    Assemble .asm to .hex, .bin, and .h\n");
    printf("  run <file>      Execute MIPS code in CLI mode\n");
    printf("  gui [file]      Open MARS GUI (optional: with file)\n");
    printf("  symbols <file>  Display symbol table and addresses\n\n");
    printf("Options:\n");
    printf("  -f <format>     Specify output format (hex, bin, arduino, all)\n");
    printf("  -o <file>       Specify output filename\n");
}

// --- Core Logic ---

int main(int argc, char* argv[]) {
    if (argc < 2) {
        print_banner();
        show_help();
        return 0;
    }

    if (!check_java()) {
        fprintf(stderr, "[ERROR] Java (JRE) not found! Please install Java to use this tool.\n");
        return 1;
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
        sprintf(sys_cmd, "java -jar \"%s\" a nc dump .text HexText \"%s.hex\" \"%s\"", mars_path, base, file);
        
        if (system(sys_cmd) == 0) {
            printf("[OK] Assembled: %s.hex\n", base);
            
            int format_specified = 0;
            for (int i = 3; i < argc; i++) {
                if (strcmp(argv[i], "-f") == 0 && i + 1 < argc) {
                    format_specified = 1;
                    if (strcmp(argv[i+1], "bin") == 0 || strcmp(argv[i+1], "all") == 0) {
                        printf("[INFO] Binary conversion requested. (Use C++ or Python for full support)\n");
                    }
                }
            }
            
            if (!format_specified) {
                printf("[INFO] Generated hex by default. Use C++ or Python version for auto bin/h generation.\n");
            }
        } else {
            return 1;
        }
    } else if (strcmp(cmd, "run") == 0 && argc >= 3) {
        char sys_cmd[1024];
        sprintf(sys_cmd, "java -jar \"%s\" nc \"%s\"", mars_path, argv[2]);
        return system(sys_cmd);
    } else if (strcmp(cmd, "gui") == 0) {
        char sys_cmd[1024];
        if (argc >= 3) sprintf(sys_cmd, "java -jar \"%s\" \"%s\"", mars_path, argv[2]);
        else sprintf(sys_cmd, "java -jar \"%s\"", mars_path);
        return system(sys_cmd);
    } else if (strcmp(cmd, "symbols") == 0 && argc >= 3) {
        printf("[INFO] Symbol parsing requested. Use C++ or Python version for full analysis.\n");
    } else if (strcmp(cmd, "--help") == 0 || strcmp(cmd, "-h") == 0) {
        show_help();
    } else {
        fprintf(stderr, "[ERROR] Unknown command: %s\n", cmd);
        show_help();
        return 1;
    }

    return 0;
}
