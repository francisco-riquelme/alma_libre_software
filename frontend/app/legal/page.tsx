'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Scale, Shield, FileText, AlertTriangle } from 'lucide-react'

interface User {
  _id: string
  email: string
  username: string
  role: string
}

export default function LegalPage() {
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
              <Link href="/codigo-etico" className="btn-nav">
                Código Ético
              </Link>
              <Link href="/legal" className="btn-nav-active">
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
            Información Legal
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Aviso Legal y Seguridad de la Información
          </h1>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Disclaimer */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-icon-blue rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Aviso Importante</h2>
                <p className="text-lg text-gray-700 font-normal leading-relaxed">
                  AlmaLibre ofrece acompañamiento emocional, no terapia psicológica ni servicios clínicos.
                </p>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mt-4">
                  Nadie del equipo se hace responsable por decisiones tomadas a partir de conversaciones.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-icon-purple rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Protección de Datos Personales</h2>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mb-4">
                  Los datos personales se manejan bajo:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 font-normal leading-relaxed ml-4">
                  <li>Ley 19.628 de Protección de Datos Personales (Chile)</li>
                  <li>Estándares internacionales de seguridad digital</li>
                </ul>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mt-4">
                  No se comparten datos con terceros.
                </p>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mt-4">
                  Los usuarios pueden solicitar eliminación de su cuenta y datos.
                </p>
              </div>
            </div>
          </div>

          {/* Prohibited Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-icon-pink rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-warm-600" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Contenido Prohibido</h2>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mb-4">
                  Se prohíbe publicar contenido ilegal:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 font-normal leading-relaxed ml-4">
                  <li>Violencia</li>
                  <li>Acoso</li>
                  <li>Explotación</li>
                  <li>Difusión de datos privados</li>
                </ul>
                <p className="text-lg text-gray-700 font-normal leading-relaxed mt-4">
                  Se realiza moderación activa.
                </p>
              </div>
            </div>
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

