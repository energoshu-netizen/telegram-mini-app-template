import React from 'react'
import { useCartContext } from '../../../context/CartContext'

export default function CartItem({ index }: { index: number }) {
  const { items, updateQuantity, removeItem } = useCartContext()
  const item = items[index]
  if (!item) return null
  return (
    <div>
      <div>{item.product.name}</div>
      <div>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => updateQuantity(index, Number(e.target.value))}
        />
        <button onClick={() => removeItem(index)}>Удалить</button>
      </div>
    </div>
  )
}
