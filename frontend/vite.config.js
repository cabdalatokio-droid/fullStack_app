import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const srcDir = fileURLToPath(new URL('./src', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
 server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
},
  resolve: {
    alias: {
      '@': srcDir,
    },
  },
})
