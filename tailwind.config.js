/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#3b5bdb', hover: '#364fc7', light: '#e7f5ff' },
        sidebar: { bg: '#1c2333', hover: '#2d3748', active: '#3b5bdb', text: '#a0aec0', heading: '#718096' },
        surface: { DEFAULT: '#f8fafc', card: '#ffffff', border: '#e2e8f0' },
        status: { success: '#10b981', warning: '#f59e0b', danger: '#ef4444', info: '#3b82f6', purple: '#8b5cf6' }
      }
    }
  },
  plugins: []
}