/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

if (process.env.DOCKER === '1') {
  nextConfig.output = 'standalone'
}

// 開発環境では recoil の警告を無視する
if (process.env.NODE_ENV === 'development') {
  process.env.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = 'false'
}

module.exports = nextConfig
