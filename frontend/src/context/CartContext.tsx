import React from 'react'
import { useCart } from '../hooks/useCart'

type CartContextType = ReturnType<typeof useCart>
export const CartContext = React.createContext<CartContextType | null>(null)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCart()
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('CartContext not found')
  return ctx
}
