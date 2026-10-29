// Every business fact the site shows or puts in its metadata lives here, so a
// correction is made once. The 2026-10-28 SEO audit found other phone numbers,
// names and founding dates in outside listings: change a value here only after
// the owner approves it.
export const BUSINESS = {
  name: 'Royal Crest General Contractors',
  legalName: 'Royal Crest General Contractors LLC',
  url: 'https://www.royalcrestgc.com/',
  phone: { display: '(469) 432 0341', tel: '+14694320341' },
  email: 'royalcrestgeneralcontracting@outlook.com',
  // Shown in the contact section
  serviceArea: 'Dallas, Ft. Worth & Surrounding Areas',
  hours: 'Mon-Fri  7 AM - 6 PM\nSat  8 AM - 4 PM',
  // Cities listed in the structured data
  areaServed: ['Dallas', 'Plano', 'Frisco', 'Highland Park'],
  locality: { city: 'Dallas', region: 'TX', country: 'US' },
  // Approved 2026-10-28. Outside listings that say "since 2004" are wrong.
  founded: 2025,
  // Approved 2026-10-28. The project count and the warranty figure were
  // removed because they could not be backed up; add a stat only with proof.
  stats: [
    { num: '5★', label: 'Average Client Rating' },
    { num: '2025', label: 'Founded in Dallas' },
  ],
} as const

export const telHref = `tel:${BUSINESS.phone.tel}`
export const callLabel = `Call ${BUSINESS.phone.display}`
