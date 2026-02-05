'use client'

import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaDirections, FaCar, FaWalking, FaClock, FaPhoneAlt } from 'react-icons/fa'

const MapComponent = () => {
  // Datos exactos de Clínica BriZuela
  const clinicaBrizuela = {
    name: "Clínica BriZuela",
    info: "Un espacio seguro y accesible en Real Vallarta, diseñado para tu tranquilidad.",
    address: "Av. Miguel Ángel 14, Real Vallarta, 45020 Zapopan, Jal.",
    googleMapsLink: "https://maps.app.goo.gl/jXZdjqTew6xgrPqMA", // Asegúrate de poner el link real aquí
    exactIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1319.736302946811!2d-103.42485128086965!3d20.678610679226484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af8dd124be45%3A0x6912a015055fe2d!2sCl%C3%ADnica%20BriZuela!5e0!3m2!1ses!2smx!4v1751582885858!5m2!1ses!2smx", // Asegúrate de poner el src del iframe real aquí
    telephone: "+52 33 1234 5678",
    openingHours: "Lunes a Viernes: 09:00 - 20:00",
    seoKeywords: [
      "consultorio psicológico Zapopan",
      "clínica de psicología Guadalajara",
      // ... tus keywords se mantienen igual en el código
    ]
  }

  const getDirectionsLink = (mode = 'driving') => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinicaBrizuela.address)}&travelmode=${mode}`
  }

  // Variantes para animación en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <section 
      className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-sky-50/50 to-white" 
      id="ubicacion-map"
      itemScope
      itemType="http://schema.org/MedicalClinic"
    >
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-50" />

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Encabezado */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-wider uppercase mb-3">
            Ubicación
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4 tracking-tight">
            ¿Cómo llegar a consulta?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {clinicaBrizuela.info}
          </p>
        </motion.div>

        {/* Contenedor Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Panel de Información (Izquierda) - Ocupa 4 columnas en desktop */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 bg-white rounded-2xl shadow-xl shadow-sky-900/5 border border-sky-100 p-6 sm:p-8 relative overflow-hidden group"
          >
            {/* Gradiente sutil en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-sky-900 mb-6 border-b border-sky-100 pb-4">
                {clinicaBrizuela.name}
              </h3>

              <div className="space-y-6">
                {/* Dirección */}
                <div className="flex items-start group/icon">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover/icon:bg-sky-600 group-hover/icon:text-white transition-colors duration-300">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-sky-800 uppercase tracking-wide">Dirección</p>
                    <p className="text-gray-600 mt-1 leading-snug">{clinicaBrizuela.address}</p>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start group/icon">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover/icon:bg-sky-600 group-hover/icon:text-white transition-colors duration-300">
                    <FaClock className="text-lg" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-sky-800 uppercase tracking-wide">Horario de Atención</p>
                    <p className="text-gray-600 mt-1 leading-snug">{clinicaBrizuela.openingHours}</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start group/icon">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover/icon:bg-sky-600 group-hover/icon:text-white transition-colors duration-300">
                    <FaPhoneAlt className="text-lg" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-sky-800 uppercase tracking-wide">Contacto</p>
                    <p className="text-gray-600 mt-1 leading-snug">{clinicaBrizuela.telephone}</p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 space-y-3">
                <a
                  href={clinicaBrizuela.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform active:scale-95"
                >
                  <FaDirections className="text-xl" />
                  <span>Abrir en Google Maps</span>
                </a>
                
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={getDirectionsLink('driving')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-white border border-sky-200 hover:border-sky-400 hover:bg-sky-50 text-sky-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <FaCar />
                    <span>En auto</span>
                  </a>
                  <a
                    href={getDirectionsLink('walking')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-white border border-sky-200 hover:border-sky-400 hover:bg-sky-50 text-sky-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <FaWalking />
                    <span>A pie</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa Interactivo (Derecha) - Ocupa 8 columnas en desktop */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8 h-[500px] lg:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/10 border-4 border-white"
          >
            <div className="absolute inset-0 bg-sky-100 animate-pulse" /> {/* Loading placeholder */}
            <iframe
              src={clinicaBrizuela.exactIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación exacta de Clínica BriZuela"
            />
            
            {/* Badge flotante sobre el mapa */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-sky-100 hidden sm:block"
            >
              <p className="text-xs font-bold text-sky-800 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Ubicación verificada
              </p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

export default MapComponent