import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './', // Важно! Относительный путь
  plugins: [vue()],
  build: {
    outDir: 'docs'
  }
})
