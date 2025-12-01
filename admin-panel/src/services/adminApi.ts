import { Order, Category, Product } from '../types/admin'

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const fetchOrders = async (status?: string): Promise<Order[]> => {
  const url = status ? `${API_BASE}/orders?status=${encodeURIComponent(status)}` : `${API_BASE}/orders`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export const updateOrderStatus = async (orderId: number, newStatus: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  })
  return res.ok
}

export const fetchMenu = async (): Promise<Array<Category & { products: Product[] }>> => {
  const res = await fetch(`${API_BASE}/menu`)
  if (!res.ok) return []
  return res.json()
}

export const updateProduct = async (productId: number, data: Partial<Product>): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/products/${productId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.ok
}
