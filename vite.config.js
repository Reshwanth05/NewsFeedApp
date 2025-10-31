import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests from /api-proxy to the real NewsAPI
      '/api-proxy': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: false,
        // Rewrite the path: remove /api-proxy and add /v2
        rewrite: (path) => path.replace(/^\/api-proxy/, '/v2'),
      }
    }
  }
})