'use client'
import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      title: "Manejo del Duelo",
      description: "Apoyo emocional especializado para sanar y reconstruir el sentido tras una pérdida significativa.",
      // Icono: Corazón en manos (Cuidado/Amor)
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      seoData: {
        title: "Terapia para duelo en Guadalajara | Psicóloga especializada en pérdidas | Zapopan",
        keywords: [
          "tanatología Guadalajara",
          "psicóloga para duelo Zapopan",
          "manejo de pérdidas emocionales Guadalajara",
          "acompañamiento en duelo Jalisco Zapopan",
          "terapia de duelo Guadalajara"
        ]
      }
    },
    {
      title: "Acompañamiento Integral",
      description: "Atención compasiva para pacientes con enfermedades crónicas y terminales, enfocada en calidad de vida.",
      // Icono: Hoja/Manos (Vida/Esperanza)
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      modalities: [
        { type: "Presencial" },
        { type: "Virtual"}
      ],
      seoData: {
        title: "Acompañamiento psicológico en enfermedades terminales | Guadalajara y Zapopan",
        keywords: [
          "cuidados paliativos psicológicos Guadalajara",
          "apoyo emocional en cáncer Guadalajara Zapopan",
          "psicóloga para enfermedades crónicas Zapopan",
          "acompañamiento en terminalidad Guadalajara"
        ]
      }
    },
    {
      title: "Psicología Oncológica",
      description: "Soporte emocional especializado para pacientes y familiares navegando el diagnóstico de cáncer.",
      // Icono: Lazo (Símbolo Oncológico)
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          {/* Nota: Usamos una representación abstracta o un lazo custom si fuera SVG path complejo, aquí uso Activity/DNA como referencia médica */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      seoData: {
        title: "Psicóloga oncológica en Guadalajara | Apoyo emocional para cáncer | Zapopan",
        keywords: [
          "psicología en oncología Guadalajara",
          "terapia para pacientes con cáncer Zapopan",
          "manejo emocional del cáncer Guadalajara",
          "terapia oncológica Guadalajara",
          "Consultas psicológicas para cáncer Zapopan"
        ]
      }
    },
    {
      title: "Terapia Individual",
      description: "Espacio seguro para el autoconocimiento, manejo de ansiedad y crecimiento personal.",
      // Icono: Cerebro/Mente (Salud Mental)
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      modalities: [
        { type: "Presencial" },
        { type: "Virtual" }
      ],
      seoData: {
        title: "Terapia psicológica individual en Guadalajara | Psicóloga clínica | Zapopan",
        keywords: [
          "terapia individual Zapopan Guadalajara",
          "terapia para ansiedad y depresión Guadalajara",
          "crisis existencial Guadalajara Zapopan",
          "psicóloga clínica Guadalajara"
        ]
      }
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  }

  return (
    <section 
      id="servicios" 
      className="py-24 bg-white relative overflow-hidden"
      itemScope
      itemType="http://schema.org/Service"
      aria-label="Servicios profesionales de psicología clínica en Guadalajara y Zapopan"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-bl-full opacity-50 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-sky-50 rounded-tr-full opacity-50 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- Header de la Sección --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Áreas de Atención
          </span>
          <h2 
            className="text-3xl md:text-5xl font-bold text-sky-950 mb-6"
            itemProp="name"
          >
            Nuestros Servicios
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            itemProp="description"
          >
            Un enfoque profesional y cálido, diseñado para acompañarte en los momentos que más lo necesitas.
          </p>
        </motion.div>

        {/* --- Grid de Servicios --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-sky-100/50 border border-sky-50 hover:border-sky-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-200/40 flex flex-col h-full"
              itemScope
              itemType="http://schema.org/ProfessionalService"
            >
              {/* Icono con fondo */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                {service.icon}
              </div>

              {/* Título */}
              <h3 
                className="text-xl font-bold text-sky-900 mb-3 group-hover:text-sky-600 transition-colors"
                itemProp="name"
                title={service.seoData.title}
              >
                {service.title}
              </h3>

              {/* Descripción */}
              <p 
                className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm"
                itemProp="description"
              >
                {service.description}
              </p>
              
              {/* Separador */}
              <div className="w-full h-px bg-sky-100 mb-4 group-hover:bg-sky-200 transition-colors" />

              {/* Modalidades */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Modalidades:</p>
                <div className="flex flex-wrap gap-2">
                  {service.modalities.map((modality, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-medium border border-sky-100 group-hover:border-sky-200 transition-colors"
                      itemProp="availableChannel"
                    >
                        {/* Icono pequeño según modalidad */}
                        {modality.type === 'Presencial' ? (
                            <svg className="w-3 h-3 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg className="w-3 h-3 mr-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                      {modality.type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sr-only">
                <meta itemProp="keywords" content={service.seoData.keywords.join(', ')} />
                <span itemProp="serviceType">{service.title}</span>
                <span itemProp="areaServed">Guadalajara, Zapopan, Jalisco</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services