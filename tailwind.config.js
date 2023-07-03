/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,ts,js}', '**/*.vue'],
  theme: {
    extend: {
      colors: {
        'primary-25': 'var(--primary-25)',
        'primary-50': 'var(--primary-50)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'checkbox-icon':
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTksMjAuNDJMMi43OSwxNC4yMUw1LjYyLDExLjM4TDksMTQuNzdMMTguODgsNC44OEwyMS43MSw3LjcxTDksMjAuNDJaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==');",
      },
      keyframes: {
        show: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        show: 'show 1s ease-in-out',
      },
      height: {
        screen: ['100vh', '100svh'],
      },
    },
  },
  plugins: [],
};
