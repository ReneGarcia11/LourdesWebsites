'use client'
import { motion } from 'framer-motion'

const services = [
  {
    title: "Manejo del Duelo",
    description: "Apoyo emocional especializado en procesos de duelo y pérdida.",
    icon: "💔"
  },
  {
    title: "Acompañamiento Integral",
    description: "Atención a pacientes con enfermedades crónicas y terminales.",
    icon: "🌿"
  },
  {
    title: "Oncología Psicológica",
    description: "Acompañamiento especializado para pacientes oncológicos.",
    icon: "🎗️"
  },
  {
    title: "Terapia Individual",
    description: "Atención psicológica personalizada para bienestar emocional.",
    icon: "🧠"
  }
]

const Services = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section id="services" className="py-20 bg-sky-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">Nuestros Servicios</h2>
          <p className="text-sky-700 max-w-2xl mx-auto">Enfoque profesional con resultados comprobados</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-sky-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-sky-800 mb-3">{service.title}</h3>
              <p className="text-sky-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services