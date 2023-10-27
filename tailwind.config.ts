import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/theme";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
          'agbalumo': ['Agbalumo']
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: '#F4F5FA',
          foreground: '#544F5A',
          primary: {
            DEFAULT: '#339966',
          },
        },
      },
      dark: {
        colors: {
          background: '#27282f',
          foreground: '#CBCACF',
          primary: {
            DEFAULT: '#339966',
          },
        },
      },
    }
  })],
}
export default config
