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

type Errors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = {
  name: '',
  address: '',
  description: '',
  imageUrl: '',
  openingTime: '09:00',
  closingTime: '18:00',
  isDefault: false,
}

// ---- helpers ----
function isValidTime(hhmm: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm)
  if (!m) return false
  const h = Number(m[1])
  const min = Number(m[2])
  return h >= 0 && h <= 23 && min >= 0 && min <= 59
}

function isLikelyUrl(u: string) {
  if (!u) return true // optional field
  try {
    const url = new URL(u)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default function FacilityForm({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { facilities, create, update } = useFacilities()

  const editing: Facility | undefined = useMemo(
    () => (mode === 'edit' ? facilities.find((f) => f.id === id) : undefined),
    [mode, facilities, id],
  )

  // simple local form state
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})

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

  const validate = (s: FormState): Errors => {
    const e: Errors = {}
    if (!s.name.trim()) e.name = 'Name is required'
    if (!s.address.trim()) e.address = 'Address is required'
    if (!isValidTime(s.openingTime)) e.openingTime = 'Use HH:MM (00–23:59)'
    if (!isValidTime(s.closingTime)) e.closingTime = 'Use HH:MM (00–23:59)'
    if (s.openingTime === s.closingTime) {
      e.openingTime = e.openingTime || 'Opening and closing cannot be equal'
      e.closingTime = e.closingTime || 'Opening and closing cannot be equal'
    }
    if (!isLikelyUrl(s.imageUrl)) e.imageUrl = 'Provide a valid http(s) URL'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate({ ...form, isDefault: defaultChecked })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (mode === 'create') {
      const now = Date.now()
      const facility: Facility = {
        id: (crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2),
        name: form.name.trim(),
        address: form.address.trim(),
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        openingTime: form.openingTime,
        closingTime: form.closingTime,
        isDefault: defaultChecked, // reducer also enforces single default
        createdAt: now,
        updatedAt: now,
      }
      create(facility)
    } else if (mode === 'edit' && editing) {
      update(editing.id, {
        name: form.name.trim(),
        address: form.address.trim(),
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        openingTime: form.openingTime,
        closingTime: form.closingTime,
        isDefault: defaultChecked,
      })
    }

    navigate('/facilities')
  }

  const handleCancel = () => navigate('/facilities')
  return (
    <div className={styles.page}>
      <div className={styles['page__header']}>
        <h1 className={styles['page__title']}>
          {mode === 'create' ? 'Create Facility' : 'Edit Facility'}
        </h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles['form__grid']}>
          <Input
            label="Name"
            name="name"
            placeholder="Trackman HQ"
            value={form.name}
            onChange={onChange('name')}
            error={errors.name}
            fullWidth
          />
          <Input
            label="Address"
            name="address"
            placeholder="Kanonbådsvej 12, 1437 København"
            value={form.address}
            onChange={onChange('address')}
            error={errors.address}
            fullWidth
          />
          <Input
            label="Image URL"
            name="imageUrl"
            placeholder="https://example.com/photo.jpg"
            value={form.imageUrl}
            onChange={onChange('imageUrl')}
            error={errors.imageUrl}
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
              error={errors.openingTime}
            />
            <Input
              label="Closing time"
              name="closingTime"
              type="time"
              value={form.closingTime}
              onChange={onChange('closingTime')}
              error={errors.closingTime}
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}
