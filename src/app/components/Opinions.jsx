'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

const Opinions = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [opinions, setOpinions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sliderRef = useRef(null)
  const intervalRef = useRef(null)

  // Fetch opinions from API
  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch('/api/opinions')
        if (!response.ok) throw new Error('Failed to fetch opinions')
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        aria-label={`${i + 1} star${i !== 0 ? 's' : ''}`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    ))
  }

  const filteredOpinions = activeTab === 'all' 
    ? opinions 
    : opinions.filter(opinion => opinion.rating === parseInt(activeTab))

  const averageRating = opinions.length > 0 
    ? (opinions.reduce((sum, o) => sum + o.rating, 0) / opinions.length).toFixed(1)
    : '0.0'

  const groupedOpinions = useCallback(() => {
    const groups = []
    for (let i = 0; i < filteredOpinions.length; i += 3) {
      groups.push(filteredOpinions.slice(i, i + 3))
    }
    return groups
  }, [filteredOpinions])

  const groups = groupedOpinions()

  // Auto-play slider effect
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

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    resetInterval()
  }, [groups.length, isHovered])

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + groups.length) % groups.length)
    resetInterval()
  }, [groups.length, isHovered])

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % groups.length)
    resetInterval()
  }, [groups.length, isHovered])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isHovered && groups.length > 1) {
        setCurrentSlide(prev => (prev + 1) % groups.length)
      }
    }, 5000)
  }, [groups.length, isHovered])

  if (loading) {
    return (
      <section id="opiniones" className="py-12 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p>Cargando opiniones...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="opiniones" className="py-12 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4 sm:px-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </section>
    )
  }

  if (opinions.length === 0) {
    return (
      <section id="opiniones" className="py-12 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p>No hay opiniones disponibles</p>
        </div>
      </section>
    )
  }

  return (
    <section id="opiniones" className="py-12 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">Opiniones de Pacientes</h2>
          <p className="text-base text-sky-700 max-w-2xl mx-auto">
            Experiencias reales que demuestran la calidad de nuestro servicio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          <button
            onClick={() => {
              setActiveTab('all')
              setCurrentSlide(0)
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-sky-600 text-white shadow-md' 
                : 'bg-white text-sky-700 hover:bg-sky-50'
            }`}
          >
            Todas
          </button>
          {[5, 4].map(rating => (
            <button
              key={rating}
              onClick={() => {
                setActiveTab(rating.toString())
                setCurrentSlide(0)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                activeTab === rating.toString() 
                  ? 'bg-sky-600 text-white shadow-md' 
                  : 'bg-white text-sky-700 hover:bg-sky-50'
              }`}
            >
              {rating} estrellas
            </button>
          ))}
        </motion.div>

        <div 
          className="relative overflow-hidden mb-6"
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
              <div key={groupIndex} className="w-full flex-shrink-0 px-2">
                <div className="grid md:grid-cols-3 gap-4">
                  {group.map((opinion) => (
                    <motion.div
                      key={opinion.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-sky-100/50 h-full flex flex-col"
                    >
                      <div className="flex gap-1 mb-2">
                        {renderStars(opinion.rating)}
                      </div>
                      <blockquote className="text-sky-800 text-sm italic mb-3 flex-grow">
                        "{opinion.content}"
                      </blockquote>
                      <div className="flex justify-between items-center mt-auto">
                        <div>
                          <p className="font-medium text-sky-900 text-sm">{opinion.name}</p>
                          <p className="text-xs text-sky-600">{opinion.role}</p>
                        </div>
                        <span className="text-xs text-sky-500">{opinion.date}</span>
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10"
                aria-label="Anterior"
              >
                <svg className="w-4 h-4 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md z-10"
                aria-label="Siguiente"
              >
                <svg className="w-4 h-4 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {groups.length > 1 && (
            <div className="flex justify-center mt-4 gap-1.5">
              {groups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-sky-600 w-4' : 'bg-sky-300'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-sky-100 text-center max-w-md mx-auto"
        >
          <div className="flex justify-center items-center gap-1.5 mb-1">
            {renderStars(Math.round(parseFloat(averageRating)))}
            <span className="text-base font-bold text-sky-900">{averageRating}/5</span>
          </div>
          <p className="text-xs text-sky-700">
            Basado en {opinions.length} Opiniones {opinions.length !== 1 ? 's' : ''} verificado{opinions.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Opinions