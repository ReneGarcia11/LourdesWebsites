'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-royal-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Dra. Lourdes Ramírez</h3>
            <p className="text-gray-300 mb-4">
              Psicóloga clínica especializada en intervención en crisis y tanatología, comprometida con tu bienestar emocional.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors">Servicios</Link>
              </li>
              <li>
                <Link href="#objetives" className="text-gray-300 hover:text-white transition-colors">Enfoque</Link>
              </li>
              <li>
                <Link href="#opinions" className="text-gray-300 hover:text-white transition-colors">Testimonios</Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Contacto</Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Manejo del Duelo</span>
              </li>
              <li>
                <span className="text-gray-300">Acompañamiento Integral</span>
              </li>
              <li>
                <span className="text-gray-300">Oncología Psicológica</span>
              </li>
              <li>
                <span className="text-gray-300">Terapia Individual</span>
              </li>
              
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaPhone className="text-gray-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+52 55 1234 5678</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-gray-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">contacto@lourdesramirez.com</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Avenida Miguel angel #14, Colonia, Real Vallarta, 45020 Zapopan, Jal.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Psic. Lourdes Ramírez. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer