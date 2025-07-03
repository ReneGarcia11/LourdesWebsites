'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      
      if (window.scrollY < 50) {
        setActiveLink('#home')
        return
      }

      const sections = document.querySelectorAll('section')
      let currentSection = '#home'
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionBottom = sectionTop + section.offsetHeight
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = `#${section.id}`
        }
      })
      
      setActiveLink(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Función mejorada para manejar el scroll suave
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    setActiveLink(sectionId)
    
    const element = document.querySelector(sectionId)
    if (element) {
      // Usar scrollIntoView con comportamiento suave
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Ajustar manualmente el offset para el navbar
      const offset = 80
      window.scrollBy(0, -offset)

      // Cerrar el menú móvil después de un pequeño retraso
      setTimeout(() => {
        setMobileMenuOpen(false)
      }, 800)
    }
  }

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Enfoque', href: '#objetives' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Contacto', href: '#contact' },
  ].map(item => ({
    ...item,
    onClick: (e) => scrollToSection(e, item.href)
  }))

  // Animaciones
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 120
      }
    }),
    hover: {
      scale: 1.05,
      color: '#38bdf8',
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    active: {
      color: '#0284c7',
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const logoVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: { 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      } 
    },
    hover: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.6 }
    }
  }

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)"
    },
    hover: {
      scale: 1.05,
      backgroundColor: '#0284c7',
      boxShadow: "0 6px 20px rgba(2, 132, 199, 0.35)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 2px 8px rgba(2, 132, 199, 0.2)"
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98],
        when: "beforeChildren",
        staggerChildren: 0.1
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
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  }

  return (
    <>
      <motion.nav
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: inView ? 1 : 0.95,
          y: 0,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.97)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(6px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(224, 242, 254, 0.3)' : '1px solid transparent'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed w-full z-50 py-2 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center group" 
            onClick={(e) => scrollToSection(e, '#home')}
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <motion.div 
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="absolute -inset-2 border-2 border-sky-200/50 rounded-full group-hover:border-sky-300 transition-all"
                />
                
                <motion.div 
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md z-10 border-2 border-white bg-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
          </a>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate={activeLink === item.href ? "active" : "visible"}
                whileHover="hover"
                variants={itemVariants}
              >
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={`relative group text-sm uppercase tracking-wider font-medium px-1 ${
                    activeLink === item.href ? 'text-sky-700' : 'text-sky-600 hover:text-sky-800'
                  }`}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeLink === item.href ? '100%' : 0,
                      backgroundColor: activeLink === item.href ? '#0284c7' : '#7dd3fc'
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </a>
              </motion.div>
            ))}
            <motion.a
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-sky-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-lg ml-2"
            >
              Agenda una cita
            </motion.a>
          </div>

          {/* Botón de menú móvil */}
          <motion.button 
            className="md:hidden text-sky-700 focus:outline-none relative z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menú de navegación"
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              initial={false}
              className="flex flex-col items-end space-y-1.5 w-6"
            >
              <motion.span
                className="w-full h-[2px] bg-sky-600 rounded-full"
                variants={{
                  closed: { width: "100%", y: 0, rotate: 0 },
                  open: { width: "100%", y: 6, rotate: 45 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-3/4 h-[2px] bg-sky-600 rounded-full"
                variants={{
                  closed: { opacity: 1, width: "75%" },
                  open: { opacity: 0, width: 0 }
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="w-full h-[2px] bg-sky-600 rounded-full"
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

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-16 left-0 right-0 bg-white shadow-xl z-40 md:hidden overflow-hidden border-t border-sky-100"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(e, item.href)
                      }}
                      className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                        activeLink === item.href 
                          ? 'bg-sky-100 text-sky-700 font-semibold' 
                          : 'text-sky-600 hover:bg-sky-50'
                      }`}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full mr-3 bg-sky-400"
                        animate={{
                          scale: activeLink === item.href ? [1, 1.2, 1] : 1
                        }}
                        transition={{ 
                          duration: 0.6,
                          repeat: activeLink === item.href ? Infinity : 0
                        }}
                      />
                      <span className="font-medium text-sm uppercase tracking-wider">
                        {item.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  variants={mobileItemVariants}
                  className="pt-2 pb-1"
                >
                  <motion.a
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="block bg-sky-600 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg text-center"
                  >
                    Agenda una cita
                  </motion.a>
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