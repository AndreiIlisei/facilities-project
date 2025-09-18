import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './FacilityForm.module.scss'
import { useFacilities } from '../../state/FacilitiesContext'
import type { Facility } from '../../domain/facilityTypes'
import Input from '../../components/ui/Input/Input'
import Textarea from '../../components/ui/Textarea/Textarea'
import Button from '../../components/ui/Button/Button'

type Props = { mode: 'create' | 'edit' }

type FormState = {
  name: string
  address: string
  description: string
  imageUrl: string
  openingTime: string
  closingTime: string
  isDefault: boolean
}

const EMPTY: FormState = {
  name: '',
  address: '',
  description: '',
  imageUrl: '',
  openingTime: '09:00',
  closingTime: '18:00',
  isDefault: false,
}

export default function FacilityForm({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { facilities } = useFacilities()

  const editing: Facility | undefined = useMemo(
    () => (mode === 'edit' ? facilities.find((f) => f.id === id) : undefined),
    [mode, facilities, id],
  )

  // simple local form state
  const [form, setForm] = useState<FormState>(EMPTY)

  // hydrate when editing
  useEffect(() => {
    if (mode === 'edit' && editing) {
      setForm({
        name: editing.name,
        address: editing.address,
        description: editing.description ?? '',
        imageUrl: editing.imageUrl ?? '',
        openingTime: editing.openingTime,
        closingTime: editing.closingTime,
        isDefault: editing.isDefault,
      })
    }
  }, [mode, editing])

  const isFirstFacility = facilities.length === 0
  const defaultDisabled = isFirstFacility && mode === 'create'
  const defaultChecked = defaultDisabled ? true : form.isDefault

  // handlers
  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [key]: e.target.value }))
    }

  const onToggleDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, isDefault: e.target.checked }))
  }

  // submit handlers will come in part 2
  const handleCancel = () => navigate('/facilities')

  return (
    <div className={styles.page}>
      <div className={styles['page__header']}>
        <h1 className={styles['page__title']}>
          {mode === 'create' ? 'Create Facility' : 'Edit Facility'}
        </h1>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles['form__grid']}>
          <Input
            label="Name"
            name="name"
            placeholder="Trackman HQ"
            value={form.name}
            onChange={onChange('name')}
            fullWidth
          />
          <Input
            label="Address"
            name="address"
            placeholder="Kanonbådsvej 12, 1437 København"
            value={form.address}
            onChange={onChange('address')}
            fullWidth
          />
          <Input
            label="Image URL"
            name="imageUrl"
            placeholder="https://example.com/photo.jpg"
            value={form.imageUrl}
            onChange={onChange('imageUrl')}
            fullWidth
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="Short description…"
            value={form.description}
            onChange={onChange('description')}
            fullWidth
            rows={5}
          />

          <div className={styles['form__row']}>
            <Input
              label="Opening time"
              name="openingTime"
              type="time"
              value={form.openingTime}
              onChange={onChange('openingTime')}
            />
            <Input
              label="Closing time"
              name="closingTime"
              type="time"
              value={form.closingTime}
              onChange={onChange('closingTime')}
            />
          </div>

          <div className={styles['form__checkbox']}>
            <label className={styles['form__checkboxLabel']}>
              <input
                type="checkbox"
                checked={defaultChecked}
                onChange={onToggleDefault}
                disabled={defaultDisabled}
              />
              <span>Default facility</span>
            </label>
            {defaultDisabled && (
              <small className={styles['form__hint']}>
                The first facility is automatically set as default.
              </small>
            )}
          </div>
        </div>

        <div className={styles['form__actions']}>
          <Button variant="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          {/* Submit will be wired in part 2 */}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}
