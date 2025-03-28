import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    host: '0.0.0.0',  // Allow access from network
    port: 8080,
    strictPort: true,
    cors: true,
    proxy: {
      '/auth': {
        target: 'https://bookmanager.isharoverwhite.cloud',
        changeOrigin: true,
        secure: false,
      },
      '/books': {
        target: 'https://bookmanager.isharoverwhite.cloud',
        changeOrigin: true,
        secure: false,
      },
      '/book': {
        target: 'https://bookmanager.isharoverwhite.cloud',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    allowedHosts: ['bookmanager.isharoverwhite.cloud'], // ✅ Add this line
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});
