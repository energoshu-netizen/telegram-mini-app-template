import { Request, Response } from 'express'
import { pool } from '../db/pool.js'

export const getHealth = async (req: Request, res: Response) => {
  let db = false
  try {
    const result = await pool.query('SELECT 1')
    db = result.rowCount === 1
  } catch {
    db = false
  }
  res.json({ ok: true, db })
}
