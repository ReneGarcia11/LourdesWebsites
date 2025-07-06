import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  if (hostname.startsWith('opinions.')) {
    const url = request.nextUrl.clone()
    url.pathname = '/subdominio'      // ruta a tu componente de opiniones
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

// Aquí va el config con el matcher
export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico).*)'],
}
