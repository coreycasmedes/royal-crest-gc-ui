import { getCollection, type CollectionEntry } from 'astro:content'
import type { ServiceKey } from './services'

export type Project = CollectionEntry<'projects'>

export const hasWriteUp = (project: Project) => Boolean(project.body?.trim())

// A story without a write-up is too thin to index, and a draft waits for approval; both stay out of search and the sitemap.
export const isPublished = (project: Project) => hasWriteUp(project) && !project.data.draft

export const projectPath = (project: Project) => `projects/${project.id}/`

export async function getProjects(service?: ServiceKey) {
  const projects = await getCollection('projects', (project) => !service || project.data.service === service)
  return projects.sort((a, b) => a.data.order - b.data.order)
}
