import { useParams } from 'react-router-dom'

type Props = { mode: 'create' | 'edit' }

export default function FacilityForm({ mode }: Props) {
  const { id } = useParams()

  return (
    <div style={{ padding: 24 }}>
      <h1>{mode === 'create' ? 'Create Facility' : `Edit Facility ${id}`}</h1>
      <p>Form UI coming next…</p>
    </div>
  )
}
