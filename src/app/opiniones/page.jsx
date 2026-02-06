// app/opiniones/page.jsx
import OpinionsWrapper from './OpinionsWrapper'

export const metadata = {
  title: "Opiniones de Pacientes | Clínica BriZuela",
  description: "Experiencias reales de nuestros pacientes. Psicología clínica en Guadalajara y Zapopan con especialistas en duelo y crisis.",
  alternates: {
    canonical: "https://www.crisisyduelo.com/opiniones",
  },
  openGraph: {
    type: 'website',
    url: 'https://www.crisisyduelo.com/opiniones',
    title: 'Opiniones de Pacientes - Clínica BriZuela',
    description: 'Testimonios reales sobre nuestros servicios psicológicos',
    siteName: 'Crisis y Duelo',
    images: [{
      url: 'https://www.crisisyduelo.com/og-opiniones.jpg',
      width: 1200,
      height: 630,
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function OpinionsPage() {
  return (
    <main>
      {/* Contenido estático para SEO */}
      <div className="sr-only" aria-hidden="true">
        <h1>Opiniones y Testimonios - Clínica BriZuela</h1>
        <p>Testimonios reales de pacientes sobre nuestros servicios psicológicos en Guadalajara y Zapopan</p>
        <p>Calificación promedio: 4.8/5 basado en más de 100 opiniones</p>
      </div>
      
      <OpinionsWrapper />
    </main>
  )
}