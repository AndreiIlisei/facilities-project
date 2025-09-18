import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Layout.module.scss'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Helper function for NavLink className
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return [styles.link, isActive ? styles['link--active'] : ''].filter(Boolean).join(' ')
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <img src="/images/trackman.svg" alt="Trackman" />

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <NavLink to="/facilities" className={getLinkClassName}>
              Facilities
            </NavLink>
            <NavLink to="/locations" className={getLinkClassName}>
              Locations
            </NavLink>
            <NavLink to="/players" className={getLinkClassName}>
              Players
            </NavLink>
            <NavLink to="/access-management" className={getLinkClassName}>
              Access Management
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className={styles.menuToggle} onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <FaTimes color="white" /> : <FaBars color="white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`${styles.nav} ${styles['nav--mobile']} open`}>
            <NavLink to="/facilities" className={getLinkClassName} onClick={closeMobileMenu}>
              Facilities
            </NavLink>
            <NavLink to="/locations" className={getLinkClassName} onClick={closeMobileMenu}>
              Locations
            </NavLink>
            <NavLink to="/players" className={getLinkClassName} onClick={closeMobileMenu}>
              Players
            </NavLink>
            <NavLink to="/access-management" className={getLinkClassName} onClick={closeMobileMenu}>
              Access Management
            </NavLink>
          </nav>
        )}
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
