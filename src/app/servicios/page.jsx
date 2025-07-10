'use client'
import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      title: "Manejo del Duelo",
      description: "Apoyo emocional especializado en procesos de duelo y pérdida.",
      icon: "💔",
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      // Metadatos SEO (no afectan visualmente)
      seoData: {
        title: "Terapia para duelo en Guadalajara | Psicóloga especializada en pérdidas | Zapopan",
        keywords: [
          "tanatología Guadalajara",
          "psicóloga para duelo Zapopan",
          "manejo de pérdidas emocionales",
          "acompañamiento en duelo Jalisco",
          "terapia para duelos complicados",
          "duelo anticipado Guadalajara"
        ]
      }
    },
    {
      title: "Acompañamiento Integral",
      description: "Atención a pacientes con enfermedades crónicas y terminales.",
      icon: "🌿",
      modalities: [
        { type: "Presencial" },
        { type: "Virtual"}
      ],
      seoData: {
        title: "Acompañamiento psicológico en enfermedades terminales | Guadalajara y Zapopan",
        keywords: [
          "cuidados paliativos psicológicos Guadalajara ",
          "apoyo emocional en cáncer",
          "psicóloga para enfermedades crónicas Zapopan",
          "acompañamiento en terminalidad",
          "terapia para pacientes graves Jalisco"
        ]
      }
    },
    {
      title: "Psicología Oncológica",
      description: "Acompañamiento especializado para pacientes oncológicos.",
      icon: "🎗️",
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      seoData: {
        title: "Psicóloga oncológica en Guadalajara | Apoyo emocional para cáncer | Zapopan",
        keywords: [
          "psicología en oncología Guadalajara",
          "terapia para pacientes con cáncer Zapopan",
          "manejo emocional del cáncer",
          "apoyo a familiares de enfermos oncológicos Guadalajara",
          "psicóloga para quimioterapia Jalisco"
        ]
      }
    },
    {
      title: "Terapia Individual",
      description: "Atención psicológica personalizada para bienestar emocional.",
      icon: "🧠",
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      seoData: {
        title: "Terapia psicológica individual en Guadalajara | Psicóloga clínica | Zapopan",
        keywords: [
          "terapia individual Zapopan",
          "terapia para ansiedad y depresión Guadalajara",
          "crisis existencial",
          "crecimiento personal con terapia",
          "psicóloga para adultos Guadalajara"
        ]
      }
    }
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const modalityVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <section 
      id="servicios" 
      className="py-16 bg-gradient-to-b from-white to-sky-50"
      itemScope
      itemType="http://schema.org/Service"
      aria-label="Servicios profesionales de psicología clínica en Guadalajara y Zapopan"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold text-sky-900 mb-3"
            itemProp="name"
            title="Servicios de psicología especializada en Guadalajara y Zapopan"
          >
            Nuestros Servicios
          </h2>
          <p 
            className="text-lg text-sky-700 max-w-2xl mx-auto mb-2"
            itemProp="description"
            aria-label="Terapias profesionales para duelo, acompañamiento en enfermedades, oncología y bienestar emocional"
          >
            Enfoque profesional con resultados comprobados
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span 
              className="inline-flex items-center bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
              aria-label="Sesiones presenciales disponibles en Zapopan"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Sesiones Presenciales
            </span>
            <span 
              className="inline-flex items-center bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm"
              aria-label="Terapia psicológica en línea disponible para todo Jalisco"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Sesiones Virtuales
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-sky-100/50 flex flex-col h-full"
              itemScope
              itemType="http://schema.org/ProfessionalService"
              aria-labelledby={`service-title-${index}`}
            >
              {/* Contenido visual intacto */}
              <div className="text-4xl mb-3" aria-hidden="true">{service.icon}</div>
              <h3 
                id={`service-title-${index}`}
                className="text-xl font-semibold text-sky-800 mb-2"
                itemProp="name"
                title={service.seoData.title}
              >
                {service.title}
              </h3>
              <p 
                className="text-sky-600 mb-4 flex-grow"
                itemProp="description"
              >
                {service.description}
              </p>
              
              {/* Metadatos ocultos para SEO */}
              <div className="sr-only">
                <meta itemProp="keywords" content={service.seoData.keywords.join(', ')} />
                <span itemProp="serviceType">{service.title}</span>
                <span itemProp="areaServed">Guadalajara, Zapopan, Jalisco</span>
              </div>

              <motion.div 
                variants={modalityVariants}
                className="space-y-3 pt-3 border-t border-sky-100"
              >
                {service.modalities.map((modality, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="flex items-start"
                    itemProp="availableChannel"
                    itemScope
                    itemType="http://schema.org/ServiceChannel"
                  >
                    <div className={`flex-shrink-0 mt-0.5 mr-2 ${modality.type === 'Presencial' ? 'text-sky-600' : 'text-sky-400'}`}>
                      {modality.type === 'Presencial' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-sky-900">
                        {modality.type}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services