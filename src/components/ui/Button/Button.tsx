import clsx from 'clsx'
import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'
type Padding = 'sm' | 'md' | 'lg'

type Props = {
  variant?: Variant
  size?: Size
  padding?: Padding
  block?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  variant = 'primary',
  size = 'md',
  padding = 'md',
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
        styles[`button--padding-${padding}`],
        block && styles['button--block'],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
