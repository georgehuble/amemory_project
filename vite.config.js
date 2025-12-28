import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/amemory_project/' : '/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true // автоматически открывает браузер при запуске dev сервера
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    // Оптимизация для GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
