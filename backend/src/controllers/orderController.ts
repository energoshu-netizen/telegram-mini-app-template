import { Request, Response, NextFunction } from 'express'
import { createOrder } from '../models/orderModel.js'

export const validateOrderData = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid body' })
  if (!Array.isArray(body.items) || body.items.length === 0)
    return res.status(400).json({ error: 'Items are required' })
  for (const item of body.items) {
    if (!item || typeof item !== 'object') return res.status(400).json({ error: 'Invalid item' })
    if (!Number.isFinite(item.productId) || item.productId <= 0)
      return res.status(400).json({ error: 'Invalid productId' })
    if (!Number.isFinite(item.quantity) || item.quantity <= 0)
      return res.status(400).json({ error: 'Invalid quantity' })
    if (item.optionIds && !Array.isArray(item.optionIds))
      return res.status(400).json({ error: 'optionIds must be array' })
  }
  next()
}

export const createOrderHandler = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId ?? null
    const { items, currency, note } = req.body
    const { orderId } = await createOrder({ userId, items, currency, note })
    res.status(201).json({ orderId })
  } catch (error: any) {
    res.status(400).json({ error: error?.message || 'Failed to create order' })
  }
}
