'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const OpinionsComponent = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [opinions, setOpinions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Referencias para el slider
  const sliderRef = useRef(null)
  const intervalRef = useRef(null)

  // --- 1. Fetch de datos ---
  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        // Simulación de fetch (reemplaza con tu endpoint real)
        const response = await fetch('/api/opinions')
        if (!response.ok) throw new Error('Error al cargar opiniones')
        const data = await response.json()
        setOpinions(data)
      } catch (err) {
        // Fallback data para visualización si falla el fetch o para pruebas
        
        // Descomentar la siguiente línea para usar error real:
        // setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOpinions()
  }, [])

  // --- 2. Lógica de Filtrado y Slider ---
  const filteredOpinions = activeTab === 'all' 
    ? opinions 
    : opinions.filter(opinion => opinion.rating === parseInt(activeTab))

  const averageRating = opinions.length > 0 
    ? (opinions.reduce((sum, o) => sum + o.rating, 0) / opinions.length).toFixed(1)
    : '0.0'

  // Agrupar en bloques de 3 para desktop, 1 para móvil se maneja con CSS/width
  const itemsPerSlide = 3
  const totalSlides = Math.ceil(filteredOpinions.length / itemsPerSlide)
  
  const groupedOpinions = useCallback(() => {
    const groups = []
    for (let i = 0; i < filteredOpinions.length; i += itemsPerSlide) {
      groups.push(filteredOpinions.slice(i, i + itemsPerSlide))
    }
    return groups
  }, [filteredOpinions])

  const groups = groupedOpinions()

  // --- 3. Autoplay ---
  useEffect(() => {
    const startAutoPlay = () => {
      if (groups.length <= 1) return
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentSlide(prev => (prev + 1) % groups.length)
        }
      }, 6000) // 6 segundos para dar tiempo a leer
    }
    startAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [groups.length, isHovered])

  // --- 4. Renderizado de Estrellas ---
  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'}`} 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  // --- 5. Handlers de Navegación ---
  const handleDotClick = (index) => {
    setCurrentSlide(index)
    clearInterval(intervalRef.current)
  }

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + groups.length) % groups.length)
    clearInterval(intervalRef.current)
  }

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % groups.length)
    clearInterval(intervalRef.current)
  }

  // --- 6. Render Condicional (Loading/Error) ---
  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center bg-sky-50/50">
       <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"/>
       <p className="text-sky-800 text-sm font-medium animate-pulse">Cargando experiencias...</p>
    </div>
  )

  if (error || opinions.length === 0) return null // Ocultar sección si no hay datos

  return (
    <section className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Testimonios Reales
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-sky-950 mb-4"
          >
            Lo que dicen mis pacientes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Historias de sanación y crecimiento personal que inspiran confianza.
          </motion.p>
        </div>

        {/* --- Controles de Filtro --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['all', '5', '4'].map((tab) => {
                const isAll = tab === 'all'
                const count = isAll ? opinions.length : opinions.filter(o => o.rating === parseInt(tab)).length
                if (count === 0) return null
                
                return (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setCurrentSlide(0); }}
                        className={`
                            relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                            ${activeTab === tab 
                                ? 'bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-200 scale-105' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700'
                            }
                        `}
                    >
                        {isAll ? 'Ver todas' : `${tab} Estrellas`}
                        <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {count}
                        </span>
                    </button>
                )
            })}
        </div>

        {/* --- Slider Container --- */}
        <div 
          className="relative px-0 md:px-12" // Padding lateral para flechas en desktop
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Flecha Izquierda */}
          <button 
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg text-slate-400 hover:text-sky-600 hover:scale-110 transition-all"
            disabled={groups.length <= 1}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Carrusel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {groups.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                  
                  {group.map((opinion) => (
                    <article 
                      key={opinion.id}
                      className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-sky-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-[320px] group"
                    >
                      {/* Icono decorativo de fondo */}
                      <div className="absolute top-4 right-6 text-sky-100 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                        <svg width="60" height="60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.096 14.017 14.742 14.453 13.937C14.906 13.101 15.551 12.554 16.392 12.296L16.892 12.15L16.964 12.144C17.615 12.144 18.232 12.597 18.508 13.212C18.667 13.565 18.622 13.978 18.397 14.288L18.338 14.36L18.272 14.417C18.068 14.576 17.925 14.801 17.882 15.056C17.846 15.263 17.893 15.474 18.014 15.651L18.082 15.74L18.175 15.823C18.675 16.223 19.397 16.143 19.824 15.666C20.315 15.116 20.573 14.439 20.573 13.693C20.573 12.396 20.082 11.235 19.208 10.287C18.318 9.32 17.069 8.815 15.719 8.815C14.956 8.815 14.249 8.951 13.627 9.208C12.428 9.704 11.455 10.612 10.909 11.751C10.375 12.868 10.16 14.153 10.16 16.5L10.16 21L14.017 21ZM4.017 21L4.017 18C4.017 16.096 4.017 14.742 4.453 13.937C4.906 13.101 5.551 12.554 6.392 12.296L6.892 12.15L6.964 12.144C7.615 12.144 8.232 12.597 8.508 13.212C8.667 13.565 8.622 13.978 8.397 14.288L8.338 14.36L8.272 14.417C8.068 14.576 7.925 14.801 7.882 15.056C7.846 15.263 7.893 15.474 8.014 15.651L8.082 15.74L8.175 15.823C8.675 16.223 9.397 16.143 9.824 15.666C10.315 15.116 10.573 14.439 10.573 13.693C10.573 12.396 10.082 11.235 9.208 10.287C8.318 9.32 7.069 8.815 5.719 8.815C4.956 8.815 4.249 8.951 3.627 9.208C2.428 9.704 1.455 10.612 0.909 11.751C0.375 12.868 0.16 14.153 0.16 16.5L0.16 21L4.017 21Z" /></svg>
                      </div>

                      {/* Header de la tarjeta */}
                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        {/* Avatar con Iniciales */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-lg shadow-inner">
                            {opinion.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                                {opinion.name}
                                {/* Icono de verificado */}
                                <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            </h4>
                            <p className="text-xs text-sky-600 font-medium">{opinion.role}</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            {renderStars(opinion.rating)}
                            <span className="text-[10px] text-slate-400 mt-1">{opinion.date}</span>
                        </div>
                      </div>

                      {/* Cuerpo scrollable - La solución elegante para texto largo */}
                      <div className="flex-grow overflow-hidden relative group-hover:overflow-y-auto custom-scrollbar pr-2 mb-2 z-10">
                        <p className="text-slate-600 text-[15px] leading-relaxed italic">
                            "{opinion.content}"
                        </p>
                      </div>

                      {/* Pie de tarjeta sutil */}
                      <div className="pt-3 border-t border-slate-50 mt-auto">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Opinión Verificada</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online"></div>
                        </div>
                      </div>
                    </article>
                  ))}
                  
                  {/* Rellenar huecos si el grupo tiene menos de 3 items */}
                  {[...Array(itemsPerSlide - group.length)].map((_, i) => (
                    <div key={`empty-${i}`} className="hidden md:block" />
                  ))}

                </div>
              ))}
            </div>
          </div>

          {/* Flecha Derecha */}
          <button 
            onClick={handleNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg text-slate-400 hover:text-sky-600 hover:scale-110 transition-all"
            disabled={groups.length <= 1}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* --- Paginación (Dots) --- */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === i 
                    ? 'w-8 h-2 bg-sky-600' 
                    : 'w-2 h-2 bg-slate-300 hover:bg-sky-400'
                }`}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Resumen Final */}
        <div className="mt-12 text-center border-t border-sky-100 pt-8 max-w-xs mx-auto">
            <div className="flex justify-center items-end gap-2 mb-1">
                <span className="text-3xl font-bold text-sky-950">{averageRating}</span>
                <div className="flex mb-1.5 gap-0.5">
                     {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
            </div>
            <p className="text-xs text-slate-500">Puntuación media basada en {opinions.length} opiniones</p>
        </div>

      </div>

      {/* Estilos globales para el scrollbar fino y elegante */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .group:hover .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }
      `}</style>
    </section>
  )
}

export default OpinionsComponent