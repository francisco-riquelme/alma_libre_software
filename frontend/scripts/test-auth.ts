// Test para autenticación de usuarios
// Ejecutar con: npx tsx scripts/test-auth.ts

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env.local') })

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

async function testAuth() {
  console.log('🧪 Test: Sistema de Autenticación\n')
  console.log(`📍 Base URL: ${baseUrl}\n`)

  // Test 1: Login con admin
  console.log('Test 1: Login con usuario admin')
  try {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@almalibre.com',
        password: 'admin123',
      }),
    })

    const loginData = await loginResponse.json()

    if (loginResponse.ok && loginData.success && loginData.data.token) {
      console.log('   ✅ PASSED - Login exitoso')
      console.log(`   👤 Usuario: ${loginData.data.user.email}`)
      console.log(`   🎭 Rol: ${loginData.data.user.role}`)
      console.log(`   🔑 Token recibido: ${loginData.data.token.substring(0, 20)}...\n`)
      
      // Test 2: Intentar login con credenciales incorrectas
      console.log('Test 2: Login con credenciales incorrectas (debe fallar)')
      const wrongLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@almalibre.com',
          password: 'wrongpassword',
        }),
      })

      const wrongLoginData = await wrongLoginResponse.json()

      if (wrongLoginResponse.status === 401 && !wrongLoginData.success) {
        console.log('   ✅ PASSED - Validación de credenciales funcionó\n')
      } else {
        console.log('   ❌ FAILED - Debería haber rechazado credenciales incorrectas\n')
      }

      // Test 3: Registrar nuevo usuario
      console.log('Test 3: Registrar nuevo usuario')
      const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test${Date.now()}@almalibre.com`,
          password: 'test123',
          username: `testuser${Date.now()}`,
          role: 'user',
        }),
      })

      const registerData = await registerResponse.json()

      if (registerResponse.ok && registerData.success) {
        console.log('   ✅ PASSED - Usuario registrado exitosamente')
        console.log(`   👤 Email: ${registerData.data.email}`)
        console.log(`   🎭 Rol: ${registerData.data.role}\n`)
      } else {
        console.log('   ❌ FAILED - Error al registrar usuario')
        console.log(`   Respuesta: ${JSON.stringify(registerData, null, 2)}\n`)
      }

      console.log('✨ Todos los tests de autenticación pasaron')
      process.exit(0)
    } else {
      console.log('   ❌ FAILED - Error en login')
      console.log(`   Respuesta: ${JSON.stringify(loginData, null, 2)}\n`)
      process.exit(1)
    }
  } catch (error) {
    console.log('   ❌ FAILED - Error de conexión')
    console.log(`   Error: ${error}`)
    console.log('   ⚠️  Asegúrate de que el servidor esté corriendo: npm run dev\n')
    process.exit(1)
  }
}

testAuth()

