import type { APIRoute } from 'astro'
import { BUSINESS } from '@/lib/business'

// Icon paths are relative to this file, so they also resolve under the PR-preview base path.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: BUSINESS.name,
      short_name: 'Royal Crest',
      display: 'browser',
      theme_color: '#121113',
      background_color: '#f7f7f2',
      icons: [
        { src: 'icon-192.png', type: 'image/png', sizes: '192x192' },
        { src: 'icon-512.png', type: 'image/png', sizes: '512x512' },
        { src: 'icon-mask.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  )
