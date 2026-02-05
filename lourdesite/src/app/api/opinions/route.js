import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Para evitar caché no deseado
export const revalidate = 3600 // Revalidación cada hora

export async function GET() {
  const client = await db.connect()

  try {
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

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}