import { NextRequest, NextResponse } from 'next/server';
import { jwtSecret } from '@/lib/auth';

// Credenciales mockeadas para demo
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@uqai.com',
    password: 'admin123',
    role: 'ADMIN',
    nombre: 'Administrador',
  },
  {
    id: '2',
    email: 'user@uqai.com',
    password: 'user123',
    role: 'USER',
    nombre: 'Usuario Demo',
  },
];

// Credenciales válidas en backend Java
const JAVA_BACKEND_USERS = [
  {
    id: '100',
    email: 'admin@backend.com',
    password: 'backend123',
    role: 'ADMIN',
    nombre: 'Admin Backend',
  },
  {
    id: '200',
    email: 'user@backend.com',
    password: 'user123',
    role: 'USER',
    nombre: 'Usuario Backend',
  },
];

// Función para crear JWT manualmente (sin dependencia de jsonwebtoken)
function createJWT(payload: object, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  // Crear signature simple para demo (en producción usar jsonwebtoken)
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}.${secret}`).toString('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Función para verificar JWT
function verifyJWT(token: string, secret: string): { valid: boolean; payload?: object } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    
    const [header, payload, signature] = parts;
    const expectedSignature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');
    
    if (signature !== expectedSignature) return { valid: false };
    
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    return { valid: true, payload: decodedPayload };
  } catch {
    return { valid: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validación de campos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario en credenciales mock
    const allUsers = [...MOCK_USERS, ...JAVA_BACKEND_USERS];
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      // Error genérico - NO revelar qué campo falló
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Crear payload del JWT
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      nombre: user.nombre,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
    };

    // Crear JWT
    const token = createJWT(payload, jwtSecret);

    // Crear respuesta con cookie HttpOnly
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nombre: user.nombre,
      },
    });

    // Establecer cookie HttpOnly en la respuesta
    // HttpOnly=true: Previene acceso desde JavaScript (XSS attacks)
    // Secure=true: Solo envía cookie sobre HTTPS (producción)
    // SameSite=Strict: Previene envío en requests cross-site (CSRF protection)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hora en segundos
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// GET para verificar estado de autenticación
export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const { valid, payload } = verifyJWT(token, jwtSecret);

  if (!valid) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, user: payload });
}
