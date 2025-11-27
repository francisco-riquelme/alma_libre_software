import { z } from 'zod'

// Esquema de validación para crear un post
export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'El contenido no puede estar vacío')
    .max(5000, 'El contenido no puede exceder 5000 caracteres'),
  isAnonymous: z.boolean().default(true),
  authorId: z.string().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

// Esquemas de validación para usuarios
export const registerUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres').max(30, 'El username no puede exceder 30 caracteres'),
  role: z.enum(['admin', 'user', 'mentor']).default('user'),
})

export const loginUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
