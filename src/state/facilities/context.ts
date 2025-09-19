import { createContext } from 'react'
import type { Facility } from '../../domain/facilityTypes'

export type CreatePayload = Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePayload = { id: string; patch: Partial<Omit<Facility, 'id' | 'createdAt'>> }

export type FacilitiesApi = {
  facilities: Facility[]
  create: (f: CreatePayload) => void
  update: (id: string, patch: UpdatePayload['patch']) => void
  remove: (id: string) => void
  setDefault: (id: string) => void
}

export const FacilitiesContext = createContext<FacilitiesApi | null>(null)
