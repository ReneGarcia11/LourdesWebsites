// /middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';

  if (hostname.startsWith('opiniones.')) {
    return NextResponse.rewrite(new URL('/subdominio', request.url));
  }

  return NextResponse.next();
}
