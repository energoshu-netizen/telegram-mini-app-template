import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import pg from 'pg'

const { Pool } = pg
const url = process.env.DATABASE_URL || ''
if (!url) throw new Error('DATABASE_URL is required')
const pool = new Pool({ connectionString: url })

async function run() {
  const dir = join(process.cwd(), 'database', 'migrations')
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort()
  for (const f of files) {
    const sql = readFileSync(join(dir, f), 'utf8')
    console.log(`Applying ${f}...`)
    await pool.query(sql)
  }
  await pool.end()
  console.log('Migrations applied')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
