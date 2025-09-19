import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'
import Button from '../../components/ui/Button/Button'

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles['notFound__card']}>
        <h1 className={styles['notFound__title']}>Page not found</h1>
        <p className={styles['notFound__text']}>
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className={styles['notFound__actions']}>
          <Link to="/facilities">
            <Button>Go to Facilities</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
