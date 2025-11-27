'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        const role = data.data.user.role
        if (role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/home')
        }
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-blue/30 via-white to-soft-lavender/20 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-semibold text-primary-600 tracking-tight">AlmaLibre</h1>
          </Link>
          <p className="text-gray-700 font-normal text-lg">Bienvenido de vuelta</p>
          <p className="text-gray-600 font-normal text-sm mt-1">Tu espacio seguro te espera</p>
        </div>

        <div className="bg-white border-2 border-soft-blue/50 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-normal">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-soft-blue/50 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all duration-200 font-normal bg-white"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-soft-blue/50 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all duration-200 font-normal bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-lg"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar a mi espacio'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-soft-blue/30">
            <p className="text-sm text-gray-600 font-normal text-center mb-4">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors">
                Crea una aquí
              </Link>
            </p>
            
            <div className="bg-soft-blue/30 rounded-xl p-4 border border-primary-200/50">
              <p className="text-xs text-gray-600 font-medium text-center mb-3">Usuarios de prueba:</p>
              <div className="text-xs text-gray-700 space-y-1.5 font-normal">
                <p><span className="font-semibold text-primary-700">Admin:</span> admin@almalibre.com / admin123</p>
                <p><span className="font-semibold text-accent-700">Usuario:</span> user@almalibre.com / user123</p>
                <p><span className="font-semibold text-warm-700">Mentor:</span> mentor@almalibre.com / mentor123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-block px-5 py-2 text-sm bg-white border-2 border-primary-200 text-primary-700 rounded-full hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 hover:scale-105 active:scale-95 transition-all duration-300 font-normal"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
