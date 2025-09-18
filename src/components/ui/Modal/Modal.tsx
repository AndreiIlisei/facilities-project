import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Modal.module.scss'

type Props = {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md'
  className?: string
}

export default function Modal({ isOpen, title, onClose, children, size = 'sm', className }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // Focus the panel when opened (simple focus mgmt)
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
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside
      >
        {title && <div className={styles['modal__header']}>{title}</div>}
        <div className={styles['modal__body']}>{children}</div>
        <div className={styles['modal__footer']}>
          {/* Consumers can pass actions inside children; footer kept for layout consistency */}
        </div>
      </div>
    </div>,
    document.body,
  )
}
