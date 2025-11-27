'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, TrendingUp, Brain, Wind, Sparkles, CheckCircle } from 'lucide-react'

interface User {
  _id: string
  email: string
  username: string
  role: string
}

export default function MotivacionPage() {
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
              <Link href="/legal" className="btn-nav">
                Legal
              </Link>
              <Link href="/motivacion" className="btn-nav-active">
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
            Crecimiento Personal
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Fortalece tu interior
          </h1>
          <p className="text-xl text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto">
            Herramientas prácticas basadas en psicología y neurociencia para tu bienestar emocional
          </p>
        </div>
      </section>

      {/* Recognize Emotions Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-icon-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">Reconocer tus emociones</h2>
              <div className="space-y-4 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  La psicología moderna ha demostrado que reconocer y nombrar nuestras emociones es el primer paso hacia el bienestar emocional. Cuando identificamos lo que sentimos, activamos la corteza prefrontal, la parte del cerebro responsable de la regulación emocional.
                </p>
                <p>
                  <strong className="text-gray-900">Práctica:</strong> Tómate 5 minutos al día para preguntarte: &ldquo;¿Qué estoy sintiendo ahora mismo?&rdquo; Escribe la emoción y observa cómo cambia tu percepción.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-soft-blue to-soft-lavender rounded-3xl p-12 animate-scale-in">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ejercicio de Autoevaluación Emocional</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Identifica 3 emociones que sentiste hoy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Reflexiona sobre qué las desencadenó</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Observa cómo reaccionaste ante ellas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accept Mistakes Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-soft-peach/20 to-soft-sage/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-soft-lavender to-soft-peach rounded-3xl p-12 animate-scale-in">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cita de Brian Tracy</h3>
              <p className="text-xl text-gray-700 italic leading-relaxed">
                &ldquo;El único error real es aquel del que no aprendemos nada.&rdquo;
              </p>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="w-16 h-16 bg-icon-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-accent-600" />
              </div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">Aceptar errores como parte del crecimiento</h2>
              <div className="space-y-4 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  Como señala Brian Tracy, los errores no son fracasos, sino oportunidades de aprendizaje. La neuroplasticidad nos muestra que cada error crea nuevas conexiones neuronales que nos ayudan a crecer.
                </p>
                <p>
                  <strong className="text-gray-900">Práctica:</strong> Cuando cometas un error, pregúntate: &ldquo;¿Qué puedo aprender de esto?&rdquo; Escribe tres lecciones y observa cómo cambia tu perspectiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaced Repetition Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-icon-pink rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-warm-600" />
              </div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">Repetición Espaciada para pensamientos positivos</h2>
              <div className="space-y-4 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  La neurociencia del aprendizaje ha demostrado que la repetición espaciada fortalece las conexiones neuronales. Aplicar este principio a pensamientos positivos puede reconfigurar patrones mentales negativos.
                </p>
                <p>
                  <strong className="text-gray-900">Práctica:</strong> Elige una afirmación positiva (ej: &ldquo;Soy capaz de superar los desafíos&rdquo;). Repítela 3 veces al día, durante 21 días. Observa cómo se fortalece en tu mente.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-soft-sage to-soft-blue rounded-3xl p-12 animate-scale-in">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ejercicio de Afirmaciones</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Escribe 3 afirmaciones positivas sobre ti</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Repítelas en voz alta cada mañana</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Visualiza cómo te sientes al creerlas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Exercises Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-soft-lavender/20 to-soft-peach/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">Mini ejercicios prácticos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Breathing */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl animate-scale-in">
              <div className="w-16 h-16 bg-icon-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Wind className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Respiración Consciente</h3>
              <p className="text-lg text-gray-700 font-normal leading-relaxed mb-4">
                La respiración profunda activa el sistema nervioso parasimpático, reduciendo el estrés.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                <li>Inhala por 4 segundos</li>
                <li>Mantén el aire por 4 segundos</li>
                <li>Exhala por 6 segundos</li>
                <li>Repite 5 veces</li>
              </ol>
            </div>

            {/* Gratitude */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-icon-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Gratitud Diaria</h3>
              <p className="text-lg text-gray-700 font-normal leading-relaxed mb-4">
                La gratitud activa áreas del cerebro relacionadas con el bienestar y la felicidad.
              </p>
              <p className="text-gray-700">
                <strong>Práctica:</strong> Cada noche, escribe 3 cosas por las que estás agradecido. Pueden ser pequeñas o grandes, lo importante es la práctica constante.
              </p>
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

