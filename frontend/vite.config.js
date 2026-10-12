import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
