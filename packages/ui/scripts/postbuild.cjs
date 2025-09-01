/*
 * Postbuild helper for @cnx/ui
 *
 * Purpose:
 * - Ensure an ESM entry (index.mjs) exists by renaming the TypeScript output (index.js)
 * - Create a CommonJS stub (index.cjs) that re-exports the ESM build
 *
 * Notes:
 * - This pattern enables both ESM (module) and CJS (main) consumers to import the package.
 * - Some pure Node.js CJS contexts cannot require an .mjs file directly. In practice, bundlers
 *   (Next.js, Vite, webpack) handle this fine, and Next will transpile the package as needed.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexJs = path.join(distDir, 'index.js');
const indexMjs = path.join(distDir, 'index.mjs');
const indexCjs = path.join(distDir, 'index.cjs');

// Ensure dist exists before proceeding
if (!fs.existsSync(distDir)) {
  console.error('[postbuild] dist/ directory not found. Did tsc run?');
  process.exit(1);
}

// 1) Rename index.js -> index.mjs if present
if (fs.existsSync(indexJs)) {
  try {
    fs.renameSync(indexJs, indexMjs);
    console.log('[postbuild] Renamed index.js -> index.mjs');
  } catch (err) {
    console.error('[postbuild] Failed to rename index.js to index.mjs:', err);
    process.exit(1);
  }
} else if (!fs.existsSync(indexMjs)) {
  console.warn('[postbuild] Neither index.js nor index.mjs found in dist/.');
}

// 2) Write a minimal CJS stub that re-exports the ESM build
const cjsStub = `// CommonJS entry for @cnx/ui\n// Re-exports the ESM build so bundlers and Node loaders can resolve accordingly\nmodule.exports = require('./index.mjs');\n`;
try {
  fs.writeFileSync(indexCjs, cjsStub, 'utf8');
  console.log('[postbuild] Wrote CommonJS stub dist/index.cjs');
} catch (err) {
  console.error('[postbuild] Failed to write dist/index.cjs:', err);
  process.exit(1);
}

console.log('[postbuild] Completed successfully.');
