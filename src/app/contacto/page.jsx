// app/contacto/page.jsx
import ContactFormWrapper from './ContactFormWrapper'

export const metadata = {
  title: "Agenda Cita Psicológica | Clínica BriZuela",
  description: "Agenda tu consulta psicológica en Guadalajara o Zapopan. Terapia presencial y online para crisis y duelo.",
  alternates: {
    canonical: "https://www.crisisyduelo.com/contacto",
  },
  openGraph: {
    type: 'website',
    url: 'https://www.crisisyduelo.com/contacto',
    title: 'Agenda Cita Psicológica',
    description: 'Formulario para agendar terapia psicológica en Guadalajara',
    siteName: 'Crisis y Duelo',
    images: [{
      url: 'https://www.crisisyduelo.com/og-contacto.jpg',
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

export default function ContactPage() {
  return (
    <main>
      {/* Contenido estático para SEO */}
      <div className="sr-only" aria-hidden="true">
        <h1>Agenda Cita con Psicóloga en Guadalajara - Clínica BriZuela</h1>
        <p>Formulario para agendar terapia psicológica presencial en Zapopan o consulta virtual</p>
        <p>Teléfono: +52 33 1234 5678</p>
        <p>Horario: Lunes a Viernes de 9:00 a 18:00</p>
      </div>
      
      <ContactFormWrapper />
    </main>
  )
}