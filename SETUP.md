# UmiJS Mono Repo - Setup Documentation

## Installation Summary

This document provides details about the technology stack and dependencies installed in this project.

## Tech Stack

### Core Framework
- **UmiJS**: v3.5.43
  - Enterprise-level React application framework
  - Built-in routing, building, and deployment
  - Plugin-based architecture

### UI Library  
- **Material-UI**: v4.12.4
  - React components following Material Design
  - Compatible with UmiJS v3 and React 17
  - Includes:
    - `@material-ui/core`: Core components
    - `@material-ui/icons`: Material Design icons
    - `@material-ui/lab`: Experimental components

### Language & Runtime
- **TypeScript**: v5.9.3
  - Static type checking
  - Enhanced IDE support
  - Better code maintainability

### React
- **React**: Included via UmiJS dependencies
- **React DOM**: Included via UmiJS dependencies
- **@types/react**: v19.2.2 (type definitions)
- **@types/react-dom**: v19.2.2 (type definitions)

### UmiJS Plugins
- **@umijs/preset-react**: v2.1.7
  - React development preset for UmiJS
  - Includes Dva, Helmet, and other React-specific plugins

## Project Structure

```
umijs-mono-repo/
├── .editorconfig           # Editor configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Code formatting rules
├── .umirc.ts              # UmiJS configuration
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
├── SETUP.md               # This file
├── tsconfig.json          # TypeScript configuration
├── typings.d.ts           # Global type declarations
└── src/
    ├── components/        # Reusable components
    │   └── ExampleButton.tsx
    ├── layouts/           # Layout components
    │   └── index.tsx      # Main layout with Material-UI theme
    └── pages/             # Page components (auto-routing)
        └── index.tsx      # Home page
```

## Configuration Files

### .umirc.ts
Main UmiJS configuration file with:
- TypeScript support enabled
- Fast Refresh (HMR) enabled
- Webpack 5 enabled
- Dynamic imports for code splitting
- Route configuration

### tsconfig.json
TypeScript configuration with:
- Strict mode enabled
- Path aliases (@/* for src/*)
- React JSX support
- ES Next target

### .prettierrc
Code formatting rules following best practices:
- Single quotes
- No semicolons
- Tab indentation
- Trailing commas
- 80 character line width

## Material-UI Integration

Material-UI is integrated through:

1. **Theme Provider** in `src/layouts/index.tsx`:
   - Custom theme with primary color (#1890ff)
   - Typography configuration
   - CSS baseline for consistent styling

2. **Type Declarations** in `typings.d.ts`:
   - Module declarations for Material-UI packages

3. **Example Components**:
   - `ExampleButton.tsx`: Demonstrates Material-UI styling with makeStyles
   - `index.tsx`: Home page with various Material-UI components

## Available Scripts

```bash
yarn start              # Start development server (port 8000)
yarn build              # Build for production
yarn prettier           # Format code
yarn test               # Run tests
yarn test:coverage      # Run tests with coverage
```

## Getting Started

1. Start the development server:
   ```bash
   yarn start
   ```

2. Open your browser to [http://localhost:8000](http://localhost:8000)

3. The home page displays:
   - Material-UI themed AppBar
   - Hero section with gradient background
   - Feature cards with icons
   - Responsive grid layout

## Dependencies Compatibility

All dependencies are selected for compatibility with UmiJS v3:

- Material-UI v4 is compatible with React 17 (used by UmiJS v3)
- TypeScript v5 works seamlessly with UmiJS v3
- All type definitions match their respective package versions

## Installation Command Reference

If you need to reinstall dependencies:

```bash
# Install all dependencies using Yarn
yarn install

# Or install specific packages
yarn add umi@3 @umijs/preset-react typescript @types/react @types/react-dom
yarn add @material-ui/core@^4.12.4 @material-ui/icons@^4.11.3 @material-ui/lab@^4.0.0-alpha.61
```

## Next Steps

1. Explore the example components in `src/`
2. Add new pages in `src/pages/` for automatic routing
3. Customize the Material-UI theme in `src/layouts/index.tsx`
4. Create reusable components in `src/components/`
5. Refer to the documentation links in README.md

## Resources

- [UmiJS v3 Documentation](https://v3.umijs.org/)
- [Material-UI v4 Documentation](https://v4.mui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Documentation](https://react.dev/)

---

**Setup Date**: November 8, 2025  
**UmiJS Version**: 3.5.43  
**Material-UI Version**: 4.12.4  
**TypeScript Version**: 5.9.3

