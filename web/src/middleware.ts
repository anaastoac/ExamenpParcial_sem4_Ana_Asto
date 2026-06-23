import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, jwtSecret } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/admin'];
  
  // Rutas públicas que no deben ser accedidas si ya está logueado
  const authRoutes = ['/login'];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Obtener el token de la cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Verificar autenticación
  let isAuthenticated = false;
  if (token) {
    const { valid } = verifyJWT(token, jwtSecret);
    isAuthenticated = valid;
  }
  
  // Si intenta acceder a ruta protegida sin autenticación → redirigir a login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Si ya está autenticado e intenta ir a login → redirigir a dashboard
  if (isAuthRoute && isAuthenticated) {
    const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  
  return NextResponse.next();
}

// Configurar qué rutas debe proteger el middleware
export const config = {
  matcher: [
    /*
     * Proteger rutas:
     * - /dashboard/* - Panel de usuario
     * - /admin/* - Panel de administración
     * - /login - Página de login (redirigir si ya está logueado)
     */
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
  ],
};
