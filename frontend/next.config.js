/** @type {import('next').NextConfig} */
const { resolve } = require('path')

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig

