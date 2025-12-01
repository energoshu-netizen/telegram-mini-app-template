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

export type ProductOption = {
  id: number
  product_id: number
  name: string
  price_delta: string
  is_required: boolean
  max_quantity: number
}

export type Order = {
  id: number
  status: string
  total_amount: string
}

export type CartItem = {
  product: Product
  quantity: number
  optionIds: number[]
}
