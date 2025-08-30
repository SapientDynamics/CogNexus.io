/**
 * Verification script for CogNexus.io monorepo setup
 * 
 * This script checks that the monorepo structure is correctly set up
 * and all necessary files are in place.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Check if a file exists
 * @param {string} filePath - Path to the file
 * @returns {boolean} - Whether the file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

/**
 * Check if a file contains a specific string
 * @param {string} filePath - Path to the file
 * @param {string} searchString - String to search for
 * @returns {boolean} - Whether the file contains the string
 */
function fileContains(filePath, searchString) {
  try {
    if (!fileExists(filePath)) return false;
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
  } catch (err) {
    return false;
  }
}

/**
 * Log a message with color
 * @param {string} message - Message to log
 * @param {string} color - Color to use
 */
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Check a condition and log the result
 * @param {string} name - Name of the check
 * @param {boolean} condition - Whether the check passed
 */
function check(name, condition) {
  if (condition) {
    log(`✓ ${name}`, colors.green);
  } else {
    log(`✗ ${name}`, colors.red);
  }
  return condition;
}

// Root directory
const rootDir = process.cwd();
console.log('Starting verification from directory:', rootDir);

// Check monorepo configuration files
log('\nChecking monorepo configuration...', colors.cyan);
const configChecks = [
  check('.npmrc exists', fileExists(path.join(rootDir, '.npmrc'))),
  check('pnpm-workspace.yaml exists', fileExists(path.join(rootDir, 'pnpm-workspace.yaml'))),
  check('turbo.json exists', fileExists(path.join(rootDir, 'turbo.json'))),
  check('amplify.yml exists', fileExists(path.join(rootDir, 'amplify.yml'))),
  check('turbo.json uses "tasks" (not "pipeline")', 
    fileContains(path.join(rootDir, 'turbo.json'), '"tasks"'))
];

// Check cognexus app
log('\nChecking cognexus app...', colors.cyan);
const cognexusDir = path.join(rootDir, 'apps', 'cognexus');
const cognexusChecks = [
  check('package.json exists', fileExists(path.join(cognexusDir, 'package.json'))),
  check('next.config.js exists', fileExists(path.join(cognexusDir, 'next.config.js'))),
  check('tsconfig.json exists', fileExists(path.join(cognexusDir, 'tsconfig.json'))),
  check('tailwind.config.ts exists', fileExists(path.join(cognexusDir, 'tailwind.config.ts'))),
  check('src/app directory exists', fileExists(path.join(cognexusDir, 'src', 'app'))),
  check('package.json references @cnx/ui', 
    fileContains(path.join(cognexusDir, 'package.json'), '"@cnx/ui"')),
  check('next.config.js transpiles @cnx/ui', 
    fileContains(path.join(cognexusDir, 'next.config.js'), 'transpilePackages')),
  check('Navigation component exists', 
    fileExists(path.join(cognexusDir, 'src', 'components', 'Navigation.tsx'))),
  check('UI demo page exists', 
    fileExists(path.join(cognexusDir, 'src', 'app', 'ui-demo', 'page.tsx')))
];

// Check forge app
log('\nChecking forge app...', colors.cyan);
const forgeDir = path.join(rootDir, 'apps', 'forge');
const forgeChecks = [
  check('package.json exists', fileExists(path.join(forgeDir, 'package.json'))),
  check('next.config.js exists', fileExists(path.join(forgeDir, 'next.config.js'))),
  check('tsconfig.json exists', fileExists(path.join(forgeDir, 'tsconfig.json'))),
  check('tailwind.config.ts exists', fileExists(path.join(forgeDir, 'tailwind.config.ts'))),
  check('src/app directory exists', fileExists(path.join(forgeDir, 'src', 'app'))),
  check('package.json references @cnx/ui', 
    fileContains(path.join(forgeDir, 'package.json'), '"@cnx/ui"')),
  check('next.config.js transpiles @cnx/ui', 
    fileContains(path.join(forgeDir, 'next.config.js'), 'transpilePackages')),
  check('Navigation component exists', 
    fileExists(path.join(forgeDir, 'src', 'components', 'Navigation.tsx'))),
  check('UI demo page exists', 
    fileExists(path.join(forgeDir, 'src', 'app', 'ui-demo', 'page.tsx')))
];

// Check UI package
log('\nChecking UI package...', colors.cyan);
const uiDir = path.join(rootDir, 'packages', 'ui');
const uiChecks = [
  check('package.json exists', fileExists(path.join(uiDir, 'package.json'))),
  check('tsconfig.json exists', fileExists(path.join(uiDir, 'tsconfig.json'))),
  check('src/index.ts exists', fileExists(path.join(uiDir, 'src', 'index.ts'))),
  check('Button component exists', fileExists(path.join(uiDir, 'src', 'components', 'Button.tsx'))),
  check('Card component exists', fileExists(path.join(uiDir, 'src', 'components', 'Card.tsx'))),
  check('Components are exported in index.ts', 
    fileContains(path.join(uiDir, 'src', 'index.ts'), 'export'))
];

// Calculate results
const totalChecks = [...configChecks, ...cognexusChecks, ...forgeChecks, ...uiChecks];
const passedChecks = totalChecks.filter(Boolean).length;
const failedChecks = totalChecks.length - passedChecks;

// Display summary
log('\nVerification Summary:', colors.cyan);
log(`Total checks: ${totalChecks.length}`, colors.reset);
log(`Passed: ${passedChecks}`, colors.green);
log(`Failed: ${failedChecks}`, failedChecks > 0 ? colors.red : colors.reset);

if (failedChecks === 0) {
  log('\n✅ All checks passed! The monorepo is correctly set up.', colors.green);
  log('\nNext steps:', colors.cyan);
  log('1. Run "pnpm install" to install all dependencies');
  log('2. Run "pnpm -F apps/cognexus dev" to start the cognexus app');
  log('3. Run "pnpm -F apps/forge dev" to start the forge app');
  log('4. Visit http://localhost:3000/ui-demo to see the UI components demo');
  log('5. Deploy to AWS Amplify using the amplify.yml configuration');
} else {
  log('\n❌ Some checks failed. Please fix the issues and run this script again.', colors.red);
}

// This script verifies that all necessary files for the CogNexus.io monorepo
// are in place and provides guidance on next steps.
// It checks for the existence of key files and configurations to ensure the
// monorepo is properly set up for development and deployment.
