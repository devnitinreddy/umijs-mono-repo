# GitHub Pages Setup Guide

## Problem

The deployment workflow succeeded, but the GitHub Pages URLs show **404 Not Found**:
- `https://devnitinreddy.github.io/umijs-mono-repo/clark/` ❌ 404
- `https://devnitinreddy.github.io/umijs-mono-repo/bruce/` ❌ 404

## Root Cause

The workflow successfully created the `gh-pages` branch and pushed the built files, but **GitHub Pages is not enabled or not configured to use the `gh-pages` branch** in the repository settings.

## Solution: Enable GitHub Pages

Follow these steps to enable GitHub Pages for your repository:

### Step 1: Go to Repository Settings

1. Navigate to: `https://github.com/devnitinreddy/umijs-mono-repo`
2. Click on **"Settings"** tab (top right)
3. In the left sidebar, scroll down and click **"Pages"**

### Step 2: Configure GitHub Pages Source

You'll see a section titled **"Build and deployment"**

Configure as follows:

**Source**: `Deploy from a branch`

**Branch**: 
- Select: `gh-pages` (dropdown)
- Folder: `/ (root)`
- Click **"Save"**

### Step 3: Wait for Deployment

After saving, GitHub Pages will:
1. Show a message: "Your site is live at `https://devnitinreddy.github.io/umijs-mono-repo/`"
2. Take 1-2 minutes to build and deploy
3. Display a green checkmark when ready ✅

### Step 4: Verify Deployment

Once the green checkmark appears, access your sites:

- **Clark**: `https://devnitinreddy.github.io/umijs-mono-repo/clark/`
- **Bruce**: `https://devnitinreddy.github.io/umijs-mono-repo/bruce/`

---

## Visual Guide

### What You'll See in Settings → Pages

**Before Configuration** (causes 404):
```
Source: None
Your site is not currently being built from a source.
```

**After Configuration** (works):
```
Source: Deploy from a branch
Branch: gh-pages / (root)
Your site is live at https://devnitinreddy.github.io/umijs-mono-repo/
```

---

## Alternative: Enable via GitHub CLI

If you prefer command line:

```bash
# Install GitHub CLI (if not already installed)
# Ubuntu/Debian:
sudo apt install gh

# Authenticate
gh auth login

# Enable GitHub Pages
gh api repos/devnitinreddy/umijs-mono-repo/pages \
  -X POST \
  -f source[branch]=gh-pages \
  -f source[path]=/
```

---

## Checking Current Status

### 1. Check if gh-pages Branch Exists

Visit: `https://github.com/devnitinreddy/umijs-mono-repo/tree/gh-pages`

You should see:
```
gh-pages/
├── clark/
│   ├── index.html
│   ├── umi.js
│   └── ...
└── bruce/
    ├── index.html
    ├── umi.js
    └── ...
```

If you see this, the workflow is working correctly. ✅

### 2. Check GitHub Pages Status

Visit: `https://github.com/devnitinreddy/umijs-mono-repo/settings/pages`

Look for:
- ✅ Green checkmark: "Your site is published at..."
- ⏳ Yellow indicator: "Your site is being built..."
- ❌ Red X or "None": Pages not configured

### 3. Check Workflow Logs

Visit: `https://github.com/devnitinreddy/umijs-mono-repo/actions`

Look for:
- ✅ Green checkmark on "Deploy All Tenants" workflow
- Expand the workflow and check "Deploy to GitHub Pages" step

---

## Troubleshooting

### Issue 1: Still Getting 404 After Configuration

**Wait 2-5 minutes** - GitHub Pages can take time to propagate.

Then clear browser cache and try again:
```bash
# Or try with cache disabled
Ctrl + Shift + R (hard reload)
```

### Issue 2: "Branch gh-pages Not Found"

The workflow might not have run yet. Trigger it manually:

1. Go to: `https://github.com/devnitinreddy/umijs-mono-repo/actions`
2. Click on "Deploy All Tenants" workflow
3. Click "Run workflow" button
4. Select `main` branch
5. Click "Run workflow"

### Issue 3: Pages Shows "404 File Not Found"

Check the `gh-pages` branch structure:

```bash
# Clone and check
git clone https://github.com/devnitinreddy/umijs-mono-repo.git
cd umijs-mono-repo
git checkout gh-pages
ls -la

# You should see:
# clark/index.html
# bruce/index.html
```

