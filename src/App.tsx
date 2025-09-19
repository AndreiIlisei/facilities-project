import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FacilitiesList from './routes/FacilitiesList/FacilitiesList'
import FacilityForm from './routes/FacilityForm/FacilityForm'
import Layout from './components/layout/Layout'
import NotFound from './routes/NotFound/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/facilities" replace />} />
          <Route path="/facilities" element={<FacilitiesList />} />
          <Route path="/facilities/new" element={<FacilityForm mode="create" />} />
          <Route path="/facilities/:id/edit" element={<FacilityForm mode="edit" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
