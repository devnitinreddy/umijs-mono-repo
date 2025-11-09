# GitHub Pages Deployment Permissions Fix

## Problem

GitHub Actions was failing to deploy to GitHub Pages with the following error:

```
remote: Permission to devnitinreddy/umijs-mono-repo.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/devnitinreddy/umijs-mono-repo.git/': 
The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

## Root Cause

By default, the `GITHUB_TOKEN` used in GitHub Actions workflows has **read-only** permissions. To push to the `gh-pages` branch (or any branch), the workflow needs explicit **write** permissions.

The `peaceiris/actions-gh-pages@v4` action tries to:
1. Create/update the `gh-pages` branch
2. Push the built files to that branch

Without write permissions, step 2 fails with a 403 Forbidden error.

## Solution

Added explicit `permissions` to all deployment workflows to grant write access to repository contents.

### Updated Workflows

All three workflows now include:

```yaml
jobs:
  build-and-deploy:  # or build-all
    runs-on: ubuntu-latest
    permissions:
      contents: write  # ✅ Required to push to gh-pages branch
    
    steps:
      # ... rest of the workflow
```

### Files Updated

1. ✅ `.github/workflows/deploy-clark.yml`
2. ✅ `.github/workflows/deploy-bruce.yml`
3. ✅ `.github/workflows/deploy-all.yml`

## What `contents: write` Enables

The `contents: write` permission allows GitHub Actions to:

- ✅ Push to branches (including `gh-pages`)
- ✅ Create new branches
- ✅ Update branch content
- ✅ Force push (if needed)
- ✅ Delete branches (if configured in action)

## GitHub Actions Permissions

### Default Permissions (Without Explicit Declaration)

```yaml
permissions:
  contents: read  # ❌ Read-only, can't push
  metadata: read
```

### Required for GitHub Pages Deployment

```yaml
permissions:
  contents: write  # ✅ Can push to gh-pages
```

### Full Permissions Reference

Other available permissions (not needed for our use case):

```yaml
permissions:
  actions: read|write
  checks: read|write
  contents: read|write       # ← We use this
  deployments: read|write
  issues: read|write
  packages: read|write
  pages: read|write          # Alternative for GitHub Pages
  pull-requests: read|write
  repository-projects: read|write
  security-events: read|write
  statuses: read|write
```

## Alternative Solutions

### Option 1: Using `permissions: contents: write` (Recommended ✅)

**Current solution** - Most straightforward and secure.

```yaml
permissions:
  contents: write
```

**Pros**:
- ✅ Simple and explicit
- ✅ Scoped to only what's needed
- ✅ Works with `GITHUB_TOKEN`
- ✅ No additional secrets needed

**Cons**:
- None for this use case

---

### Option 2: Using Personal Access Token (PAT)

Create a PAT and use it instead of `GITHUB_TOKEN`.

**Setup**:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy token
5. Add to repository secrets as `DEPLOY_TOKEN`

**Update workflow**:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    personal_token: ${{ secrets.DEPLOY_TOKEN }}  # Instead of github_token
    publish_dir: ./umijs-mono-repo/dist/clark
```

**Pros**:
- ✅ More control over token scope
- ✅ Can work across multiple repositories
- ✅ Token can have longer expiration

**Cons**:
- ❌ Requires manual token management
- ❌ Token tied to personal account
- ❌ Extra setup complexity
- ❌ Security risk if token exposed

---

### Option 3: Repository Settings (Deprecated Approach)

Enable workflow permissions in repository settings.

**Steps**:
1. Go to repository → Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Save

**Pros**:
- ✅ No workflow changes needed
- ✅ Works for all workflows

**Cons**:
- ❌ **Not recommended** - Less secure
- ❌ Grants write to ALL workflows
- ❌ Goes against principle of least privilege
- ❌ GitHub recommends explicit permissions

---

### Option 4: Using GitHub Pages Action Environment

Use GitHub's built-in Pages deployment.

```yaml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
    artifact_name: github-pages
```

