'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface User {
  _id: string
  email: string
  username: string
  role: string
}

export default function AboutPage() {
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
              <Link href="/about" className="btn-nav-active">
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
            Nuestra Historia
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Si logramos cambiar al menos una vida, con eso nos conformamos
          </h1>
          <p className="text-xl text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto">
            Porque cada persona importa. Cada historia cuenta. Y cada momento de apoyo puede marcar la diferencia entre sentirse solo y sentirse comprendido.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-slide-up">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group w-full">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80"
                  alt="Comunidad unida en apoyo y comprensión"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-transparent"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                Nuestra Misión
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                Proporcionar un refugio digital para cualquier persona que lo necesite
              </h2>
              <div className="space-y-4 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  <strong className="text-gray-900">Para quien está pasando por un momento difícil de cualquier índole.</strong> No importa qué tan grande o pequeño parezca. Si te afecta, nos importa.
                </p>
                <p>
                  <strong className="text-gray-900">Para quien tiene la intención de ayudar.</strong> Si sientes el llamado a aportar tu granito de arena, a ser esa luz para alguien que lo necesita, aquí tienes tu espacio.
                </p>
                <p className="text-xl text-primary-700 font-semibold pt-4 border-t-2 border-soft-blue/50">
                  Sin lucro. Sin palabras negativas. Sin juicios. Solo apoyo genuino, empatía real, y conexión humana auténtica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-soft-peach/30 to-soft-sage/20">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">¿Por qué existe AlmaLibre?</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-700 font-normal leading-relaxed bg-white/80 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl">
            <p>
              Vivimos en una sociedad en la que pedir ayuda puede dar miedo. AlmaLibre nace como un refugio digital donde nadie está solo.
            </p>
            <p>
              Queremos que las emociones tengan un lugar seguro donde ser expresadas, comprendidas y acompañadas.
            </p>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">La historia detrás de AlmaLibre</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-700 font-normal leading-relaxed bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl">
            <p>
              AlmaLibre nació de un proceso personal de reflexión, crecimiento y búsqueda de un espacio seguro donde poder hablar sin miedo, sin juicios y sin etiquetas. Como muchos, viví momentos en los que me faltó un lugar humano, cálido y anónimo donde expresar lo que sentía.
            </p>
            <p>
              De esa necesidad, surgió la idea de crear un refugio digital accesible para todos. Un espacio construido sobre respeto, empatía y humanidad.
            </p>
            <p className="text-xl text-primary-700 font-semibold pt-4 border-t-2 border-soft-blue/30">
              Este proyecto no nace del interés por cifras ni por reconocimiento, sino del deseo sincero de que nadie pase por un momento difícil en completo silencio. Si AlmaLibre logra acompañar a una sola persona, entonces habrá cumplido su propósito.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">Los valores que nos guían</h2>
            <p className="text-xl text-gray-600 font-normal max-w-3xl mx-auto">
              Estos principios no son solo palabras. Son la base de cada interacción, cada conversación, cada momento de apoyo en AlmaLibre.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-soft-blue/50 rounded-2xl hover:border-primary-300 hover:bg-soft-blue/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-icon-blue rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Respeto</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Tratamos a cada persona con la dignidad que merece, sin importar su situación o circunstancias.
              </p>
            </div>
            <div className="p-6 border-2 border-soft-lavender/50 rounded-2xl hover:border-accent-300 hover:bg-soft-lavender/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-icon-purple rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">💜</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Empatía</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Nos ponemos genuinamente en el lugar del otro. Entendemos que cada experiencia es única y válida.
              </p>
            </div>
            <div className="p-6 border-2 border-soft-sage/50 rounded-2xl hover:border-warm-300 hover:bg-soft-sage/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.3s' }}>
              <div className="w-14 h-14 bg-icon-pink rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">👂</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Escucha Activa</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Escuchamos con atención, presencia y comprensión genuina. Concepto avalado por la neurociencia.
              </p>
            </div>
            <div className="p-6 border-2 border-soft-blue/50 rounded-2xl hover:border-primary-300 hover:bg-soft-blue/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 bg-icon-blue rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Reconocerse a Uno Mismo</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Fomentamos la autoconciencia como base para el crecimiento personal y el bienestar.
              </p>
            </div>
            <div className="p-6 border-2 border-soft-lavender/50 rounded-2xl hover:border-accent-300 hover:bg-soft-lavender/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.5s' }}>
              <div className="w-14 h-14 bg-icon-purple rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Humildad</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Reconocemos que todos tenemos algo que aprender y algo que enseñar. Todos estamos en nuestro propio camino.
              </p>
            </div>
            <div className="p-6 border-2 border-soft-sage/50 rounded-2xl hover:border-warm-300 hover:bg-soft-sage/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in bg-white" style={{ animationDelay: '0.6s' }}>
              <div className="w-14 h-14 bg-icon-pink rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Sin Juicios</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Este es un espacio libre de críticas, estereotipos y prejuicios. Todos son bienvenidos tal como son.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neuroscience Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-soft-blue/20 to-soft-lavender/20">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-block px-5 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-6">
              Fundamentos Científicos
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">Respaldado por la ciencia</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-700 font-normal leading-relaxed bg-white/90 backdrop-blur-sm rounded-3xl p-10 border-2 border-soft-blue/30 shadow-xl">
            <p>
              Los valores y conceptos que promovemos en AlmaLibre no son solo ideales bonitos. <strong className="text-gray-900">Están respaldados por la neurociencia y la psicología moderna.</strong>
            </p>
            <div className="space-y-4 pt-4 border-t-2 border-soft-blue/30">
              <p>
                <strong className="text-primary-700 text-xl">La escucha activa</strong> reduce estrés y aumenta conexión emocional (Weger et al., 2014).
              </p>
              <p>
                <strong className="text-accent-700 text-xl">Expresar emociones</strong> mejora el bienestar psicológico (Pennebaker, 1997).
              </p>
              <p>
                <strong className="text-warm-700 text-xl">La conexión humana</strong> activa áreas cerebrales vinculadas a seguridad y calma (Hein & Singer, 2008).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block px-5 py-2 bg-warm-100 text-warm-700 rounded-full text-sm font-semibold mb-6">
            Nuestro Compromiso
          </div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Si logramos cambiar al menos <span className="text-primary-600">una vida</span>, con eso nos conformamos
          </h2>
          <p className="text-xl text-gray-700 font-normal leading-relaxed mb-8">
            Porque cada persona importa. Cada historia cuenta. Y cada momento de apoyo puede marcar la diferencia entre sentirse solo y sentirse comprendido.
          </p>
          <p className="text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            No buscamos números impresionantes. Buscamos impacto real. Si una sola persona encuentra aquí el apoyo que necesita, si una sola persona se siente menos sola, entonces nuestra misión está cumplida.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-warm-500/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">¿Listo para ser parte del cambio?</h3>
            <p className="text-lg text-gray-700 font-normal mb-8 leading-relaxed">
              Únete a nuestra comunidad y ayuda a crear un mundo más empático y comprensivo. Tu presencia aquí ya hace la diferencia.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register" className="btn-primary-lg">
                Crear cuenta gratis
              </Link>
              <Link href="/" className="btn-secondary-lg">
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t-2 border-soft-blue/50 bg-gradient-to-b from-white to-soft-blue/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-primary-600 mb-2">AlmaLibre</h3>
          <p className="text-gray-700 font-normal text-sm mb-4">
            Un espacio seguro para tu bienestar emocional
          </p>
          <p className="text-gray-500 font-light text-xs">
            Completamente gratuito. Siempre. Porque el apoyo emocional no debería tener precio.
          </p>
        </div>
      </footer>
    </div>
  )
}

