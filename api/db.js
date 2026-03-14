import pg from 'pg';

const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
  return pool;
}

export async function ensureSchema() {
  const db = getPool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS ingest_messages (
      id SERIAL PRIMARY KEY,
      transcript TEXT NOT NULL,
      phone TEXT,
      name TEXT,
      source TEXT,
      received_at TIMESTAMP WITH TIME ZONE NOT NULL,
      status TEXT NOT NULL
    );
  `);
}
