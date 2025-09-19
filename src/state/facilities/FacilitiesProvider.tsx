 
import { useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Facility } from '../../domain/facilityTypes'
import { applyDefaultRules, getNextDefault } from '../../domain/facilityRules'
import { loadFacilities, saveFacilities } from '../../domain/facilityPersistence'
import {
  FacilitiesContext,
  type CreatePayload,
  type FacilitiesApi,
  type UpdatePayload,
} from './context'

type State = { facilities: Facility[] }
type Action =
  | { type: 'CREATE'; payload: CreatePayload }
  | { type: 'UPDATE'; payload: UpdatePayload }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'SET_DEFAULT'; payload: { id: string } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CREATE': {
      const newItem: Facility = {
        ...action.payload,
        id: (crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      const list = [...state.facilities, newItem]
      const result =
        state.facilities.length === 0
          ? applyDefaultRules(list, newItem.id)
          : action.payload.isDefault
            ? applyDefaultRules(list, newItem.id)
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
          return { facilities: remaining.map((f) => ({ ...f, isDefault: f.id === next.id })) }
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
  // lazy init → reads once from storage (prevents first-render wipe)
  const [state, dispatch] = useReducer(reducer, undefined as unknown as State, () => ({
    facilities: loadFacilities(),
  }))

  useEffect(() => {
    saveFacilities(state.facilities)
  }, [state.facilities])

  const api: FacilitiesApi = useMemo(
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
