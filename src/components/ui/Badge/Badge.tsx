import type { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Badge.module.scss'

type Variant = 'neutral' | 'success' | 'danger'

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: Variant
}

export default function Badge({ children, variant = 'neutral', className, ...rest }: Props) {
  return (
    <span className={clsx(styles.badge, styles[`badge--${variant}`], className)} {...rest}>
      {children}
    </span>
  )
}
