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

export default function Home() {
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
                <h1 className="text-2xl font-medium text-primary-600 tracking-tight hover:text-primary-700 transition-colors">AlmaLibre</h1>
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
              {user ? (
                <>
                  <Link
                    href="/home"
                    className="text-sm text-gray-700 font-medium px-3 py-1.5 rounded-md bg-primary-50 border border-primary-200 hover:bg-primary-100 hover:border-primary-300 transition-colors ml-2"
                  >
                    Mi Espacio
                  </Link>
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
      <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-soft-blue/30 via-white to-soft-lavender/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                ✨ Completamente Gratis
              </div>
              <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
                Un espacio seguro para expresar lo que sientes, sin juicios y sin presiones
              </h1>
              <p className="text-xl text-gray-700 font-normal mb-4 leading-relaxed">
                Aquí tu voz importa, tu historia importa y tú importas.
              </p>
              <p className="text-lg text-gray-600 font-normal mb-8 leading-relaxed">
                Si estás pasando por un momento difícil, o si quieres ser esa luz para alguien que lo necesita, aquí estás en casa.
              </p>
              {!user && (
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link href="/register" className="btn-primary-lg">
                    Comenzar mi camino
                  </Link>
                  <Link href="/login" className="btn-secondary-lg">
                    Ya tengo cuenta
                  </Link>
                </div>
              )}
            </div>
            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group w-full">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=800&fit=crop&q=80"
                  alt="Personas conectando, escucha activa y apoyo mutuo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-soft-lavender/20 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">Tu voz importa. Tu historia importa.</h2>
            <p className="text-xl text-gray-600 font-normal max-w-3xl mx-auto leading-relaxed">
              En un mundo que a veces se siente demasiado rápido, demasiado ruidoso, demasiado indiferente, aquí el tiempo se detiene para escucharte.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-soft-blue to-soft-teal/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💙</span>
              </div>
              <div className="text-4xl font-bold text-primary-700 mb-3">100%</div>
              <p className="text-gray-700 font-normal leading-relaxed">
                de las personas que comparten aquí sienten alivio al ser escuchadas sin juicios
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-soft-lavender to-soft-peach/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🤝</span>
              </div>
              <div className="text-4xl font-bold text-accent-700 mb-3">Siempre</div>
              <p className="text-gray-700 font-normal leading-relaxed">
                Gratis. Sin condiciones. Sin límites. Porque el apoyo emocional no debería tener precio
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-soft-sage to-soft-blue/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-warm-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🌙</span>
              </div>
              <div className="text-4xl font-bold text-warm-700 mb-3">24/7</div>
              <p className="text-gray-700 font-normal leading-relaxed">
                Disponible cuando lo necesites. Porque los momentos difíciles no esperan horarios
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
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
              <div className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-6">
                Nuestro Propósito
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                Crear un refugio digital para cualquier persona que necesite ser escuchada o que desee ofrecer apoyo
              </h2>
              <p className="text-lg text-gray-700 font-normal leading-relaxed mb-4">
                Un lugar basado en respeto, empatía y humanidad real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-soft-sage/30 to-soft-blue/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-scale-in">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl mb-8 relative group w-full">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop&q=80"
                  alt="Misión de apoyo y comprensión"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                Nuestra Misión
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Ser el puente entre quien necesita y quien puede dar</h3>
              <p className="text-lg text-gray-700 font-normal leading-relaxed">
                Un espacio donde las palabras encuentran eco y cada interacción está teñida de humanidad genuina.
              </p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl mb-8 relative group w-full">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=450&fit=crop&q=80"
                  alt="Visión de comunidad empática"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <div className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
                Nuestra Visión
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Un mundo donde nadie se sienta solo en su dolor</h3>
              <p className="text-lg text-gray-700 font-normal leading-relaxed">
                Una red de apoyo donde la empatía es el lenguaje común y cada historia compartida fortalece a toda la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">Este espacio es para ti si...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl border-2 border-soft-blue hover:border-primary-300 hover:bg-soft-blue/30 transition-all duration-300 hover:shadow-lg animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">💭</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tienes algo que decir</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Si las palabras se acumulan dentro y necesitas un lugar seguro para soltarlas. Si sientes que nadie entendería, aquí sí te entenderán.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl border-2 border-soft-lavender hover:border-accent-300 hover:bg-soft-lavender/30 transition-all duration-300 hover:shadow-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🤗</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Buscas apoyo genuino</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Si estás en un momento difícil y necesitas palabras que sanen, no que juzguen. Si buscas comprensión real, no consejos vacíos.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl border-2 border-soft-sage hover:border-warm-300 hover:bg-soft-sage/30 transition-all duration-300 hover:shadow-lg animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-warm-400 to-warm-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl">🌟</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quieres ser luz para otros</h3>
              <p className="text-gray-700 font-normal leading-relaxed">
                Si sientes el llamado a ayudar, a escuchar, a sostener. Si quieres ser parte de una comunidad que realmente hace la diferencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Important Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-soft-peach/20 to-soft-lavender/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group w-full">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80"
                  alt="Importancia del bienestar emocional"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/40 to-accent-600/40"></div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-1.5 bg-warm-100 text-warm-700 rounded-full text-sm font-medium mb-6">
                Por qué importa
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                Porque tu bienestar emocional es tan real como tu bienestar físico
              </h2>
              <div className="space-y-4 text-lg text-gray-700 font-normal leading-relaxed">
                <p>
                  Vivimos en una sociedad en la que pedir ayuda puede dar miedo. AlmaLibre nace como un refugio digital donde nadie está solo.
                </p>
                <p>
                  Queremos que las emociones tengan un lugar seguro donde ser expresadas, comprendidas y acompañadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16 flex flex-col justify-center text-white">
                  <h3 className="text-4xl lg:text-5xl font-semibold mb-6 leading-tight">Tu historia merece ser escuchada</h3>
                  <p className="text-xl text-primary-100 font-normal mb-8 leading-relaxed">
                    No importa qué estés pasando. No importa qué tan difícil se sienta. Aquí encontrarás un espacio donde tus palabras importan.
                  </p>
                  <Link href="/register" className="btn-primary-lg">
                    Comenzar ahora
                  </Link>
                </div>
                <div className="hidden lg:block relative h-full min-h-[400px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                    alt="Comunidad de apoyo y conexión"
                    fill
                    sizes="50vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-primary-600/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-soft-blue/50 bg-gradient-to-b from-white to-soft-blue/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">AlmaLibre</h3>
          <p className="text-gray-600 font-normal text-sm mb-4">
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

