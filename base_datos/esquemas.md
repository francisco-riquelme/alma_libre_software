# Esquemas de Base de Datos

## Colección: users

```typescript
{
  _id: ObjectId,
  email: string,              // Email único del usuario
  password: string,           // Hash bcrypt de la contraseña
  username: string,           // Username único
  role: 'admin' | 'user' | 'mentor',
  isActive: boolean,         // Si el usuario está activo
  createdAt: Date,
  updatedAt?: Date,           // Fecha de actualización (opcional)
  lastLogin?: Date            // Último inicio de sesión (opcional)
}
```

**Índices:**
- `email` (único)
- `username` (único)
- `role`
- `isActive`

**Roles:**
- `admin`: Acceso completo al sistema y administración
- `mentor`: Puede dar apoyo, orientación y moderar contenido
- `user`: Usuario regular que puede publicar y recibir apoyo

## Colección: posts

```typescript
{
  _id: ObjectId,
  content: string,           // Contenido del post
  createdAt: Date,          // Fecha de creación
  updatedAt?: Date,         // Fecha de actualización (opcional)
  isAnonymous: boolean,      // Si el post es anónimo
  authorId?: string,        // ID del autor (opcional si es anónimo)
  status: 'active' | 'moderated' | 'deleted'
}
```

## Colección: comments

```typescript
{
  _id: ObjectId,
  postId: string,           // ID del post al que pertenece
  content: string,          // Contenido del comentario
  createdAt: Date,
  updatedAt?: Date,
  isAnonymous: boolean,
  authorId?: string,
  status: 'active' | 'moderated' | 'deleted'
}
```

## Colección: reactions

```typescript
{
  _id: ObjectId,
  postId?: string,          // ID del post (opcional)
  commentId?: string,       // ID del comentario (opcional)
  type: 'support' | 'empathy' | 'love' | 'strength',
  createdAt: Date,
  authorId?: string
}
```

## Colección: moderation_actions

```typescript
{
  _id: ObjectId,
  targetType: 'post' | 'comment',
  targetId: string,         // ID del post o comentario
  action: 'approve' | 'reject' | 'delete' | 'flag',
  reason?: string,          // Razón de la moderación
  moderatorId?: string,     // ID del moderador
  createdAt: Date
}
```

