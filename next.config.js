const forDockerImage = process.env.BUILD_DOCKER_IMAGE === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: forDockerImage ? 'standalone' : undefined,
}

module.exports = nextConfig
