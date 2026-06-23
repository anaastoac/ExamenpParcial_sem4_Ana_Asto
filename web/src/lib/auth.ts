// Clave secreta para firmar JWTs
// En producción, esta debe estar en variables de entorno
export const jwtSecret = process.env.JWT_SECRET || 'uq-ai-super-secret-key-2024';

// Interfaz para el payload del JWT
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'USER';
  nombre: string;
  iat: number;
  exp: number;
}

// Función para crear JWT manualmente
export function createJWT(payload: object, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}.${secret}`).toString('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Función para verificar JWT
export function verifyJWT(token: string, secret: string): { valid: boolean; payload?: JWTPayload } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    
    const [header, payload, signature] = parts;
    const expectedSignature = Buffer.from(`${header}.${payload}.${secret}`).toString('base64url');
    
    if (signature !== expectedSignature) return { valid: false };
    
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as JWTPayload;
    
    // Verificar expiración
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false };
    }
    
    return { valid: true, payload: decodedPayload };
  } catch {
    return { valid: false };
  }
}

/*
 * NOTA IMPORTANTE: ¿Por qué NO usamos localStorage?
 * 
 * localStorage es accesible desde JavaScript (window.localStorage)
 * Esto significa que es VULNERABLE a ataques XSS (Cross-Site Scripting)
 * 
 * Si un atacante inyecta código malicioso en la página, puede:
 * 1. Leer el token de localStorage
 * 2. Enviarlo a su servidor
 * 3. Suplantar la identidad del usuario
 * 
 * HttpOnly Cookie:
 * ✅ No accesible desde JavaScript (document.cookie no lo muestra)
 * ✅ Protege contra XSS ya que el script no puede leer el token
 * ✅ El navegador automáticamente envía la cookie en cada request
 * 
 * Además usamos:
 * - Secure: Cookie solo se envía sobre HTTPS
 * - SameSite=Strict: Previene envío en requests cross-site (CSRF)
 * 
 * Para máxima seguridad, en producción considerar:
 * - CSRF tokens adicionales
 * - Token rotation
 * - Short-lived tokens con refresh tokens
 */
