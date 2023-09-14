import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// 開発環境では recoil の警告を無視する
if (process.env.NODE_ENV === 'development') {
  process.env.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = 'false'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
