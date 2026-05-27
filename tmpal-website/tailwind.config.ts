import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      sm: '641px',
      md: '1025px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1728px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        md: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        red: {
          intextor: '#FE1116',
          deep: '#EE2325',
          rust: '#E73115',
          pale: '#FC8EA6',
          wash: '#FEE2E2',
          DEFAULT: '#FE1116',
        },
        navy: {
          ink: '#0F172A',
          50: '#D5D9DF',
          100: '#B1B9C5',
          300: '#6A7A92',
          400: '#465A78',
          500: '#223A5E',
          600: '#1B2E4B',
          700: '#142338',
        },
        slate: {
          200: '#E2E8F0',
          250: '#94A3B8',
          300: '#78909C',
          350: '#8E9AAC',
          400: '#6A7A92',
          500: '#465A78',
          600: '#475569',
          700: '#334155',
          900: '#0F172A',
        },
        stone: {
          50: '#F2F4F5',
          100: '#D5D9DF',
          150: '#CED6DA',
        },
        bone: '#FDF8F7',
        editorial: '#FAF7F2',
      },
      borderRadius: {
        'corner-tl': '126px 20px 20px 20px',
        'corner-tr': '20px 126px 20px 20px',
        'corner-br': '20px 20px 80px 20px',
        'corner-bl': '20px 20px 20px 80px',
      },
      boxShadow: {
        'tmp-1': '0px 1.27px 3.81px rgba(0, 0, 0, 0.10), 0px 0px 2.54px rgba(0, 0, 0, 0.07)',
        'tmp-2': '0px 4px 16px rgba(15, 23, 42, 0.10), 0px 1px 2px rgba(15, 23, 42, 0.06)',
        'tmp-3': '0px 18px 48px rgba(15, 23, 42, 0.18), 0px 2px 6px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // clamp(MIN_REM, MIN_REM + (MAX_REM - MIN_REM) * ((100vw - 360px) / (1728px - 360px)), MAX_REM)
        'fluid-xs': ['clamp(0.75rem, 0.70rem + 0.22vw, 0.875rem)', { lineHeight: '1.4' }],
        'fluid-sm': ['clamp(0.875rem, 0.82rem + 0.25vw, 1rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(1rem, 0.94rem + 0.28vw, 1.125rem)', { lineHeight: '1.55' }],
        'fluid-lg': ['clamp(1.125rem, 1.04rem + 0.39vw, 1.25rem)', { lineHeight: '1.5' }],
        'fluid-xl': ['clamp(1.25rem, 1.10rem + 0.65vw, 1.5rem)', { lineHeight: '1.4' }],
        'fluid-2xl': ['clamp(1.5rem, 1.20rem + 1.30vw, 1.875rem)', { lineHeight: '1.3' }],
        'fluid-3xl': ['clamp(1.875rem, 1.40rem + 2.05vw, 2.5rem)', { lineHeight: '1.2' }],
        'fluid-display-sm': [
          'clamp(2.25rem, 1.60rem + 2.80vw, 4rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        'fluid-display': [
          'clamp(2.75rem, 1.80rem + 4.10vw, 6rem)',
          { lineHeight: '1.02', letterSpacing: '-0.02em' },
        ],
        'fluid-display-lg': [
          'clamp(3.25rem, 2.10rem + 4.95vw, 7.5rem)',
          { lineHeight: '1.00', letterSpacing: '-0.025em' },
        ],
      },
      spacing: {
        'section-y': 'clamp(4rem, 2.5rem + 6vw, 9rem)',
        'block-y': 'clamp(2rem, 1.4rem + 2.6vw, 4rem)',
      },
      maxWidth: {
        shell: '1728px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'inout-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.30, 1)',
      },
      transitionDuration: {
        fast: '140ms',
        base: '240ms',
        slow: '480ms',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
