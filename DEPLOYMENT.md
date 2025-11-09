# 🚀 Deployment Guide

Complete guide for deploying the multi-tenant UmiJS application.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All dependencies installed (`yarn install`)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] All tenants build successfully (`yarn build`)
- [ ] Build verification passes (`yarn verify-build`)
- [ ] Pre-deployment checks pass (`yarn pre-deploy`)
- [ ] Git repository is clean (no uncommitted changes)
- [ ] Tests pass (if applicable)

## 🛠️ Quick Deployment Commands

```bash
# Run all pre-deployment checks
yarn pre-deploy

# Build all tenants
yarn build

# Verify build outputs
yarn verify-build
```

## 🌐 GitHub Pages Deployment

### Setup (One-Time)

1. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **root**
   - Save

2. **Configure Workflow Permissions**:
   - Go to **Settings** → **Actions** → **General**
   - Workflow permissions: **Read and write permissions**
   - Allow GitHub Actions to create and approve pull requests: ✓

3. **Add GitHub Secrets** (if using custom domains):
   - No secrets needed for default GitHub Pages deployment
   - For custom domains, update CNAME in workflow files

### Automatic Deployment

Deployments happen automatically when:

1. **Push to main branch** → Deploys all tenants
2. **Changes to `config/tenants/clark.ts`** → Deploys Clark only
3. **Changes to `config/tenants/bruce.ts`** → Deploys Bruce only
4. **Changes to `src/**`** → Deploys all tenants

### Manual Deployment

Trigger manually from GitHub Actions:

1. Go to **Actions** tab
2. Select workflow (Deploy Clark / Deploy Bruce / Deploy All)
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Deployment URLs

After successful deployment:

**Default GitHub Pages:**
- Clark: `https://[username].github.io/umijs-mono-repo/clark/`
- Bruce: `https://[username].github.io/umijs-mono-repo/bruce/`

Replace `[username]` with your GitHub username.

## 🎯 Custom Domain Setup

### For Single Tenant Domain

1. **Add CNAME Record** in your DNS:
   ```
   clark.yourdomain.com  →  [username].github.io
   ```

2. **Update Workflow** (`.github/workflows/deploy-clark.yml`):
   ```yaml
   - name: Deploy to GitHub Pages (Clark)
     uses: peaceiris/actions-gh-pages@v3
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./dist/clark
       destination_dir: clark
       cname: clark.yourdomain.com  # Add this line
   ```

3. **Update UmiJS Config** (`.umirc.clark.ts`):
   ```typescript
   export default defineConfig({
     publicPath: '/',  // Root path for custom domain
     base: '/',
     // ...
   })
   ```

### For Multiple Subdomains

For both `clark.yourdomain.com` and `bruce.yourdomain.com`:

1. **Create separate repositories** (recommended) or use path-based routing
2. Each subdomain points to a different repository
3. Deploy each tenant to its own repository

## 🔍 Verification After Deployment

### Check Deployment Status

1. **GitHub Actions**:
   - Go to **Actions** tab
   - Check latest workflow run
   - Ensure all steps completed successfully ✅

2. **Visit Deployed Sites**:
   ```bash
   # Clark
   https://[username].github.io/umijs-mono-repo/clark/
   
   # Bruce
   https://[username].github.io/umijs-mono-repo/bruce/
   ```

3. **Check for Issues**:
   - Page loads correctly
   - Styles applied (correct theme colors)
   - Banner displays
   - No 404 errors in console
   - Assets load properly

### Common Issues

**404 Errors on Refresh:**
- Ensure `.nojekyll` file is in dist folder
- Check `base` and `publicPath` in UmiJS config

**Assets Not Loading:**
- Verify `publicPath` matches deployment path
- Check browser console for errors

**Styles Not Applied:**
- Clear browser cache
- Check Material-UI theme is loaded

## 📊 Deployment Workflow Details

### Clark Deployment (`.github/workflows/deploy-clark.yml`)

Triggers on:
- Changes to `config/tenants/clark.ts`
- Changes to `src/**`
- Changes to `.umirc.clark.ts`
- Manual trigger

Steps:
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (yarn)
4. Build Clark tenant
5. Copy `.nojekyll`
6. Deploy to GitHub Pages `/clark/` path
7. Upload build artifacts

### Bruce Deployment (`.github/workflows/deploy-bruce.yml`)

Same as Clark but for Bruce tenant.

### Deploy All (`.github/workflows/deploy-all.yml`)

Triggers on:
- Any push to main branch
- Manual trigger

Builds and deploys both tenants.

## 🔐 Environment Variables

### Build-Time Variables

Set in `.umirc.{tenant}.ts`:

```typescript
define: {
  'process.env.TENANT': 'clark',
  'process.env.API_URL': 'https://api.example.com',
}
```

### Runtime Variables

Set in `headScripts`:

```typescript
headScripts: [
  { content: `window.TENANT = 'clark';` },
  { content: `window.API_URL = 'https://api.example.com';` },
]
```

## 🧪 Testing Deployment Locally

### Preview Production Build

```bash
# Build
yarn build:clark

# Serve locally
npx serve dist/clark -p 3000

# Open browser
open http://localhost:3000
```

### Test All Tenants

```bash
# Build all
yarn build

# Serve Clark
npx serve dist/clark -p 3000

# Serve Bruce (in another terminal)
npx serve dist/bruce -p 3001
```

## 📝 Deployment Logs

### View Workflow Logs

1. Go to **Actions** tab on GitHub
2. Click on the workflow run
3. Expand steps to see detailed logs

### Download Build Artifacts

1. Go to successful workflow run
2. Scroll to **Artifacts** section
3. Download `clark-build` or `bruce-build`
4. Inspect build contents locally

## 🔄 Rollback Strategy

### Rollback to Previous Version

1. **Via GitHub**:
   - Go to **Actions** → Select previous successful workflow
   - Click **Re-run all jobs**

2. **Via Git**:
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Manual**:
   - Download artifact from previous successful build
   - Manually deploy to gh-pages branch

## 📈 Monitoring

### Check Deployment Health

```bash
# Check if site is up
curl -I https://[username].github.io/umijs-mono-repo/clark/

# Check for 200 OK response
```

### Monitor Build Time

- Track workflow execution time in Actions tab
- Typical build time: 2-5 minutes per tenant

## 🎓 Best Practices

1. ✅ **Always run `yarn pre-deploy` before pushing**
2. ✅ **Test locally before deploying**
3. ✅ **Use feature branches for major changes**
4. ✅ **Review build logs after deployment**
5. ✅ **Keep deployment docs updated**
6. ✅ **Monitor deployment success rate**
7. ✅ **Use semantic commit messages**

## 🆘 Troubleshooting

### Build Fails in CI

1. Check workflow logs for errors
2. Run `yarn build` locally
3. Fix errors and push again

### Deployment Succeeds but Site Not Updating

1. Clear browser cache (Ctrl+Shift+R)
2. Check GitHub Pages settings
3. Verify workflow deployed to correct branch
4. Wait 1-2 minutes for CDN cache

### Workflow Not Triggering

1. Check file paths in `on.push.paths`
2. Verify workflow syntax
3. Check branch name (should be `main`)

## 🎯 Next Steps

After successful deployment:

1. ✅ Share deployment URLs with team
2. ✅ Set up custom domains (if needed)
3. ✅ Configure monitoring/analytics
4. ✅ Document tenant-specific configurations
5. ✅ Set up staging environment (optional)

---

**Deployment Status**: 🟢 Ready for Production  
**Last Updated**: November 8, 2025  
**CI/CD**: GitHub Actions  
**Hosting**: GitHub Pages

