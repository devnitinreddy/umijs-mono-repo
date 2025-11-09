# Multi-Tenant UmiJS Setup Guide

This document explains the multi-tenant architecture implemented in this repository.

## Architecture Overview

This is a **multi-tenant UmiJS monorepo** where:
- Multiple tenants (Clark and Bruce) share the same codebase
- Each tenant has its own theme, configuration, and deployment
- Shared components come from `@share-component-lib`
- Each tenant deploys to its own domain/subdomain via GitHub Actions

## Directory Structure

```
umijs-mono-repo/
├── tenants/
│   ├── clark/
│   │   ├── config/
│   │   │   └── theme.ts          # Clark's theme configuration
│   │   ├── layouts/
│   │   │   └── index.tsx         # Clark's layout with theme
│   │   └── pages/
│   │       └── index.tsx         # Clark's home page
│   └── bruce/
│       ├── config/
│       │   └── theme.ts          # Bruce's theme configuration
│       ├── layouts/
│       │   └── index.tsx         # Bruce's layout with theme
│       └── pages/
│           └── index.tsx         # Bruce's home page
├── src/
│   ├── components/               # Tenant-agnostic components
│   ├── layouts/                  # Default layout
│   └── pages/                    # Default pages
├── .github/workflows/
│   ├── deploy-clark.yml          # Clark deployment workflow
│   ├── deploy-bruce.yml          # Bruce deployment workflow
│   └── deploy-all.yml            # Deploy all tenants
├── .umirc.ts                     # Default UmiJS config
├── .umirc.clark.ts               # Clark-specific config
├── .umirc.bruce.ts               # Bruce-specific config
└── package.json                  # Dependencies and scripts
```

## Tenants

