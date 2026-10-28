// Site paths that respect the base path PR previews are built under.
// BASE_URL always ends in a slash (trailingSlash: 'always').
const BASE = import.meta.env.BASE_URL

/** A page on this site, e.g. `page('roofing-dallas/')`; `page()` is the home page. */
export const page = (path = '') => `${BASE}${path}`

/** A section of the home page, e.g. `section('contact')`. Works from any page. */
export const section = (id: string) => `${BASE}#${id}`
