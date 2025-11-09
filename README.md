# UmiJS Multi-Tenant Mono Repo

![Build Status](https://img.shields.io/github/actions/workflow/status/nitinreddy3/umijs-mono-repo/deploy-all.yml?branch=main&label=build&logo=github)
![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)
![React](https://img.shields.io/badge/React-17.0.2-61dafb.svg)

A **multi-tenant React application** built with **UmiJS v3**, **TypeScript**, **React**, and **Material-UI v4**. Supports multiple tenants with independent themes, configurations, and deployments.

## 🌐 Live Deployments

- **Clark Industries**: [View Demo](https://nitinreddy3.github.io/umijs-mono-repo/clark/)
- **Bruce Enterprises**: [View Demo](https://nitinreddy3.github.io/umijs-mono-repo/bruce/)

## Tech Stack

- **UmiJS v3** - Enterprise-level React application framework
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Material-UI v4** - React UI framework with Material Design components

## Features

✨ **Multi-Tenant Architecture** - Support multiple tenants with isolated configurations  
🎨 **Theme Customization** - Per-tenant Material-UI theming  
📦 **Shared Component Library** - Reusable components via `@share-component-lib`  
🚀 **Independent Deployments** - Deploy each tenant to its own domain  
🔧 **TypeScript Support** - Full type safety and IntelliSense  
⚡ **Fast Development** - Hot Module Replacement (HMR) enabled  
🎯 **Complete Routing** - Tenant-specific routing configurations  
🤖 **GitHub Actions** - Automated CI/CD for each tenant

## Tenants

This monorepo supports the following tenants:

### 🔵 Clark Industries
- **Theme**: Blue & Yellow
- **URL**: `/clark/` or `clark.yourdomain.com`
- **Command**: `yarn start:clark`

### ⚫ Bruce Enterprises
- **Theme**: Dark Gray & Red
- **URL**: `/bruce/` or `bruce.yourdomain.com`
- **Command**: `yarn start:bruce`

## Getting Started

### Prerequisites

- Node.js 18+ (for OpenSSL 3.0 compatibility)
- Yarn 1.22+

### Installation

```bash
# Clone the repository
git clone https://github.com/nitinreddy3/umijs-mono-repo.git
cd umijs-mono-repo

# Install dependencies
yarn install

# Optional: Link shared component library for development
cd ../share-component-lib
yarn link
cd ../umijs-mono-repo
yarn link "@share-component-lib/components"
```

### Development

Start a specific tenant:

```bash
# Run Clark tenant
yarn start:clark

# Run Bruce tenant
yarn start:bruce

# Run default site
yarn start
```

The application will open at [http://localhost:8000](http://localhost:8000)

### Build for Production

Build all tenants:

```bash
yarn build
```

Build specific tenant:

```bash
yarn build:clark
yarn build:bruce
```

Build outputs:
- Clark: `dist/clark/`
- Bruce: `dist/bruce/`

## Project Structure

```
umijs-mono-repo/
├── config/
│   └── tenants/                 # Tenant configurations
│       ├── index.ts             # Tenant registry
│       ├── clark.ts             # Clark config & theme
│       └── bruce.ts             # Bruce config & theme
├── src/
│   ├── components/              # Shared components
│   ├── layouts/
│   │   └── index.tsx            # Common layout with dynamic theming
│   ├── pages/
│   │   └── index.tsx            # Common pages with dynamic content
│   └── utils/
│       └── tenant.ts            # Tenant detection utilities
├── .github/workflows/           # CI/CD pipelines
│   ├── deploy-clark.yml
│   ├── deploy-bruce.yml
│   └── deploy-all.yml
├── .umirc.ts                    # Default UmiJS config
├── .umirc.clark.ts              # Clark-specific config
├── .umirc.bruce.ts              # Bruce-specific config
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

**Key Principle**: All tenants share the same codebase (`src/`) with dynamic theming via `config/tenants/`. This eliminates code duplication.

## Configuration

### UmiJS Configuration

The main configuration is in `.umirc.ts`. Key settings include:

- **TypeScript**: Enabled by default
- **Fast Refresh**: Hot module replacement for React components
- **Webpack 5**: Modern build tooling
- **Dynamic Import**: Code splitting support

### Material-UI Theme

The Material-UI theme is configured in `src/layouts/index.tsx`. You can customize:

- Colors (primary, secondary)
- Typography
- Spacing
- Breakpoints
- And more...

## Available Scripts

### Development
- `yarn start` - Start default development server
- `yarn start:clark` - Start Clark tenant
- `yarn start:bruce` - Start Bruce tenant

### Build
- `yarn build` - Build all tenants
- `yarn build:clark` - Build Clark tenant only
- `yarn build:bruce` - Build Bruce tenant only

### Quality
- `yarn prettier` - Format code with Prettier
- `yarn test` - Run tests
- `yarn test:coverage` - Run tests with coverage

## Using Material-UI Components

Import Material-UI components in your React components:

```typescript
import { Button, Typography, Container } from '@material-ui/core'
import { HomeIcon } from '@material-ui/icons'

function MyComponent() {
	return (
		<Container>
			<Typography variant="h1">Hello World</Typography>
			<Button variant="contained" color="primary">
				Click Me
			</Button>
		</Container>
	)
}
```

## TypeScript Integration

All components use TypeScript with proper type definitions:

```typescript
interface MyComponentProps {
	title: string
	isActive: boolean
}

function MyComponent({ title, isActive }: MyComponentProps) {
	// Your component logic
}
```

## Routing

UmiJS uses file-based routing. Create a new file in `src/pages/` to add a new route:

- `src/pages/index.tsx` → `/`
- `src/pages/about.tsx` → `/about`
- `src/pages/users/index.tsx` → `/users`
- `src/pages/users/[id].tsx` → `/users/:id`

## Deployment

Each tenant can be deployed independently to GitHub Pages:

1. **Run pre-deployment checks**: `yarn pre-deploy`
2. **Enable GitHub Pages** in repository settings
3. **Configure workflows** in `.github/workflows/`
4. **Push to main branch** to trigger automatic deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Adding a New Tenant

See the comprehensive guide in [MULTI-TENANT-SETUP.md](./MULTI-TENANT-SETUP.md#adding-a-new-tenant) for step-by-step instructions on adding new tenants.

## Shared Component Library

The `@share-component-lib` package contains reusable components:

```tsx
import { Banner } from '@share-component-lib/components'

<Banner 
  title="Welcome"
  subtitle="To our application"
  theme={{ backgroundColor: '#0066cc', accentColor: '#ffcc00' }}
/>
```

See [share-component-lib README](../share-component-lib/README.md) for more details.

## Documentation

- [Architecture Guide](./ARCHITECTURE.md) - **START HERE** - Common structure architecture
- [Quick Start Guide](./QUICK-START.md) - Fast onboarding
- [Setup Documentation](./SETUP.md) - Initial setup and dependencies
- [Yarn Migration](./YARN_MIGRATION.md) - npm to yarn migration notes

## Learn More

- [UmiJS Documentation](https://umijs.org/)
- [Material-UI v4 Documentation](https://v4.mui.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## Contributing

Contributions are welcome! Please:
1. Test your changes for all tenants
2. Update documentation
3. Follow the code style guidelines
4. Submit a Pull Request

## License

ISC
