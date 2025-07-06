// src/app/page.js
import Header from '@/components/Header'
import Services from '@/components/Services'
import Objectives from '@/components/Objectives'
import Opinions from '@/components/Opinions'
import Map from '@/components/Map'
import Contact from '@/components/Contact'

export const metadata = {
  title: 'Psicóloga Especialista en Duelo y Crisis | Guadalajara y Zapopan',
  description: 'Terapia profesional para manejo de duelo, crisis emocionales y acompañamiento en enfermedades. Consulta presencial en Zapopan y online para todo México.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <Services />
      <Objectives />
      <Opinions />
      <Map />
      <Contact />
    </>
  )
}