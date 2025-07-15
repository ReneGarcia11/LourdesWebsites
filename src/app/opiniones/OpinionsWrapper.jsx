'use client'

import OpinionsComponent from './OpinionsComponent'

export default function OpinionsWrapper() {
  return (
    <section
      id="opiniones"
      className="py-12 bg-gradient-to-b from-white to-sky-50"
      itemScope
      itemType="http://schema.org/Product"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <OpinionsComponent />
      </div>
    </section>
  )
}