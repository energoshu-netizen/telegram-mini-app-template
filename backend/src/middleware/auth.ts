import { Request, Response, NextFunction } from 'express'
import { verifyTelegramInitData } from '../utils/telegramAuth.js'
import { pool } from '../models/database.js'

export const telegramAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const initData = req.header('x-telegram-init-data') || (req.query.initData as string | undefined)
    const botToken = process.env.BOT_TOKEN || ''
    if (!initData || !botToken) return next()
    const ok = verifyTelegramInitData(initData, botToken)
    if (!ok) return res.status(401).json({ error: 'Unauthorized' })

    const params = new URLSearchParams(initData)
    const userJson = params.get('user')
    if (userJson) {
      const user = JSON.parse(userJson)
      const telegram_id = Number(user.id)
      if (Number.isFinite(telegram_id)) {
        const r = await pool.query(`SELECT id FROM users WHERE telegram_id = $1`, [telegram_id])
        let userId = r.rows[0]?.id as number | undefined
        if (!userId) {
          const ins = await pool.query(
            `INSERT INTO users (telegram_id, first_name, last_name, username, is_active)
             VALUES ($1, $2, $3, $4, TRUE) RETURNING id`,
            [telegram_id, user.first_name || null, user.last_name || null, user.username || null]
          )
          userId = ins.rows[0].id
        }
        ;(req as any).userId = userId
      }
    }
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
