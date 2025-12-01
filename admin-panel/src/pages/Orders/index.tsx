import React from 'react'
import Layout from '../../components/layout/Layout'
import Table from '../../components/ui/Table'
import StatusBadge from '../../components/ui/StatusBadge'
import Button from '../../components/ui/Button'
import { useOrders } from '../../hooks/useOrders'

export default function OrdersPage() {
  const { orders, filter, setFilter, changeStatus, loading } = useOrders()
  const columns = ['#', 'Клиент', 'Сумма', 'Статус', 'Действия']
  const data = orders.map((o) => [
    o.id,
    o.user_id ?? '-',
    `${Number(o.total_amount).toFixed(2)} ${o.currency}`,
    <StatusBadge status={o.status} />,
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => changeStatus(o.id, 'preparing')}>Готовится</Button>
      <Button onClick={() => changeStatus(o.id, 'ready')}>Готов</Button>
      <Button onClick={() => changeStatus(o.id, 'completed')}>Выдан</Button>
    </div>
  ])

  return (
    <Layout>
      <h2>Заказы</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['pending', 'paid', 'preparing', 'ready', 'completed'].map((s) => (
          <Button key={s} onClick={() => setFilter(s)}>
            {s}
          </Button>
        ))}
      </div>
      {loading ? <div>Загрузка...</div> : <Table columns={columns} data={data} />}
    </Layout>
  )
}
