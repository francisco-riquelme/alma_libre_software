// Script para verificar el estado del servidor
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '../.env.local') })

async function checkServer() {
  const url = 'http://localhost:3000'
  
  console.log('🔍 Verificando servidor de desarrollo...\n')
  console.log(`📍 URL: ${url}\n`)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
      },
    })

    console.log(`✅ Servidor respondiendo`)
    console.log(`   Status: ${response.status} ${response.statusText}`)
    console.log(`   URL: ${url}`)
    console.log(`\n🌐 Abre tu navegador en: ${url}`)
    
    if (response.status === 200) {
      console.log('\n✨ Todo funciona correctamente')
    } else {
      console.log(`\n⚠️  El servidor responde pero con status ${response.status}`)
    }
  } catch (error: any) {
    console.log('❌ Error al conectar con el servidor')
    console.log(`   Error: ${error.message}`)
    console.log('\n💡 Posibles soluciones:')
    console.log('   1. Asegúrate de que el servidor esté corriendo: npm run dev')
    console.log('   2. Verifica que MongoDB esté corriendo en localhost:27017')
    console.log('   3. Revisa los logs del servidor para más detalles')
  }
}

checkServer()

