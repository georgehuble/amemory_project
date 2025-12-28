import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/amemory_project/', // Важно для GitHub Pages
  plugins: [vue()],
  build: {
    outDir: 'docs',
    assetsDir: 'assets', // Все ассеты будут в docs/assets/
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.html') return '[name].[ext]'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  // Для корректной обработки путей
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})