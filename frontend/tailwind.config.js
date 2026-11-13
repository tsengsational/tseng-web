/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        wabi: {
          bg: '#faf6f0',        // Warm unbleached washi / linen
          surface: '#ffffff',   // Soft pure white sheet
          card: '#f4ede2',      // Natural unprimed paper
          border: '#e7ded0',    // Soft oat thread border
          'border-dark': '#d4c7b2',
          text: '#2c2825',      // Warm sumi ink
          muted: '#787067',     // Soft charcoal wash
          subtle: '#a89f94',    // Pale earth
          sand: '#ece5d8',
        },
        clay: {
          terracotta: '#bd5b3b', // Warm fired clay / seal ink
          ocher: '#c98a42',      // Warm raw ocher
          sage: '#5a6e5a',       // Lichen / tea green
          slate: '#434751',      // River stone
          linen: '#e4dcd0',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(60, 48, 36, 0.05)',
        'wabi': '0 10px 30px -4px rgba(60, 48, 36, 0.07)',
        'float': '0 20px 40px -10px rgba(60, 48, 36, 0.1)',
      }
    },
  },
  plugins: [],
}
