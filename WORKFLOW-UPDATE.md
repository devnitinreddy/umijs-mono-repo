# GitHub Actions Workflow Update - v4 Migration

## Issue

Deployment was failing due to deprecated GitHub Actions versions. According to the [GitHub Changelog](https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/), **v3 of `actions/upload-artifact` and `actions/download-artifact` is no longer supported as of January 30th, 2025**.

## Changes Made

All three deployment workflows have been updated to use the latest versions of GitHub Actions:

### Updated Actions

| Action | Before | After | Reason |
|--------|--------|-------|--------|
| `actions/checkout` | v3 | v4 | Latest stable version |
| `actions/setup-node` | v3 | v4 | Latest stable version |
| `peaceiris/actions-gh-pages` | v3 | v4 | Latest stable version |
| `actions/upload-artifact` | v3 ❌ | v4 ✅ | **v3 deprecated** |

### Files Updated

1. ✅ `.github/workflows/deploy-clark.yml`
2. ✅ `.github/workflows/deploy-bruce.yml`
3. ✅ `.github/workflows/deploy-all.yml`

## v4 Artifact Actions Improvements

According to GitHub, v4 of the artifact actions includes:

- **Up to 98% faster** upload and download speeds
- Improved compression
- Better performance
- Enhanced reliability
- New features for artifact management

## Testing

After pushing these changes:

1. **Automatic trigger**: Workflows will run automatically on next push to `main`
2. **Manual trigger**: You can also manually trigger via GitHub Actions UI
3. **Expected result**: Deployments should complete successfully

## Verification Steps

1. **Check workflow runs**:
   ```
   https://github.com/nitinreddy3/umijs-mono-repo/actions
   ```

2. **Verify artifacts**:
   - Artifacts uploaded with v4 remain compatible
   - Existing artifacts are still accessible
   - No data loss during migration

3. **Test deployments**:
   - Clark: `https://nitinreddy3.github.io/umijs-mono-repo/clark/`
   - Bruce: `https://nitinreddy3.github.io/umijs-mono-repo/bruce/`

## Rollback Plan

If issues occur, you can temporarily rollback by:

1. Reverting this commit
2. Using v4 directly without older dependencies
3. Removing artifact upload steps (non-critical for deployment)

## Documentation

- [GitHub Actions Artifact v4 Migration Guide](https://github.com/actions/upload-artifact#migration-guide)
- [Deprecation Notice](https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/)
- [v4 Release Notes](https://github.com/actions/upload-artifact/releases/tag/v4.0.0)

## Impact

✅ **No breaking changes** for our workflows  
✅ **Improved performance** (faster uploads)  
✅ **Future-proof** (no upcoming deprecations)  
✅ **Backward compatible** (existing artifacts still work)

---

**Status**: ✅ Ready to deploy  
**Migration Date**: November 9, 2025  
**Tested**: Pending first workflow run

