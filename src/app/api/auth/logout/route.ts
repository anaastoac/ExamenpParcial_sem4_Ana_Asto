import { NextResponse } from 'next/server';

/**
 * Logout seguro
 * 
 * El logout se hace en el SERVIDOR para asegurar que la cookie sea eliminada
 * correctamente. Usar Max-Age=0 elimina la cookie inmediatamente.
 * 
 * En combinación con la limpieza de estado local en el cliente,
 * esto garantiza que el usuario quede completamente desautenticado.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Eliminar la cookie estableciendo Max-Age=0
  // Esto indica al navegador que elimine la cookie inmediatamente
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Eliminar inmediatamente
    path: '/',
  });
  
  return response;
}
