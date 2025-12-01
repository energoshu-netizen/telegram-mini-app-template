import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import pg from 'pg'

const { Pool } = pg
const url = process.env.DATABASE_URL || ''
if (!url) throw new Error('DATABASE_URL is required')
const pool = new Pool({ connectionString: url })

async function run() {
  const file = join(process.cwd(), 'database', 'seeds', 'initial_data.sql')
  const sql = readFileSync(file, 'utf8')
  await pool.query(sql)
  await pool.end()
  console.log('Seed applied')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
