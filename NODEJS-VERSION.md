# Node.js Version Configuration

## Version Pinned: 16.20.2

All GitHub Actions workflows are configured to use **Node.js 16.20.2** specifically.

## Why Node.js 16.20.2?

Node.js 16.x is the LTS version that works best with:
- **UmiJS v3**: Requires Node.js 14+ but has known issues with Node.js 18+
- **Webpack 5**: Works reliably with Node.js 16
- **OpenSSL Compatibility**: Node.js 16.20.2 has better compatibility with legacy OpenSSL algorithms used by older webpack versions

## Configuration

### GitHub Actions Workflows

All three deployment workflows use the pinned version:

**deploy-clark.yml**, **deploy-bruce.yml**, **deploy-all.yml**:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '16.20.2'  # Pinned version
    cache: 'yarn'
    cache-dependency-path: umijs-mono-repo/yarn.lock
```

### Why Pin the Version?

1. **Consistency**: Same Node.js version across all environments
2. **Reproducibility**: Builds are deterministic and repeatable
3. **Stability**: Avoid breaking changes from automatic updates
4. **Compatibility**: Known to work with UmiJS v3 and dependencies

## Local Development

To match the CI/CD environment, use Node.js 16.20.2 locally:

### Using nvm (Node Version Manager)

```bash
# Install Node.js 16.20.2
nvm install 16.20.2

# Use it
nvm use 16.20.2

# Set as default
nvm alias default 16.20.2

# Verify
node --version
# Should output: v16.20.2
```

### Using .nvmrc

Create `.nvmrc` file in project root:

```bash
echo "16.20.2" > .nvmrc
```

Then simply run:
```bash
nvm use
```

### Auto-Switch (Optional)

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Auto-switch Node version when entering directory with .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Updating Node.js Version (Future)

If you need to update Node.js version in the future:

1. **Test Locally**: Ensure the new version works with all dependencies
2. **Update Workflows**: Change `node-version` in all three workflow files
3. **Update Documentation**: Update this file
4. **Update .nvmrc**: If using nvm locally
5. **Commit and Push**: Deploy changes

### Example Update:

```yaml
# Change from:
node-version: '16.20.2'

# To:
node-version: '18.20.0'  # or whatever version
```

## Version History

| Date | Version | Reason |
|------|---------|--------|
| Nov 9, 2025 | 16.20.2 | Pinned for UmiJS v3 compatibility and OpenSSL stability |
| (Initial) | 18 | Default GitHub Actions version |

## Troubleshooting

### "Error: ERR_OSSL_EVP_UNSUPPORTED"

This error occurs with Node.js 17+ and older webpack versions.

**Solution**: Use Node.js 16.20.2 (already configured)

### "Module not found" or build failures

Ensure you're using the correct Node.js version:

```bash
node --version
# Should output: v16.20.2
```

If not:
```bash
nvm use 16.20.2
```

### Different behavior in CI/CD vs Local

This usually indicates version mismatch.

**Check local version**:
```bash
node --version
```

**Match CI/CD version**:
```bash
nvm install 16.20.2
nvm use 16.20.2
```

## Related Files

- `.github/workflows/deploy-clark.yml` - Clark tenant deployment
- `.github/workflows/deploy-bruce.yml` - Bruce tenant deployment
- `.github/workflows/deploy-all.yml` - All tenants deployment
- `package.json` - Dependencies (compatible with Node.js 16.20.2)

## Node.js 16 Support

Node.js 16 LTS:
- **Active LTS**: October 2021 - April 2022
- **Maintenance LTS**: April 2022 - September 2023
- **End of Life**: September 11, 2023

⚠️ **Note**: Node.js 16 is past its EOL. Consider upgrading to Node.js 18 LTS or 20 LTS once UmiJS and dependencies are tested with newer versions.

## Migration Path (Future)

When ready to upgrade:

### Step 1: Test with Node.js 18
```bash
nvm install 18
nvm use 18
yarn install
yarn build
```

### Step 2: Update Dependencies
If issues occur, update:
- `umi` to latest v3 or v4
- `webpack` to latest compatible version
- Other dependencies as needed

### Step 3: Update Workflows
Change `node-version: '16.20.2'` to `node-version: '18'` in all workflows

### Step 4: Deploy and Verify
Monitor deployments to ensure everything works

---

**Current Status**: ✅ All workflows pinned to Node.js 16.20.2

This ensures consistent builds across all environments and CI/CD pipelines.

