import type { TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.scss'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  error?: string
  fullWidth?: boolean
  rows?: number
}

export default function Textarea({
  label,
  hint,
  error,
  id,
  name,
  className,
  fullWidth = false,
  rows = 4,
  ...rest
}: Props) {
  const textareaId = id ?? name ?? `textarea-${Math.random().toString(36).slice(2, 8)}`
  const hintId = hint ? `${textareaId}-hint` : undefined
  const errorId = error ? `${textareaId}-error` : undefined

  return (
    <div
      className={clsx(
        styles.textarea,
        fullWidth && styles['textarea--full'],
        error && styles['textarea--error'],
        className,
      )}
    >
      {label && (
        <label className={styles['textarea__label']} htmlFor={textareaId}>
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={clsx(hintId, errorId) || undefined}
        className={styles['textarea__control']}
        {...rest}
      />

      {hint && !error && (
        <div id={hintId} className={styles['textarea__hint']}>
          {hint}
        </div>
      )}

      {error && (
        <div id={errorId} className={styles['textarea__error']} role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
