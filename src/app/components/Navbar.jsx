'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [ref, inView] = useInView({ threshold: 0.1 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        if (window.scrollY >= sectionTop) {
          setActiveLink(`#${section.id}`)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Enfoque', href: '#objetives' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Contacto', href: '#contact' },
  ]

  // Animaciones (se mantienen igual)
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      color: '#7dd3fc',
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    active: {
      color: '#0ea5e9',
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const logoVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: { 
        duration: 15, 
        repeat: Infinity, 
        ease: "linear" 
      } 
    },
    hover: {
      rotate: 180,
      transition: { duration: 1 }
    }
  }

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 14px rgba(14, 165, 233, 0.3)"
    },
    hover: {
      scale: 1.05,
      backgroundColor: '#0ea5e9',
      color: '#fff',
      boxShadow: "0 6px 20px rgba(14, 165, 233, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 2px 8px rgba(14, 165, 233, 0.2)"
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.5,
        ease: "backOut"
      }
    })
  }

  return (
    <>
      <motion.nav
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: inView ? 1 : 0.9,
          y: 0,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(224, 242, 254, 0.5)' : '1px solid transparent'
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed w-full z-50 py-3 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo mejorado */}
          <Link href="#home" className="flex items-center group">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Contenedor del logo con efecto sutil */}
              <div className="relative">
                {/* Marco decorativo animado */}
                <motion.div 
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -inset-2 border-2 border-sky-200/50 rounded-full group-hover:border-sky-300 transition-all"
                />
                
                {/* Contenedor de la imagen */}
                <motion.div 
                  className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg z-10 border-2 border-white bg-white"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  whileTap={{ rotate: -5, scale: 0.95 }}
                >
                  <Image 
                    src="/images/Logo1.png"
                    alt="Psicóloga Lourdes"
                    width={48}
                    height={48}
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </div>

              {/* Texto del nombre con animación mejorada */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="flex flex-col"
              >
                <span className="text-sky-800 font-bold text-sm sm:text-base leading-tight">
                  Psic. Lourdes
                </span>
                <span className="text-xs text-sky-500 hidden sm:block">
                  Psicología Klínica
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Navegación desktop (se mantiene igual) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate={activeLink === item.href ? "active" : "visible"}
                whileHover="hover"
                variants={itemVariants}
              >
                <Link
                  href={item.href}
                  className={`relative group text-sm uppercase tracking-wider font-medium ${activeLink === item.href ? 'text-sky-600' : 'text-sky-800'}`}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeLink === item.href ? '100%' : 0,
                      backgroundColor: activeLink === item.href ? '#0ea5e9' : '#7dd3fc'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.a
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              href="#contact"
              className="bg-sky-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg transition-all"
            >
              <motion.span
                whileHover={{ x: [0, 2, 0, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                Agenda una cita
              </motion.span>
            </motion.a>
          </div>

          {/* Botón de menú móvil (se mantiene igual) */}
          <motion.button 
            className="md:hidden text-sky-700 focus:outline-none relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              initial={false}
              className="flex flex-col items-end space-y-1.5 w-6"
            >
              <motion.span
                className="w-full h-0.5 bg-sky-600 rounded-full"
                variants={{
                  closed: { width: "100%", y: 0, rotate: 0 },
                  open: { width: "100%", y: 6, rotate: 45 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-3/4 h-0.5 bg-sky-600 rounded-full"
                variants={{
                  closed: { opacity: 1, width: "75%" },
                  open: { opacity: 0, width: 0 }
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="w-full h-0.5 bg-sky-600 rounded-full"
                variants={{
                  closed: { width: "100%", y: 0, rotate: 0 },
                  open: { width: "100%", y: -6, rotate: -45 }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Menú móvil (se mantiene igual) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-0 right-0 bg-white shadow-2xl z-40 md:hidden overflow-hidden"
            style={{ originY: 0 }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                        activeLink === item.href 
                          ? 'bg-sky-50 text-sky-600' 
                          : 'text-sky-700 hover:bg-sky-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full mr-3"
                        animate={{
                          backgroundColor: activeLink === item.href ? '#0ea5e9' : '#7dd3fc',
                          scale: activeLink === item.href ? [1, 1.3, 1] : 1
                        }}
                        transition={{ 
                          duration: activeLink === item.href ? 0.8 : 0.3,
                          repeat: activeLink === item.href ? Infinity : 0
                        }}
                      />
                      <motion.span 
                        className="font-medium text-sm uppercase tracking-wider"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: navItems.length * 0.1 + 0.2 }
                  }}
                  className="pt-2"
                >
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-sky-500 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg w-full"
                  >
                    Agenda una cita
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar