/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cnx/ui"],
  // Allow optimized external images used in marketing cards
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
