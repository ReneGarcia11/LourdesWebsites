'use client'
import { motion } from 'framer-motion'

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
    text: "Restablecer el sentido de vida durante procesos difíciles",
    keywords: "psicología existencial Guadalajara, encontrar sentido en la enfermedad, terapia para crisis vitales Zapopan"
  }
]

const Objectives = () => {
  return (
    <section 
      id="objetives" 
      className="py-20 relative min-h-[600px] flex items-center"
      style={{
        backgroundImage: "url('/images/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
      }}
      aria-label="Enfoque terapéutico para pacientes con enfermedades crónicas y sus familias en Guadalajara y Zapopan"
      itemScope
      itemType="http://schema.org/MedicalTherapy"
    >
      {/* Overlay más oscuro pero transparente */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
          backdropFilter: "blur(1px)"
        }}
        title="Terapia especializada en enfermedades crónicas y terminales en Jalisco"
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg"
            itemProp="name"
            title="Métodos terapéuticos para enfermedades crónicas en Guadalajara y Zapopan"
          >
            Nuestro Enfoque
          </h2>
          <p 
            className="text-sky-200 text-xl max-w-2xl mx-auto font-medium"
            itemProp="description"
            aria-label="Terapias basadas en evidencia científica para pacientes con enfermedades graves"
          >
            Métodos basados en evidencia científica
          </p>
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
                className="flex items-start bg-white/90 p-5 rounded-lg shadow-xl hover:bg-white transition-all duration-300"
                itemProp="featureList"
              >
                <div className="bg-sky-600 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span 
                  className="text-gray-800 text-lg font-medium"
                  itemProp="description"
                >
                  {item.text}
                </span>
                {/* Metadatos ocultos para SEO */}
                <div className="sr-only">
                  <meta itemProp="keywords" content={item.keywords} />
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white/90 p-8 rounded-xl shadow-xl border border-gray-200"
            itemProp="summary"
          >
            <p className="text-gray-700 text-lg font-medium">
              Brindar un espacio seguro donde encuentres apoyo emocional y herramientas prácticas para transitar momentos difíciles con resiliencia y bienestar integral.
            </p>
            {/* Texto oculto para SEO */}
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