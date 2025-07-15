'use client'

import OpinionsComponent from './OpinionsComponent'

export default function OpinionsWrapper() {
  return (
    <section
      id="opiniones"
      className="py-12 bg-gradient-to-b from-white to-sky-50"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Añadimos el nombre del servicio directamente en el wrapper */}
        <meta itemProp="name" content="Servicios de Psicología Clínica BriZuela" />
        <div itemProp="mainEntity" itemScope itemType="https://schema.org/Product">
          <meta itemProp="name" content="Terapia Psicológica" />
          <OpinionsComponent />
        </div>
      </div>
    </section>
  )
}