### Clark Industries
- **Theme**: Blue (#0066cc) with Yellow accents (#ffcc00)
- **Domain**: `clark.yourdomain.com` (or `/clark/` path)
- **Build Output**: `dist/clark`

### Bruce Enterprises
- **Theme**: Dark Gray (#2c3e50) with Red accents (#e74c3c)
- **Domain**: `bruce.yourdomain.com` (or `/bruce/` path)
- **Build Output**: `dist/bruce`

## Development

### Running Specific Tenants

```bash
# Run Clark tenant
yarn start:clark

# Run Bruce tenant
yarn start:bruce

# Run default (original) site
yarn start
```

The development servers will start on `http://localhost:8000`

### Building for Production

```bash
# Build all tenants
yarn build

# Build specific tenant
yarn build:clark
yarn build:bruce
```

## Shared Component Library

The `@share-component-lib` contains reusable components used across all tenants.

### Banner Component

The Banner component accepts a `theme` prop for customization:

```tsx
import { Banner } from '@share-component-lib/components'
import { clarkBannerTheme } from '../config/theme'

<Banner 
  title="Clark Industries"
  subtitle="Innovation at its finest"
  theme={clarkBannerTheme}
/>
```

## Theme Customization

Each tenant has its own theme configuration in `tenants/{tenant}/config/theme.ts`:

```typescript
// Clark's theme
export const clarkMuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0066cc',
    },
    secondary: {
      main: '#ffcc00',
    },
  },
})

export const clarkBannerTheme: BannerTheme = {
  backgroundColor: '#0066cc',
  textColor: '#ffffff',
  accentColor: '#ffcc00',
}
```

## Deployment

### GitHub Actions Workflows

Three workflows are configured:

1. **Deploy Clark** (`deploy-clark.yml`)
   - Triggers on changes to `tenants/clark/**` or `.umirc.clark.ts`
   - Deploys to `/clark/` path

2. **Deploy Bruce** (`deploy-bruce.yml`)
   - Triggers on changes to `tenants/bruce/**` or `.umirc.bruce.ts`
   - Deploys to `/bruce/` path

3. **Deploy All** (`deploy-all.yml`)
   - Triggers on any push to main branch
   - Deploys all tenants

### Setting Up GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

2. **Configure Custom Domains** (Optional):
   - Add CNAME records for subdomains:
     ```
     clark.yourdomain.com → username.github.io
     bruce.yourdomain.com → username.github.io
     ```
   - Update CNAME in workflow files

3. **Workflow Permissions**:
   - Go to Settings → Actions → General
   - Workflow permissions: Read and write permissions
   - Allow GitHub Actions to create and approve pull requests: ✓

### Manual Deployment

Trigger deployments manually:
- Go to Actions tab
- Select the workflow
- Click "Run workflow"

## Adding a New Tenant

1. **Create tenant structure**:
   ```bash
   mkdir -p tenants/newtenant/{config,layouts,pages}
   ```

2. **Create theme configuration**:
   ```typescript
   // tenants/newtenant/config/theme.ts
   export const newtenantMuiTheme = createMuiTheme({ ... })
   export const newtenantBannerTheme: BannerTheme = { ... }
   ```

3. **Create layout**:
   ```tsx
   // tenants/newtenant/layouts/index.tsx
   import { newtenantMuiTheme } from '../config/theme'
   // Apply theme provider
   ```

4. **Create pages**:
   ```tsx
   // tenants/newtenant/pages/index.tsx
   import { Banner } from '@share-component-lib/components'
   // Create your page
   ```

5. **Create UmiJS config**:
   ```typescript
   // .umirc.newtenant.ts
   export default defineConfig({
     routes: [
       {
         path: '/',
         component: '@/tenants/newtenant/layouts/index',
         routes: [
           { path: '/', component: '@/tenants/newtenant/pages/index' },
         ],
       },
     ],
     outputPath: 'dist/newtenant',
     // ...
   })
   ```

6. **Add scripts to package.json**:
   ```json
   {
     "start:newtenant": "cross-env UMI_ENV=newtenant umi dev --config .umirc.newtenant.ts",
     "build:newtenant": "cross-env UMI_ENV=newtenant umi build --config .umirc.newtenant.ts"
   }
   ```

7. **Create GitHub Actions workflow**:
   ```yaml
   # .github/workflows/deploy-newtenant.yml
   # Copy from deploy-clark.yml and modify
   ```

## Configuration Details

### UmiJS Tenant Configuration

Each tenant config (`.umirc.{tenant}.ts`) includes:

- **routes**: Tenant-specific routing
- **title**: Browser tab title
- **publicPath**: Asset loading path for production
- **base**: Router base path
- **outputPath**: Build output directory
- **theme**: Less/CSS variables
- **headScripts**: Inject tenant identifier

### Production URLs

With GitHub Pages deployment:

- Clark: `https://username.github.io/clark/`
- Bruce: `https://username.github.io/bruce/`

With custom domains:

- Clark: `https://clark.yourdomain.com/`
- Bruce: `https://bruce.yourdomain.com/`

## Environment Variables

```bash
# Development
UMI_ENV=clark yarn start

# Production
NODE_ENV=production yarn build:clark
```

## Troubleshooting

### Build Issues

1. **TypeScript errors**: Run `yarn` to ensure all dependencies are installed
2. **Path issues**: Check that `@/tenants/{tenant}` paths are correct
3. **Theme not applied**: Verify ThemeProvider is in the layout

### Deployment Issues

1. **404 on GitHub Pages**: Check `publicPath` and `base` in `.umirc.{tenant}.ts`
2. **Assets not loading**: Ensure `publicPath` matches deployment path
3. **Workflow not triggering**: Check file paths in workflow `on.push.paths`

## Best Practices

1. **Shared Components**: Keep reusable components in `@share-component-lib`
2. **Tenant Isolation**: Keep tenant-specific code in `tenants/{tenant}/`
3. **Theme Consistency**: Define all theme variables in `config/theme.ts`
4. **Testing**: Test each tenant independently before deployment
5. **Documentation**: Update this file when adding new tenants

## Resources

- [UmiJS Documentation](https://umijs.org/)
- [Material-UI Theming](https://v4.mui.com/customization/theming/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)

---

**Last Updated**: November 8, 2025

