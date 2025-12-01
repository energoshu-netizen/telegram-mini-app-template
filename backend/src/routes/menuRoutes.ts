import { Router } from 'express'
import { getMenu, getProduct } from '../controllers/menuController.js'

const router = Router()
router.get('/menu', getMenu)
router.get('/products/:id', getProduct)

export default router
