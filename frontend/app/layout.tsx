import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlmaLibre',
  description: 'Espacio seguro y anónimo donde las personas puedan desahogarse y recibir apoyo empático',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

