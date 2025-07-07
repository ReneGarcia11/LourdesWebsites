import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import Services from './components/Services'
import Objectives from './components/Objectives'
import Opinions from './components/Opinions'
import Contact from './components/Contact'
import Map from './components/Map'

export const metadata = {
  title: "Psic. Lourdes Ramírez",
  description: "Psicóloga Klínica, Tanatología e Intervención en Crisis",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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