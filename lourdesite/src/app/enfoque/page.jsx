'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const objectives = [
  {
    text: "Aliviar el dolor físico y emocional en pacientes con enfermedades crónico-degenerativas.",
    keywords: "psicología en enfermedades crónicas Guadalajara, manejo del dolor emocional Zapopan, apoyo en enfermedades degenerativas Jalisco"
  },
  {
    text: "Brindar atención humana y profesional para mejorar la calidad de vida.",
    keywords: "calidad de vida en pacientes crónicos, atención psicológica humanizada, terapia para bienestar emocional Guadalajara"
  },
  {
    text: "Ofrecer acompañamiento emocional integral a pacientes y familiares.",
    keywords: "acompañamiento psicológico familiar, terapia para cuidadores Zapopan, apoyo integral en salud mental Jalisco"
  },
  {
    text: "Restablecer el sentido de vida durante procesos difíciles.",
    keywords: "psicología existencial Guadalajara, encontrar sentido en la enfermedad, terapia para crisis vitales Zapopan"
  }
]

const Objectives = () => {
  // Variantes para la animación en cascada de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  }

  return (
    <section 
      id="objetives" 
      className="relative py-24 min-h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="Enfoque terapéutico para pacientes con enfermedades crónicas y sus familias en Guadalajara y Zapopan"
      itemScope
      itemType="http://schema.org/MedicalTherapy"
    >
      {/* --- FONDO OPTIMIZADO --- */}
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo */}
        <Image 
          src="/images/fondo.png"
          alt="Fondo de terapia psicológica"
          fill
          priority
          className="object-cover object-center"
          quality={85}
        />
        {/* Overlay Gradiente: Mejora el contraste del texto manteniendo los tonos azules */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/85 via-sky-900/70 to-black/60 mix-blend-multiply backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* --- TÍTULO --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-sky-100 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm mb-4">
            Misión Terapéutica
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight"
            itemProp="name"
          >
            Nuestro Enfoque
          </h2>
          <div className="w-24 h-1 bg-sky-400 mx-auto rounded-full mb-6" />
          <p 
            className="text-sky-100 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
            itemProp="description"
          >
            Implementamos métodos basados en evidencia científica, centrados en la compasión y la dignidad humana.
          </p>
        </motion.div>

        {/* --- GRID DE OBJETIVOS --- */}
        <div className="max-w-5xl mx-auto">
          <motion.ul 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {objectives.map((item, index) => (
              <motion.li
                key={index}
                variants={cardVariants}
                className="group relative flex items-start bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/20"
                itemProp="featureList"
              >
                {/* Icono Check */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-600 transition-colors duration-300">
                    <svg 
                      className="w-5 h-5 text-sky-600 group-hover:text-white transition-colors duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Texto */}
                <div className="ml-5">
                  <span 
                    className="text-gray-700 text-lg font-medium leading-relaxed block group-hover:text-gray-900 transition-colors"
                    itemProp="description"
                  >
                    {item.text}
                  </span>
                  
                  {/* SEO Invisible */}
                  <div className="sr-only">
                    <meta itemProp="keywords" content={item.keywords} />
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* --- RESUMEN FINAL / QUOTE --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 relative"
            itemProp="summary"
          >
            <div className="absolute inset-0 bg-sky-600/20 blur-2xl rounded-full" />
            <div className="relative bg-gradient-to-r from-sky-900/90 to-sky-800/90 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-sky-500/30 shadow-2xl text-center">
              <svg className="w-10 h-10 text-sky-300 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703V15C9.01703 14.3185 9.27895 13.6661 9.74836 13.1764L11.7588 11.0792C12.3391 10.4739 12.6652 9.66479 12.6652 8.8249L12.6652 7.25C12.6652 5.45507 11.2101 4 9.41518 4H4.01703C3.46474 4 3.01703 4.44772 3.01703 5V14C3.01703 17.866 6.15104 21 10.017 21H14.017ZM17.017 21L21.017 21C21.5693 21 22.017 20.5523 22.017 20V11C22.017 10.4477 21.5693 10 21.017 10H16.017V8.8249C16.017 8.54494 16.1257 8.27525 16.3192 8.07341L18.3296 5.97621C18.6738 5.61719 18.8652 5.13876 18.8652 4.63914V4.5C18.8652 4.22386 18.6413 4 18.3652 4H15.017C14.4647 4 14.017 4.44772 14.017 5V14C14.017 14.266 14.0274 14.5293 14.0476 14.7891C14.4893 15.2282 15.1119 15.5 15.8004 15.5H18.017C18.5693 15.5 19.017 15.9477 19.017 16.5V19.5C19.017 20.0523 18.5693 20.5 18.017 20.5H17.017C16.4647 20.5 16.017 20.9477 16.017 21.5V21.5C16.017 22.0523 16.4647 22.5 17.017 22.5H17.017L17.017 21Z" />
              </svg>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                "Brindar un espacio seguro donde encuentres apoyo emocional y herramientas prácticas para transitar momentos difíciles con resiliencia y bienestar integral."
              </p>
            </div>
            
            <div className="sr-only">
              <meta itemProp="keywords" content="terapia de apoyo emocional Guadalajara, herramientas psicológicas para crisis Zapopan, bienestar integral en enfermedades Jalisco" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Objectives