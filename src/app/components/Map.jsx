'use client'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaDirections, FaCar, FaWalking } from 'react-icons/fa'

const Map = () => {
  // Datos exactos de Clínica BriZuela
  const clinicaBrizuela = {
    name: "Clínica BriZuela",
    info: "Avenida Miguel angel 14, Colonia, Real Vallarta, 45020 Zapopan, Jal.",
    address: "Av. Miguel Angel 14, Zapopan",
    googleMapsLink: "https://maps.app.goo.gl/jXZdjqTew6xgrPqMA",
    exactIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1319.736302946811!2d-103.42485128086965!3d20.678610679226484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af8dd124be45%3A0x6912a015055fe2d!2sCl%C3%ADnica%20BriZuela!5e0!3m2!1ses!2smx!4v1751582885858!5m2!1ses!2smx",
    coordinates: "20.67902, -103.4243",
    // Metadatos SEO
    seoKeywords: [
      "consultorio psicológico Zapopan",
      "clínica de psicología Guadalajara",
      "ubicación psicóloga Real Vallarta",
      "dirección exacta psicólogo Jalisco",
      "cómo llegar a terapia psicológica"
    ]
  }

  // Función para generar enlaces de direcciones exactos
  const getDirectionsLink = (mode = 'driving') => {
    return `https://www.google.com/maps/dir/?api=1&destination=${clinicaBrizuela.address}&destination_place_id=ChIJW6bQ-6V-JIYRgZQZJZQZJZQ&travelmode=${mode}`
  }

  return (
    <section 
      className="py-16 bg-gradient-to-b from-sky-50 to-white" 
      id="ubicacion"
      itemScope
      itemType="http://schema.org/MedicalClinic"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Encabezado con detalles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FaMapMarkerAlt className="text-sky-600 text-3xl mr-3" />
            <h2 
              className="text-3xl md:text-4xl font-bold text-sky-900"
              itemProp="name"
              title="Ubicación exacta del consultorio psicológico en Zapopan"
            >
              Ubicación Exacta
            </h2>
          </div>
          <p 
            className="text-sky-700 text-lg max-w-2xl mx-auto"
            itemProp="address"
            aria-label="Dirección de la Clínica BriZuela en Real Vallarta, Zapopan"
          >
            {clinicaBrizuela.info}
          </p>
          {/* Texto oculto para SEO */}
          <div className="sr-only">
            <meta itemProp="keywords" content={clinicaBrizuela.seoKeywords.join(', ')} />
            <meta itemProp="geo" content={`${clinicaBrizuela.coordinates}`} />
          </div>
        </motion.div>

        {/* Contenedor principal */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Panel de información */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-sky-100"
            itemScope
            itemType="http://schema.org/Place"
          >
            <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-sky-600" />
              <span itemProp="name">{clinicaBrizuela.name}</span>
            </h3>
            <p 
              className="text-gray-700 mb-6"
              itemProp="address"
              itemScope
              itemType="http://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">{clinicaBrizuela.address}</span>, 
              <span itemProp="addressLocality"> Zapopan</span>, 
              <span itemProp="addressRegion"> Jalisco</span>
            </p>
            
            {/* Botón principal */}
            <a
              href={clinicaBrizuela.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md mb-4"
              aria-label="Abrir ubicación en Google Maps"
              itemProp="hasMap"
            >
              <FaDirections className="mr-2" />
              Abrir en Maps
            </a>
            
            {/* Opciones de navegación */}
            <div className="flex space-x-2">
              <a
                href={getDirectionsLink('driving')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm transition-all"
                aria-label="Cómo llegar en auto a la clínica psicológica"
              >
                <FaCar className="mr-1" />
                En auto
              </a>
              <a
                href={getDirectionsLink('walking')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm transition-all"
                aria-label="Ruta a pie hacia el consultorio psicológico"
              >
                <FaWalking className="mr-1" />
                A pie
              </a>
            </div>
          </motion.div>

          {/* Mapa interactivo EXACTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-xl overflow-hidden shadow-xl border border-sky-200 relative h-[500px]"
          >
            <iframe
              src={clinicaBrizuela.exactIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Mapa interactivo de ubicación de Clínica BriZuela en Zapopan"
              title="Ubicación exacta del consultorio psicológico en Real Vallarta"
            ></iframe>
            
            {/* Botón flotante */}
            <div className="absolute bottom-6 right-6">
              <motion.a
                href={clinicaBrizuela.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-sky-700 px-4 py-2 rounded-lg shadow-lg hover:bg-sky-50 transition-all border border-sky-200 font-medium"
                aria-label="Instrucciones para llegar al consultorio"
              >
                <FaDirections className="mr-2" />
                <span>Cómo llegar</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Map