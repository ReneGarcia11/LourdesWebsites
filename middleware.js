import { NextResponse } from 'next/server'

export function middleware(request) {
  const hostname = request.headers.get('host') || ''

  // Evita reescribir si es el dominio principal
  if (hostname.startsWith('opinions.')) {
    const url = request.nextUrl.clone()

    // Cambia solo si el path es raíz, por ejemplo '/'
    if (url.pathname === '/') {
      url.pathname = '/subdominio'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'], // Solo aplica el middleware en la raíz
}
