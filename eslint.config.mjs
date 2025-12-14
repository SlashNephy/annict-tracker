import { config } from '@slashnephy/eslint-config'

export default config(
  {
    ignores: [
      'pages/schema.graphql',
      'pages/src/__generated__/*.graphql.ts',
      'pages/dist/',
      'pages/vite.config.js',
      'pages/dev-dist/',
      'vercel/out/**',
    ],
  },
  [
    {
      files: ['pages/src/**/*.{ts,tsx}'],
      rules: {
        'import-x/no-cycle': 'off',
      },
    },
  ],
)
