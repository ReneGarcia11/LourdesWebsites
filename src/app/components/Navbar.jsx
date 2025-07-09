'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { throttle } from 'lodash'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Datos de navegación
  const navItems = [
    { name: 'Inicio', path: '/', id: 'home' },
    { name: 'Servicios', path: '/servicios', id: 'servicios' },
    { name: 'Enfoque', path: '/enfoque', id: 'enfoque' },
    { name: 'Opiniones', path: '/opiniones', id: 'opiniones' },
    { name: 'Ubicación', path: '/ubicacion', id: 'ubicacion' }
  ]

  // Efecto para el scroll con throttle
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    const throttledScroll = throttle(handleScroll, 100)
    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  // Efecto para deshabilitar scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  // Manejo de navegación
  const handleNavigation = (path) => {
    setMobileMenuOpen(false)
    router.push(path)
  }

  // Animaciones
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.2 }
    },
    exit: { opacity: 0, height: 0 }
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
          <Link 
            href="/" 
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded-md"
            aria-label="Ir al inicio"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white bg-white">
              <Image 
                src="/images/Logo1.png"
                alt="Psicóloga Lourdes Ramírez"
                width={48}
                height={48}
                className="object-cover"
                quality={85}
                priority
                sizes="(max-width: 768px) 48px, 48px"
              />
            </div>
            <div className="ml-3">
              <p className="text-sky-800 font-bold text-sm sm:text-base">Psic. Lourdes</p>
              <p className="text-xs text-sky-500 hidden sm:block">Psicología Clínica</p>
            </div>
          </Link>

          {/* Skip to content link (accesibilidad) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:text-sky-700 focus:font-bold focus:z-50"
          >
            Saltar al contenido
          </a>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Link
                  href={item.path}
                  className={`relative py-2 px-3 text-sm uppercase font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded-md ${
                    pathname === item.path ? 'text-sky-700' : 'text-sky-600 hover:text-sky-800'
                  }`}
                  aria-current={pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500"
                      layoutId="navUnderline"
                      transition={{ type: 'spring' }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Botón destacado "Agenda tu cita" */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={navItems.length}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contacto"
                className="relative py-2 px-4 text-sm uppercase font-bold bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-full shadow-md hover:shadow-lg transition-all hover:from-sky-700 hover:to-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Agenda tu cita
                <motion.span 
                  className="absolute inset-0 border-2 border-white rounded-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Botón de menú móvil */}
          <button 
            className="md:hidden text-sky-700 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
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
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menú */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="md:hidden bg-white shadow-lg overflow-hidden fixed w-full z-50"
              >
                <div className="container mx-auto px-4 py-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className="border-b border-sky-50"
                    >
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`block w-full text-left py-4 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded-md ${
                          pathname === item.path 
                            ? 'text-sky-700 font-semibold' 
                            : 'text-sky-600 hover:text-sky-800'
                        }`}
                      >
                        {item.name}
                        {pathname === item.path && (
                          <span className="ml-2 text-sky-500">•</span>
                        )}
                      </button>
                    </motion.div>
                  ))}
                  {/* Botón destacado en móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                    className="pt-4 pb-6"
                  >
                    <button
                      onClick={() => handleNavigation('/contacto')}
                      className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-bold rounded-md shadow-md hover:from-sky-700 hover:to-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    >
                      AGENDA TU CITA
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Espacio para el navbar fixed */}
      <div className="h-16 md:h-20"></div>
    </>
  )
}

export default Navbar