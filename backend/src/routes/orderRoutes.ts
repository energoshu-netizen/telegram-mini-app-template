import { Router } from 'express'
import { createOrderHandler, validateOrderData } from '../controllers/orderController.js'
import { telegramAuth } from '../middleware/auth.js'

const router = Router()
router.post('/orders', telegramAuth, validateOrderData, createOrderHandler)

export default router
