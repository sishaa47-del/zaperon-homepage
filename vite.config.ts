import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Multi-page: the homepage plus /india/ and /security/.
// BASE_PATH lets the GitHub Pages build live under /<repo>/. Locally it stays "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        india: resolve(import.meta.dirname, 'india/index.html'),
        security: resolve(import.meta.dirname, 'security/index.html'),
      },
    },
  },
})
