import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages routing
        const distPath = join(process.cwd(), 'dist')
        copyFileSync(join(distPath, 'index.html'), join(distPath, '404.html'))
      }
    }
  ],
  base: '/',
})
