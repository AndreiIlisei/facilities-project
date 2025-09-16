import type { Facility } from './facility.types'

//  Returns true if current time is between opening and closing.
//  Handles overnight ranges (e.g., 21:00 - 06:00).
export function isOpenNow(opening: string, closing: string, now = new Date()): boolean {
  const [openH, openM] = opening.split(':').map(Number)
  const [closeH, closeM] = closing.split(':').map(Number)

  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM

  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  if (openMinutes === closeMinutes) return false

  if (openMinutes < closeMinutes) {
    return nowMinutes >= openMinutes && nowMinutes < closeMinutes
  } else {
    return nowMinutes >= openMinutes || nowMinutes < closeMinutes
  }
}

export function getNextDefault(facilities: Facility[]): Facility | undefined {
  if (facilities.length === 0) return undefined
  return facilities.reduce((earliest, f) => (f.createdAt < earliest.createdAt ? f : earliest))
}

export function applyDefaultRules(facilities: Facility[], targetId: string): Facility[] {
  return facilities.map((f) => ({
    ...f,
    isDefault: f.id === targetId,
  }))
}
