/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brutal: {
          black: '#1a1a1a',
          white: '#f5f5f0',
          yellow: '#FFD700',
          blue: '#0066FF',
          gray: '#e5e5e0',
          green: '#00CC66',
          red: '#FF3333',
          purple: '#9933FF',
        },
      },
      borderWidth: {
        brutal: '3px',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #1a1a1a',
        'brutal-sm': '2px 2px 0px 0px #1a1a1a',
        'brutal-lg': '6px 6px 0px 0px #1a1a1a',
        'brutal-xl': '8px 8px 0px 0px #1a1a1a',
      },
    },
  },
  plugins: [],
}
