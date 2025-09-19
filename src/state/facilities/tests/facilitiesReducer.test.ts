import { describe, it, expect } from 'vitest'
import type { Facility } from '../../../domain/facilityTypes'
import { applyDefaultRules, getNextDefault } from '../../../domain/facilityRules'

function make(id: string, over: Partial<Facility> = {}): Facility {
  const base: Facility = {
    id,
    name: `F-${id}`,
    address: `A-${id}`,
    openingTime: '09:00',
    closingTime: '18:00',
    isDefault: false,
    createdAt: 1000,
    updatedAt: 1000,
  }
  return { ...base, ...over }
}

describe('default facility rules', () => {
  it('first create → becomes default', () => {
    const a = make('a')
    const after = applyDefaultRules([a], 'a')
    expect(after.find((f) => f.id === 'a')?.isDefault).toBe(true)
  })

  it('setting default on another facility unsets previous', () => {
    const a = make('a', { isDefault: true })
    const b = make('b')
    const after = applyDefaultRules([a, b], 'b')
    expect(after.find((f) => f.id === 'a')?.isDefault).toBe(false)
    expect(after.find((f) => f.id === 'b')?.isDefault).toBe(true)
  })

  it('deleting default picks next default deterministically', () => {
    const a = make('a', { isDefault: true, createdAt: 1 })
    const b = make('b', { createdAt: 2 })
    const c = make('c', { createdAt: 3 })
    const next = getNextDefault([b, c]) // a deleted
    expect(next?.id).toBe('b') // earliest createdAt wins
  })

  it('no facilities → none default', () => {
    expect(getNextDefault([])).toBeUndefined()
  })
})
