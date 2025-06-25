'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const initialOpinions = [
  {
    id: 1,
    name: "Ana Martínez",
    role: "Paciente",
    content: "La Dra. Ramírez me ayudó a superar una depresión severa. Su enfoque profesional y humano hizo toda la diferencia.",
    rating: 5,
    date: "15/10/2023"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Paciente",
    content: "Excelente profesional. Las herramientas que me proporcionó me han ayudado a manejar mi ansiedad efectivamente.",
    rating: 5,
    date: "02/11/2023"
  },
  {
    id: 3,
    name: "María González",
    role: "Paciente",
    content: "El acompañamiento durante mi proceso de duelo fue fundamental. Recomiendo ampliamente sus servicios.",
    rating: 4,
    date: "20/09/2023"
  }
]

const Opinions = () => {
  const [opinions, setOpinions] = useState(initialOpinions)
  const [newOpinion, setNewOpinion] = useState({
    name: '',
    role: 'Paciente',
    content: '',
    rating: 5
  })
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const renderStars = (rating, interactive = false, onChange = null) => {
    return [...Array(5)].map((_, i) => {
      const starContent = (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );

      return interactive ? (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          className={`cursor-pointer hover:scale-110 w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          aria-label={`Calificación ${i + 1} estrella${i !== 0 ? 's' : ''}`}
        >
          {starContent}
        </button>
      ) : (
        <div
          key={i}
          className={`cursor-default w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          aria-label={`Calificación ${i + 1} estrella${i !== 0 ? 's' : ''}`}
        >
          {starContent}
        </div>
      );
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewOpinion(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating) => {
    setNewOpinion(prev => ({ ...prev, rating }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const today = new Date()
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    
    const newOpinionWithId = {
      ...newOpinion,
      id: opinions.length + 1,
      date: formattedDate
    }
    
    setOpinions(prev => [newOpinionWithId, ...prev])
    setNewOpinion({
      name: '',
      role: 'Paciente',
      content: '',
      rating: 5
    })
    setShowForm(false)
  }

  const filteredOpinions = activeTab === 'all' 
    ? opinions 
    : opinions.filter(opinion => opinion.rating === parseInt(activeTab))

  return (
    <section id="opiniones" className="py-12 bg-sky-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">Opiniones de Pacientes</h2>
          <p className="text-sky-700">Comparte tu experiencia con nosotros</p>
        </motion.div>

        {/* Controles principales */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full text-sm ${activeTab === 'all' ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
              aria-pressed={activeTab === 'all'}
            >
              Todas ({opinions.length})
            </button>
            {[5, 4, 3].map(rating => {
              const count = opinions.filter(o => o.rating === rating).length
              return count > 0 && (
                <button
                  key={rating}
                  onClick={() => setActiveTab(rating.toString())}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${activeTab === rating.toString() ? 'bg-sky-600 text-white' : 'bg-white text-sky-700'}`}
                  aria-pressed={activeTab === rating.toString()}
                >
                  <div className="flex">
                    {renderStars(rating)}
                  </div>
                  ({count})
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
            aria-expanded={showForm}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Cancelar' : 'Nueva Opinión'}
          </button>
        </div>

        {/* Formulario compacto */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mb-6 bg-white p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-sky-900 mb-3">Escribe tu opinión</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label htmlFor="name" className="sr-only">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newOpinion.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="sr-only">Opinión</label>
                  <textarea
                    id="content"
                    name="content"
                    value={newOpinion.content}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Describe tu experiencia..."
                    className="w-full px-3 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <label className="sr-only">Calificación</label>
                  <div className="flex space-x-1">
                    {renderStars(newOpinion.rating, true, handleRatingChange)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    name="role"
                    value={newOpinion.role}
                    onChange={handleInputChange}
                    className="px-2 py-1 border border-sky-300 rounded-lg text-sm"
                  >
                    <option value="Paciente">Paciente</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Colega">Colega</option>
                  </select>
                  
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1 rounded-lg text-sm font-medium"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Listado de opiniones */}
        {filteredOpinions.length > 0 ? (
          <div className="space-y-4">
            {filteredOpinions.map((opinion) => (
              <motion.div
                key={opinion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-sky-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex">
                    {renderStars(opinion.rating)}
                  </div>
                  <span className="text-xs text-sky-500">{opinion.date}</span>
                </div>
                <p className="text-sky-800 text-sm mb-3">"{opinion.content}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sky-900 text-sm">{opinion.name}</p>
                    <p className="text-xs text-sky-600">{opinion.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-white rounded-lg border border-sky-100">
            <p className="text-sky-700 text-sm">No hay opiniones con esta calificación</p>
          </div>
        )}

        {/* Resumen estadístico simple */}
        <div className="mt-6 bg-white p-3 rounded-lg border border-sky-100 text-center">
          <p className="text-sm text-sky-900">
            <span className="font-medium">Valoración promedio: </span>
            {(opinions.reduce((sum, o) => sum + o.rating, 0) / opinions.length).toFixed(1)}/5
            {' '}({opinions.length} opiniones)
          </p>
        </div>
      </div>
    </section>
  )
}

export default Opinions