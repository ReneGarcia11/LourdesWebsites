'use client'
import { motion } from 'framer-motion'

const objectives = [
  "Aliviar el dolor físico y emocional en pacientes con enfermedades crónico-degenerativas.",
  "Brindar atención humana y profesional para mejorar la calidad de vida.",
  "Ofrecer acompañamiento emocional integral a pacientes y familiares.",
  "Restablecer el sentido de vida durante procesos difíciles",
  
]

const Objectives = () => {
  return (
    <section id="objetives" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">Nuestro Enfoque</h2>
          <p className="text-sky-700 max-w-2xl mx-auto">Métodos basados en evidencia científica</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="bg-sky-100 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sky-800 text-lg">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-sky-50 p-8 rounded-xl border border-sky-200"
          >
            
            <p className="text-sky-700">
              Brindar un espacio seguro donde encuentres apoyo emocional y herramientas prácticas para transitar momentos difíciles con resiliencia y bienestar integral.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Objectives