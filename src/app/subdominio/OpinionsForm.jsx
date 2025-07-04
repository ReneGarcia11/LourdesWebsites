'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const OpinionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/opinions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al enviar la opinión')
      }

      setSubmitSuccess(true)
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => handleRatingChange(i + 1)}
        className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
        aria-label={`${i + 1} estrella${i !== 0 ? 's' : ''}`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ))
  }

  if (submitSuccess) {
    return (
      <section id="deja-tu-opinion" className="py-12 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-sky-100/50 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-sky-900 mb-2">¡Gracias por tu opinión!</h3>
              <p className="text-sky-700">Tu testimonio ha sido enviado correctamente.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="deja-tu-opinion" className="py-12 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">Deja tu opinión</h2>
          <p className="text-base text-sky-700 max-w-2xl mx-auto">
            Comparte tu experiencia con nuestro servicio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm border border-sky-100/50">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sky-800 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sky-900"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-sky-800 mb-1">
                    ¿Cómo nos conociste? (Opcional)
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sky-900"
                    placeholder="Ej: Paciente, Cliente, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-800 mb-1">
                    Valoración
                  </label>
                  <div className="flex gap-1">
                    {renderStars(formData.rating)}
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-sky-800 mb-1">
                    Tu opinión
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sky-900"
                    placeholder="Describe tu experiencia..."
                  ></textarea>
                </div>

                {error && (
                  <div className="text-red-500 text-sm py-2">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full px-4 py-3 rounded-md text-white font-medium transition-colors ${
                      submitting ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                  >
                    {submitting ? 'Enviando...' : 'Enviar opinión'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default OpinionForm