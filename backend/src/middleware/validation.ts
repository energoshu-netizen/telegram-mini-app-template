import { Request, Response, NextFunction } from 'express'

export const requireFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const f of fields) {
      if (!(f in req.body)) return res.status(400).json({ error: `Missing field: ${f}` })
    }
    next()
  }
}
