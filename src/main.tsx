import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'
import { FacilitiesProvider } from './state/facilities/FacilitiesProvider.tsx'
import { ToastProvider } from './components/ui/Toast/Toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FacilitiesProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </FacilitiesProvider>
  </StrictMode>,
)
