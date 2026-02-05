import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    res.status(200).json({ message: "✅ Conexión exitosa", time: result.rows[0].current_time });
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    res.status(500).json({ error: "Error al conectar con PostgreSQL" });
  }
}