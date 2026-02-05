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

  const navItems = [
    { name: 'Inicio', path: '/', id: 'home' },
    { name: 'Servicios', path: '/servicios', id: 'servicios' },
    { name: 'Enfoque', path: '/enfoque', id: 'enfoque' },
    { name: 'Opiniones', path: '/opiniones', id: 'opiniones' },
    { name: 'Ubicación', path: '/ubicacion', id: 'ubicacion' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    const throttledScroll = throttle(handleScroll, 100)
    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [mobileMenuOpen])

  const handleNavigation = (path) => {
    setMobileMenuOpen(false)
    router.push(path)
  }

  // Variantes de animación refinadas
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md border-sky-100 shadow-sm py-2' 
            : 'bg-white border-transparent py-3'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* --- LOGO --- */}
            <Link 
              href="/" 
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
              aria-label="Ir al inicio"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-sky-100 shadow-sm group-hover:shadow-md transition-shadow">
                <Image 
                  src="/images/Logo1.png"
                  alt="Psicóloga Lourdes Ramírez"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sky-900 font-bold text-base sm:text-lg leading-tight tracking-tight group-hover:text-sky-700 transition-colors">
                  Psic. Lourdes
                </span>
                <span className="text-[11px] sm:text-xs text-sky-500 font-medium uppercase tracking-wider">
                  Psicología Clínica
                </span>
              </div>
            </Link>

            {/* --- NAVEGACIÓN DESKTOP --- */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                      isActive ? 'text-sky-700' : 'text-sky-600'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBubble"
                        className="absolute inset-0 bg-sky-50 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.name}
                  </Link>
                )
              })}

              {/* Botón CTA Desktop */}
              <motion.div 
                className="pl-4"
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contacto"
                  className="relative flex items-center gap-2 py-2.5 px-6 text-sm font-bold bg-gradient-to-r from-sky-600 to-sky-800 text-white rounded-full shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  <span>Agenda tu cita</span>
                  <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* --- BOTÓN HAMBURGUESA --- */}
            <button 
              className="md:hidden p-2 text-sky-700 hover:bg-sky-50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Alternar menú"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} 
                  className="w-full h-0.5 bg-current rounded-full origin-center transition-transform"
                />
                <motion.span 
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
                  className="w-full h-0.5 bg-current rounded-full transition-opacity"
                />
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
                  className="w-full h-0.5 bg-current rounded-full origin-center transition-transform"
                />
              </div>
            </button>
          </div>
        </div>

        {/* --- MENÚ MÓVIL (Dropdown Flotante) --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[60px] bg-sky-900/20 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Menú Card */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="absolute top-full left-0 right-0 p-4 md:hidden z-50"
              >
                <div className="bg-white rounded-2xl shadow-xl shadow-sky-900/10 border border-sky-100 overflow-hidden">
                  <div className="p-2 space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                          pathname === item.path 
                            ? 'bg-sky-50 text-sky-800' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-sky-600'
                        }`}
                      >
                        {item.name}
                        {pathname === item.path && (
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-sky-50 bg-sky-50/30">
                    <button
                      onClick={() => handleNavigation('/contacto')}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex justify-center items-center gap-2"
                    >
                      Agendar Cita
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer para evitar saltos de contenido */}
      <div className="h-[72px] sm:h-[80px]" />
    </>
  )
}

export default Navbar