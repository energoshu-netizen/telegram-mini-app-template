import React from 'react'
import { useCartContext } from '../../../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartTotal() {
  const { total } = useCartContext()
  return (
    <div>
      <div>Итого: {total.toFixed(2)} ₽</div>
      <Link to="/order">Оформить</Link>
    </div>
  )
}
