const PREVIEW_AWARE_BASE_WITH_SLASH = import.meta.env.BASE_URL

export const page = (pathFromBase = '') => `${PREVIEW_AWARE_BASE_WITH_SLASH}${pathFromBase}`

export const section = (homeSectionId: string) => `${PREVIEW_AWARE_BASE_WITH_SLASH}#${homeSectionId}`
