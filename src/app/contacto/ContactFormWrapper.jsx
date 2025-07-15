// app/contacto/ContactFormWrapper.jsx
'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactForm from './ContactForm'

export default function ContactFormWrapper() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white"
      itemScope
      itemType="http://schema.org/ProfessionalService"
    >
      <div className="container mx-auto px-4 sm:px-6">
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