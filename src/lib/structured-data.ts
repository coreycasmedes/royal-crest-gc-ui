import { BUSINESS } from './business'

export const BUSINESS_ID = `${BUSINESS.url}#business`

export function breadcrumbList(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: new URL(path, BUSINESS.url).href,
    })),
  }
}

export function serviceOffer(name: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: new URL(path, BUSINESS.url).href,
    provider: { '@id': BUSINESS_ID },
    areaServed: BUSINESS.areaServed.map((city) => ({ '@type': 'City', name: city })),
  }
}
