import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { registerUserSchema } from '@/lib/validations'
import { hashPassword } from '@/lib/auth'
import { User } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerUserSchema.parse(body)

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    // Verificar si el email ya existe
    const existingUser = await usersCollection.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'El email ya está registrado',
        },
        { status: 400 }
      )
    }

    // Verificar si el username ya existe
    const existingUsername = await usersCollection.findOne({ username: validatedData.username })
    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          error: 'El username ya está en uso',
        },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await hashPassword(validatedData.password)

    // Crear el usuario
    const newUser: Omit<User, '_id'> = {
      email: validatedData.email,
      password: hashedPassword,
      username: validatedData.username,
      role: validatedData.role || 'user',
      isActive: true,
      createdAt: new Date(),
    }

    const result = await usersCollection.insertOne(newUser as User)
    const createdUser = await usersCollection.findOne({ _id: result.insertedId })

    // No retornar la contraseña
    const { password, ...userWithoutPassword } = createdUser as User

    return NextResponse.json(
      {
        success: true,
        data: userWithoutPassword,
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Error de validación',
          details: error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', '),
        },
        { status: 400 }
      )
    }

    console.error('Error al registrar usuario:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    )
  }
}

