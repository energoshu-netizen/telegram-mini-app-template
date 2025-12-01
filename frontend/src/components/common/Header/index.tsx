import React from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Кофе & Код</div>
      <nav className={styles.nav}>
        <Link to="/menu">Меню</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  )
}
