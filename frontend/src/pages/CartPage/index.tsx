import React from 'react'
import Header from '../../components/common/Header'
import { useCartContext } from '../../context/CartContext'
import CartItem from '../../components/cart/CartItem'
import CartTotal from '../../components/cart/CartTotal'

export default function CartPage() {
  const { items } = useCartContext()
  return (
    <div>
      <Header />
      <h3>Корзина</h3>
      {items.length === 0 && <div>Корзина пуста</div>}
      {items.map((_, idx) => (
        <CartItem key={idx} index={idx} />
      ))}
      <CartTotal />
    </div>
  )
}
