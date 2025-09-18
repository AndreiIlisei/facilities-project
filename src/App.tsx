import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import FacilitiesList from './routes/FacilitiesList/FacilitiesList'
import FacilityForm from './routes/FacilityForm/FacilityForm'

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: 12,
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/facilities">Facilities</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/facilities" replace />} />
        <Route path="/facilities" element={<FacilitiesList />} />
        <Route path="/facilities/new" element={<FacilityForm mode="create" />} />
        <Route path="/facilities/:id/edit" element={<FacilityForm mode="edit" />} />
        {/* Fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
