import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener la IP del usuario
  const ip = request.ip || 
             request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Agregar la IP a los headers para que esté disponible en el cliente
  const response = NextResponse.next();
  response.headers.set('x-user-ip', ip);
  
  return response;
}

export const config = {
  matcher: '/agenda/:path*',
}; 