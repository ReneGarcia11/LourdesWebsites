'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Datos SEO
  const seoData = {
    keywords: [
      "psicóloga en Guadalajara",
      "tanatología Zapopan",
      "terapia de duelo Jalisco",
      "consulta psicológica online",
      "psicóloga especializada en crisis",
      "acompañamiento emocional profesional"
    ],
    services: [
      { name: "Manejo del Duelo", keywords: "tanatología, pérdidas emocionales, duelo complicado" },
      { name: "Acompañamiento Integral", keywords: "enfermedades crónicas, pacientes terminales, cuidados paliativos" },
      { name: "Psicología Oncológica", keywords: "cáncer, apoyo emocional oncología, terapia para pacientes oncológicos" },
      { name: "Terapia Individual", keywords: "psicoterapia personalizada, ansiedad, depresión, crecimiento personal" }
    ]
  }

  return (
    <footer
      className="bg-royal-blue text-white pt-16 pb-8"
      itemScope
      itemType="http://schema.org/ProfessionalService"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            itemScope
            itemType="http://schema.org/Person"
          >
            <h3
              className="text-xl font-bold mb-6"
              itemProp="name"
              title="Psicóloga Lourdes Ramírez - Especialista en tanatología y crisis"
            >
              Psic. Lourdes Ramírez
            </h3>
            <p
              className="text-gray-400 mb-4"  // Cambiado de text-gray-300 a text-gray-400
              itemProp="description"
              aria-label="Psicóloga clínica especializada en Guadalajara y Zapopan"
            >
              Psicóloga clínica especializada en intervención en crisis y tanatología, comprometida con tu bienestar emocional.
            </p>
         
            <div className="sr-only">
              <meta itemProp="keywords" content={seoData.keywords.join(', ')} />
              <meta itemProp="knowsAbout" content="tanatología, intervención en crisis, psicología clínica" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-xl font-bold mb-6"
              aria-label="Accesos rápidos a las secciones principales"
            >
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"  // Cambiado de text-gray-300 a text-gray-400
                  aria-label="Volver al inicio"
                  itemProp="url"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="text-gray-400 hover:text-white transition-colors"  // Cambiado de text-gray-300 a text-gray-400
                  aria-label="Ver servicios psicológicos"
                  itemProp="makesOffer"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/enfoque"
                  className="text-gray-400 hover:text-white transition-colors"  // Cambiado de text-gray-300 a text-gray-400
                  aria-label="Conocer el enfoque terapéutico"
                >
                  Enfoque
                </Link>
              </li>
              <li>
                <Link
                  href="/opiniones"
                  className="text-gray-400 hover:text-white transition-colors"  // Cambiado de text-gray-300 a text-gray-400
                  aria-label="Leer opiniones de pacientes"
                >
                  Opiniones
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-400 hover:text-white transition-colors"  // Cambiado de text-gray-300 a text-gray-400
                  aria-label="Contactar a la psicóloga"
                  itemProp="potentialAction"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            itemScope
            itemType="http://schema.org/ItemList"
          >
            <h3
              className="text-xl font-bold mb-6"
              itemProp="name"
              title="Servicios de psicología especializada"
            >
              Servicios
            </h3>
            <ul className="space-y-3">
              {seoData.services.map((service, index) => (
                <li key={index} itemProp="itemListElement">
                  <span
                    className="text-gray-400"  // Cambiado de text-gray-300 a text-gray-400
                    itemProp="name"
                    title={`${service.name} en Guadalajara y Zapopan`}
                  >
                    {service.name}
                    {/* Metadatos ocultos por servicio */}
                    <div className="sr-only">
                      <meta itemProp="keywords" content={service.keywords} />
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            itemScope
            itemType="http://schema.org/ContactPoint"
          >
            <h3
              className="text-xl font-bold mb-6"
              itemProp="name"
              title="Datos de contacto de la psicóloga"
            >
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-400 whitespace-nowrap"  // Agregado whitespace-nowrap
                  itemProp="telephone"
                  aria-label="Número de teléfono para citas"
                >
                  +52 33 3955 5642
                </span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span
                  className="text-gray-400"
                  itemProp="address"
                  itemScope
                  itemType="http://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">Avenida Miguel angel #14</span>,
                  <span itemProp="addressLocality"> Colonia Real Vallarta</span>,
                  <span itemProp="postalCode"> 45020</span>,
                  <span itemProp="addressRegion"> Zapopan, Jal.</span>
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-gray-500 text-sm mb-4 md:mb-0"  // Cambiado de text-gray-400 a text-gray-500
              itemProp="copyrightYear"
            >
              © {currentYear} Psic. Lourdes Ramírez. Todos los derechos reservados.
              {/* Texto oculto para SEO */}
              <span className="sr-only">
                <meta itemProp="keywords" content="psicóloga en Guadalajara, consulta psicológica Zapopan, terapia online Jalisco" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer