import clsx from 'clsx'
import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  variant?: Variant
  size?: Size
  block?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        block && styles['button--block'],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
