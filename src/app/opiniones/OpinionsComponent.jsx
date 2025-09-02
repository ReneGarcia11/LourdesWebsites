'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const OpinionsComponent = () => {
  // 1. Estados del componente
  const [activeTab, setActiveTab] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [opinions, setOpinions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedOpinions, setExpandedOpinions] = useState({})
  const sliderRef = useRef(null)
  const intervalRef = useRef(null)

  // 2. Fetch de opiniones
  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch('/api/opinions')
        if (!response.ok) throw new Error('Error al cargar opiniones')
        const data = await response.json()
        setOpinions(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOpinions()
  }, [])

  // 3. Alternar expansión de opinión
  const toggleOpinionExpansion = (id) => {
    setExpandedOpinions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // 4. Renderizado de estrellas mejorado
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-5 h-5 transition-transform duration-200 ${i < rating ? 'text-amber-400 scale-110' : 'text-gray-300'}`}
        aria-label={`${rating} estrellas`}
        aria-hidden={i >= rating}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full drop-shadow-sm">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    ))
  }

  // 5. Filtrado y cálculos
  const filteredOpinions = activeTab === 'all' 
    ? opinions 
    : opinions.filter(opinion => opinion.rating === parseInt(activeTab))

  const averageRating = opinions.length > 0 
    ? (opinions.reduce((sum, o) => sum + o.rating, 0) / opinions.length).toFixed(1)
    : '0.0'

  // 6. Agrupamiento de opiniones
  const groupedOpinions = useCallback(() => {
    const groups = []
    for (let i = 0; i < filteredOpinions.length; i += 3) {
      groups.push(filteredOpinions.slice(i, i + 3))
    }
    return groups
  }, [filteredOpinions])

  const groups = groupedOpinions()

  // 7. Autoplay del slider
  useEffect(() => {
    const startAutoPlay = () => {
      if (groups.length <= 1) return
      
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentSlide(prev => (prev + 1) % groups.length)
        }
      }, 5000)
    }

    startAutoPlay()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [groups.length, isHovered])

  // 8. Funciones de navegación
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    resetInterval()
  }, [])

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + groups.length) % groups.length)
    resetInterval()
  }, [groups.length])

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % groups.length)
    resetInterval()
  }, [groups.length])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isHovered && groups.length > 1) {
        setCurrentSlide(prev => (prev + 1) % groups.length)
      }
    }, 5000)
  }, [groups.length, isHovered])

  // 9. Estados de carga mejorados
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
        </div>
        <p className="mt-4 text-sky-700 font-medium">Cargando opiniones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl max-w-md mx-auto p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium">Error al cargar las opiniones</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    )
  }

  if (opinions.length === 0) {
    return (
      <div className="text-center py-12 bg-sky-50 rounded-xl max-w-md mx-auto p-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-sky-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p className="text-sky-700 font-medium">Actualmente no hay opiniones disponibles</p>
      </div>
    )
  }

  // 10. Render principal modernizado
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">Opiniones de Nuestros Pacientes</h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
          <p className="text-lg text-sky-700 max-w-2xl mx-auto">
            Descubre las experiencias de quienes han confiado en nuestros servicios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            onClick={() => {
              setActiveTab('all')
              setCurrentSlide(0)
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
              activeTab === 'all' 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' 
                : 'bg-white text-sky-700 hover:bg-sky-50 shadow-md hover:shadow-lg'
            }`}
            aria-label="Mostrar todas las opiniones"
          >
            <span>Todas</span>
            <span className="ml-2 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{opinions.length}</span>
          </button>
          {[5, 4].map(rating => {
            const count = opinions.filter(o => o.rating === rating).length
            return (
              <button
                key={rating}
                onClick={() => {
                  setActiveTab(rating.toString())
                  setCurrentSlide(0)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === rating.toString() 
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' 
                    : 'bg-white text-sky-700 hover:bg-sky-50 shadow-md hover:shadow-lg'
                }`}
                aria-label={`Mostrar opiniones de ${rating} estrellas`}
              >
                <div className="flex gap-0.5">
                  {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs bg-sky-100 text-sky-700 rounded-full h-5 w-5 flex items-center justify-center">{count}</span>
              </button>
            )
          })}
        </motion.div>

        <div 
          className="relative overflow-hidden mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${groups.length * 100}%`
            }}
          >
            {groups.map((group, groupIndex) => (
              <div key={groupIndex} className="w-full flex-shrink-0 px-3">
                <div className="grid md:grid-cols-3 gap-6">
                  {group.map((opinion) => {
                    const isExpanded = expandedOpinions[opinion.id]
                    const needsTruncation = opinion.content.length > 180
                    
                    return (
                      <motion.div
                        key={opinion.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-sky-100/30 flex flex-col h-full group"
                        itemScope
                        itemType="https://schema.org/Review"
                      >
                        <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemProp="ratingValue" content={opinion.rating} />
                          <meta itemProp="bestRating" content="5" />
                          {renderStars(opinion.rating)}
                        </div>
                        
                        <blockquote 
                          className={`text-sky-800 text-base leading-relaxed mb-4 flex-grow relative before:content-['“'] before:absolute before:-left-1 before:-top-2 before:text-4xl before:text-sky-200 before:font-serif before:leading-none before:opacity-70 before:z-0 pl-4 ${
                            !isExpanded && needsTruncation ? 'line-clamp-5' : ''
                          }`} 
                          itemProp="reviewBody"
                        >
                          <span className="relative z-10">"{opinion.content}"</span>
                        </blockquote>
                        
                        {needsTruncation && (
                          <button
                            onClick={() => toggleOpinionExpansion(opinion.id)}
                            className="text-sky-600 hover:text-sky-800 text-sm font-medium mb-4 self-start flex items-center transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                <span>Leer menos</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </>
                            ) : (
                              <>
                                <span>Leer más</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </>
                            )}
                          </button>
                        )}
                        
                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-sky-100">
                          <div>
                            <p className="font-semibold text-sky-900 text-sm" itemProp="author">{opinion.name}</p>
                            <p className="text-xs text-sky-600 mt-1">{opinion.role}</p>
                          </div>
                          <span className="text-xs text-sky-500 bg-sky-50 py-1 px-2 rounded-full" itemProp="datePublished">{opinion.date}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {groups.length > 1 && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Opinión anterior"
              >
                <svg className="w-5 h-5 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Siguiente opinión"
              >
                <svg className="w-5 h-5 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {groups.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {groups.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-sky-600 w-6' : 'bg-sky-300 hover:bg-sky-400'
                }`}
                aria-label={`Ir a opiniones ${index + 1}`}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-sky-100/50 text-center max-w-md mx-auto mt-10 shadow-md"
          itemScope
          itemType="https://schema.org/AggregateRating"
        >
          <div className="flex justify-center items-center gap-2 mb-2">
            {renderStars(Math.round(parseFloat(averageRating)))}
            <span className="text-xl font-bold text-sky-900 ml-1" itemProp="ratingValue">{averageRating}</span>
            <span className="text-lg text-sky-700">/</span>
            <span className="text-lg text-sky-700" itemProp="bestRating">5</span>
          </div>
          <p className="text-sm text-sky-700">
            Basado en <span className="font-semibold" itemProp="reviewCount">{opinions.length}</span> opiniones
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default OpinionsComponent