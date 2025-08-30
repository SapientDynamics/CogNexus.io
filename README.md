# CogNexus.io Monorepo

A unified intelligence platform that turns what teams already know into connected, decision-ready answers.

## Project Structure

This monorepo contains:

- **apps/cognexus**: Main CogNexus.io platform app (Next.js 14)
- **apps/forge**: Forge vertical app for construction (Next.js 14)
- **packages/ui**: Shared UI component library (@cnx/ui)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Monorepo Tools**: Turborepo
- **Deployment**: AWS Amplify

## Features

- **Monorepo Structure**: Organized with Turborepo and pnpm workspaces
- **Shared UI Components**: Consistent design system across apps
- **Tailwind Integration**: Configured to work with shared components
- **SSR Support**: Optimized for AWS Amplify deployment
- **Navigation**: Responsive navigation with active state indicators
- **UI Demo Pages**: Component showcase pages in both apps

## Getting Started

### Prerequisites

- Node.js ≥ 18.17
- pnpm (install with `npm install -g pnpm`)
- Git

### Initial Setup

1. Clone the repository:

```bash
git clone https://github.com/SapientDynamics/CogNexus.io.git
cd CogNexus.io
```

2. Install dependencies:

```bash
pnpm install
```

3. Verify your setup:

```bash
node verify-setup.js
```

This script will check that all necessary files and configurations are in place.

### Development

Run the development server for the main platform:

```bash
pnpm -F apps/cognexus dev
```

Run the development server for the Forge vertical:

```bash
pnpm -F apps/forge dev
```

Run both apps in parallel (requires multiple terminal windows):

```bash
# Terminal 1
pnpm -F apps/cognexus dev

# Terminal 2
pnpm -F apps/forge dev
```

### Accessing the Applications

- Main CogNexus.io platform: http://localhost:3000
- Forge vertical: http://localhost:3001 (if running simultaneously)
- UI Demo pages: 
  - http://localhost:3000/ui-demo (for cognexus app)
  - http://localhost:3001/ui-demo (for forge app)

### Building

Build all apps:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm -F apps/cognexus build
# or
pnpm -F apps/forge build
```

## Monorepo Configuration

### Key Configuration Files

- **.npmrc**: Contains `node-linker=hoisted` for efficient dependency management
- **pnpm-workspace.yaml**: Defines workspace packages in `apps/*` and `packages/*`
- **turbo.json**: Configures build tasks and dependencies between packages
- **amplify.yml**: Configures AWS Amplify deployment for both apps

### TypeScript Configuration

Each app and package has its own `tsconfig.json` with:

- Strict type checking enabled
- Path aliases configured (e.g., `@/*` for `./src/*`)
- Next.js specific settings for the apps

### Tailwind CSS Configuration

Tailwind is configured in each app with:

- Content paths that include the shared UI package
- Custom theme extensions for colors and other design tokens
- PostCSS configuration with autoprefixer

## Shared UI Components

The `@cnx/ui` package contains shared UI components used across both apps:

- **Button**: Customizable button with variants (primary, ghost, accent)
- **Card**: Container component with optional title and footer

Import components from the shared package:

```tsx
import { Button, Card } from '@cnx/ui';
```

### Using Shared Components

Components from the shared UI package can be imported directly into any app:

```tsx
// In apps/cognexus/src/app/page.tsx or apps/forge/src/app/page.tsx
import { Button, Card } from '@cnx/ui';

export default function HomePage() {
  return (
    <div>
      <Card title="Welcome">
        <p>This card uses the shared UI component.</p>
        <Button>Click me</Button>
      </Card>
    </div>
  );
}
```

## Navigation Components

Both apps include responsive navigation components with:

- Active link highlighting with animated underlines
- Mobile-friendly design with collapsible menu
- App-specific styling (blue for main platform, orange for Forge)
- External links to the other app

## Deployment

This project is configured for deployment on AWS Amplify using the `amplify.yml` configuration file. Each app is deployed separately with its own build configuration.

### Deployment Configuration

The `amplify.yml` file contains separate build settings for each app:

```yaml
version: 1
appRoot: .
applications:
  - appRoot: .
    frontend:
      phases:
        preBuild:
          commands:
            - npm install -g pnpm
            - pnpm install
        build:
          commands:
            - pnpm -F apps/cognexus build
      artifacts:
        baseDirectory: apps/cognexus/.next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .pnpm-store/**/*
    # ... similar configuration for forge app
```

### Custom Domains

- Main platform: cognexus.io
- Forge vertical: forge.cognexus.io

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Ensure you've run `pnpm install` from the root directory
   - Check that the package is listed in the app's dependencies

2. **TypeScript errors**:
   - Run `pnpm -F <app-name> tsc --noEmit` to check for type errors
   - Ensure all required type declarations are available

3. **Build errors**:
   - Check that all dependencies are correctly installed
   - Verify that all imports use the correct paths

### TypeScript Declaration Files

If you encounter TypeScript errors related to missing module declarations, check:

- `apps/forge/src/types/react-app-env.d.ts` for module declarations
- `tsconfig.json` for proper inclusion of type declaration files

## Project Structure

```
cognexus-monorepo/
├── apps/
│   ├── cognexus/           # Main CogNexus.io platform app
│   │   ├── src/
│   │   │   ├── app/        # Next.js App Router
│   │   │   │   ├── page.tsx            # Home page
│   │   │   │   ├── layout.tsx          # Root layout with Navigation
│   │   │   │   ├── forge/              # Forge overview page
│   │   │   │   └── ui-demo/            # UI components demo
│   │   │   └── components/             # App-specific components
│   │   │       └── Navigation.tsx      # Main navigation component
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tailwind.config.ts
│   │
│   └── forge/              # Forge vertical app
│       ├── src/
│       │   ├── app/        # Next.js App Router
│       │   │   ├── page.tsx            # Home page
│       │   │   ├── layout.tsx          # Root layout with Navigation
│       │   │   └── ui-demo/            # UI components demo
│       │   ├── components/             # App-specific components
│       │   │   └── Navigation.tsx      # Forge navigation component
│       │   └── types/                  # TypeScript declarations
│       ├── next.config.js
│       ├── package.json
│       └── tailwind.config.ts
│
├── packages/
│   └── ui/                 # Shared UI component library (@cnx/ui)
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   │   ├── Button.tsx
│       │   │   └── Card.tsx
│       │   └── index.ts    # Package entry point
│       ├── package.json
│       └── tsconfig.json
│
├── .npmrc                  # pnpm configuration
├── amplify.yml             # AWS Amplify deployment configuration
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── turbo.json              # Turborepo configuration
└── verify-setup.js         # Setup verification script
```

## Contributing

When making changes to the codebase:

1. Ensure all shared components are added to the `@cnx/ui` package
2. Run the verification script after making structural changes
3. Test changes in both apps to ensure cross-compatibility
4. Follow the established design patterns and coding standards
