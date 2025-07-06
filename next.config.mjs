/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Configuración Base
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  productionBrowserSourceMaps: false,

  // 2. Seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
        ],
      },
    ];
  },

  // 3. Imágenes
  images: {
    domains: ['crisisyduelo.com', 'www.crisisyduelo.com'],
    minimumCacheTTL: 86400,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // 4. Redirecciones (Versión corregida)
  async redirects() {
    return [
      {
        source: '/servicios/terapia-duelo',
        destination: '/servicios#duelo',
        permanent: true,
      },
      // Redirección HTTPS alternativa (opcional)
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'http://crisisyduelo.com',
          },
        ],
        destination: 'https://crisisyduelo.com',
        permanent: true,
      },
    ];
  },

  // 5. Generación de Sitemap (Nueva forma en Next.js 15)
  generateSitemaps: true, // Reemplaza experimental.sitemap
};

export default nextConfig;