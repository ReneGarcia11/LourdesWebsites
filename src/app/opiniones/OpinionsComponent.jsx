'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const OpinionsComponent = () => {
  // 1. Estados del componente
  const [activeTab, setActiveTab] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [opinions, setOpinions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [itemsPerGroup, setItemsPerGroup] = useState(2)
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

  // 3. Responsive items per group
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setItemsPerGroup(window.innerWidth < 768 ? 1 : 2)
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 4. Renderizado de estrellas mejorado
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        aria-label={`${rating} estrellas`}
        aria-hidden={i >= rating}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
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
    ? (opinions.reduce((sum, o) => sum + o.rating, 0) / opinions.length
): 0

  // 6. Agrupamiento de opiniones
  const groupedOpinions = useCallback(() => {
    const groups = []
    for (let i = 0; i < filteredOpinions.length; i += itemsPerGroup) {
      groups.push(filteredOpinions.slice(i, i + itemsPerGroup))
    }
    return groups
  }, [filteredOpinions, itemsPerGroup])

  const groups = groupedOpinions()

  // 7. Autoplay del slider más lento (8s)
  useEffect(() => {
    const startAutoPlay = () => {
      if (groups.length <= 1) return
      
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentSlide(prev => (prev + 1) % groups.length)
        }
      }, 8000)
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
    }, 8000)
  }, [groups.length, isHovered])

  // 9. Estados de carga
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse flex space-x-4 justify-center">
          <div className="rounded-full bg-sky-200 h-12 w-12"></div>
        </div>
        <p className="mt-4 text-sky-700">Cargando opiniones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error al cargar las opiniones: {error}</p>
      </div>
    )
  }

  if (opinions.length === 0) {
    return (
      <div className="text-center py-12 text-sky-700">
        <p>Actualmente no hay opiniones disponibles</p>
      </div>
    )
  }

  // 10. Render principal mejorado
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-3">Opiniones de Nuestros Pacientes</h2>
        <p className="text-lg text-sky-700 max-w-2xl mx-auto">
          Lo que dicen quienes han confiado en nuestro servicio
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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'all' 
              ? 'bg-sky-600 text-white shadow-md' 
              : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-200'
          }`}
          aria-label="Mostrar todas las opiniones"
        >
          Todas ({opinions.length})
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                activeTab === rating.toString() 
                  ? 'bg-sky-600 text-white shadow-md' 
                  : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-200'
              }`}
              aria-label={`Mostrar opiniones de ${rating} estrellas`}
            >
              {renderStars(rating)}
              <span>({count})</span>
            </button>
          )
        })}
      </motion.div>

      <div 
        className="relative overflow-hidden mb-10 px-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${groups.length * 100}%`
          }}
        >
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="w-full flex-shrink-0 px-2">
              <div className={`grid ${itemsPerGroup === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                {group.map((opinion) => (
                  <motion.div
                    key={opinion.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-sky-100/50 h-full flex flex-col"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content={opinion.rating} />
                      <meta itemProp="bestRating" content="5" />
                      {renderStars(opinion.rating)}
                    </div>
                    <blockquote 
                      className="text-sky-800 text-base leading-relaxed mb-4 flex-grow line-clamp-5 hover:line-clamp-none transition-all"
                      itemProp="reviewBody"
                    >
                      <span className="italic">"{opinion.content}"</span>
                    </blockquote>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-sky-100">
                      <div>
                        <p className="font-medium text-sky-900 text-base" itemProp="author">{opinion.name}</p>
                        <p className="text-sm text-sky-600">{opinion.role}</p>
                      </div>
                      <span className="text-sm text-sky-500 whitespace-nowrap" itemProp="datePublished">{opinion.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {groups.length > 1 && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110 ml-2"
              aria-label="Opinión anterior"
            >
              <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110 mr-2"
              aria-label="Siguiente opinión"
            >
              <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {groups.length > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {groups.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-sky-600 w-6' : 'bg-sky-300'
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
        className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-sky-100 text-center max-w-md mx-auto mt-12 shadow-sm"
        itemScope
        itemType="https://schema.org/AggregateRating"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <div className="text-3xl font-bold text-sky-900 mb-1" itemProp="ratingValue">
            {averageRating.toFixed(1)}
            <span className="text-xl text-sky-600">/5</span>
          </div>
          <p className="text-sm text-sky-700">
            Basado en <span itemProp="reviewCount">{opinions.length}</span> {opinions.length === 1 ? 'opinión' : 'opiniones'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default OpinionsComponent