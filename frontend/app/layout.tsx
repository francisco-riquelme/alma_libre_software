import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlmaLibre - Un espacio seguro para tu bienestar emocional',
  description: 'Comparte lo que sientes sin miedo. Encuentra apoyo genuino en una comunidad que entiende y valora tu bienestar mental.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  )
}

