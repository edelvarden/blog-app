import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      components: '/src/components',
      hooks: '/src/hooks',
    },
  },
  test: {
    root: '/__tests__'
  }
});