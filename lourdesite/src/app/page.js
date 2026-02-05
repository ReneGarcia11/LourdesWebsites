import Header from './components/Header'
import Services from './servicios/page'
import Objectives from './enfoque/page.jsx'
import Opinions from './opiniones/page'
import Contact from './contacto/page'
import Map from './ubicacion/page'

export const metadata = {
  title: "Psic. Lourdes Ramírez",
  description: "Psicóloga Klínica, Tanatología e Intervención en Crisis",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Services />
      <Objectives />
      <Opinions />
      <Contact />
      <Map />
    </div>
  )
}