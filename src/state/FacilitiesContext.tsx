/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Facility } from '../domain/facility.types'
import { applyDefaultRules, getNextDefault } from '../domain/facility.rules'
import { loadFacilities, saveFacilities } from '../domain/facility.persistence'

type State = { facilities: Facility[] }

type CreatePayload = Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>
type UpdatePayload = { id: string; patch: Partial<Omit<Facility, 'id' | 'createdAt'>> }

type Action =
  | { type: 'INIT'; payload: Facility[] }
  | { type: 'CREATE'; payload: Facility }
  | { type: 'UPDATE'; payload: UpdatePayload }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'SET_DEFAULT'; payload: { id: string } }

type Ctx = {
  facilities: Facility[]
  create: (f: Facility) => void
  update: (id: string, patch: UpdatePayload['patch']) => void
  remove: (id: string) => void
  setDefault: (id: string) => void
}

const FacilitiesContext = createContext<Ctx | null>(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT': {
      return { facilities: action.payload }
    }
    case 'CREATE': {
      const list = [...state.facilities, action.payload]
      // If this is the first facility, enforce default
      const result =
        state.facilities.length === 0
          ? applyDefaultRules(list, action.payload.id)
          : action.payload.isDefault
            ? applyDefaultRules(list, action.payload.id)
            : list
      return { facilities: result }
    }
    case 'UPDATE': {
      const { id, patch } = action.payload
      const list = state.facilities.map((f) =>
        f.id === id ? { ...f, ...patch, updatedAt: Date.now() } : f,
      )
      const result = patch.isDefault === true ? applyDefaultRules(list, id) : list
      return { facilities: result }
    }
    case 'DELETE': {
      const { id } = action.payload
      const wasDefault = state.facilities.find((f) => f.id === id)?.isDefault
      const remaining = state.facilities.filter((f) => f.id !== id)
      if (remaining.length === 0) return { facilities: [] }
      if (wasDefault) {
        const next = getNextDefault(remaining)
        if (next) {
          return {
            facilities: remaining.map((f) => ({ ...f, isDefault: f.id === next.id })),
          }
        }
      }
      return { facilities: remaining }
    }
    case 'SET_DEFAULT': {
      return { facilities: applyDefaultRules(state.facilities, action.payload.id) }
    }
    default:
      return state
  }
}

export function FacilitiesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { facilities: [] })

  // hydrate from storage once
  useEffect(() => {
    const data = loadFacilities()
    dispatch({ type: 'INIT', payload: data })
  }, [])

  // persist on changes
  useEffect(() => {
    saveFacilities(state.facilities)
  }, [state.facilities])

  const api: Ctx = useMemo(
    () => ({
      facilities: state.facilities,
      create: (f) => dispatch({ type: 'CREATE', payload: f }),
      update: (id, patch) => dispatch({ type: 'UPDATE', payload: { id, patch } }),
      remove: (id) => dispatch({ type: 'DELETE', payload: { id } }),
      setDefault: (id) => dispatch({ type: 'SET_DEFAULT', payload: { id } }),
    }),
    [state.facilities],
  )

  return <FacilitiesContext.Provider value={api}>{children}</FacilitiesContext.Provider>
}

export function useFacilities() {
  const ctx = useContext(FacilitiesContext)
  if (!ctx) throw new Error('useFacilities must be used within FacilitiesProvider')
  return ctx
}
