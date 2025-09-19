import { Link } from 'react-router-dom'
import styles from './FacilityCard.module.scss'
import { isOpenNow } from '../../../domain/facilityRules'
import type { Facility } from '../../../domain/facilityTypes'
import Badge from '../../ui/Badge/Badge'
import Button from '../../ui/Button/Button'
import { useFacilities } from '../../../state/FacilitiesContext'
import Modal from '../../ui/Modal/Modal'
import { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FALLBACK_IMAGE } from '../../../utils/variables'

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

  const modalFooter = (
    <>
      <Button onClick={() => setConfirmOpen(false)} variant="secondary">
        Cancel
      </Button>
      <Button onClick={handleDelete} variant="primary">
        Yes, Delete
      </Button>
    </>
  )

  return (
    <article className={styles.card}>
      <div className={styles['card__body']}>
        <div className={styles['card__imageWrap']}>
          {facility.isDefault && (
            <div className={styles['card__default']}>
              <img src="public/images/default-star.svg" alt="Default" />
            </div>
          )}

          <img
            loading="lazy"
            className={styles['card__image']}
            src={facility.imageUrl}
            alt={`${facility.name} image`}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              if (target.src !== FALLBACK_IMAGE) {
                target.src = FALLBACK_IMAGE
              }
            }}
          />
        </div>
        <div className={styles['card__header']}>
          <h3 className={styles['card__title']}>{facility.name}</h3>
          <Badge variant={open ? 'success' : 'danger'}>{open ? 'Open' : 'Closed'}</Badge>
        </div>

        <div className={styles['card__meta']}>
          <span className={styles['card__address']}>
            <CiLocationOn color="black" />
            <span className={styles['card__address-text']}>{facility.address}</span>
          </span>

          <div className={styles['card__actions']}>
            <Button
              variant="secondary"
              style={{ padding: '6px 8px' }}
              size="sm"
              onClick={() => setConfirmOpen(true)}
            >
              <img src="public/images/delete-icon.svg" alt="Delete" />
            </Button>

            <Link to={`/facilities/${facility.id}/edit`}>
              <Button
                variant="secondary"
                style={{ padding: '6px 24px', fontWeight: '600' }}
                size="sm"
              >
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={confirmOpen}
        title="Delete facility"
        onClose={() => setConfirmOpen(false)}
        size="sm"
        footer={modalFooter}
      >
        <p style={{ marginBottom: 12 }}>
          Are you sure you want to delete this facility? This action cannot be undone.
          <br />
          <br />
          Facility: <span style={{ fontWeight: 'bold' }}>{facility.name}</span>
          {facility.isDefault && (
            <>
              <br />
              <br />
              <span style={{ color: 'var(--primary-color)' }}>
                This is the default facility; after deleting this another will be set as default.
              </span>
            </>
          )}
        </p>
      </Modal>
    </article>
  )
}
