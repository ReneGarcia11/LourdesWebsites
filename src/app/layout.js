import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Psicóloga Lourdes Ramírez - Especialista en Crisis y Duelo | Real Vallarta, Zapopan",
    template: "%s | Psicóloga Lourdes Ramírez"
  },
  description: "Terapia profesional para manejo de crisis y duelo en Avenida Miguel Ángel #14, Real Vallarta, Zapopan. Consultas presenciales y online con enfoque humanista.",
  keywords: [
    "psicóloga en Zapopan",
    "terapia de duelo Real Vallarta",
    "psicóloga especialista en crisis",
    "consulta psicológica Avenida Miguel Ángel",
    "tanatóloga Jalisco",
    "psicoterapia Zapopan",
    "salud mental Real Vallarta"
  ],
  metadataBase: new URL('https://crisisyduelo.com'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Psicóloga Lourdes Ramírez - Especialista en Crisis y Duelo | Real Vallarta, Zapopan",
    description: "Terapia profesional en Avenida Miguel Ángel #14, Col. Real Vallarta, 45020 Zapopan, Jal. Enfoque humanista y profesional.",
    url: "https://crisisyduelo.com",
    siteName: "Psicóloga Lourdes Ramírez",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "Consultorio en Avenida Miguel Ángel #14, Real Vallarta",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  other: {
    "schema:Person": {
      "@type": "Person",
      "name": "Lourdes Ramírez",
      "jobTitle": "Psicóloga Clínica",
      "specialty": "Tanatología e Intervención en Crisis",
      "url": "https://crisisyduelo.com"
    }
  },
  icons: {
    icon: "/logo-psicologa.ico?v=3",
    shortcut: "/logo-psicologa.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/logo-psicologa.ico" as="image" />
        <link rel="icon" href="/logo-psicologa.ico?v=3" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <link rel="preload" href="/opengraph-image.jpg" as="image" />
        
        {/* Datos estructurados para negocio local */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Psicóloga Lourdes Ramírez",
            "description": "Terapia profesional en crisis y duelo en Real Vallarta, Zapopan",
            "image": "https://crisisyduelo.com/opengraph-image.jpg",
            "@id": "https://crisisyduelo.com",
            "url": "https://crisisyduelo.com",
            "telephone": "+52 33 3955 5642", 
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Avenida Miguel Ángel #14",
              "addressLocality": "Zapopan",
              "addressRegion": "Jalisco",
              "postalCode": "45020",
              "addressCountry": "MX",
              "addressCounty": "Colonia Real Vallarta"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.72000", // Aproximadas - reemplaza con exactas
              "longitude": "-103.39000"
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
            },
            "priceRange": "$$$",
            "hasMap": "https://www.google.com/maps?q=Avenida+Miguel+angel+%2314,+Real+Vallarta,+45020+Zapopan,+Jal"
          })}
        </script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}