import express from 'express'
import routes from './routes/index.js'
import menuRoutes from './routes/menuRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

export const createApp = () => {
  const app = express()
  app.use(express.json())
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'Coffee & Code API' })
  })
  app.use('/api', routes)
  app.use('/api', menuRoutes)
  app.use('/api', orderRoutes)
  return app
}
