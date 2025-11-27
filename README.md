# AlmaLibre

Espacio seguro y anónimo donde las personas puedan desahogarse y recibir apoyo empático de la comunidad.

## 📋 Descripción

AlmaLibre es una plataforma web diseñada para proporcionar un espacio seguro, gratuito y anónimo donde cualquier persona pueda expresar sus emociones y recibir apoyo empático de la comunidad. Sin lucro, sin palabras ni emociones negativas, solo positivas.

## 🚀 Tecnologías Utilizadas

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **MongoDB** (Driver Oficial)
- **Zod** (Validación de esquemas)
- **Bcrypt** (Hash de contraseñas)
- **JWT** (Autenticación)
- **Lucide Icons** (Iconografía)

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **MongoDB** (local o Atlas)

### Verificar instalaciones

```bash
node --version
npm --version
mongod --version
```

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/francisco-riquelme/alma_libre_software.git
cd alma_libre_software
```

### 2. Instalar dependencias

```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la carpeta `frontend/` con el siguiente contenido:

```env
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=alma_libre
JWT_SECRET=alma_libre_jwt_secret_key_change_in_production_2025
```

**Nota:** Si usas MongoDB Atlas, reemplaza `MONGODB_URI` con tu cadena de conexión de Atlas.

### 4. Iniciar MongoDB

#### Opción A: MongoDB Local

Asegúrate de que MongoDB esté corriendo en tu máquina:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
# o
mongod
```

#### Opción B: MongoDB Atlas

Si usas MongoDB Atlas, no necesitas iniciar MongoDB localmente. Solo actualiza la `MONGODB_URI` en `.env.local`.

### 5. Inicializar la base de datos

```bash
cd frontend
npx tsx scripts/init-database.ts
```

Este script creará las colecciones necesarias y sus índices.

### 6. Crear usuarios de prueba

```bash
npx tsx scripts/create-test-users.ts
```

Esto creará los siguientes usuarios de prueba:

| Email | Password | Rol | Descripción |
|-------|----------|-----|-------------|
| admin@almalibre.com | admin123 | admin | Acceso completo y administración |
| mentor@almalibre.com | mentor123 | mentor | Puede dar apoyo y moderar contenido |
| user@almalibre.com | user123 | user | Usuario regular |
| user2@almalibre.com | user123 | user | Usuario regular |

### 7. Verificar la conexión a MongoDB

```bash
npx tsx scripts/test-mongodb.ts
```

Deberías ver un mensaje de éxito si la conexión funciona correctamente.

## 🎯 Iniciar el Servidor de Desarrollo

```bash
cd frontend
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
alma_libre_software/
├── frontend/                 # Aplicación Next.js
│   ├── app/                  # Páginas y rutas
│   │   ├── api/              # API Routes
│   │   │   └── auth/         # Autenticación (login, register)
│   │   ├── about/            # Página "Sobre Nosotros"
│   │   ├── codigo-etico/     # Página "Código Ético"
│   │   ├── legal/            # Página "Aviso Legal"
│   │   ├── motivacion/       # Página "Fortalece tu interior"
│   │   ├── login/            # Página de inicio de sesión
│   │   ├── register/         # Página de registro
│   │   ├── home/             # Dashboard de usuarios autenticados
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Página principal (landing)
│   │   └── globals.css       # Estilos globales
│   ├── lib/                  # Utilidades y helpers
│   │   ├── auth.ts           # Funciones de autenticación (hash, JWT)
│   │   ├── mongodb.ts        # Conexión a MongoDB
│   │   ├── types.ts          # Tipos TypeScript
│   │   ├── validations.ts    # Esquemas Zod
│   │   └── middleware.ts     # Middleware de autenticación
│   ├── scripts/              # Scripts de desarrollo
│   │   ├── init-database.ts  # Inicializar BD
│   │   ├── create-test-users.ts  # Crear usuarios de prueba
│   │   ├── test-mongodb.ts   # Probar conexión MongoDB
│   │   ├── test-auth.ts      # Probar autenticación
│   │   └── test-create-post.ts  # Probar creación de posts
│   ├── package.json          # Dependencias del proyecto
│   └── .env.local            # Variables de entorno (crear manualmente)
├── base_datos/               # Documentación de esquemas
│   ├── esquemas.md           # Documentación de esquemas
│   ├── users_schema.json     # Esquema de usuarios
│   ├── posts_schema.json     # Esquema de posts
│   ├── comments_schema.json  # Esquema de comentarios
│   └── reactions_schema.json # Esquema de reacciones
├── history_test/            # Historial de tests
└── PLAN.md                   # Plan de desarrollo
```

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

**Roles disponibles:** `admin`, `mentor`, `user`

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
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "username": "username",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

## 📋 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
```

