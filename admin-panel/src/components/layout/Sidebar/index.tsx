import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink to="/" end>Дашборд</NavLink>
        <NavLink to="/orders">Заказы</NavLink>
        <NavLink to="/menu">Меню</NavLink>
        <NavLink to="/bookings">Бронирования</NavLink>
        <NavLink to="/analytics">Аналитика</NavLink>
      </nav>
    </aside>
  )
}
