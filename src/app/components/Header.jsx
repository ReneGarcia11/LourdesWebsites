'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import AnimatedPattern from './Animations/AnimatedPattern'
import Image from 'next/image'

const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Animación mejorada para la letra K
  const kAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
      color: "#0284c7"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      color: "#0284c7",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        delay: 0.5
      }
    },
    hover: {
      scale: [1, 1.2, 1],
      color: ["#0284c7", "#0ea5e9", "#0284c7"],
      textShadow: [
        "0 0 0px rgba(2, 132, 199, 0)",
        "0 0 8px rgba(14, 165, 233, 0.5)",
        "0 0 0px rgba(2, 132, 199, 0)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <header
      ref={containerRef}
      id="home"
      className="relative h-screen overflow-hidden flex items-center bg-white"
    >
      {/* Fondo con efecto parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white"
          style={{ y: yBg }}
        />
      </div>

      {/* Componente del patrón animado - Asegurando visibilidad */}
      <div className="absolute inset-0 z-0">
        <AnimatedPattern opacity={0.15} speed={0.5} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div className="mb-8 space-y-4">
            <motion.h1
              variants={textVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-900 leading-tight"
              title="Psicóloga Clínica en Guadalajara | Especialista en Duelo y Tanatología | Zapopan, Jalisco"
              aria-label="Psic. Lourdes Ramírez - Psicología clínica, acompañamiento psicológico y terapia emocional para manejo de duelo, crisis y salud mental"
            >
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-sky-800"
                aria-hidden="true" // Oculta el texto duplicado para lectores de pantalla
              >
                Psic. Lourdes Ramírez
              </span>
              {/* Texto oculto solo para SEO */}
              <span className="sr-only">
                Psicóloga especializada en duelo, tanatología y acompañamiento psicológico en Guadalajara, Zapopan y Jalisco.
                Servicios de terapia emocional, apoyo psicológico profesional y manejo de crisis.
              </span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-xl sm:text-2xl md:text-3xl font-light text-sky-700"
            >
              Psicóloga <motion.span
                initial="hidden"
                animate={['visible', 'hover']}
                whileHover="hover"
                variants={kAnimation}
                className="inline-block mx-1 font-bold"
              > K
              </motion.span>línica
            </motion.p>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="inline-block mb-12"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sky-100/50">
              <p className="text-sky-800 text-lg md:text-xl font-medium">
                Tanatología e Intervención en Crisis
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="/contacto"
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3.5 rounded-full font-semibold text-lg shadow-md transition-all"
            >
              Agenda tu primera cita
            </motion.a>

            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="/servicios"
              className="bg-white hover:bg-sky-50 text-sky-600 border-2 border-sky-600 px-8 py-3.5 rounded-full font-semibold text-lg shadow-md transition-all"
            >
              Nuestros servicios
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="animate-float w-5 h-8 border-2 border-sky-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-sky-500 rounded-full mt-1"></div>
        </div>
      </motion.div>

      {/* Afiliación profesional con tooltip */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="relative"
        >
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-sky-100 text-xs sm:text-sm cursor-pointer hover:shadow-md transition-shadow">
              <span className="text-sky-700">Miembro de </span>
              <span className="font-semibold text-sky-800">APACP</span>
            </div>

            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border border-sky-100 p-4 z-[999]"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 w-20 h-20 relative">
                    <Image
                      src="/images/apacp-logo.png"
                      alt="Logo APACP"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sky-800 text-center mb-1">APACP</h3>
                  <p className="text-xs text-gray-600 text-center">
                    ASOCIACIÓN PANAMERICANA DE CUIDADOS PALIATIVOS
                  </p>
                </div>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-sky-100 rotate-45"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  )
}

export default Header