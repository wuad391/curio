import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 3000,
    proxy: {
      "/test": {
        target: "https://127.0.0.1:5000/test"
      }
    }
  }
})
