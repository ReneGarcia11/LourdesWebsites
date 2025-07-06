import { NextResponse } from 'next/server'

export function middleware(request) {
  const host = request.headers.get('host') || ''

  if (host.startsWith('opinions.')) {
    const url = request.nextUrl.clone()
    url.pathname = '/subdominio'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!_next|_static|favicon.ico|.*\\..*).*)'],
}
