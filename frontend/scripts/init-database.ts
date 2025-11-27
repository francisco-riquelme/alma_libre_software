// Script de inicialización de la base de datos
// Ejecutar con: npx tsx scripts/init-database.ts

import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables de entorno desde .env.local
config({ path: resolve(__dirname, '../.env.local') })

import { getDatabase } from '../lib/mongodb'

async function initializeDatabase() {
  try {
    console.log('🔌 Conectando a MongoDB...')
    const db = await getDatabase()
    console.log(`✅ Conectado a la base de datos: ${db.databaseName}\n`)

    // Crear colecciones (MongoDB las crea automáticamente al insertar, pero las listamos para verificar)
    const collections = ['users', 'posts', 'comments', 'reactions', 'moderation_actions']
    
    console.log('📁 Verificando/creando colecciones...')
    
    for (const collectionName of collections) {
      try {
        // Verificar si la colección existe
        const collectionsList = await db.listCollections({ name: collectionName }).toArray()
        
        if (collectionsList.length > 0) {
          console.log(`   ✓ Colección "${collectionName}" ya existe`)
        } else {
          // Crear la colección insertando un documento vacío y luego eliminándolo
          const collection = db.collection(collectionName)
          await collection.insertOne({ _temp: true })
          await collection.deleteOne({ _temp: true })
          console.log(`   ✓ Colección "${collectionName}" creada`)
        }
      } catch (error) {
        console.error(`   ✗ Error al crear colección "${collectionName}":`, error)
      }
    }

    // Crear índices para optimizar las consultas
    console.log('\n📊 Creando índices...')
    
    // Índices para users
    const usersCollection = db.collection('users')
    await usersCollection.createIndex({ email: 1 }, { unique: true })
    await usersCollection.createIndex({ username: 1 }, { unique: true })
    await usersCollection.createIndex({ role: 1 })
    await usersCollection.createIndex({ isActive: 1 })
    console.log('   ✓ Índices creados para "users"')

    // Índices para posts
    const postsCollection = db.collection('posts')
    await postsCollection.createIndex({ createdAt: -1 })
    await postsCollection.createIndex({ status: 1 })
    await postsCollection.createIndex({ authorId: 1 })
    console.log('   ✓ Índices creados para "posts"')

    // Índices para comments
    const commentsCollection = db.collection('comments')
    await commentsCollection.createIndex({ postId: 1 })
    await commentsCollection.createIndex({ createdAt: -1 })
    await commentsCollection.createIndex({ status: 1 })
    console.log('   ✓ Índices creados para "comments"')

    // Índices para reactions
    const reactionsCollection = db.collection('reactions')
    await reactionsCollection.createIndex({ postId: 1 })
    await reactionsCollection.createIndex({ commentId: 1 })
    await reactionsCollection.createIndex({ createdAt: -1 })
    console.log('   ✓ Índices creados para "reactions"')

    // Índices para moderation_actions
    const moderationCollection = db.collection('moderation_actions')
    await moderationCollection.createIndex({ targetId: 1, targetType: 1 })
    await moderationCollection.createIndex({ createdAt: -1 })
    console.log('   ✓ Índices creados para "moderation_actions"')

    // Listar todas las colecciones finales
    console.log('\n📋 Resumen de la base de datos:')
    const allCollections = await db.listCollections().toArray()
    allCollections.forEach(col => {
      console.log(`   - ${col.name}`)
    })

    console.log('\n✨ Base de datos inicializada correctamente')
    console.log('🚀 Ya puedes comenzar a desarrollar features')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
    process.exit(1)
  }
}

initializeDatabase()

