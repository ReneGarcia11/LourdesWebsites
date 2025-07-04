// app/api/opinions/route.js
import { db } from '@vercel/postgres';

export async function GET() {
  try {
    const client = await db.connect();
    const { rows } = await client.sql`
      SELECT 
        id, 
        name, 
        role, 
        content, 
        rating, 
        TO_CHAR(date, 'DD/MM/YYYY') as date
      FROM opinions
      ORDER BY date DESC
    `;
    client.release();

    // Configuración CORS para permitir el subdominio
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', 'https://opinions.crisisyduelo.com');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(JSON.stringify(rows), {
      headers
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request) {
  try {
    const client = await db.connect();
    const { name, role, content, rating } = await request.json();
    
    // Validación básica de datos
    if (!name || !content || rating < 1 || rating > 5) {
      throw new Error('Datos de entrada inválidos');
    }

    await client.sql`
      INSERT INTO opinions (name, role, content, rating, date)
      VALUES (${name}, ${role || null}, ${content}, ${rating}, NOW())
    `;
    client.release();

    // Configuración CORS
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', 'https://opinions.crisisyduelo.com');
    headers.set('Access-Control-Allow-Methods', 'POST');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message || 'Error al procesar la opinión'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://opinions.crisisyduelo.com'
      }
    });
  }
}

// Necesario para CORS preflight
export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'https://opinions.crisisyduelo.com');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return new Response(null, {
    headers
  });
}