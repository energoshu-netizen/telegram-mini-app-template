import { Category, Product, ProductOption } from '../types/api'

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api'

const tgInitData = () => (window as any).Telegram?.WebApp?.initData || ''

export const fetchMenu = async (): Promise<Array<Category & { products: Product[] }>> => {
  const res = await fetch(`${API_BASE}/menu`)
  if (!res.ok) throw new Error('Failed to fetch menu')
  return res.json()
}

export const fetchProduct = async (
  id: number
): Promise<{ product: Product; options: ProductOption[] }> => {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export const createOrder = async (orderData: { items: { productId: number; quantity: number; optionIds?: number[] }[]; currency?: string; note?: string }) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-telegram-init-data': tgInitData()
    },
    body: JSON.stringify(orderData)
  })
  if (!res.ok) throw new Error('Failed to create order')
  return res.json()
}
