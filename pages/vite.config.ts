import * as process from 'process'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 環境変数を詰め替える
  process.env.VITE_CF_PAGES_COMMIT_SHA = process.env.CF_PAGES_COMMIT_SHA
  process.env.VITE_CF_PAGES_BRANCH = process.env.CF_PAGES_BRANCH

  // 開発環境では Recoil の警告を無視する
  if (process.env.NODE_ENV === 'development') {
    process.env.VITE_RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLE = 'false'
  }

  return {
    plugins: [
      react(),
      relay,
      sentryVitePlugin({
        org: 'starrybluesky',
        project: 'annict-tracker',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    ],
    build: {
      sourcemap: true,
    },
  }
})
