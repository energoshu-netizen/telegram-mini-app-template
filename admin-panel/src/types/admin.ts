export type Order = {
  id: number
  user_id: number | null
  status: string
  total_amount: string
  currency: string
  created_at: string
}

export type Category = {
  id: number
  parent_id: number | null
  name: string
  sort_order: number
}

export type Product = {
  id: number
  category_id: number | null
  name: string
  description: string | null
  price: string
  is_available: boolean
}
