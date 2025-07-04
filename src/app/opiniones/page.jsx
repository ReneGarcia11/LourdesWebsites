'use client'
import React from 'react'
import OpinionForm from '../../components/OpinionsForm' // o donde esté tu componente

export default function OpinionesPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Deja tu opinión</h1>
      <OpinionForm />
    </main>
  )
}
