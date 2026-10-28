// Every business fact the site shows or puts in its metadata lives here, so a
// correction is made once. These are the values the site has always used.
// The 2026-10-28 SEO audit found other phone numbers, names and addresses in
// outside listings: change a value here only after the owner approves it.
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
  // Unverified: the owner has to confirm each of these before they are reused
  stats: [
    { num: '250+', label: 'Projects Completed' },
    { num: '4.9★', label: 'Average Client Rating' },
    { num: '5yr', label: 'Workmanship Warranty' },
  ],
} as const

export const telHref = `tel:${BUSINESS.phone.tel}`
export const callLabel = `Call ${BUSINESS.phone.display}`
