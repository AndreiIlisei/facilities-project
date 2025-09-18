import { createContext } from 'react'

export type ToastContextType = {
  push: (message: string, variant?: 'info' | 'success' | 'error') => void
}

export const ToastContext = createContext<ToastContextType | null>(null)
