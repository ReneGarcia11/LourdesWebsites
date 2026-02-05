// app/contacto/ContactForm.jsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaWhatsapp, FaUser, FaBirthdayCake } from 'react-icons/fa'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim() || !formData.age) {
      setError('Por favor completa todos los campos')
      return
    }

    if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      setError('Por favor ingresa una edad válida (1-120)')
      return
    }

    if (!executeRecaptcha) {
      setError('Error al cargar reCAPTCHA. Por favor recarga la página.')
      return
    }

    setIsSubmitting(true)

    try {
      const token = await executeRecaptcha('contact_form_submit')
      if (!token) throw new Error('Error de verificación reCAPTCHA')

      const whatsappMessage = `¡Hola! 👋\n\n*Datos de contacto:*\n• Nombre: ${formData.name.trim()}\n• Edad: ${formData.age} años\n\nMe gustaría agendar una cita. ¿Podrían ayudarme con los horarios disponibles? 💙`
      
      const encodedMessage = encodeURIComponent(whatsappMessage)
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")

      window.location.href = `https://wa.me/523339555642?text=${encodedMessage}`
    } catch (err) {
      setError('Ocurrió un error al verificar que no eres un robot. Por favor intenta de nuevo.')
      console.error('reCAPTCHA error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-sky-100/70"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-sky-800/90 mb-1 items-center">
              <FaUser className="mr-2 text-sky-500" />
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength="3"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sky-200/80 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all placeholder-sky-300/70"
              placeholder="Ej: María González"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="age" className="block text-sm font-medium text-sky-800/90 mb-1 items-center">
              <FaBirthdayCake className="mr-2 text-sky-500" />
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sky-200/80 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all placeholder-sky-300/70"
              placeholder="Ej: 28"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'bg-sky-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700'
            }`}
          >
            {isSubmitting ? (
              <span className="text-white">Cargando...</span>
            ) : (
              <>
                <FaWhatsapp className="text-white text-lg" />
                <span className="text-white">Continuar en WhatsApp</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-sky-500/80">
            Al continuar, serás redirigido a WhatsApp para completar tu cita
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-sky-50/50 p-6 rounded-2xl border border-sky-100 text-center"
      >
        <h3 className="text-lg font-medium text-sky-800 mb-2">
          ¿Por qué solo estos datos?
        </h3>
        <p className="text-sm text-sky-700/90">
          Queremos hacerlo simple. El resto de información necesaria la recopilaremos directamente por WhatsApp.
        </p>
      </motion.div>
    </div>
  )
}

export default ContactForm