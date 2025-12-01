import React from 'react'
import { Order } from '../types/admin'
import { fetchOrders, updateOrderStatus } from '../services/adminApi'
import { connectOrdersWS } from '../services/websocket'

export const useOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [filter, setFilter] = React.useState<string>('pending')
  const [loading, setLoading] = React.useState(false)

  const load = async () => {
    setLoading(true)
    const data = await fetchOrders(filter)
    setOrders(data)
    setLoading(false)
  }

  React.useEffect(() => {
    load()
  }, [filter])

  React.useEffect(() => {
    const unsub = connectOrdersWS((msg) => {
      if (msg?.type === 'order_updated' || msg?.type === 'order_created') load()
    })
    const id = setInterval(load, 5000)
    return () => {
      unsub()
      clearInterval(id)
    }
  }, [])

  const changeStatus = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status)
    await load()
  }

  return { orders, filter, setFilter, loading, load, changeStatus }
}
