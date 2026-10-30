import type { ServiceKey } from './services'

export interface Testimonial {
  quote: string
  name: string
  designation: string
  service: ServiceKey
}

// Word-for-word review excerpts cut to fit three lines; [brackets] mark a substituted word.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'We were thoroughly impressed with the professionalism and attention to detail.',
    name: 'Ryan Jeffrey',
    designation: 'Exterior · Highland Park',
    service: 'exterior',
  },
  {
    quote: '[They] transformed our vision into reality with their impeccable workmanship.',
    name: 'Nima Mojahed',
    designation: 'Roof · Frisco',
    service: 'roofing',
  },
  {
    quote: 'They exceeded our expectations in every way.',
    name: 'Christopher Strenger',
    designation: 'Roof · Plano',
    service: 'roofing',
  },
]
