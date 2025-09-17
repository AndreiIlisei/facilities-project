import type { Facility } from './facilityTypes'

const STORAGE_KEY = 'tm_facilities_v1'

export function loadFacilities(): Facility[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Facility[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveFacilities(facilities: Facility[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(facilities))
  } catch {
    /* empty */
  }
}
