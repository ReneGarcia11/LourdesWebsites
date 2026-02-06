'use client'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  // Animación de la K refinada (más elegante, menos brusca)
  const kAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      color: "#0284c7"
    },
    visible: {
      opacity: 1,
      scale: 1,
      color: "#0284c7",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.5
      }
    },
    hover: {
      color: ["#0284c7", "#0ea5e9", "#0284c7"],
      textShadow: [
        "0 0 0px rgba(2, 132, 199, 0)",
        "0 0 12px rgba(14, 165, 233, 0.6)",
        "0 0 0px rgba(2, 132, 199, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
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
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  return (
    <header
      ref={containerRef}
      id="home"
      className="relative h-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* Fondo con efecto parallax y gradiente radial sutil */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente sutil para dar profundidad central */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-sky-50/30 to-white z-10 pointer-events-none" />
        
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: yBg, opacity: opacityBg }}
        >
           <AnimatedPattern opacity={0.12} speed={0.4} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-20 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div className="mb-10 space-y-4">
            <motion.h1
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-sky-950 leading-tight tracking-tight"
              aria-label="Psic. Lourdes Ramírez"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-br from-sky-600 to-sky-900 pb-2">
                Psic. Lourdes Ramírez
              </span>
              <span className="sr-only">
                Psicóloga especializada en duelo, tanatología y acompañamiento psicológico.
              </span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-xl sm:text-2xl md:text-3xl font-light text-sky-800/80"
            >
              Psicóloga 
              <motion.span
                initial="hidden"
                animate={['visible', 'hover']}
                whileHover="hover"
                variants={kAnimation}
                className="inline-block ml-2 font-bold text-sky-600 cursor-default relative"
              >
                K
                {/* Pequeño destello sutil debajo de la K */}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-400/30 blur-sm rounded-full"></span>
              </motion.span>línica
            </motion.p>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="inline-block mb-12"
          >
            {/* Diseño "Glass" mejorado */}
            <div className="bg-gradient-to-br from-white/95 to-sky-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl shadow-sky-900/5 border border-sky-100/80 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-200 to-sky-400 opacity-50"></div>
              <p className="text-sky-900 text-lg md:text-xl font-medium relative z-10">
                Tanatología e Intervención en Crisis
              </p>
              {/* Brillo sutil en hover */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>
            </div>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row justify-center gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              href="/contacto"
              className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md shadow-sky-200/50 transition-all relative overflow-hidden"
            >
              Agenda tu primera cita
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, backgroundColor: "#f0f9ff", borderColor: "#0ea5e9" }}
              whileTap={{ scale: 0.98 }}
              href="/servicios"
              className="bg-white text-sky-700 border-2 border-sky-200/80 px-8 py-4 rounded-full font-semibold text-lg shadow-sm transition-all"
            >
              Nuestros servicios
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll más elegante */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center opacity-60">
            <span className="text-[10px] uppercase tracking-widest text-sky-800 mb-2 font-medium">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-sky-300 to-transparent relative overflow-hidden">
                <motion.div 
                    animate={{ y: [0, 48, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-1/3 bg-sky-600"
                />
            </div>
        </div>
      </motion.div>

      {/* Afiliación profesional con tooltip rediseñado */}
      <div className="absolute bottom-8 z-30 flex justify-center w-full">
        <div className="relative">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, type: "spring" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            // Diseño tipo "Insignia/Badge"
            className="group flex items-center gap-3 bg-white/90 backdrop-blur-md pl-5 pr-2 py-2 rounded-full shadow-sm border border-sky-100 hover:shadow-md hover:border-sky-200 transition-all"
            aria-expanded={showTooltip}
          >
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider leading-none mb-0.5">Miembro</span>
                <span className="font-bold text-sky-900 leading-none">APACP</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-50 to-white border border-sky-100 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                <Image
                    src="/images/apacp-logo.png"
                    alt="Logo APACP"
                    width={28}
                    height={28}
                    className="object-contain opacity-90 group-hover:opacity-100"
                />
            </div>
          </motion.button>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-white rounded-2xl shadow-xl shadow-sky-900/10 border border-sky-50 p-6 z-[999]"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-20 h-20 relative filter drop-shadow-sm">
                    <Image
                      src="/images/apacp-logo.png"
                      alt="Logo APACP"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sky-900 text-center mb-2 text-lg leading-tight">APACP</h3>
                  <div className="w-8 h-0.5 bg-sky-100 rounded-full mb-3"></div>
                  <p className="text-xs text-sky-700/80 text-center font-medium leading-relaxed">
                    ASOCIACIÓN PANAMERICANA DE CUIDADOS PALIATIVOS
                  </p>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-sky-50 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Header