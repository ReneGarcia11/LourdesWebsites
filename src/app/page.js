import Head from 'next/head'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Services from './components/Services'
import Objectives from './components/Objectives'
import Opinions from './components/Opinions'
import Contact from './components/Contact'
import Map from './components/Map'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Dra. Lourdes Ramírez | Psicóloga Klínica</title>
        <meta name="description" content="Terapia psicológica especializada en intervención en crisis y tanatología" />
        <link rel="icon" href="/favicon.ico" />
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