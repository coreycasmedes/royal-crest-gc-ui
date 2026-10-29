import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

const prPreviewBase = process.env.VITE_BASE_URL

export default defineConfig({
  site: 'https://www.royalcrestgc.com',
  base: prPreviewBase ?? '/',
  // Directory pages let GitHub Pages serve /name/ directly, so canonical URLs end in a slash.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
