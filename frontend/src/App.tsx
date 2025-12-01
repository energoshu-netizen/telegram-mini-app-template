import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useTelegram } from './hooks/useTelegram'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import './App.css'

export default function App() {
  const { tg } = useTelegram()
  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [tg])
  return (
    <CartProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
        <div className="Nav">
          <Link to="/">Домой</Link> | <Link to="/menu">Меню</Link> | <Link to="/cart">Корзина</Link>
        </div>
      </div>
    </CartProvider>
  )
}
