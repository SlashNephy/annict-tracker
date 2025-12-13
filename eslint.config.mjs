import { config } from '@slashnephy/eslint-config'
import { globalIgnores } from 'eslint/config'

export default config({}, [
  globalIgnores([
    'pages/src/__generated__/*.graphql.ts',
    'pages/dist/',
    'pages/vite.config.js',
    'pages/vite.config.d.ts',
    'pages/dev-dist/',

    'vercel/out/',
    'vercel/out/.next/',
  ]),
  { files: ['pages/src/**/*.{ts,tsx}'], rules: { 'import/no-cycle': 'off' } },
  { files: ['vercel/**/*.{ts,tsx}'], rules: { 'react-refresh/only-export-components': 'off' } },
])
