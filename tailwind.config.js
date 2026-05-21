/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'blue-light': 'var(--color-blue-light)',
        'blue-mid': 'var(--color-blue-mid)',
        'blue-deep': 'var(--color-blue-deep)',
        'green-light': 'var(--color-green-light)',
        'green-mid': 'var(--color-green-mid)',
        'green-deep': 'var(--color-green-deep)',
        'text-primary': 'var(--color-text-primary)',
        'text-sub': 'var(--color-text-sub)',
        'text-muted': 'var(--color-text-muted)',
        divider: 'var(--color-divider)',
        'nav-bg': 'var(--color-nav-bg)',
        'nav-icon': 'var(--color-nav-icon)',
        'nav-active': 'var(--color-nav-active)',
        'mood-happy': 'var(--mood-happy)',
        'mood-calm': 'var(--mood-calm)',
        'mood-neutral': 'var(--mood-neutral)',
        'mood-stressed': 'var(--mood-stressed)',
        'mood-low': 'var(--mood-low)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        nav: 'var(--shadow-nav)',
        button: 'var(--shadow-button)',
      },
    },
  },
  plugins: [],
}
