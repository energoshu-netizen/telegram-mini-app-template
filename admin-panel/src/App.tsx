import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import OrdersPage from './pages/Orders'
import MenuPage from './pages/Menu'
import BookingsPage from './pages/Bookings'
import AnalyticsPage from './pages/Analytics'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  )
}
