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

