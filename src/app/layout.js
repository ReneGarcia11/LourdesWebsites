import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Psicóloga Lourdes Ramírez",
  description: "Psicóloga Klínica, Tanatología e Intervención en Crisis",
  icons: {
    icon: "/logo-psicologa.ico?v=3",  // ?v=3 para forzar actualización
    shortcut: "/logo-psicologa.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preload para mejor rendimiento */}
        <link rel="preload" href="/logo-psicologa.ico" as="image" />
        
        {/* Favicon redundante para máxima compatibilidad */}
        <link rel="icon" href="/logo-psicologa.ico?v=3" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}