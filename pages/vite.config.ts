import * as process from 'process'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { VitePWA } from 'vite-plugin-pwa'
import relay from 'vite-plugin-relay'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 環境変数を詰め替える
  process.env.VITE_CF_PAGES_COMMIT_SHA = process.env.CF_PAGES_COMMIT_SHA
  process.env.VITE_CF_PAGES_BRANCH = process.env.CF_PAGES_BRANCH

  return {
    plugins: [
      react({
        plugins: [
          ['@swc-jotai/react-refresh', {}],
          ['@swc-jotai/debug-label', {}],
        ],
      }),
      relay,
      chunkSplitPlugin(),
      sentryVitePlugin({
        org: 'starrybluesky',
        project: 'annict-tracker',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
        disable: process.env.NODE_ENV === 'development',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        strategies: 'generateSW',
        manifest: {
          id: 'annict-tracker',
          name: 'annict-tracker',
          short_name: 'annict-tracker',
          description: 'Annict での視聴記録を便利にする Web アプリケーションです。',
          theme_color: '#E64980',
          // TODO: アイコンを作成する
          icons: [],
          lang: 'ja',
          display: 'standalone',
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /.+\.(js|css|svg|map)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'asset-cache',
                expiration: {
                  maxAgeSeconds: 90 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /^https:\/\/(.+\.anilist\.co|cdn\.myanimelist\.net|image\.annict\.com)\/.+/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'work-image-cache',
                expiration: {
                  maxAgeSeconds: 180 * 24 * 60 * 60,
                },
              },
            },
          ],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api/],
          cleanupOutdatedCaches: true,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    build: {
      sourcemap: true,
    },
    esbuild: {
      exclude: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
    },
  }
})
