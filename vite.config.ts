import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
  },
  base: '/',
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      sections: "/src/sections",
      pages: "/src/pages",
      routes: "/src/routes",
      hooks: "/src/hooks",
      types: "/src/types",
      data: "/src/data",
    },
  }
})
