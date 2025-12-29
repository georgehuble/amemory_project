import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [createVuePlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        login: resolve(__dirname, 'login.html'),
        registration: resolve(__dirname, 'registration.html'),
        single: resolve(__dirname, 'single.html'),
        testimonial: resolve(__dirname, 'testimonial.html'),
        forgotPassword: resolve(__dirname, 'forgot-password.html'),
        resetPassword: resolve(__dirname, 'reset-password.html'),
        verifyCode: resolve(__dirname, 'verify-code.html'),
        spinningWheels: resolve(__dirname, 'spinning-wheels-full.html')
      }
    }
  }
})