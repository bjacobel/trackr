const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};

module.exports = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching,
})(nextConfig);
