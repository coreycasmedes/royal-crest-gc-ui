export const SERVICES = {
  roofing: { name: 'Roofing', path: 'roofing-dallas/', formOption: 'Roofing & Exterior' },
  exterior: { name: 'Exterior Renovation', path: 'exterior-renovation-dallas/', formOption: 'Roofing & Exterior' },
} as const

export type ServiceKey = keyof typeof SERVICES
export const SERVICE_KEYS = Object.keys(SERVICES) as [ServiceKey, ...ServiceKey[]]
