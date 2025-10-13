import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
    server: {
      host: 'honeymoney.localtest.me',
      port: 5173,
      strictPort: true,
      allowedHosts: ['honeymoney.localtest.me']
    ,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});