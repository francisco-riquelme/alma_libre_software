'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, MessageSquare, Heart, Settings, Shield, Users, FileText, LogOut } from 'lucide-react'

interface UserData {
  _id: string
  email: string
  username: string
  role: 'admin' | 'user' | 'mentor'
}

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (!token || !userStr) {
      router.push('/login')
      setLoading(false)
      return
    }

    try {
      const userData = JSON.parse(userStr)
      setUser(userData)
    } catch (e) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Opciones de menú según el rol
  const getMenuOptions = () => {
    const baseOptions = [
      { href: '/home', label: 'Inicio', icon: User },
      { href: '/home/posts', label: 'Mis Publicaciones', icon: MessageSquare },
      { href: '/home/profile', label: 'Mi Perfil', icon: Settings },
    ]

    if (user.role === 'admin') {
      return [
        ...baseOptions,
        { href: '/admin', label: 'Administración', icon: Shield },
        { href: '/admin/users', label: 'Usuarios', icon: Users },
        { href: '/admin/moderation', label: 'Moderación', icon: FileText },
      ]
    }

    if (user.role === 'mentor') {
      return [
        ...baseOptions,
        { href: '/mentor/support', label: 'Dar Apoyo', icon: Heart },
        { href: '/mentor/moderation', label: 'Moderar', icon: FileText },
      ]
    }

    return [
      ...baseOptions,
      { href: '/home/explore', label: 'Explorar', icon: MessageSquare },
      { href: '/home/support', label: 'Buscar Apoyo', icon: Heart },
    ]
  }

  const menuOptions = getMenuOptions()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-semibold text-primary-600 tracking-tight hover:text-primary-700 transition-colors">AlmaLibre</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/about" className="btn-nav">
                Sobre Nosotros
              </Link>
              <Link href="/codigo-etico" className="btn-nav">
                Código Ético
              </Link>
              <Link href="/legal" className="btn-nav">
                Legal
              </Link>
              <Link href="/motivacion" className="btn-nav">
                Motivación
              </Link>
              <span className="text-sm text-gray-600 font-normal px-3 py-1.5 rounded-md bg-gray-100 ml-2">
                {user.username} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary ml-2 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Bienvenido, {user.username}
            </h1>
            <p className="text-xl text-gray-600 font-normal">
              Tu espacio seguro para expresar y recibir apoyo
            </p>
          </div>

          {/* Menu Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className="group p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 hover:shadow-lg transition-all duration-200 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {option.href.includes('admin') && 'Gestiona el sistema completo'}
                        {option.href.includes('mentor') && 'Ofrece apoyo y moderación'}
                        {option.href.includes('profile') && 'Gestiona tu información personal'}
                        {option.href.includes('posts') && 'Ver y crear publicaciones'}
                        {option.href.includes('explore') && 'Descubre publicaciones de la comunidad'}
                        {option.href.includes('support') && 'Busca o ofrece apoyo emocional'}
                        {option.href === '/home' && 'Panel principal de tu cuenta'}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border-2 border-primary-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/home/posts/create"
                className="btn-primary-lg flex items-center justify-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Crear Nueva Publicación</span>
              </Link>
              {user.role === 'mentor' && (
                <Link
                  href="/mentor/support"
                  className="btn-secondary-lg flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Ofrecer Apoyo</span>
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="btn-secondary-lg flex items-center justify-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Panel de Administración</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

