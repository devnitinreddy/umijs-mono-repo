# CI/CD Pipeline Fix - Multi-Repository Setup

## Problem

The GitHub Actions pipeline was failing with:

```
error Package "" refers to a non-existing file '"/home/runner/work/umijs-mono-repo/share-component-lib"'.
```

### Root Cause

The `umijs-mono-repo` uses a local file reference for the shared component library:

```json
{
  "dependencies": {
    "@devnitinreddy/share-component-lib": "file:../share-component-lib"
  }
}
```

This works on your local machine where both repositories are in `/home/jiya/Projects/`, but in GitHub Actions, only the `umijs-mono-repo` repository is checked out by default. The relative path `../share-component-lib` doesn't exist in the CI/CD environment.

---

## Solution

Updated all three GitHub Actions workflows to:
1. **Check out both repositories** in the correct directory structure
2. **Build the shared component library** first
3. **Install dependencies** in the correct working directories

### Workflow Structure

```
GitHub Actions Runner:
├── umijs-mono-repo/          (main checkout)
│   ├── package.json
│   ├── src/
│   └── ...
└── share-component-lib/      (secondary checkout)
    ├── package.json
    ├── src/
    └── dist/ (after build)
```

This maintains the same relative path structure (`../share-component-lib`) as your local development environment.

---

## Changes Made

### 1. Updated `deploy-clark.yml`

**Before:**
```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v4
  
  - name: Install dependencies
    run: yarn install
```

**After:**
```yaml
steps:
  - name: Checkout umijs-mono-repo
    uses: actions/checkout@v4
    with:
      path: umijs-mono-repo

  - name: Checkout share-component-lib
    uses: actions/checkout@v4
    with:
      repository: devnitinreddy/share-component-lib
      path: share-component-lib

  - name: Install and build share-component-lib
    working-directory: share-component-lib
    run: |
      yarn install
      yarn build

  - name: Install dependencies
    working-directory: umijs-mono-repo
    run: yarn install
```

### 2. Updated `deploy-bruce.yml`

Same changes as `deploy-clark.yml` but for the Bruce tenant.

### 3. Updated `deploy-all.yml`

Same changes for deploying both tenants together.

---

## Key Features

### Multi-Repository Checkout

```yaml
- name: Checkout umijs-mono-repo
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
    path: umijs-mono-repo

- name: Checkout share-component-lib
  uses: actions/checkout@v4
  with:
    repository: devnitinreddy/share-component-lib
    path: share-component-lib
    fetch-depth: 1
```

- Checks out `umijs-mono-repo` into `./umijs-mono-repo/`
- Checks out `share-component-lib` into `./share-component-lib/`
- This creates the same directory structure as your local machine

### Build Order

1. **First**: Build `share-component-lib`
   ```yaml
   - name: Install and build share-component-lib
     working-directory: share-component-lib
     run: |
       yarn install
       yarn build
   ```

2. **Then**: Install dependencies in `umijs-mono-repo`
   ```yaml
   - name: Install dependencies
     working-directory: umijs-mono-repo
     run: yarn install
   ```

3. **Finally**: Build the tenants
   ```yaml
   - name: Build Clark tenant
     working-directory: umijs-mono-repo
     run: yarn build:clark
   ```

### Working Directories

All subsequent commands use `working-directory` to ensure they run in the correct location:

```yaml
- name: Build Clark tenant
  working-directory: umijs-mono-repo
  run: yarn build:clark

- name: Copy .nojekyll to dist
  working-directory: umijs-mono-repo
  run: cp .nojekyll dist/clark/
```

### Deployment Paths

Updated publish directories to include the `umijs-mono-repo/` prefix:

```yaml
- name: Deploy to GitHub Pages (Clark)
  uses: peaceiris/actions-gh-pages@v4
  with:
    publish_dir: ./umijs-mono-repo/dist/clark
    destination_dir: clark
```

---

## Benefits

### 1. **Maintains Local Development Experience**
- Same file structure as local machine
- No need to change `package.json` for CI/CD
- Developers can test locally with confidence it will work in CI/CD

### 2. **No npm Publishing Required (Yet)**
- Can deploy before publishing to npm
- Useful for testing and development
- No dependency on external npm registry during build

### 3. **Always Uses Latest Code**
- Checks out the latest version of `share-component-lib` from main branch
- No version mismatch between repositories
- Changes to component library are immediately reflected

### 4. **Clear Build Process**
1. Check out both repos
2. Build shared library
3. Install dependencies
4. Build tenants
5. Deploy

---

## Testing

After pushing these changes, the pipeline will:

1. ✅ Check out both repositories
2. ✅ Build `share-component-lib` (CJS, ESM, types)
3. ✅ Install dependencies in `umijs-mono-repo` (finds `../share-component-lib`)
4. ✅ Build Clark and/or Bruce tenants
5. ✅ Deploy to GitHub Pages

---

## Alternative Approaches (For Future)

### Option 1: Publish to npm First

Once `@devnitinreddy/share-component-lib` is published to npm:

1. Update `package.json`:
   ```json
   {
     "dependencies": {
       "@devnitinreddy/share-component-lib": "^1.0.0"
     }
   }
   ```

2. Simplify workflows (no need to check out second repo)

**Pros:**
- Simpler CI/CD
- Version control
- Semantic versioning

**Cons:**
- Must publish before deploying changes
- Extra step in workflow

### Option 2: Git Direct Install

Use Git URL instead of local reference:

```json
{
  "dependencies": {
    "@devnitinreddy/share-component-lib": "github:devnitinreddy/share-component-lib"
  }
}
```

**Pros:**
- No multi-repo checkout needed
- Works in CI/CD automatically

**Cons:**
- Slower installation (clones entire repo)
- Local development requires pushing to test changes

---

## Current Status

✅ **All workflows updated**:
- `deploy-clark.yml`
- `deploy-bruce.yml`
- `deploy-all.yml`

✅ **Directory structure maintained**:
- Local: `/home/jiya/Projects/{umijs-mono-repo,share-component-lib}`
- CI/CD: `/home/runner/work/umijs-mono-repo/{umijs-mono-repo,share-component-lib}`

✅ **Build process optimized**:
- Component library built once
- Cached for subsequent steps
- All tenants use the same built library

---

## Verification

Once deployed, check:

1. **GitHub Actions**: `https://github.com/nitinreddy3/umijs-mono-repo/actions`
   - Should see successful workflow runs

2. **Clark Tenant**: `https://nitinreddy3.github.io/umijs-mono-repo/clark/`
   - Should display with Banner component

3. **Bruce Tenant**: `https://nitinreddy3.github.io/umijs-mono-repo/bruce/`
   - Should display with Banner component

---

## Troubleshooting

### If deployment still fails:

1. **Check repository names**: Ensure `devnitinreddy/share-component-lib` is correct
2. **Check permissions**: GitHub Actions needs read access to both repos
3. **Check branches**: Workflows check out from `main` branch
4. **Check paths**: Verify `../share-component-lib` resolves correctly

---

**Pipeline should now deploy successfully!** 🚀

The multi-repository setup ensures both local development and CI/CD use the same file structure and build process.

