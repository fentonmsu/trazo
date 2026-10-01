import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// VITE_API_PROXY_TARGET lets playwright.config.ts point a test run's dev
// server at the dedicated E2E backend instance instead of the normal one.
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:4001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
})
