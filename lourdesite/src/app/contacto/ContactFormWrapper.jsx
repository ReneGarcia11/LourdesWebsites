// app/contacto/ContactFormWrapper.jsx
'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactForm from './ContactForm'
import { motion } from 'framer-motion'

export default function ContactFormWrapper() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
      itemScope
      itemType="http://schema.org/ProfessionalService"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Título visible añadido aquí */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
            Agenda tu cita
          </h2>
          <p className="text-lg text-sky-700/90 max-w-2xl mx-auto">
            Solo necesitamos dos datos para preparar tu atención personalizada
          </p>
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