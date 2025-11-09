# Dependency Compatibility Matrix

## Overview

This document outlines the version compatibility between all major dependencies in the `@umijs-mono-repo` and `@share-component-lib` projects.

## Node.js Version: 16.20.2

All projects are configured to use **Node.js 16.20.2** for maximum compatibility with UmiJS v3 and stability with Webpack 5.

---

## Main Stack Versions

| Tool | Version | Node.js Required | Repository | Notes |
|------|---------|------------------|------------|-------|
| **Node.js** | 16.20.2 | - | Both | LTS version, EOL Sep 2023 |
| **UmiJS** | 3.5.43 | 10-16 | umijs-mono-repo | Works best with Node.js 14-16 |
| **React** | 17.0.2 | >=0.14.0 | Both | Stable LTS |
| **TypeScript** | 5.9.3 | >=14.17 | Both | Latest stable |
| **Material-UI** | 4.12.4 | >=8.0.0 | Both | v4 stable, v5 recommended |
| **Webpack** | 5.x | >=10.13.0 | umijs-mono-repo | Bundled with UmiJS |
| **Yarn** | 1.22.22 | >=4.0.0 | Both | Package manager |

---

## Build Tools (share-component-lib)

| Tool | Version | Node.js Required | Rollup Compat | Status |
|------|---------|------------------|---------------|--------|
| **Rollup** | 3.29.5 | >=14.18.0 | - | ✅ Compatible |
| **@rollup/plugin-commonjs** | 25.0.8 | >=14.0.0 | 2.x-4.x | ✅ Compatible |
| **@rollup/plugin-node-resolve** | 15.2.3 | >=14.0.0 | 2.x-4.x | ✅ Compatible |
| **@rollup/plugin-typescript** | 11.1.6 | >=14.0.0 | 2.x-4.x | ✅ Compatible |
| **rollup-plugin-terser** | 7.0.2 | >=6.0.0 | 2.x | ⚠️ Deprecated |

### Rollup Version Notes

**Why Rollup 3.x instead of 4.x?**
- Rollup 4.x requires Node.js >= 18.0.0
- Rollup 3.x supports Node.js >= 14.18.0
- We're using Node.js 16.20.2 for UmiJS compatibility
- **No functional differences** in output between 3.x and 4.x for our use case

---

## UmiJS Ecosystem

| Package | Version | Purpose |
|---------|---------|---------|
| `umi` | 3.5.43 | Core framework |
| `@umijs/preset-react` | 2.1.7 | React preset |
| `cross-env` | 7.0.3 | Environment variables |

---

## React Ecosystem

| Package | Version | Type | Repository |
|---------|---------|------|------------|
| `react` | 17.0.2 | Core | Both |
| `react-dom` | 17.0.2 | Core | Both |
| `@types/react` | 17.0.89 | Types | Both |
| `@types/react-dom` | 17.0.26 | Types | Both |

---

## Material-UI Ecosystem

| Package | Version | Purpose | Repository |
|---------|---------|---------|------------|
| `@material-ui/core` | 4.12.4 | Components | Both |
| `@material-ui/icons` | 4.11.3 | Icons | Both |
| `@material-ui/lab` | 4.0.0-alpha.61 | Experimental | umijs-mono-repo |

### Material-UI v4 vs v5

**Currently using**: Material-UI v4 (4.12.4)
**Latest**: Material-UI v5 (now called MUI)

**Why v4?**
- ✅ Stable and mature
- ✅ Known compatibility with React 17
- ✅ Works perfectly with our stack
- ⚠️ No longer actively developed (since Sept 2021)

