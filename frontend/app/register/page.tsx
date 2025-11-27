'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'user' as 'admin' | 'user' | 'mentor',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/login?registered=true')
      } else {
        setError(data.error || data.details || 'Error al registrar usuario')
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el servidor esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-lavender/30 via-white to-soft-peach/20 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-semibold text-primary-600 tracking-tight">AlmaLibre</h1>
          </Link>
          <p className="text-gray-700 font-normal text-lg">Crea tu espacio personal</p>
          <p className="text-gray-600 font-normal text-sm mt-1">Únete a una comunidad que realmente escucha</p>
        </div>

        <div className="bg-white border-2 border-soft-lavender/50 rounded-3xl p-8 shadow-xl">
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-soft-lavender/50 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-accent-400 transition-all duration-200 font-normal bg-white"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={30}
                className="w-full px-4 py-3 border-2 border-soft-lavender/50 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-accent-400 transition-all duration-200 font-normal bg-white"
                placeholder="tu_username"
              />
              <p className="mt-1 text-xs text-gray-500 font-normal">Mínimo 3 caracteres</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-soft-lavender/50 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-accent-400 transition-all duration-200 font-normal bg-white"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500 font-normal">Mínimo 6 caracteres</p>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cuenta
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-soft-lavender/50 rounded-xl focus:ring-2 focus:ring-accent-300 focus:border-accent-400 transition-all duration-200 font-normal bg-white"
              >
                <option value="user">Usuario - Quiero compartir y recibir apoyo</option>
                <option value="mentor">Mentor - Quiero ayudar a otros</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 font-normal">Los roles de admin se asignan manualmente</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-lg"
            >
              {loading ? 'Creando tu espacio...' : 'Crear mi cuenta'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-soft-lavender/30">
            <p className="text-sm text-gray-600 font-normal text-center">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-accent-600 hover:text-accent-700 font-semibold hover:underline transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-block px-5 py-2 text-sm bg-white border-2 border-accent-200 text-accent-700 rounded-full hover:border-accent-300 hover:bg-accent-50 hover:text-accent-800 hover:scale-105 active:scale-95 transition-all duration-300 font-normal"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
