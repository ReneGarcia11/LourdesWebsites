/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Configuración Base
  reactStrictMode: true,
  trailingSlash: false,
  output: 'standalone',
  productionBrowserSourceMaps: false, // Mejor rendimiento

  // 2. Seguridad Mejorada
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' }, // Protege privacidad
        ],
      },
    ];
  },

  // 3. Imágenes + WebVitals
  images: {
    domains: ['crisisyduelo.com', 'www.crisisyduelo.com'], // Incluye versión www
    minimumCacheTTL: 86400,
    formats: ['image/avif', 'image/webp'], // AVIF es 30% más ligero que WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // 4. Redirecciones y Rewrites
  async redirects() {
    return [
      {
        source: '/http:/(.*)',
        destination: '/https:/$1',
        permanent: true,
      },
      {
        source: '/servicios/terapia-duelo',
        destination: '/servicios#duelo',
        permanent: true, // 308 para SEO
      },
    ];
  },

  // 5. Features Experimentales (Next 14+)
  experimental: {
    sitemap: true, // Genera sitemap automático
    optimizeCss: true, // Mejor CLS
    nextScriptWorkers: true, // Mejor rendimiento
  },

  // 6. Configuración para Vercel
  eslint: {
    ignoreDuringBuilds: true, // Acelera builds
  },
  typescript: {
    ignoreBuildErrors: true, // Solo para producción
  },
};

export default nextConfig;