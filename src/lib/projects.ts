import { getCollection, type CollectionEntry } from 'astro:content'
import type { ServiceKey } from './services'

export type Project = CollectionEntry<'projects'>

// A story without a write-up is too thin to index; it stays out of search and the sitemap until written.
export const isWrittenUp = (project: Project) => Boolean(project.body?.trim())

export const projectPath = (project: Project) => `projects/${project.id}/`

export async function getProjects(service?: ServiceKey) {
  const projects = await getCollection('projects', (project) => !service || project.data.service === service)
  return projects.sort((a, b) => a.data.order - b.data.order)
}
