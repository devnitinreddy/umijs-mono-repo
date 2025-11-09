# Yarn Migration Guide

This document summarizes the migration from npm to yarn for the UmiJS Mono Repo project.

## What Changed

### ✅ Completed Changes

1. **Removed npm files**:
   - Deleted `package-lock.json` (npm's lock file)
   
2. **Created yarn files**:
   - Generated `yarn.lock` (yarn's lock file)
   
3. **Updated .gitignore**:
   - Removed `/yarn.lock` from ignore list (yarn.lock should be committed)
   - Kept `/package-lock.json` in ignore list
   
4. **Updated documentation**:
   - Updated `README.md` with yarn commands
   - Updated `SETUP.md` with yarn commands

### Package Manager

- **Installed**: Yarn v1.22.22
- **Location**: Global installation

## Using Yarn Commands

### Common Commands

```bash
# Install dependencies
yarn install
# or simply
yarn

# Add a new package
yarn add <package-name>

# Add a dev dependency
yarn add <package-name> --dev

# Remove a package
yarn remove <package-name>

# Upgrade packages
yarn upgrade

# Run scripts
yarn start              # Start development server
yarn build              # Build for production
yarn test               # Run tests
yarn prettier           # Format code
```

### Yarn vs NPM Command Comparison

| NPM Command | Yarn Command |
|------------|--------------|
| `npm install` | `yarn install` or `yarn` |
| `npm install <package>` | `yarn add <package>` |
| `npm install --save-dev <package>` | `yarn add <package> --dev` |
| `npm uninstall <package>` | `yarn remove <package>` |
| `npm update` | `yarn upgrade` |
| `npm run <script>` | `yarn <script>` |
| `npm install -g <package>` | `yarn global add <package>` |

## Benefits of Yarn

✨ **Faster Installation** - Parallel package installation  
🔒 **Better Security** - Built-in license checker  
📦 **Offline Mode** - Install packages without internet after first install  
🎯 **Deterministic** - Lockfile ensures same dependencies across all machines  
💪 **Reliability** - More consistent installs across different systems  

## Current Project Status

All dependencies have been successfully installed with yarn:
- UmiJS v3.5.43
- React v17.0.2
- TypeScript v5.9.3
- Material-UI v4.12.4

## Getting Started

Start the development server:

```bash
yarn start
```

The application will be available at [http://localhost:8000](http://localhost:8000)

## Notes

- The `yarn.lock` file **should be committed** to version control
- All team members should use yarn for consistency
- If you need npm for any reason, delete `yarn.lock` and run `npm install`

---

**Migration Date**: November 8, 2025  
**Yarn Version**: 1.22.22  
**Status**: ✅ Complete

