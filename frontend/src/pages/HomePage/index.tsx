import React from 'react'
import Header from '../../components/common/Header'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <Header />
      <h2>Добро пожаловать в Кофе & Код</h2>
      <Link to="/menu">Перейти к меню</Link>
    </div>
  )
}
