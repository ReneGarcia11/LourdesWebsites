import Head from 'next/head'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Services from './components/Services'
import Objectives from './components/Objectives'
import Opinions from './components/Opinions'
import Contact from './components/Contact'
import Map from './components/Map'

export const metadata = {
  title: 'Psicóloga Especialista en Duelo y Crisis | Guadalajara y Zapopan',
  description: 'Terapia profesional para manejo de duelo, crisis emocionales y acompañamiento en enfermedades. Consulta presencial en Zapopan y online para todo México.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  
  return (
    
    <div className="min-h-screen bg-white">
      <Head>
        <title>Psic. Lourdes Ramírez | Psicóloga Clínica</title>
        <meta name="description" content="Terapia psicológica especializada en intervención en crisis y tanatología" />
        <link rel="icon" href="/favoico.ico" />
      </Head>

      

      <Navbar />
      <Header />
      <Services />
      <Objectives />
      <Opinions />
      <Contact />
      <Map />
      <Footer />
    </div>
  )
}