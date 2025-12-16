import 'dotenv/config'
import { createApp } from './app.js'
import http from 'http'
import pool from './db/index.js'

const port = Number(process.env.PORT) || 3000
const app = createApp()
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})

const gracefulShutdown = () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(async () => {
    console.log('HTTP server closed')
    await pool.end()
    console.log('Database pool closed')
    process.exit(0)
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
