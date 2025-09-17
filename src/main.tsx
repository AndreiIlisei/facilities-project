import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'
import { FacilitiesProvider } from './state/FacilitiesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FacilitiesProvider>
      <App />
    </FacilitiesProvider>
  </StrictMode>,
)
