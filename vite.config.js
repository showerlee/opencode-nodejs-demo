import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/.well-known/health': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/hello': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/greet': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});