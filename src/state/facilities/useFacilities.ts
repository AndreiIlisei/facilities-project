import { useContext } from 'react'
import { FacilitiesContext, type FacilitiesApi } from './context'

export function useFacilities(): FacilitiesApi {
  const ctx = useContext(FacilitiesContext)
  if (!ctx) throw new Error('useFacilities must be used within FacilitiesProvider')
  return ctx
}
