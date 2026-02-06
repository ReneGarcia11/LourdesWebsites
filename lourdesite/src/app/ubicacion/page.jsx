import MapComponent from './MapComponent'

export const metadata = {
  title: "Ubicación Clínica BriZuela | Consultorio Psicológico en Zapopan",
  description: "Dirección exacta y cómo llegar a nuestra clínica psicológica en Real Vallarta, Zapopan. Especialistas en crisis y duelo.",
  alternates: {
    canonical: "https://www.crisisyduelo.com/ubicacion"
  },
  openGraph: {
    title: "Ubicación Clínica BriZuela",
    description: "Cómo llegar a nuestro consultorio psicológico en Zapopan",
    url: "https://www.crisisyduelo.com/ubicacion",
    siteName: "Crisis y Duelo",
    images: [
      {
        url: "https://www.crisisyduelo.com/og-ubicacion.jpg",
        width: 800,
        height: 600,
        alt: "Mapa de ubicación Clínica BriZuela",
      }
    ],
    locale: 'es_MX',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function UbicacionPage() {
  return (
    <main>
      {/* Contenido estático para SEO */}
      <div className="sr-only" aria-hidden="true">
        <h1>Ubicación Clínica BriZuela - Psicólogos en Zapopan</h1>
        <p>Avenida Miguel angel 14, Colonia, Real Vallarta, 45020 Zapopan, Jal.</p>
        <p>Teléfono: +52 33 1234 5678</p>
        <p>Horario: Lunes a Viernes de 9:00 a 18:00</p>
        <p>Coordenadas GPS: 20.67902, -103.4243</p>
      </div>
      
      {/* Componente de mapa */}
      <MapComponent />
    </main>
  )
}