// Script de prueba para verificar conexión a MongoDB
// Ejecutar con: npx tsx scripts/test-mongodb.ts

import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables de entorno desde .env.local
config({ path: resolve(__dirname, '../.env.local') })

import { getDatabase } from '../lib/mongodb'

async function testConnection() {
  try {
    console.log('🔌 Intentando conectar a MongoDB...')
    const db = await getDatabase()
    console.log('✅ Conexión exitosa a MongoDB')
    console.log(`📊 Base de datos: ${db.databaseName}`)
    
    // Listar colecciones existentes
    const collections = await db.listCollections().toArray()
    console.log(`\n📁 Colecciones existentes: ${collections.length}`)
    if (collections.length > 0) {
      collections.forEach(col => console.log(`   - ${col.name}`))
    } else {
      console.log('   (ninguna colección creada aún)')
    }
    
    console.log('\n✨ MongoDB está listo para usar')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error)
    process.exit(1)
  }
}

testConnection()

