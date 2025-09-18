import { Link } from 'react-router-dom'
import { useFacilities } from '../../state/FacilitiesContext'
import Button from '../../components/ui/Button/Button'
import styles from './FacilitiesList.module.scss'
import FacilityCard from '../../components/facility/FacilityCard/FacilityCard'

export default function FacilitiesList() {
  const { facilities } = useFacilities()

  const sorted = [...facilities].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1
    if (!a.isDefault && b.isDefault) return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className={styles.page}>
      <div className={styles['page__header']}>
        <h1 className={styles['page__title']}>Facilities</h1>
        <Link to="/facilities/new">
          <Button>+ Create facility</Button>
        </Link>
      </div>

      {sorted.length === 0 ? (
        <div className={styles['page__empty']}>
          <p>No facilities yet.</p>
          <Link to="/facilities/new">
            <Button variant="secondary">Create your first facility</Button>
          </Link>
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
