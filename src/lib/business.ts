export const BUSINESS = {
  name: 'Royal Crest General Contractors',
  legalName: 'Royal Crest General Contractors LLC',
  url: 'https://www.royalcrestgc.com/',
  phone: { display: '(469) 432 0341', tel: '+14694320341' },
  email: 'royalcrestgeneralcontracting@outlook.com',
  // serviceArea is the contact-section text; areaServed is the city list in the JSON-LD.
  serviceArea: 'Dallas, Ft. Worth & Surrounding Areas',
  hours: 'Mon-Fri  7 AM - 6 PM\nSat  8 AM - 4 PM',
  areaServed: ['Dallas', 'Plano', 'Frisco', 'Highland Park'],
  locality: { city: 'Dallas', region: 'TX', country: 'US' },
  founded: 2025,
  stats: [
    { num: '5★', label: 'Average Client Rating' },
    { num: '2025', label: 'Founded in Dallas' },
  ],
} as const

export const telHref = `tel:${BUSINESS.phone.tel}`
export const callLabel = `Call ${BUSINESS.phone.display}`
