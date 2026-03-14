import { ensureSchema, getPool } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.INGEST_API_KEY;
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'api_key_not_configured' });
    return;
  }

  const headerKey = req.headers['x-api-key'];
  if (!headerKey || headerKey !== apiKey) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  const { transcript, phone, name, timestamp, source } = req.body || {};

  if (!transcript || typeof transcript !== 'string') {
    res.status(400).json({ ok: false, error: 'transcript_required' });
    return;
  }

  const createdAt = timestamp ? new Date(timestamp) : new Date();

  try {
    await ensureSchema();
    const db = getPool();
    const result = await db.query(
      `INSERT INTO ingest_messages
        (transcript, phone, name, source, received_at, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [transcript, phone || null, name || null, source || 'whatsapp', createdAt, 'pending_parse']
    );

    res.status(200).json({ ok: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'db_insert_failed' });
  }
}
