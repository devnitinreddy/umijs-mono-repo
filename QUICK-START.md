# Quick Start Guide

Get up and running with the multi-tenant UmiJS application in minutes.

## 🚀 Quick Commands

```bash
# Development
yarn start:clark    # Run Clark tenant (Blue theme)
yarn start:bruce    # Run Bruce tenant (Dark theme)

# Build for production
yarn build:clark    # Build Clark only
yarn build:bruce    # Build Bruce only
yarn build          # Build all tenants
```

## 📁 What You Need to Know

### 1. Common Structure

All tenants share the same codebase:

```
src/                      # Common pages, layouts, components
config/tenants/          # Tenant-specific configurations
├── clark.ts            # Clark theme & config
└── bruce.ts            # Bruce theme & config
```

**Key Benefit**: No code duplication - maintain once, apply to all tenants!

### 2. Shared Components

Import from the shared library:

```tsx
import { Banner } from '@share-component-lib/components'

<Banner 
  title="My Title"
  subtitle="My Subtitle"
  theme={{ backgroundColor: '#0066cc' }}
/>
```

### 3. Theme Customization

Edit `config/tenants/{name}.ts`:

```typescript
// config/tenants/newtenant.ts
const myMuiTheme = createMuiTheme({
  palette: {
    primary: { main: '#yourcolor' },
    secondary: { main: '#youraccentcolor' },
  },
})

const myBannerTheme: BannerTheme = {
  backgroundColor: '#yourcolor',
  accentColor: '#youraccentcolor',
}

export const newtenantConfig: TenantConfig = {
  name: 'Your Tenant Name',
  subtitle: 'Your tagline',
  muiTheme: myMuiTheme,
  bannerTheme: myBannerTheme,
}
```

## 🌐 Deployment

### GitHub Pages (Automatic)

1. Push to main branch
2. GitHub Actions builds and deploys automatically
3. Access at:
   - `https://username.github.io/clark/`
   - `https://username.github.io/bruce/`

### Custom Domain

Update `.github/workflows/deploy-{tenant}.yml`:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist/clark
    cname: clark.yourdomain.com  # Your custom domain
```

## ➕ Adding a New Tenant

### Step 1: Create Tenant Configuration

```bash
# Copy an existing config
cp config/tenants/clark.ts config/tenants/newtenant.ts

# Edit colors and branding
nano config/tenants/newtenant.ts
```

### Step 2: Register Tenant

Update `config/tenants/index.ts`:

```typescript
import newtenantConfig from './newtenant'

export type TenantName = 'clark' | 'bruce' | 'newtenant'

export const tenants: Record<TenantName, TenantConfig> = {
  clark: clarkConfig,
  bruce: bruceConfig,
  newtenant: newtenantConfig,
}
```

### Step 3: Create UmiJS Config

Copy `.umirc.clark.ts` to `.umirc.newtenant.ts`:

```bash
cp .umirc.clark.ts .umirc.newtenant.ts
```

Update the config:

```typescript
export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/layouts/index',  // Same for all tenants
      routes: [
        { path: '/', component: '@/pages/index' },
      ],
    },
  ],
  title: 'New Tenant Name',
  outputPath: 'dist/newtenant',
  publicPath: '/newtenant/',
  base: '/newtenant/',
  headScripts: [
    { content: `window.TENANT = 'newtenant';` },
  ],
  define: {
    'process.env.TENANT': 'newtenant',
  },
})
```

### Step 4: Add Scripts

Edit `package.json`:

```json
{
  "scripts": {
    "start:newtenant": "cross-env UMI_ENV=newtenant umi dev --config .umirc.newtenant.ts",
    "build:newtenant": "cross-env UMI_ENV=newtenant umi build --config .umirc.newtenant.ts"
  }
}
```

### Step 5: Create Workflow

Copy `.github/workflows/deploy-clark.yml` to `deploy-newtenant.yml` and update paths.

### Step 6: Test

```bash
yarn start:newtenant
```

## 🛠️ Troubleshooting

### Port already in use

Kill the process or use a different port:

```bash
PORT=8001 yarn start:clark
```

### Build fails

1. Clear node_modules: `rm -rf node_modules && yarn install`
2. Clear UmiJS cache: `rm -rf src/.umi`
3. Check TypeScript errors

### Assets not loading in production

Verify `publicPath` and `base` match your deployment path in `.umirc.{tenant}.ts`

## 📚 Key Files

| File | Purpose |
|------|---------|
| `config/tenants/{name}.ts` | Tenant configuration & theme |
| `config/tenants/index.ts` | Tenant registry |
| `src/layouts/index.tsx` | Common layout (dynamic theming) |
| `src/pages/index.tsx` | Common pages (dynamic content) |
| `src/utils/tenant.ts` | Tenant detection logic |
| `.umirc.{name}.ts` | Tenant-specific UmiJS config |
| `.github/workflows/deploy-{name}.yml` | Deployment workflow |

## 💡 Tips

1. **Test locally first**: Always test with `yarn start:{tenant}` before pushing
2. **Check all tenants**: Run `yarn build` to ensure all tenants build successfully
3. **Keep themes consistent**: Use the same structure across all tenant configs
4. **Share code**: All tenants use the same `src/` - no duplication!
5. **Customize selectively**: Only add tenant-specific logic when truly needed
6. **Use shared components**: Put reusable code in `@share-component-lib`

## 🆘 Need Help?

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation
- Check [README.md](./README.md) for full project overview
- Review example tenant configs (`config/tenants/clark.ts`, `bruce.ts`)

---

**Happy coding! 🎉**

