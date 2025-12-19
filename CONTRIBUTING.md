# Contributing to IronCoreAssembler

Thank you for your interest in contributing to IronCoreAssembler! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (OS, version, etc.)
- Any relevant code samples or error messages

### Suggesting Enhancements

We welcome feature requests! Please create an issue with:
- A clear description of the enhancement
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

## 🛠️ Development Setup

### Prerequisites

- Python 3.x
- Java Runtime Environment (JRE) 8+
- PyInstaller: `pip install pyinstaller`
- For VS Code extension: Node.js and npm

### Setting Up Your Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/IronCoreAssembler.git
cd IronCoreAssembler

# Install dependencies for VS Code extension
cd mips-toolchain/extension
npm install
cd ../..
```

### Building the Project

**Build CLI tool:**
```bash
cd mips-toolchain/build
./build.sh  # Linux/macOS
# or
build_windows.bat  # Windows
```

**Build VS Code extension:**
```bash
cd mips-toolchain/extension
npm run package
```

**Create full release:**
```bash
cd mips-toolchain/build
./create_release.sh  # Linux only
```

## 📝 Coding Standards

### Python (CLI)
- Follow PEP 8 style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions focused and modular

### JavaScript (VS Code Extension)
- Use ES6+ features
- Follow consistent indentation (2 spaces)
- Add JSDoc comments for functions
- Handle errors gracefully

### Shell Scripts
- Use `#!/bin/bash` or `#!/bin/sh` shebang
- Add comments for complex logic
- Check for errors and provide meaningful messages
- Make scripts portable when possible

## 🧪 Testing

Before submitting a pull request:

1. **Test the CLI tool:**
   ```bash
   mipsx run test_program.asm
   mipsx build test_program.asm
   ```

2. **Test the VS Code extension:**
   - Open VS Code
   - Press F5 to launch Extension Development Host
   - Test all features (run, build, snippets, etc.)

3. **Test utility scripts:**
   ```bash
   ./show_symbols.sh test_program.asm
   ./show_addresses.sh test_program.asm
   ```

## 📁 Project Structure

Understanding the project layout:

```
IronCoreAssembler/
├── mips-toolchain/
│   ├── cli/                 # CLI tool source
│   │   └── mipsx.py
│   ├── extension/           # VS Code extension
│   │   ├── extension.js
│   │   ├── package.json
│   │   ├── syntaxes/
│   │   └── snippets/
│   ├── build/               # Build scripts
│   └── releases/            # Distribution packages
├── Mars.jar                 # MARS simulator
├── *.sh                     # Utility scripts
└── *.md                     # Documentation
```

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- Bug fixes and stability improvements
- Documentation improvements
- Cross-platform compatibility fixes
- Performance optimizations

### Features
- Additional code snippets for VS Code extension
- New utility scripts
- Enhanced error messages
- Additional MIPS instruction support

### Documentation
- Tutorial videos or guides
- Example MIPS programs
- Translation to other languages
- Improved installation guides

## 📋 Commit Message Guidelines

Write clear, concise commit messages:

```
feat: Add new code snippet for array operations
fix: Resolve symbol table parsing issue on Windows
docs: Update installation instructions for macOS
refactor: Simplify build script logic
test: Add test cases for CLI build command
```

Prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🔍 Code Review Process

1. All submissions require review
2. Maintainers will review your PR within a few days
3. Address any requested changes
4. Once approved, a maintainer will merge your PR

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to:
- Open an issue for questions
- Start a discussion in GitHub Discussions
- Reach out to the maintainers

## 🙏 Thank You!

Your contributions make IronCoreAssembler better for everyone. We appreciate your time and effort!

---

**Happy Coding!** 🚀
