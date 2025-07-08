'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaWhatsapp, FaUser, FaBirthdayCake } from 'react-icons/fa'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

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

    // Validación mejorada
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
      // Ejecutar reCAPTCHA
      const token = await executeRecaptcha('contact_form_submit')

      // Aquí podrías enviar el token a tu backend para verificación
      // Por ahora solo lo verificamos en el cliente
      if (!token) {
        throw new Error('Error de verificación reCAPTCHA')
      }

      // Mensaje mejor estructurado
      const whatsappMessage =
        `¡Hola! 👋\n\n` +
        `*Datos de contacto:*\n` +
        `• Nombre: ${formData.name.trim()}\n` +
        `• Edad: ${formData.age} años\n\n` +
        `Me gustaría agendar una cita. ¿Podrían ayudarme con los horarios disponibles? 💙`

      // Codificación más robusta
      const encodedMessage = encodeURIComponent(whatsappMessage)
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A")
        .replace(/~/g, "%7E")
        .replace(/%20/g, "+")

      // Construcción de URL más confiable
      const whatsappUrl = `https://wa.me/523351107601?text=${encodedMessage}`

      // Abrir en la misma pestaña (mejor para móviles)
      window.location.href = whatsappUrl
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
        itemScope
        itemType="http://schema.org/ContactPage"
      >
        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario para agendar cita psicológica">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
              role="alert"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-sky-800/90 mb-1 items-center">
              <FaUser className="mr-2 text-sky-500" />
              Nombre completo
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
              aria-label="Ingresa tu nombre completo para agendar cita"
              itemProp="name"
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
              aria-label="Ingresa tu edad para agendar cita psicológica"
              itemProp="age"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center space-x-2 ${isSubmitting
                ? 'bg-sky-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700'
              }`}
            aria-label="Continuar al WhatsApp para agendar cita psicológica"
            itemProp="potentialAction"
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
          <p className="text-xs text-sky-500/80" itemProp="description">
            Al continuar, serás redirigido a WhatsApp para completar tu cita
          </p>
          {/* Texto oculto para SEO */}
          <div className="sr-only">
            <meta itemProp="keywords" content="agendar cita psicóloga Guadalajara, consulta psicológica Zapopan, terapia online Jalisco, whatsapp para psicología" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-sky-50/50 p-6 rounded-2xl border border-sky-100 text-center"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
          <h3 className="text-lg font-medium text-sky-800 mb-2" itemProp="name">
            ¿Por qué solo estos datos?
          </h3>
          <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
            <p className="text-sm text-sky-700/90" itemProp="text">
              Queremos hacerlo simple. El resto de información necesaria la recopilaremos directamente por WhatsApp para una experiencia más personalizada.
            </p>
          </div>
        </div>
        {/* Texto oculto para SEO */}
        <div className="sr-only">
          <meta itemProp="keywords" content="proceso de cita psicológica, información necesaria para terapia, consulta inicial psicólogo" />
        </div>
      </motion.div>
    </div>
  )
}

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
      itemScope
      itemType="http://schema.org/ProfessionalService"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-sky-900 mb-4"
            itemProp="name"
            title="Agenda cita con psicóloga en Guadalajara y Zapopan"
          >
            Agenda tu cita
          </h2>
          <p
            className="text-lg text-sky-700/90 max-w-2xl mx-auto"
            itemProp="description"
            aria-label="Formulario simple para agendar terapia psicológica presencial o virtual"
          >
            Solo necesitamos dos datos para preparar tu atención personalizada
          </p>
          {/* Texto oculto para SEO */}
          <div className="sr-only">
            <meta itemProp="keywords" content="psicóloga en Guadalajara, consulta psicológica Zapopan, terapia online Jalisco, primera cita psicólogo, horarios disponibles psicología" />
          </div>
        </motion.div>

        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <ContactForm />
        </GoogleReCaptchaProvider>
      </div>
    </section>
  )
}

export default Contact