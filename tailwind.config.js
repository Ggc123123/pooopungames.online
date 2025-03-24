/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#007AFF',
        'apple-indigo': '#5856D6',
        'apple-purple': '#AF52DE',
        'apple-pink': '#FF2D55',
        'apple-red': '#FF3B30',
        'apple-orange': '#FF9500',
        'apple-yellow': '#FFCC00',
        'apple-green': '#34C759',
        'apple-teal': '#5AC8FA',
        'apple-gray': {
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 0 10px rgba(0, 0, 0, 0.1)',
        'apple-hover': '0 0 15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 