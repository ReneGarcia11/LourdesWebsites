/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  compress: true, // Habilita compresión GZIP para mejor rendimiento
  images: {
    // CAMBIO: Se actualizó 'domains' a 'remotePatterns' por seguridad
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crisisyduelo.com',
        port: '',
        pathname: '/**', // Permite todas las rutas de ese dominio
      },
    ],
    minimumCacheTTL: 86400, // Cache de imágenes por 1 día
    formats: ['image/webp'], // Prioriza WebP para imágenes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Tamaños estándar para responsive images
  },
  async headers() {
    return [
      {
        source: '/:path*', // Aplica a todas las rutas
        headers: [
          // Seguridad y SEO
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, // Mejor para SEO
        ],
      },
      {
        source: '/sitemap.xml', // Headers específicos para sitemap
        headers: [
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
    ];
  },
  // Opcional: Redirecciones para migración de URLs viejas o consolidación SEO
  async redirects() {
    return [
      {
        source: '/psicologa-guadalajara', // Ejemplo de keyword en URL
        destination: '/#servicios', // O mejor aún: '/servicios' si cambias la estructura
        permanent: true, // 308 redirect para SEO
      },
    ];
  },
};

export default nextConfig;