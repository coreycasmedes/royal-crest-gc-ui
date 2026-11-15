import type { APIRoute } from 'astro'
import { getProjects, isPublished, projectPath } from '@/lib/projects'

const isDynamicRoute = (file: string) => file.includes('[')
const toUrlPath = (file: string) =>
  file.replace(/^\.\//, '').replace(/(^|\/)index\.astro$/, '$1').replace(/\.astro$/, '/')

// robots.txt and Search Console point at this URL.
const staticPages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !isDynamicRoute(file) && file !== './404.astro')
  .map(toUrlPath)

export const GET: APIRoute = async ({ site }) => {
  const projectPages = (await getProjects()).filter(isPublished).map(projectPath)
  // The projects index is noindex until at least one story is published.
  const indexPages = projectPages.length > 0 ? staticPages : staticPages.filter((path) => path !== 'projects/')
  const urls = [...indexPages, ...projectPages]
    .sort()
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  )
}
