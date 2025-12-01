import { Request, Response } from 'express'
import * as menuModel from '../models/menuModel.js'

export const getMenu = async (req: Request, res: Response) => {
  try {
    const categories = await menuModel.getAllCategories()
    const menuWithProducts = await Promise.all(
      categories.map(async (category) => ({
        ...category,
        products: await menuModel.getProductsByCategory(category.id)
      }))
    )
    res.json(menuWithProducts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id) || id <= 0) return res.status(400).json({ error: 'Invalid product id' })
    const { product, options } = await menuModel.getProductById(id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ product, options })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}