**Migration to v5**: Possible in future. See [Migration Guide](https://mui.com/material-ui/migration/migration-v4/)

---

## Version Constraints

### Node.js 16.20.2 Compatibility

| Dependency | Compatible? | Notes |
|------------|------------|-------|
| UmiJS 3.5.43 | ✅ Yes | Recommended version |
| Webpack 5 | ✅ Yes | No OpenSSL issues |
| Rollup 3.29.5 | ✅ Yes | Downgraded from 4.x |
| TypeScript 5.9.3 | ✅ Yes | Full support |
| React 17.0.2 | ✅ Yes | Full support |
| Material-UI 4.12.4 | ✅ Yes | Full support |

### Known Issues with Node.js 17+

- ❌ **OpenSSL Error**: `ERR_OSSL_EVP_UNSUPPORTED`
- ❌ **UmiJS Issues**: Compatibility problems with v3
- ❌ **Rollup 4.x**: Requires Node.js >= 18

**Solution**: Use Node.js 16.20.2 (already configured)

---

## Development Environment

### Local Setup

```bash
# Install Node.js 16.20.2
nvm install 16.20.2
nvm use 16.20.2

# Verify
node --version  # v16.20.2
```

### .nvmrc Files

Both repositories include `.nvmrc` with `16.20.2`, so you can:
```bash
nvm use  # Automatically uses 16.20.2
```

---

## CI/CD Environment

### GitHub Actions

All workflows configured with:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '16.20.2'
```

**Workflows**:
- `deploy-clark.yml` ✅
- `deploy-bruce.yml` ✅
- `deploy-all.yml` ✅
- `publish.yml` (share-component-lib) ✅

---

## Upgrade Paths

### Future Node.js 18 Migration

When ready to upgrade:

1. **Test Compatibility**
   ```bash
   nvm use 18
   yarn install
   yarn build
   ```

2. **Update Dependencies**
   - Rollup: 3.29.5 → 4.x
   - Test UmiJS with Node.js 18 (may require UmiJS v4)

3. **Update All Configs**
   - `.nvmrc`: `18`
   - GitHub workflows: `node-version: '18'`
   - `package.json` engines

### Material-UI v5 Migration

When ready to upgrade:

1. **Install Migration Tool**
   ```bash
   npm install @mui/material @mui/icons-material
   npm install --save-dev @mui/codemod
   ```

2. **Run Codemod**
   ```bash
   npx @mui/codemod v5.0.0/preset-safe src/
   ```

3. **Manual Updates**
   - Update imports
   - Replace deprecated props
   - Test theme customization

See: [MUI Migration Guide](https://mui.com/material-ui/migration/migration-v4/)

---

## Testing Matrix

### Verified Combinations

| Component | Version | Test Status | Date |
|-----------|---------|-------------|------|
| Node.js + UmiJS | 16.20.2 + 3.5.43 | ✅ Pass | 2025-11-09 |
| Node.js + Rollup | 16.20.2 + 3.29.5 | ✅ Pass | 2025-11-09 |
| React + Material-UI | 17.0.2 + 4.12.4 | ✅ Pass | 2025-11-09 |
| TypeScript + React | 5.9.3 + 17.0.2 | ✅ Pass | 2025-11-09 |

### Build Verification

**umijs-mono-repo**:
```bash
✓ yarn build:clark  # 31.89s
✓ yarn build:bruce  # Similar timing
```

**share-component-lib**:
```bash
✓ yarn build  # 10.69s
```

---

## Package Manager

### Yarn 1.22.22 (Classic)

**Why Yarn Classic?**
- ✅ Stable and well-tested
- ✅ Good compatibility with UmiJS
- ✅ Fast with workspace support

**Alternative**: Yarn 2+ (Berry) or npm
- May require configuration changes
- Not tested with current setup

---

## Security & EOL Status

| Tool | Status | EOL Date | Action Required |
|------|--------|----------|-----------------|
| Node.js 16 | ⚠️ EOL | Sep 11, 2023 | Plan migration to 18 LTS |
| React 17 | ✅ Active | N/A | Stable, can upgrade to 18 |
| Material-UI v4 | ⚠️ Maintenance | N/A | Consider v5 migration |
| UmiJS v3 | ✅ Active | N/A | v4 available |
| Rollup 3.x | ✅ Active | N/A | Stable |

---

## Troubleshooting

### Version Mismatch Issues

**Symptom**: Build fails with module errors

**Solution**:
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
```

### Node.js Version Issues

**Symptom**: Different behavior locally vs CI/CD

**Solution**:
```bash
# Check version
node --version

# Switch to correct version
nvm use 16.20.2
```

### Rollup Compatibility

**Symptom**: "engine node is incompatible"

**Solution**: Already fixed - using Rollup 3.29.5

---

## Related Documentation

- [NODEJS-VERSION.md](./NODEJS-VERSION.md) - Node.js version details
- [ROLLUP-DOWNGRADE.md](../share-component-lib/ROLLUP-DOWNGRADE.md) - Rollup compatibility
- [CI-CD-FIX.md](./CI-CD-FIX.md) - Multi-repo setup
- [WORKFLOW-UPDATE.md](./WORKFLOW-UPDATE.md) - GitHub Actions updates

---

**Last Updated**: November 9, 2025  
**Status**: ✅ All dependencies compatible with Node.js 16.20.2  
**Tested**: All builds passing in local and CI/CD environments

