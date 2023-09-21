import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'rgba-opacity': 'rgba(0,0,0,0.5)',
        // map: 'rgba(188, 188, 188) '
      },
    },
  },
  plugins: [],
};
export default config;
