/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

if (process.env.DOCKER === '1') {
  nextConfig.output = 'standalone'
}

module.exports = nextConfig
