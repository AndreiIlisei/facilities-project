import { Link } from 'react-router-dom'
import { useFacilities } from '../../state/FacilitiesContext'
import Button from '../../components/ui/Button/Button'
import styles from './FacilitiesList.module.scss'
import FacilityCard from '../../components/facility/FacilityCard/FacilityCard'
import { mockFacilities } from '../../domain/mockfacilities'
import { useToast } from '../../components/ui/Toast/useToast'

export default function FacilitiesList() {
  const { facilities, create } = useFacilities()
  const { push } = useToast()

  const sorted = [...facilities].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1
    if (!a.isDefault && b.isDefault) return 1
    return a.name.localeCompare(b.name)
  })

  const seedDemo = () => {
    const now = Date.now()
    mockFacilities.forEach((m, idx) => {
      const fac = {
        id: (crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2),
        name: m.name,
        address: m.address,
        description: m.description,
        imageUrl: m.imageUrl,
        openingTime: m.openingTime,
        closingTime: m.closingTime,
        isDefault: idx === 0, // make the first one default
        createdAt: now + idx,
        updatedAt: now + idx,
      }
      create(fac)
    })
    push('Added demo facilities', 'success')
  }

  return (
    <div className={styles.page}>
      <div className={styles['page__header']}>
        <Link to="/facilities/new">
          <Button size="sm">Create Facility</Button>
        </Link>
      </div>

      {sorted.length === 0 ? (
        <div className={styles['page__empty']}>
          <p>No facilities were initially added</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" onClick={seedDemo}>
              Add mockup facilities
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles['page__grid']}>
          {sorted.map((f) => (
            <FacilityCard key={f.id} facility={f} />
          ))}
        </div>
      )}
    </div>
  )
}
