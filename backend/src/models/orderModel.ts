import { pool } from './database.js'

export type OrderItemInput = {
  productId: number
  quantity: number
  optionIds?: number[]
}

export type CreateOrderInput = {
  userId: number | null
  currency?: string
  note?: string
  items: OrderItemInput[]
}

export const createOrder = async (orderData: CreateOrderInput): Promise<{ orderId: number }> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    let total = 0
    const currency = orderData.currency || 'RUB'

    // Preload prices
    const pricedItems = [] as Array<{
      productId: number
      quantity: number
      unitPrice: number
      totalPrice: number
    }>

    for (const item of orderData.items) {
      const pRes = await client.query(
        `SELECT price, is_available FROM products WHERE id = $1 AND deleted_at IS NULL`,
        [item.productId]
      )
      if (pRes.rowCount === 0) throw new Error('Product not found')
      const { price, is_available } = pRes.rows[0]
      if (!is_available) throw new Error('Product unavailable')
      let unit = Number(price)
      if (item.optionIds && item.optionIds.length > 0) {
        const oRes = await client.query(
          `SELECT price_delta FROM product_options WHERE id = ANY($1) AND deleted_at IS NULL`,
          [item.optionIds]
        )
        const delta = oRes.rows.reduce((acc: number, r: any) => acc + Number(r.price_delta), 0)
        unit += delta
      }
      const qty = Math.max(1, item.quantity)
      const totalPrice = unit * qty
      total += totalPrice
      pricedItems.push({ productId: item.productId, quantity: qty, unitPrice: unit, totalPrice })
    }

    const oRes = await client.query(
      `INSERT INTO orders (user_id, status, total_amount, currency, note)
       VALUES ($1, 'pending', $2, $3, $4)
       RETURNING id`,
      [orderData.userId, total, currency, orderData.note || null]
    )
    const orderId = oRes.rows[0].id as number

    for (const pi of pricedItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, pi.productId, pi.quantity, pi.unitPrice, pi.totalPrice]
      )
    }

    await client.query('COMMIT')
    return { orderId }
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

export const getOrderStatus = async (orderId: number): Promise<string | null> => {
  const { rows } = await pool.query(
    `SELECT status FROM orders WHERE id = $1 AND deleted_at IS NULL`,
    [orderId]
  )
  return rows[0]?.status ?? null
}
