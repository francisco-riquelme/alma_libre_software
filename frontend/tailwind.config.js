/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial AlmaLibre
        primary: {
          DEFAULT: '#1E90FF',  // Azul calma
          soft: '#EAF4FF',     // Azul pastel suave
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#1E90FF',  // Azul principal (DodgerBlue)
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        accent: {
          DEFAULT: '#CAB3FF',  // Morado empatía
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#CAB3FF',  // Morado principal
          600: '#8B5CF6',
          700: '#7C3AED',
        },
        surface: '#F7F8FA',
        'text-main': '#0E1117',
        'green-soft': '#68CC9A',   // Verde contención
        'yellow-soft': '#FFEEAA',  // Amarillo luz interior
        'pink-soft': '#FFE0F0',    // Rosa empatía
        'icon-blue': '#EAF4FF',    // Azul pastel para iconos
        'icon-purple': '#F4E8FF',  // Morado pastel para iconos
        'icon-pink': '#FFEAF4',    // Rosa pastel para iconos
        // Mantener colores suaves para compatibilidad
        soft: {
          blue: '#E8F4F8',
          teal: '#D4F1F4',
          lavender: '#F3E8FF',
          peach: '#FFE5D9',
          sage: '#E8F5E9',
          cream: '#FFF8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

