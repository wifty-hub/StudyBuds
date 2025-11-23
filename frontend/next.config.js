/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    // Allow images from public folder
    domains: [],
  },
}

module.exports = nextConfig

