# AlmaLibre Frontend

## 🚀 Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

## 📋 Scripts disponibles

### Verificar MongoDB
```bash
npx tsx scripts/test-mongodb.ts
```

### Inicializar base de datos
```bash
npx tsx scripts/init-database.ts
```

### Crear usuarios de prueba
```bash
npx tsx scripts/create-test-users.ts
```

### Test de autenticación
```bash
npx tsx scripts/test-auth.ts
```

### Test de creación de posts
```bash
npx tsx scripts/test-create-post.ts
```

### Verificar servidor
```bash
npx tsx scripts/check-server.ts
```

## 👥 Usuarios de prueba

| Email | Password | Rol | Descripción |
|-------|----------|-----|-------------|
| admin@almalibre.com | admin123 | admin | Acceso completo y administración |
| mentor@almalibre.com | mentor123 | mentor | Puede dar apoyo y moderar contenido |
| user@almalibre.com | user123 | user | Usuario regular |
| user2@almalibre.com | user123 | user | Usuario regular |

## 🔐 API de Autenticación

### POST /api/auth/register
Registrar nuevo usuario

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "role": "user"
}
```

### POST /api/auth/login
Iniciar sesión

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

## 📁 Estructura

- `app/` - Páginas y rutas de Next.js
- `app/api/` - API Routes
  - `auth/` - Autenticación (login, register)
  - `posts/` - Gestión de posts
- `lib/` - Utilidades y helpers
  - `auth.ts` - Funciones de autenticación (hash, JWT)
  - `mongodb.ts` - Conexión a MongoDB
  - `types.ts` - Tipos TypeScript
  - `validations.ts` - Esquemas Zod
  - `middleware.ts` - Middleware de autenticación
- `scripts/` - Scripts de desarrollo y testing

## ⚠️ Solución de problemas

### Error 500 en el servidor
1. Verifica que MongoDB esté corriendo: `netstat -ano | findstr :27017`
2. Verifica que el archivo `.env.local` exista con:
   ```
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB=alma_libre
   JWT_SECRET=alma_libre_jwt_secret_key_change_in_production_2025
   ```
3. Reinicia el servidor: `npm run dev`

### MongoDB no conecta
1. Inicia MongoDB localmente
2. Verifica la conexión con: `npx tsx scripts/test-mongodb.ts`

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- JWT tokens con expiración de 7 días
- Validación de datos con Zod
- Roles de usuario: admin, mentor, user
