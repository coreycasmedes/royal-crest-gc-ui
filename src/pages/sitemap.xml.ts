import type { APIRoute } from 'astro'

// One sitemap at the URL robots.txt and Search Console already use. Every
// .astro page is listed except the 404 page and dynamic routes; when those
// are added, their getStaticPaths entries belong here too.
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('[') && file !== './404.astro')
  .map((file) => file.replace(/^\.\//, '').replace(/(^|\/)index\.astro$/, '$1').replace(/\.astro$/, '/'))
  .sort()

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  )
}
