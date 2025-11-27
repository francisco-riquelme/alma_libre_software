// Test para la feature: Crear publicaciones anónimas
// Ejecutar con: npx tsx scripts/test-create-post.ts

import { config } from 'dotenv'
import { resolve } from 'path'

// Cargar variables de entorno
config({ path: resolve(__dirname, '../.env.local') })

async function testCreatePost() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const apiUrl = `${baseUrl}/api/posts`

  console.log('🧪 Test: Crear publicaciones anónimas\n')
  console.log(`📍 Endpoint: ${apiUrl}\n`)

  // Test 1: Crear post anónimo válido
  console.log('Test 1: Crear post anónimo válido')
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: 'Este es un mensaje de prueba para AlmaLibre. Necesito apoyo emocional.',
        isAnonymous: true,
      }),
    })

    const data = await response.json()

    if (response.ok && data.success && data.data) {
      console.log('   ✅ PASSED - Post creado exitosamente')
      console.log(`   📝 Post ID: ${data.data._id}`)
      console.log(`   📅 Creado: ${data.data.createdAt}`)
      console.log(`   🔒 Anónimo: ${data.data.isAnonymous}`)
      console.log(`   📊 Estado: ${data.data.status}\n`)
    } else {
      console.log('   ❌ FAILED - Error inesperado')
      console.log(`   Respuesta: ${JSON.stringify(data, null, 2)}\n`)
      process.exit(1)
    }
  } catch (error) {
    console.log('   ❌ FAILED - Error de conexión')
    console.log(`   Error: ${error}\n`)
    console.log('   ⚠️  Asegúrate de que el servidor esté corriendo: npm run dev\n')
    process.exit(1)
  }

  // Test 2: Validar contenido vacío
  console.log('Test 2: Validar contenido vacío (debe fallar)')
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: '',
        isAnonymous: true,
      }),
    })

    const data = await response.json()

    if (response.status === 400 && !data.success) {
      console.log('   ✅ PASSED - Validación funcionó correctamente')
      console.log(`   📝 Error esperado: ${data.error}\n`)
    } else {
      console.log('   ❌ FAILED - Debería haber rechazado contenido vacío')
      console.log(`   Respuesta: ${JSON.stringify(data, null, 2)}\n`)
      process.exit(1)
    }
  } catch (error) {
    console.log('   ❌ FAILED - Error inesperado')
    console.log(`   Error: ${error}\n`)
    process.exit(1)
  }

  // Test 3: Validar contenido muy largo
  console.log('Test 3: Validar contenido muy largo (debe fallar)')
  try {
    const longContent = 'a'.repeat(5001) // Más de 5000 caracteres
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: longContent,
        isAnonymous: true,
      }),
    })

    const data = await response.json()

    if (response.status === 400 && !data.success) {
      console.log('   ✅ PASSED - Validación de longitud funcionó')
      console.log(`   📝 Error esperado: ${data.error}\n`)
    } else {
      console.log('   ❌ FAILED - Debería haber rechazado contenido muy largo')
      console.log(`   Respuesta: ${JSON.stringify(data, null, 2)}\n`)
      process.exit(1)
    }
  } catch (error) {
    console.log('   ❌ FAILED - Error inesperado')
    console.log(`   Error: ${error}\n`)
    process.exit(1)
  }

  console.log('✨ Todos los tests pasaron exitosamente')
  process.exit(0)
}

testCreatePost()

