export const BUSINESS = {
  name: 'Royal Crest General Contracting',
  legalName: 'Royal Crest General Contracting LLC',
  url: 'https://www.royalcrestgc.com/',
  phone: { display: '(469) 809-5900', tel: '+14698095900' },
  email: 'inquiries@royalcrestgc.com',
  // serviceArea is the contact-section text; areaServed lists every area in priority order.
  serviceArea: 'Dallas, the Park Cities, Richardson, Plano & Frisco',
  hours: 'Mon-Fri  7 AM - 6 PM\nSat  8 AM - 4 PM',
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],
  responseTime: 'the same day',
  areaServed: [
    { name: 'Highland Park', type: 'City' },
    { name: 'University Park', type: 'City' },
    { name: 'Lakewood', type: 'Place' },
    { name: 'Lake Highlands', type: 'Place' },
    { name: 'Dallas', type: 'City' },
    { name: 'Richardson', type: 'City' },
    { name: 'Frisco', type: 'City' },
    { name: 'Plano', type: 'City' },
  ],
  locality: { city: 'Dallas', region: 'TX', country: 'US' },
  founded: 2025,
  certifications: ['GAF', 'CertainTeed', 'Brava'],
  insurance: 'General liability insurance: $1,000,000 per occurrence, $2,000,000 aggregate',
  warranty: {
    workmanship: '5-year workmanship warranty',
    manufacturer: 'Lifetime warranty options through GAF or CertainTeed, depending on the system installed',
  },
  social: { instagram: 'https://www.instagram.com/royalcrestgc/' },
  reviews: {
    // Opens the reviews tab of the Google Business Profile (same listing as cid 15465149232108205007).
    google:
      'https://www.google.com/maps/place/Royal+Crest+General+Contracting/@32.8296512,-96.6477935,17z/data=!4m8!3m7!1s0x61b937d3bd43ebb:0xd69f3f49ea36f3cf!8m2!3d32.8296512!4d-96.6477935!9m1!1b1!16s%2Fg%2F11xkmqx7fb',
    yelp: 'https://www.yelp.com/biz/royal-crest-general-contracting-dallas',
  },
  stats: [
    { num: '5★', label: 'Rated on Google & Yelp' },
    { num: '5 yr', label: 'Workmanship Warranty' },
    { num: '7', label: 'Years of Experience' },
  ],
} as const

export const telHref = `tel:${BUSINESS.phone.tel}`
export const callLabel = `Call ${BUSINESS.phone.display}`
export const areaNames = BUSINESS.areaServed.map((area) => area.name)
