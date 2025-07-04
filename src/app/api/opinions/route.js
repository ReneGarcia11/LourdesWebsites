import { Pool } from 'pg';

// Configuración de la conexión PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + (process.env.POSTGRES_URL.includes('?') ? '&' : '?') + 'sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

// GET: Obtener todas las opiniones
export async function GET() {
  try {
    const client = await pool.connect();
    
    // Verificar si la tabla existe
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'opinions'
      );
    `);

    if (!tableExists.rows[0].exists) {
      // Crear tabla si no existe
      await client.query(`
        CREATE TABLE opinions (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(100),
          content TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
    }

    // Obtener opiniones
    const result = await client.query(`
      SELECT 
        id, 
        name, 
        role, 
        content, 
        rating, 
        to_char(date, 'YYYY-MM-DD') as date 
      FROM opinions 
      ORDER BY date DESC
    `);
    
    client.release();
    
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store' // Para datos dinámicos
      }
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener opiniones' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// POST: Crear nueva opinión
export async function POST(request) {
  try {
    const { name, role, content, rating } = await request.json();
    
    // Validación básica
    if (!name || !content || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO opinions (name, role, content, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, content, rating]
    );
    
    client.release();
    
    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Location': `/api/opinions/${result.rows[0].id}`
      }
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Error al crear opinión' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}