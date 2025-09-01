/**
 * Next.js configuration for the Cognexus app (ESM format)
 *
 * Notes:
 * - We use ESM (.mjs) so we can use `export default` syntax.
 * - `transpilePackages` tells Next to compile our local shared UI package (@cnx/ui)
 *   so it can be imported directly from the monorepo workspace.
 * - Do not set output: 'standalone' when deploying to Amplify SSR.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ensure Next transpiles our shared package so TS/modern syntax works seamlessly.
  transpilePackages: ['@cnx/ui'],
};

export default nextConfig;
