import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import routes from './routes/index.js'
import menuRoutes from './routes/menuRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import errorHandler from './middleware/errorHandler.js'

export const createApp = () => {
  const app = express()

  // --- Безопасность ---
  app.use(helmet()) // Устанавливает HTTP-заголовки безопасности
  app.use(cors()) // Включает CORS для всех маршрутов

  // --- Ограничение запросов ---
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Лимит: 100 запросов на IP за 15 минут
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use(limiter)

  app.use(express.json())

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'Coffee & Code API' })
  })

  app.use('/api', routes)
  app.use('/api', menuRoutes)
  app.use('/api', orderRoutes)

  // --- Централизованная обработка ошибок ---
  app.use(errorHandler);

  return app
}