### Base de Datos

```bash
npx tsx scripts/test-mongodb.ts        # Verificar conexión MongoDB
npx tsx scripts/init-database.ts      # Inicializar base de datos
npx tsx scripts/create-test-users.ts   # Crear usuarios de prueba
```

### Testing

```bash
npx tsx scripts/test-auth.ts          # Probar autenticación
npx tsx scripts/test-create-post.ts   # Probar creación de posts
```

## 🎨 Características

- ✅ Autenticación segura con JWT y bcrypt
- ✅ Sistema de roles (admin, mentor, user)
- ✅ Interfaz moderna y minimalista estilo Apple
- ✅ Diseño responsive
- ✅ Paleta de colores profesional y calmante
- ✅ Iconografía consistente (Lucide Icons)
- ✅ Páginas informativas (Sobre Nosotros, Código Ético, Legal, Motivación)
- ✅ Dashboard personalizado según rol de usuario
- ✅ Validación de datos con Zod
- ✅ Manejo de errores robusto

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- JWT tokens con expiración de 7 días
- Validación de datos con Zod
- Roles de usuario: admin, mentor, user
- Middleware de autenticación para rutas protegidas

## ⚠️ Solución de Problemas

### Error 500 en el servidor

1. Verifica que MongoDB esté corriendo:
   ```bash
   # Windows
   netstat -ano | findstr :27017
   
   # Linux/Mac
   lsof -i :27017
   ```

2. Verifica que el archivo `.env.local` exista con las variables correctas:
   ```env
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB=alma_libre
   JWT_SECRET=alma_libre_jwt_secret_key_change_in_production_2025
   ```

3. Reinicia el servidor:
   ```bash
   npm run dev
   ```

### MongoDB no conecta

1. Inicia MongoDB localmente:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

2. Verifica la conexión:
   ```bash
   npx tsx scripts/test-mongodb.ts
   ```

3. Si usas MongoDB Atlas, verifica que la cadena de conexión sea correcta y que tu IP esté en la whitelist.

### Error de puerto en uso

Si el puerto 3000 está ocupado:

1. Encuentra el proceso:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Linux/Mac
   lsof -i :3000
   ```

2. Termina el proceso o usa otro puerto:
   ```bash
   PORT=3001 npm run dev
   ```

### Error de dependencias

Si hay problemas con las dependencias:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🌐 URLs Importantes

- **Landing Page:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Registro:** http://localhost:3000/register
- **Home (Dashboard):** http://localhost:3000/home
- **Sobre Nosotros:** http://localhost:3000/about
- **Código Ético:** http://localhost:3000/codigo-etico
- **Legal:** http://localhost:3000/legal
- **Motivación:** http://localhost:3000/motivacion

## 👥 Roles y Permisos

### Admin
- Acceso completo al sistema
- Gestión de usuarios
- Moderación de contenido
- Panel de administración

### Mentor
- Ofrecer apoyo emocional
- Moderar contenido
- Ver publicaciones de usuarios
- Acceso a herramientas de apoyo

### User
- Crear publicaciones
- Explorar contenido
- Buscar apoyo
- Gestionar perfil personal

## 📝 Próximos Pasos

- [ ] Implementar sistema de posts anónimos
- [ ] Sistema de comentarios y reacciones
- [ ] Panel de administración completo
- [ ] Sistema de moderación
- [ ] Notificaciones
- [ ] Mejoras de UX/UI

## 🤝 Contribuir

Este es un proyecto personal, pero si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 📧 Contacto

Para más información, visita: https://github.com/francisco-riquelme/alma_libre_software

---

**Desarrollado con ❤️ para crear un espacio seguro de apoyo emocional**
