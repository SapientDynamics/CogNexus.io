/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cnx/ui"],
  // Allow optimized external images used in marketing cards
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPWA(nextConfig);
