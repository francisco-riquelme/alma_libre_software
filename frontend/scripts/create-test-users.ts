// Script para crear usuarios de prueba
// Ejecutar con: npx tsx scripts/create-test-users.ts

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env.local') })

import { getDatabase } from '../lib/mongodb'
import { hashPassword } from '../lib/auth'
import { User } from '../lib/types'

async function createTestUsers() {
  try {
    console.log('🔌 Conectando a MongoDB...')
    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    console.log('📝 Creando usuarios de prueba...\n')

    const testUsers = [
      {
        email: 'admin@almalibre.com',
        password: 'admin123',
        username: 'admin',
        role: 'admin' as const,
      },
      {
        email: 'mentor@almalibre.com',
        password: 'mentor123',
        username: 'mentor01',
        role: 'mentor' as const,
      },
      {
        email: 'user@almalibre.com',
        password: 'user123',
        username: 'usuario01',
        role: 'user' as const,
      },
      {
        email: 'user2@almalibre.com',
        password: 'user123',
        username: 'usuario02',
        role: 'user' as const,
      },
    ]

    for (const userData of testUsers) {
      // Verificar si el usuario ya existe
      const existingUser = await usersCollection.findOne({ email: userData.email })
      
      if (existingUser) {
        console.log(`   ⚠️  Usuario ${userData.email} ya existe, omitiendo...`)
        continue
      }

      // Hash de la contraseña
      const hashedPassword = await hashPassword(userData.password)

      // Crear usuario
      const newUser: Omit<User, '_id'> = {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        role: userData.role,
        isActive: true,
        createdAt: new Date(),
      }

      const result = await usersCollection.insertOne(newUser as User)
      console.log(`   ✅ Usuario creado: ${userData.email} (${userData.role})`)
      console.log(`      Username: ${userData.username}`)
      console.log(`      Password: ${userData.password}`)
      console.log(`      ID: ${result.insertedId}\n`)
    }

    // Listar todos los usuarios
    console.log('📋 Usuarios en la base de datos:')
    const allUsers = await usersCollection.find({}).toArray()
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.username}) - ${user.role}`)
    })

    console.log('\n✨ Usuarios de prueba creados exitosamente')
    console.log('\n📝 Credenciales de prueba:')
    console.log('   Admin: admin@almalibre.com / admin123')
    console.log('   Mentor: mentor@almalibre.com / mentor123')
    console.log('   Usuario: user@almalibre.com / user123')
    console.log('   Usuario 2: user2@almalibre.com / user123')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error al crear usuarios:', error)
    process.exit(1)
  }
}

createTestUsers()

