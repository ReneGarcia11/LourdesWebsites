import { db } from '@vercel/postgres'

export async function GET() {
  try {
    const client = await db.connect()
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
    `
    client.release()
    
    return new Response(JSON.stringify(rows), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}