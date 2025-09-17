import { Link } from 'react-router-dom'
import { useFacilities } from '../../state/FacilitiesContext'

export default function FacilitiesList() {
  const { facilities } = useFacilities()

  return (
    <div style={{ padding: 24 }}>
      <h1>Facilities</h1>

      <div style={{ margin: '12px 0' }}>
        <Link to="/facilities/new">+ Create facility</Link>
      </div>

      {facilities.length === 0 ? (
        <p>No facilities yet.</p>
      ) : (
        <ul>
          {facilities.map((f) => (
            <li key={f.id} style={{ marginBottom: 8 }}>
              <strong>{f.name}</strong> — {f.address} {f.isDefault && <em>(default)</em>} &nbsp;
              <Link to={`/facilities/${f.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
