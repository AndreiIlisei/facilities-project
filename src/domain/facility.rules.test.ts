import { describe, it, expect } from 'vitest'
import { isOpenNow } from './facility.rules'

describe('isOpenNow', () => {
  it('returns true within normal range', () => {
    const now = new Date()
    now.setHours(10, 0)
    expect(isOpenNow('08:00', '17:00', now)).toBe(true)
  })

  it('returns false outside normal range', () => {
    const now = new Date()
    now.setHours(20, 0)
    expect(isOpenNow('08:00', '17:00', now)).toBe(false)
  })

  it('handles overnight hours correctly', () => {
    const now = new Date()
    now.setHours(23, 0)
    expect(isOpenNow('21:00', '06:00', now)).toBe(true)
  })
})
