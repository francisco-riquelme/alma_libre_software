import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { createPostSchema } from '@/lib/validations'
import { Post } from '@/lib/types'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    // Parsear y validar el body
    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    // Obtener la base de datos
    const db = await getDatabase()
    const postsCollection = db.collection<Post>('posts')

    // Crear el post
    const newPost: Omit<Post, '_id'> = {
      content: validatedData.content,
      createdAt: new Date(),
      isAnonymous: validatedData.isAnonymous ?? true,
      authorId: validatedData.authorId,
      status: 'active',
    }

    // Insertar en MongoDB
    const result = await postsCollection.insertOne(newPost as Post)

    // Retornar el post creado
    const createdPost = await postsCollection.findOne({ _id: result.insertedId })

    return NextResponse.json(
      {
        success: true,
        data: createdPost,
      },
      { status: 201 }
    )
  } catch (error) {
    // Manejo de errores de validación Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error de validación',
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        },
        { status: 400 }
      )
    }

    // Otros errores
    console.error('Error al crear post:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    )
  }
}