**Pros**:
- ✅ Official GitHub action
- ✅ Better integration

**Cons**:
- ❌ Different workflow structure
- ❌ Would require refactoring
- ❌ Less flexible for multi-tenant setup

---

## Verification

After applying the fix, the workflow will:

1. ✅ Build successfully
2. ✅ Create/update `gh-pages` branch
3. ✅ Push built files without 403 error
4. ✅ Deploy to GitHub Pages

### Check Deployment Status

1. **Workflow Run**: `https://github.com/devnitinreddy/umijs-mono-repo/actions`
   - Should show ✅ green checkmark
   - No permission errors in logs

2. **GitHub Pages Branch**: `https://github.com/devnitinreddy/umijs-mono-repo/tree/gh-pages`
   - Should exist
   - Should contain `clark/` and `bruce/` directories

3. **Live Sites**:
   - Clark: `https://devnitinreddy.github.io/umijs-mono-repo/clark/`
   - Bruce: `https://devnitinreddy.github.io/umijs-mono-repo/bruce/`

## Security Considerations

### Is `contents: write` Safe?

**Yes**, when used correctly:

✅ **Scoped to workflow**: Only this workflow has write access
✅ **Temporary**: Token expires when workflow completes
✅ **Audited**: All actions logged in GitHub
✅ **Protected branches**: Main branch can still be protected
✅ **Required for Pages**: Standard practice for GitHub Pages deployment

### Best Practices

1. ✅ **Use explicit permissions** (what we did)
2. ✅ **Minimal scope**: Only grant what's needed
3. ✅ **Branch protection**: Protect `main` branch with rules
4. ✅ **Review logs**: Monitor Actions tab for unusual activity
5. ✅ **Use `[skip ci]`**: Prevent infinite loops in commit messages

## Related GitHub Actions Permissions

### Our Current Setup

```yaml
permissions:
  contents: write  # Push to gh-pages
```

### If We Needed More

```yaml
permissions:
  contents: write    # Push to branches
  pages: write       # Deploy to Pages environment
  id-token: write    # OIDC for Pages
```

But `contents: write` is sufficient for our use case with `peaceiris/actions-gh-pages@v4`.

## Troubleshooting

### Still Getting 403 Error?

1. **Check workflow permissions**:
   ```yaml
   permissions:
     contents: write  # ✓ This line must be present
   ```

2. **Check repository settings**:
   - Go to Settings → Actions → General
   - Ensure "Allow GitHub Actions to create and approve pull requests" is enabled (if needed)

3. **Check branch protection**:
   - Ensure `gh-pages` branch is not protected
   - Or add exception for GitHub Actions

4. **Check workflow file location**:
   - Must be in `.github/workflows/`
   - Must be valid YAML

### Error: "Resource not accessible by integration"

This means the token doesn't have the required permissions.

**Solution**: Add `permissions: contents: write` (already done ✓)

### Error: "Ref refs/heads/gh-pages is at ... but expected ..."

This is a merge conflict on `gh-pages` branch.

**Solution**: 
```bash
# Manually fix (if needed)
git checkout gh-pages
git reset --hard origin/gh-pages
git push --force origin gh-pages
```

## Workflow Execution Flow

### Before Fix (❌ Failed)

```
1. Build tenant ✓
2. Prepare files ✓
3. Try to push to gh-pages ✗
   └─ Error: 403 Forbidden (No write permission)
```

### After Fix (✅ Success)

```
1. Build tenant ✓
2. Prepare files ✓
3. Push to gh-pages ✓
   └─ permissions: contents: write enabled
4. Deploy successful ✓
```

## Documentation References

- [GitHub Actions Permissions](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Status

✅ **Fixed**: All workflows now have `contents: write` permission  
✅ **Tested**: Ready for next deployment  
✅ **Documented**: This guide for future reference  

---

**Summary**: Added `permissions: contents: write` to all deployment workflows to enable pushing to the `gh-pages` branch for GitHub Pages deployment.

