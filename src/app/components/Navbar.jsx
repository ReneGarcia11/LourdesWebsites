'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

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

  // Función mejorada para scroll que funciona en móviles
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    setActiveLink(sectionId)
    setMobileMenuOpen(false)

    const element = document.querySelector(sectionId)
    if (element) {
      const offset = window.innerWidth < 768 ? 100 : 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Enfoque', href: '#objetives' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'Contacto', href: '#contact' },
  ]

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
      transition: { duration: 0.2 }
    },
    active: {
      color: '#0284c7',
      scale: 1.05
    }
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, height: 0 }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.97)',
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(6px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
        }}
        className="fixed w-full z-50 py-2 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white bg-white">
              <Image 
                src="/images/Logo1.png"
                alt="Logo Psicóloga Lourdes"
                width={48}
                height={48}
                className="object-cover"
                priority
              />
            </div>
            <div className="ml-3">
              <p className="text-sky-800 font-bold text-sm sm:text-base">Psic. Lourdes</p>
              <p className="text-xs text-sky-500 hidden sm:block">Psicología Clínica</p>
            </div>
          </a>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative py-2 text-sm uppercase font-medium ${
                  activeLink === item.href ? 'text-sky-700' : 'text-sky-600 hover:text-sky-800'
                }`}
              >
                {item.name}
                {activeLink === item.href && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500"
                    layoutId="navUnderline"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-md ml-2 transition-all"
            >
              Agenda una cita
            </a>
          </div>

          {/* Botón de menú móvil */}
          <button 
            className="md:hidden text-sky-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden bg-white shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-4 py-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={mobileItemVariants}
                    className="border-b border-sky-50 last:border-0"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`block py-4 px-2 ${
                        activeLink === item.href 
                          ? 'text-sky-700 font-semibold' 
                          : 'text-sky-600 hover:text-sky-800'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
                <div className="py-4 px-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="block bg-sky-600 hover:bg-sky-700 text-white text-center py-3 rounded-full font-semibold text-sm shadow-md transition-all"
                  >
                    Agenda una cita
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar