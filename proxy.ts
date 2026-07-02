import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Renombrado crítico: El motor ahora exige que la función se llame 'proxy'
export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Intercepción estricta
  if (hostname.includes('migraduacion.pro') && pathname === '/') {
    return NextResponse.redirect(new URL('/graduacion', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};