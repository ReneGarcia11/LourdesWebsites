'use client'
import { motion } from 'framer-motion'

const Map = () => {
  return (
    <section className="py-16 bg-sky-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">Ubicación</h2>
          <p className="text-sky-700 max-w-2xl mx-auto">Visítanos en nuestro consultorio</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-xl overflow-hidden shadow-xl border border-sky-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14931.079339256577!2d-103.43479268169165!3d20.67894097076805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428af8dd124be45%3A0x6912a015055fe2d!2sCl%C3%ADnica%20BriZuela!5e0!3m2!1ses!2smx!4v1750796717019!5m2!1ses!2smx"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="block"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-sky-700 transition-all"
          >
            Cómo llegar
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Map