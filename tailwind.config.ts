import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient-free': 'linear-gradient(to bottom right, #599ead, #e3edef, #599ead)',
        'custom-gradient-busy': 'linear-gradient(to bottom right, #ef3e5b, #f7e0e6, #ed4761)', 
      },
    },
  },
  plugins: [],
}
export default config
