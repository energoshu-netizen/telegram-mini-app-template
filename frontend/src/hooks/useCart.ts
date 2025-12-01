import React from 'react'
import { CartItem, Product } from '../types/api'

const LS_KEY = 'coffee_and_code_cart'

export const useCart = () => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  React.useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (product: Product, quantity = 1, optionIds: number[] = []) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && JSON.stringify(i.optionIds) === JSON.stringify(optionIds))
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity }
        return updated
      }
      return [...prev, { product, quantity, optionIds }]
    })
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    setItems((prev) => prev.map((i, idx) => (idx === index ? { ...i, quantity: Math.max(1, quantity) } : i)))
  }

  const total = items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, total }
}