If files are missing, re-run the deployment workflow.

### Issue 4: Wrong URL

GitHub Pages URL structure:
```
https://<username>.github.io/<repository>/
```

For your repository:
```
https://devnitinreddy.github.io/umijs-mono-repo/
```

For tenants (with subdirectories):
```
https://devnitinreddy.github.io/umijs-mono-repo/clark/
https://devnitinreddy.github.io/umijs-mono-repo/bruce/
```

**Note**: The repository name `umijs-mono-repo` is part of the URL path.

---

## Expected Behavior After Setup

### 1. Workflow Runs

Every push to `main` triggers:
1. ✅ Build Clark and Bruce tenants
2. ✅ Push to `gh-pages` branch
3. ✅ GitHub Pages automatically detects changes
4. ✅ Rebuilds and deploys (1-2 minutes)

### 2. Sites Are Live

- Clark: `https://devnitinreddy.github.io/umijs-mono-repo/clark/`
- Bruce: `https://devnitinreddy.github.io/umijs-mono-repo/bruce/`

### 3. Status Badge

You can add a status badge to README.md:

```markdown
[![Deploy All Tenants](https://github.com/devnitinreddy/umijs-mono-repo/actions/workflows/deploy-all.yml/badge.svg)](https://github.com/devnitinreddy/umijs-mono-repo/actions/workflows/deploy-all.yml)
```

---

## Configuration Verification

### Check .umirc Files

Ensure `publicPath` and `base` are correctly set:

**`.umirc.clark.ts`**:
```typescript
export default defineConfig({
  // ...
  publicPath: process.env.NODE_ENV === 'production' ? '/umijs-mono-repo/clark/' : '/',
  base: process.env.NODE_ENV === 'production' ? '/umijs-mono-repo/clark/' : '/',
  outputPath: 'dist/clark',
})
```

**`.umirc.bruce.ts`**:
```typescript
export default defineConfig({
  // ...
  publicPath: process.env.NODE_ENV === 'production' ? '/umijs-mono-repo/bruce/' : '/',
  base: process.env.NODE_ENV === 'production' ? '/umijs-mono-repo/bruce/' : '/',
  outputPath: 'dist/bruce',
})
```

⚠️ **Important**: The path must start with `/umijs-mono-repo/` (your repository name).

### Check .nojekyll File

Ensure `.nojekyll` is in the repository root (already exists ✅):

```bash
ls -la .nojekyll
```

This file is copied to `dist/clark/` and `dist/bruce/` during build.

**Purpose**: Prevents GitHub Pages from processing files with Jekyll (which breaks UmiJS apps).

---

## Custom Domain (Optional)

If you want to use a custom domain like `clark.yourdomain.com`:

### 1. Add CNAME File

Create `public/CNAME` (for each tenant or root):
```
clark.yourdomain.com
```

### 2. Configure DNS

Add CNAME record in your domain registrar:
```
clark.yourdomain.com -> devnitinreddy.github.io
```

### 3. Update GitHub Settings

Settings → Pages → Custom domain: `clark.yourdomain.com`

---

## Quick Checklist

To get your sites live, complete these steps:

- [ ] **Step 1**: Workflow ran successfully (✅ Already done)
- [ ] **Step 2**: `gh-pages` branch exists with files (✅ Already done)
- [ ] **Step 3**: Enable GitHub Pages in Settings → Pages
  - Source: Deploy from a branch
  - Branch: `gh-pages`
  - Folder: `/ (root)`
  - Click Save
- [ ] **Step 4**: Wait 2-3 minutes for GitHub Pages to build
- [ ] **Step 5**: Visit URLs:
  - Clark: `https://devnitinreddy.github.io/umijs-mono-repo/clark/`
  - Bruce: `https://devnitinreddy.github.io/umijs-mono-repo/bruce/`

---

## Support Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring a Publishing Source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Troubleshooting 404 Errors](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

---

## Summary

**Your deployment workflow is working correctly!** ✅

The only remaining step is to **enable GitHub Pages** in your repository settings:

1. Go to: `https://github.com/devnitinreddy/umijs-mono-repo/settings/pages`
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `(root)`
4. Click **Save**
5. Wait 2-3 minutes
6. Visit your sites!

Once configured, GitHub Pages will automatically rebuild and deploy whenever you push to `main` or manually trigger the workflow.

