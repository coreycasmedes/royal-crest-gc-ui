import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { SERVICE_KEYS } from '@/lib/services'

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      service: z.enum(SERVICE_KEYS),
      location: z.string().optional(),
      completed: z.string().optional(),
      summary: z.string(),
      photos: z.array(z.object({ src: image(), alt: z.string() })).min(1),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { projects }
