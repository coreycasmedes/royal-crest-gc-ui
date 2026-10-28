import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.royalcrestgc.com',
  // PR previews are built under /pr-preview/pr-<number>/ (see pr-preview.yml)
  base: process.env.VITE_BASE_URL ?? '/',
  // Every page is a directory with an index.html, so GitHub Pages serves
  // /roofing-dallas/ directly and canonical URLs end in a slash.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
