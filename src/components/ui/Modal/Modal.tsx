import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Modal.module.scss'
import Button from '../Button/Button'

type Props = {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md'
  className?: string
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
  size = 'sm',
  className,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) panelRef.current?.focus()
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.modal} aria-hidden={!isOpen}>
      <div className={styles['modal__backdrop']} onClick={onClose} data-testid="modal-backdrop" />
      <div
        ref={panelRef}
        className={clsx(styles['modal__panel'], styles[`modal__panel--${size}`], className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles['modal__header']}>
            {title}
            <Button onClick={onClose} variant="secondary" padding="sm">
              X
            </Button>
          </div>
        )}
        <div className={styles['modal__body']}>{children}</div>
        {footer && <div className={styles['modal__footer']}>{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
