import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './FacilityCard.module.scss'
import { isOpenNow } from '../../../domain/facilityRules'
import type { Facility } from '../../../domain/facilityTypes'
import Badge from '../../ui/Badge/Badge'
import Button from '../../ui/Button/Button'
import { useFacilities } from '../../../state/FacilitiesContext'
import Modal from '../../ui/Modal/Modal'
import { useState } from 'react'

type Props = {
  facility: Facility
}

export default function FacilityCard({ facility }: Props) {
  const open = isOpenNow(facility.openingTime, facility.closingTime)
  const { remove } = useFacilities()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = () => {
    remove(facility.id)
    setConfirmOpen(false)
  }

  return (
    <article className={styles.card}>
      <div className={styles['card__imageWrap']}>
        {facility.isDefault && <span className={styles['card__default']}>★ Default</span>}
        <img
          className={styles['card__image']}
          src={facility.imageUrl || 'https://via.placeholder.com/640x360?text=Facility'}
          alt={`${facility.name} image`}
        />
      </div>

      <div className={styles['card__body']}>
        <div className={styles['card__header']}>
          <h3 className={styles['card__title']}>{facility.name}</h3>
          <Badge variant={open ? 'success' : 'danger'}>{open ? 'Open' : 'Closed'}</Badge>
        </div>

        <div className={styles['card__meta']}>
          <span className={styles['card__address']}>{facility.address}</span>
          <span className={styles['card__hours']}>
            {facility.openingTime}–{facility.closingTime}
          </span>
        </div>

        {facility.description && <p className={styles['card__desc']}>{facility.description}</p>}

        <div className={styles['card__actions']}>
          <Link to={`/facilities/${facility.id}/edit`}>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      {/* Confirm delete modal */}
      <Modal
        isOpen={confirmOpen}
        title="Delete facility?"
        onClose={() => setConfirmOpen(false)}
        size="sm"
      >
        <p style={{ marginBottom: 12 }}>
          Are you sure you want to delete <strong>{facility.name}</strong>?
          {facility.isDefault && ' This is the default facility; another will be set as default.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </article>
  )
}
