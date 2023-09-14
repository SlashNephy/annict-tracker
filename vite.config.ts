import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import type { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default (): UserConfig => {
  // 環境変数を詰め替える
  process.env.VITE_CF_PAGES_COMMIT_SHA = process.env.CF_PAGES_COMMIT_SHA

  return defineConfig({
    plugins: [react()],
  })
}
