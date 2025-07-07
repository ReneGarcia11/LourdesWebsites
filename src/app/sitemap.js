// src/app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://crisisyduelo.com';
  
  // Páginas importantes de tu sitio (ajusta según tu estructura real)
  const pages = [
    {
      url: baseUrl,
      lastModified: new Date('2025-07-07'), // Usa fecha real de última modificación
    },
    // Ejemplo de otras páginas (si existen):
    /*
    {
      url: `${baseUrl}/servicios`, // Sin #
      lastModified: new Date('2025-06-01'),
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date('2025-05-15'),
    }
    */
  ];

  return pages;
}