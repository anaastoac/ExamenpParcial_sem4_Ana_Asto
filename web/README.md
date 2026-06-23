# UQ AI Solution - Landing Page

Landing Page profesional para UQ AI Solution, empresa de Inteligencia Artificial para el Perú y el Mundo.

## 🚀 Características

- **Sección Hero**: Presentación impactante con animaciones y estadísticas
- **Servicios IA**: 8 tarjetas de servicios con iconos y descripciones
- **Academy & Lab**: Cursos y proyectos de investigación
- **Formulario de Contacto**: Integración con API REST para captura de leads
- **Navbar Responsivo**: Menú hamburguesa para móvil
- **Footer Completo**: Información de empresa, redes sociales y legal

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Spring Boot (Java)
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📁 Estructura del Proyecto

```
Examen Parcial/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Academy.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🚀 Cómo Ejecutar

### Frontend

```bash
# Entrar al directorio
cd "Examen Parcial"

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

### Backend (Spring Boot)

```bash
# Entrar al directorio backend
cd backend

# Construir y ejecutar
mvn spring-boot:run
```

## 📝 API Endpoints

### POST /api/leads
Guarda un nuevo lead capturado desde el formulario de contacto.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@empresa.com",
  "empresa": "Empresa SAC",
  "telefono": "+51 999 123 456",
  "mensaje": "Me interesa automatizar procesos"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@empresa.com",
  "empresa": "Empresa SAC",
  "telefono": "+51 999 123 456",
  "mensaje": "Me interesa automatizar procesos",
  "fechaCreacion": "2026-06-22T09:30:00"
}
```

## 🎨 Diseño

El diseño sigue las mejores prácticas de UI/UX con:
- Paleta de colores profesional (azul y púrpura)
- Tipografía moderna (Inter)
- Animaciones sutiles
- Efectos glass morphism
- Gradientes animados
- Responsive design

## 📄 Licencia

© 2026 UQ AI Solution. Todos los derechos reservados.
