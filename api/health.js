import { getPool } from './db.js';

export default async function handler(req, res) {
  try {
    const db = getPool();
    const result = await db.query('SELECT 1 as ok');
    res.status(200).json({ ok: true, db: result.rows[0]?.ok === 1 });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'db_unavailable' });
  }
}
