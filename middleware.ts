import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Intercepción estricta: Si el dominio es la graduación y está en el inicio
  if (hostname.includes('migraduacion.pro') && pathname === '/') {
    return NextResponse.rewrite(new URL('/graduacion', request.url));
  }
  
  // Aislamiento Hermético: Si migraduacion.pro intenta entrar a otra invitación, 
  // redirígelo de vuelta a su raíz obligatoriamente.
  if (hostname.includes('migraduacion.pro') && pathname !== '/' && pathname !== '/graduacion') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

// Bloqueamos el middleware para que no se ejecute en imágenes o archivos internos
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.png|.*\\.svg).*)'],
};