import React from 'react'
import Layout from '../../components/layout/Layout'
import SimpleChart from '../../components/charts/SimpleChart'
import { useOrders } from '../../hooks/useOrders'

export default function DashboardPage() {
  const { orders } = useOrders()
  const today = new Date().toDateString()
  const todays = orders.filter((o) => new Date(o.created_at).toDateString() === today)
  const revenue = todays.reduce((acc, o) => acc + Number(o.total_amount), 0)
  return (
    <Layout>
      <h2>Дашборд</h2>
      <div>Новых заказов сегодня: {todays.length}</div>
      <div>Выручка сегодня: {revenue.toFixed(2)} ₽</div>
      <div style={{ marginTop: 16 }}>
        <SimpleChart points={[10, 30, 20, 40, 35, 50, 25]} />
      </div>
    </Layout>
  )
}
