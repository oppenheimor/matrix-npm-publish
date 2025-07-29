# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-07-29

### ✨ Added
- **Internal Network Support**: Added `--internal` flag for internal registry configuration
- **Automatic publishConfig**: Automatically adds publishConfig for internal network mode
- **Enhanced UI**: Professional command-line interface with colorful output
- **Modular Architecture**: Refactored codebase into modular TypeScript structure
- **Type Safety**: Complete TypeScript type definitions
- **Step-by-Step Process**: Clear 6-step publishing workflow with visual feedback

### 🔧 Features
- Interactive package selection with multi-select interface
- Automatic version management (patch version increment)
- Batch compilation support with Matrix workflow
- npm version querying and conflict resolution
- Support for unpublished packages (starts from 0.0.1)
- Safe simulation mode (no actual publishing)

### 🏗️ Architecture
- **Constants Module**: Centralized configuration and color management
- **Types Module**: Complete TypeScript type definitions
- **Utils Module**: Reusable utility functions (display, file, version, banner)
- **Core Module**: Business logic for package processing
- **Modular Design**: Clean separation of concerns

### 📦 Package Structure
```
src/
├── constants/     # Configuration and constants
├── types/         # TypeScript type definitions  
├── utils/         # Utility functions
├── core/          # Core business logic
└── index.ts       # Main entry point
```

## [1.0.0] - 2024-07-29

### 🎉 Initial Release
- Basic package selection and publishing workflow
- ASCII art banner
- Simple command-line interface
- Basic npm version management

---

## 🔗 Links
- [Repository](https://github.com/your-org/matrix-publish)
- [Issues](https://github.com/your-org/matrix-publish/issues)
- [Releases](https://github.com/your-org/matrix-publish/releases)