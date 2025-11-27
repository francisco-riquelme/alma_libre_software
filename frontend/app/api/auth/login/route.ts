import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { loginUserSchema } from '@/lib/validations'
import { comparePassword, generateToken } from '@/lib/auth'
import { User } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginUserSchema.parse(body)

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    // Buscar usuario por email
    const user = await usersCollection.findOne({ email: validatedData.email })
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email o contraseña incorrectos',
        },
        { status: 401 }
      )
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuario desactivado',
        },
        { status: 403 }
      )
    }

    // Verificar contraseña
    const isPasswordValid = await comparePassword(validatedData.password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email o contraseña incorrectos',
        },
        { status: 401 }
      )
    }

    // Actualizar último login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Generar token
    const token = generateToken(user._id!.toString(), user.role)

    // Retornar usuario sin contraseña
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userWithoutPassword,
          token,
        },
      },
      { status: 200 }
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

    console.error('Error al iniciar sesión:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    )
  }
}

