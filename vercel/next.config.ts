'use strict'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

export default nextConfig
