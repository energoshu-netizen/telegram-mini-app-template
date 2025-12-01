import { pool } from './database.js'

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

export const getAllCategories = async (): Promise<Category[]> => {
  const { rows } = await pool.query(
    `SELECT id, parent_id, name, sort_order
     FROM categories
     WHERE deleted_at IS NULL
     ORDER BY sort_order, name`
  )
  return rows
}

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const { rows } = await pool.query(
    `SELECT id, category_id, name, description, price, is_available
     FROM products
     WHERE deleted_at IS NULL
       AND category_id = $1
       AND is_available = TRUE
     ORDER BY name`,
    [categoryId]
  )
  return rows
}

export const getProductById = async (
  productId: number
): Promise<{ product: Product | null; options: ProductOption[] }> => {
  const p = await pool.query(
    `SELECT id, category_id, name, description, price, is_available
     FROM products
     WHERE id = $1 AND deleted_at IS NULL`,
    [productId]
  )
  const product = p.rows[0] || null
  const o = await pool.query(
    `SELECT id, product_id, name, price_delta, is_required, max_quantity
     FROM product_options
     WHERE product_id = $1 AND deleted_at IS NULL
     ORDER BY name`,
    [productId]
  )
  return { product, options: o.rows }
}
