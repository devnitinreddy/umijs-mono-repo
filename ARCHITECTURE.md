# Multi-Tenant Architecture

This document explains the common directory structure for the multi-tenant UmiJS application.

## 🏗️ Architecture Overview

The application uses a **common codebase** with **dynamic tenant configuration**. Instead of separate folders for each tenant, we have:

- **Common pages, components, and layouts** in `src/`
- **Tenant-specific configurations** in `config/tenants/`
- **Runtime tenant detection** via environment variables

This approach reduces code duplication and makes maintenance easier.

## 📂 Directory Structure

```
umijs-mono-repo/
├── config/
│   └── tenants/            # Tenant configurations
│       ├── index.ts        # Tenant registry
│       ├── clark.ts        # Clark config & theme
│       └── bruce.ts        # Bruce config & theme
├── src/
│   ├── components/         # Shared components
│   ├── layouts/
│   │   └── index.tsx       # Common layout with dynamic theming
│   ├── pages/
│   │   └── index.tsx       # Common pages with dynamic content
│   └── utils/
│       └── tenant.ts       # Tenant detection utilities
├── .github/workflows/      # CI/CD pipelines
│   ├── deploy-clark.yml
│   ├── deploy-bruce.yml
│   └── deploy-all.yml
├── .umirc.ts               # Default UmiJS config
├── .umirc.clark.ts         # Clark-specific config
├── .umirc.bruce.ts         # Bruce-specific config
└── package.json
```

## 🎯 How It Works

### 1. Tenant Configuration

Each tenant has a configuration file in `config/tenants/{tenant}.ts`:

```typescript
// config/tenants/clark.ts
export const clarkConfig: TenantConfig = {
  name: 'Clark Industries',
  subtitle: 'Innovation at its finest',
  muiTheme: clarkMuiTheme,      // Material-UI theme
  bannerTheme: clarkBannerTheme, // Banner styling
}
```

### 2. Tenant Detection

The `src/utils/tenant.ts` utility determines the current tenant:

```typescript
export function getCurrentTenant(): TenantName {
  // 1. Check window.TENANT (set in HTML head)
  if (window.TENANT) return window.TENANT
  
  // 2. Check process.env.UMI_ENV (build-time)
  return process.env.UMI_ENV || 'clark'
}
```

### 3. Dynamic Layout

The common layout (`src/layouts/index.tsx`) applies the tenant theme:

```typescript
function BasicLayout({ children }: BasicLayoutProps) {
  const tenantConfig = useMemo(() => {
    const tenant = getCurrentTenant()
    return getTenantConfig(tenant)
  }, [])

  return (
    <ThemeProvider theme={tenantConfig.muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
```

### 4. Dynamic Content

Pages can customize content per tenant:

```typescript
const tenantContent = {
  clark: {
    servicesTitle: 'Our Services',
    services: [...],
  },
  bruce: {
    servicesTitle: 'What We Offer',
    services: [...],
  },
}

function HomePage() {
  const tenant = getCurrentTenant()
  const content = tenantContent[tenant]
  // Render with tenant-specific content
}
```

## 🔧 Build Configuration

Each tenant has its own UmiJS config that:

1. Uses the **same source files** (`src/`)
2. Sets the **tenant identifier** via `define` and `headScripts`
3. Configures **output path** and **base URL**

**Example: `.umirc.clark.ts`**

```typescript
export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/layouts/index',  // Common layout
      routes: [
        { path: '/', component: '@/pages/index' }, // Common page
      ],
    },
  ],
  title: 'Clark Industries',
  outputPath: 'dist/clark',
  publicPath: '/clark/',
  base: '/clark/',
  headScripts: [
    { content: `window.TENANT = 'clark';` }, // Set tenant
  ],
  define: {
    'process.env.TENANT': 'clark', // Build-time tenant
  },
})
```

## 📋 Tenant Configuration Interface

```typescript
interface TenantConfig {
  name: string                    // Display name
  subtitle: string                // Tagline
  muiTheme: Theme                 // Material-UI theme
  bannerTheme: BannerTheme        // Banner customization
}
```

## ➕ Adding a New Tenant

### Step 1: Create Tenant Configuration

Create `config/tenants/newtenant.ts`:

```typescript
import { createMuiTheme } from '@material-ui/core'
import { BannerTheme } from '@share-component-lib/components'

const newtenantMuiTheme = createMuiTheme({
  palette: {
    primary: { main: '#yourcolor' },
    secondary: { main: '#accentcolor' },
  },
})

const newtenantBannerTheme: BannerTheme = {
  backgroundColor: '#yourcolor',
  accentColor: '#accentcolor',
}

export const newtenantConfig: TenantConfig = {
  name: 'New Tenant Name',
  subtitle: 'Your tagline',
  muiTheme: newtenantMuiTheme,
  bannerTheme: newtenantBannerTheme,
}

export default newtenantConfig
```

