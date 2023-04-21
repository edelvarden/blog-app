/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // light mode colors
        'accent-light': '#1fb6ff',
        'primary-light': '#1fb6ff',
        'secondary-light': '#1fb6ff',
        // dark mode colors
        'accent-dark': '#1fb6ff',
        'primary-dark': '#ffffff',
        'secondary-dark': '#fafafa',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Poppins', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
