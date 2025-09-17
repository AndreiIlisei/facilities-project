import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export default function Input({
  label,
  hint,
  error,
  id,
  name,
  className,
  fullWidth = false,
  ...rest
}: Props) {
  const inputId = id ?? name ?? `input-${Math.random().toString(36).slice(2, 8)}`
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div
      className={clsx(
        styles.input,
        fullWidth && styles['input--full'],
        error && styles['input--error'],
        className,
      )}
    >
      {label && (
        <label className={styles['input__label']} htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={clsx(hintId, errorId) || undefined}
        className={styles['input__control']}
        {...rest}
      />

      {hint && !error && (
        <div id={hintId} className={styles['input__hint']}>
          {hint}
        </div>
      )}

      {error && (
        <div id={errorId} className={styles['input__error']} role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