### Step 2: Register Tenant

Update `config/tenants/index.ts`:

```typescript
import newtenantConfig from './newtenant'

export type TenantName = 'clark' | 'bruce' | 'newtenant'

export const tenants: Record<TenantName, TenantConfig> = {
  clark: clarkConfig,
  bruce: bruceConfig,
  newtenant: newtenantConfig, // Add here
}
```

### Step 3: Add Tenant-Specific Content (Optional)

If the tenant needs unique content, add it to `src/pages/index.tsx`:

```typescript
const tenantContent = {
  clark: { ... },
  bruce: { ... },
  newtenant: {
    servicesTitle: 'Your Title',
    services: [...],
    // Custom content
  },
}
```

### Step 4: Create UmiJS Config

Create `.umirc.newtenant.ts`:

```typescript
import { defineConfig } from 'umi'

export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
      ],
    },
  ],
  title: 'New Tenant Name',
  outputPath: 'dist/newtenant',
  publicPath: '/newtenant/',
  base: '/newtenant/',
  theme: {
    'primary-color': '#yourcolor',
  },
  headScripts: [
    { content: `window.TENANT = 'newtenant';` },
  ],
  define: {
    'process.env.TENANT': 'newtenant',
  },
})
```

### Step 5: Add Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "start:newtenant": "cross-env UMI_ENV=newtenant umi dev --config .umirc.newtenant.ts",
    "build:newtenant": "cross-env UMI_ENV=newtenant umi build --config .umirc.newtenant.ts"
  }
}
```

### Step 6: Create Deployment Workflow

Copy `.github/workflows/deploy-clark.yml` to `deploy-newtenant.yml` and update tenant references.

## 🎨 Theming

### Material-UI Theme

Each tenant can customize:
- Primary and secondary colors
- Typography (fonts, weights, sizes)
- Spacing and breakpoints
- Component overrides

### Banner Theme

The shared Banner component accepts these customizations:

```typescript
interface BannerTheme {
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  fontSize?: string | number
  fontWeight?: string | number
  padding?: string | number
}
```

## 🚀 Development Workflow

### Running Tenants

```bash
# Clark tenant
yarn start:clark

# Bruce tenant
yarn start:bruce

# Default (Clark)
yarn start
```

Each command:
1. Sets `UMI_ENV` environment variable
2. Uses tenant-specific UmiJS config
3. Injects tenant identifier into the build
4. Applies tenant theme at runtime

### Building

```bash
# Build all tenants
yarn build

# Build specific tenant
yarn build:clark
yarn build:bruce
```

## 📊 Benefits of This Architecture

✅ **DRY (Don't Repeat Yourself)** - Single codebase for all tenants
✅ **Easy Maintenance** - Fix bugs once, apply to all tenants  
✅ **Consistent UX** - Shared component behavior  
✅ **Flexible Theming** - Each tenant gets unique branding  
✅ **Type Safe** - TypeScript ensures config correctness  
✅ **Scalable** - Add new tenants without duplicating code  
✅ **Independent Deployments** - Deploy tenants separately  

## 🔍 Key Files

| File | Purpose |
|------|---------|
| `config/tenants/{tenant}.ts` | Tenant configuration & theme |
| `config/tenants/index.ts` | Tenant registry |
| `src/utils/tenant.ts` | Tenant detection logic |
| `src/layouts/index.tsx` | Common layout with dynamic theme |
| `src/pages/index.tsx` | Common page with dynamic content |
| `.umirc.{tenant}.ts` | Tenant-specific UmiJS config |

## 🛠️ Advanced Customization

### Tenant-Specific Pages

If a tenant needs a completely different page:

1. Add conditional rendering in the page
2. Or create tenant-specific routes in the config

```typescript
// Option 1: Conditional rendering
function HomePage() {
  const tenant = getCurrentTenant()
  
  if (tenant === 'special') {
    return <SpecialTenantView />
  }
  
  return <StandardView />
}

// Option 2: Tenant-specific routes
// .umirc.special.ts
routes: [
  { path: '/', component: '@/pages/special-home' },
]
```

### Shared vs Tenant-Specific Components

- **Shared**: `src/components/` - Used by all tenants
- **Tenant-specific logic**: Use conditional rendering based on `getCurrentTenant()`

## 📚 Related Documentation

- [QUICK-START.md](./QUICK-START.md) - Quick setup guide
- [README.md](./README.md) - Project overview
- [MULTI-TENANT-SETUP.md](./MULTI-TENANT-SETUP.md) - Original setup guide (now outdated)

---

**Last Updated**: November 8, 2025  
**Architecture Version**: 2.0 (Common Structure)

