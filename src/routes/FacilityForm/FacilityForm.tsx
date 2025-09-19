import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './FacilityForm.module.scss'
import type { Facility } from '../../domain/facilityTypes'
import Input from '../../components/ui/Input/Input'
import Textarea from '../../components/ui/Textarea/Textarea'
import Button from '../../components/ui/Button/Button'
import { useToast } from '../../components/ui/Toast/useToast'
import { isValidImageUrl, isValidTime } from '../../utils/helperFunctions'
import { useFacilities } from '../../state/facilities/useFacilities'

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
  openingTime: '',
  closingTime: '',
  isDefault: false,
}

export default function FacilityForm({ mode }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { facilities, create, update } = useFacilities()

  const { push } = useToast()

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

      // Clear the error for this field when user starts typing
      if (errors[key]) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors }
          delete newErrors[key]
          return newErrors
        })
      }
    }
  const onToggleDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, isDefault: e.target.checked }))
  }

  const validate = (s: FormState): Errors => {
    const e: Errors = {}
    if (!s.name.trim()) e.name = 'Name is required'
    if (!s.address.trim()) e.address = 'Address is required'
    if (!s.description.trim()) e.description = 'Description is required'
    if (!s.imageUrl.trim()) e.imageUrl = 'Image URL is required'
    if (!isValidTime(s.openingTime)) e.openingTime = 'Use HH:MM (00–23:59)'
    if (!isValidTime(s.closingTime)) e.closingTime = 'Use HH:MM (00–23:59)'
    if (s.openingTime === s.closingTime) {
      e.openingTime = e.openingTime || 'Opening and closing cannot be equal'
      e.closingTime = e.closingTime || 'Opening and closing cannot be equal'
    }
    if (!isValidImageUrl(s.imageUrl)) e.imageUrl = 'Provide a valid http(s) URL'
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
        isDefault: defaultChecked,
        createdAt: now,
        updatedAt: now,
      }
      create(facility)
      push('Facility created', 'success')
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
      push('Facility updated', 'success')
    }

    navigate('/facilities')
  }

  const handleCancel = () => navigate('/facilities')
  return (
    <div className={styles.page}>
      <div className={styles['page__header']}>
        <h1 className={styles['page__title']}>
          {mode === 'create' ? 'Create a new facility' : 'Edit facility'}
        </h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles['form__grid']}>
          <h3>Facility Information </h3>
          <Input
            label="Facility name *"
            name="name"
            placeholder="Trackman HQ"
            value={form.name}
            onChange={onChange('name')}
            error={errors.name}
            fullWidth
          />
          <Input
            label="Address *"
            name="address"
            placeholder="Kanonbådsvej 12, 1437 København"
            value={form.address}
            onChange={onChange('address')}
            error={errors.address}
            fullWidth
          />

          <Textarea
            label="Description *"
            name="description"
            placeholder="Short description…"
            value={form.description}
            onChange={onChange('description')}
            error={errors.description}
            fullWidth
            rows={4}
          />

          <Input
            label="Cover Image URL *"
            name="imageUrl"
            placeholder="https://example.com/photo.jpg"
            value={form.imageUrl}
            onChange={onChange('imageUrl')}
            error={errors.imageUrl}
            fullWidth
          />

          <div className={styles['form__checkbox']}>
            <label className={styles['form__checkboxLabel']}>
              <input
                type="checkbox"
                checked={defaultChecked}
                onChange={onToggleDefault}
                disabled={defaultDisabled}
              />

              <div className={styles['form__checkboxText']}>
                <span>Default facility</span>
                {!defaultDisabled && (
                  <small className={styles['form__hint']}>
                    Setting this facility as default will override the currently marked default
                    facility.
                  </small>
                )}

                {defaultDisabled && (
                  <small className={styles['form__hint']}>
                    (The first facility is automatically set as default)
                  </small>
                )}
              </div>
            </label>
          </div>

          <div className={styles['form__workingHours']}>
            <h3>Working Hours</h3>

            <div className={styles['form__row']}>
              <Input
                label="Opening time *"
                name="openingTime"
                type="time"
                value={form.openingTime}
                onChange={onChange('openingTime')}
                error={errors.openingTime}
              />
              <Input
                label="Closing time *"
                name="closingTime"
                type="time"
                value={form.closingTime}
                onChange={onChange('closingTime')}
                error={errors.closingTime}
              />
            </div>
          </div>
        </div>
        <div className={styles['form__actions']}>
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            style={{ padding: '8px 24px' }}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" style={{ padding: '8px 24px' }}>
            {mode === 'create' ? 'Create Facility' : 'Update Facility'}
          </Button>
        </div>
      </form>
    </div>
  )
}
