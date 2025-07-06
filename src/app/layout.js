import { Geist, Geist_Mono } from "next/font/google";
import Head from 'next/head';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'Psicóloga Lourdes Ramírez | Especialista en Duelo y Crisis | Guadalajara',
    template: '%s | Psic. Lourdes Ramírez'
  },
  description: 'Psicóloga clínica especializada en tanatología, manejo de duelo e intervención en crisis. Terapia presencial en Zapopan y online para todo Jalisco.',
  keywords: [
    'psicóloga en Guadalajara',
    'tanatología Zapopan',
    'terapia de duelo Jalisco',
    'consulta psicológica online',
    'psicóloga especializada en crisis',
    'acompañamiento emocional profesional',
    'salud mental Guadalajara',
    'terapia para adolescentes',
    'psicología oncológica',
    'cuidados paliativos emocionales'
  ],
  authors: [{ name: 'Lourdes Ramírez', url: 'https://crisisyduelo.com' }],
  metadataBase: new URL('https://crisisyduelo.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        {/* Favicon básico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Metadatos esenciales */}
        <meta name="theme-color" content="#0284c7" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Geo tags para SEO local */}
        <meta name="geo.region" content="MX-JAL" />
        <meta name="geo.placename" content="Zapopan, Jalisco" />
        <meta name="geo.position" content="20.6667;-103.35" />
        <meta name="ICBM" content="20.6667, -103.35" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        
        {/* Schema Markup simplificado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Psic. Lourdes Ramírez",
              "@id": "https://crisisyduelo.com",
              "url": "https://crisisyduelo.com",
              "telephone": "+523339555642",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenida Miguel angel #14",
                "addressLocality": "Zapopan",
                "addressRegion": "JAL",
                "postalCode": "45020",
                "addressCountry": "MX"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 20.67861,
                "longitude": -103.42485
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </body>
    </html>
  );
}