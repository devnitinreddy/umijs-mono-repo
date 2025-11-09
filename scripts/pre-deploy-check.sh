#!/bin/sh

# Pre-deployment checklist script
# Runs checks before deploying to production

set -e

echo "🚀 Running pre-deployment checks..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Run 'yarn install' first."
  exit 1
fi
echo "✅ Dependencies installed"

# Check if all configs exist
for config in .umirc.ts .umirc.clark.ts .umirc.bruce.ts; do
  if [ ! -f "$config" ]; then
    echo "❌ Missing config: $config"
    exit 1
  fi
done
echo "✅ All UmiJS configs present"

# Check if tenant configs exist
for config in config/tenants/clark.ts config/tenants/bruce.ts config/tenants/index.ts; do
  if [ ! -f "$config" ]; then
    echo "❌ Missing tenant config: $config"
    exit 1
  fi
done
echo "✅ All tenant configs present"

# Check TypeScript compilation
echo "Checking TypeScript..."
if ! npx tsc --noEmit; then
  echo "❌ TypeScript compilation errors found"
  exit 1
fi
echo "✅ TypeScript compilation successful"

# Try building all tenants
echo ""
echo "Building all tenants..."
if ! yarn build; then
  echo "❌ Build failed"
  exit 1
fi
echo "✅ Build successful"

# Verify build outputs
echo ""
if ! node scripts/verify-build.js; then
  echo "❌ Build verification failed"
  exit 1
fi

echo ""
echo "✅ All pre-deployment checks passed!"
echo "Ready to deploy! 🎉"
