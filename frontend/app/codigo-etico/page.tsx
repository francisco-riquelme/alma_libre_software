'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Heart, Eye, Lock, AlertCircle, FileText } from 'lucide-react'

interface User {
  _id: string
  email: string
  username: string
  role: string
}

export default function CodigoEticoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (e) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    setUser(null)
  }

  const codeItems = [
    {
      icon: Shield,
      title: 'Sin juicios',
      description: 'Nadie será criticado por lo que siente.',
      bgColor: 'bg-icon-blue'
    },
    {
      icon: AlertCircle,
      title: 'Sin violencia verbal o emocional',
      description: 'No se permiten insultos, burlas, ataques ni descalificaciones.',
      bgColor: 'bg-icon-pink'
    },
    {
      icon: Heart,
      title: 'Escucha activa',
      description: 'Fomentamos la atención genuina, empatía y comprensión.',
      bgColor: 'bg-icon-purple'
    },
    {
      icon: Eye,
      title: 'Respeto absoluto',
      description: 'Todos los usuarios, sin excepción, merecen un trato amable.',
      bgColor: 'bg-icon-blue'
    },
    {
      icon: Lock,
      title: 'Confidencialidad',
      description: 'Lo que se comparte en el espacio, queda en el espacio.',
      bgColor: 'bg-icon-purple'
    },
    {
      icon: FileText,
      title: 'Prohibido compartir datos personales sensibles',
      description: 'RUT, dirección, fotos privadas, etc.',
      bgColor: 'bg-icon-pink'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-soft-blue/30' : 'bg-transparent'
      }`}>
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
              <Link href="/codigo-etico" className="btn-nav-active">
                Código Ético
              </Link>
              <Link href="/legal" className="btn-nav">
                Legal
              </Link>
              <Link href="/motivacion" className="btn-nav">
                Motivación
              </Link>
              {user ? (
                <>
                  <span className="text-sm text-gray-600 font-normal px-3 py-1.5 rounded-md bg-gray-100 ml-2">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary ml-2"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary ml-2">
                    Iniciar Sesión
                  </Link>
                  <Link href="/register" className="btn-primary ml-2">
                    Comenzar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-soft-blue/40 via-white to-soft-lavender/30">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block px-5 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
            Nuestro Compromiso
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Código Ético de AlmaLibre
          </h1>
          <p className="text-xl text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto">
            AlmaLibre es un espacio seguro. Todas las interacciones deben proteger la dignidad, privacidad y bienestar de las personas.
          </p>
        </div>
      </section>

      {/* Code Items */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="p-8 border-2 border-soft-blue/50 rounded-2xl hover:border-primary-300 hover:bg-soft-blue/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-soft-peach/30 to-soft-sage/20">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Información solo con fines de apoyo emocional</h2>
            <p className="text-lg text-gray-700 font-normal leading-relaxed">
              AlmaLibre no reemplaza ayuda psicológica profesional. Si estás experimentando una crisis de salud mental, te recomendamos buscar ayuda de un profesional de la salud mental.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t-2 border-soft-blue/50 bg-gradient-to-b from-white to-soft-blue/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-primary-600 mb-2">AlmaLibre</h3>
          <p className="text-gray-700 font-normal text-sm mb-4">
            Un espacio seguro para tu bienestar emocional
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/legal" className="text-gray-600 hover:text-primary-600 transition-colors">
              Aviso Legal
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/codigo-etico" className="text-gray-600 hover:text-primary-600 transition-colors">
              Código Ético
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
              Sobre Nosotros
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

