import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Space_Grotesk } from 'next/font/google';
import { MotionConfig } from '@/components/motion/MotionConfig';
import './globals.css';

// Self-hosted Instrument Serif — TTFs live in ./fonts/.
const instrumentSerif = localFont({
  src: [
    {
      path: './fonts/InstrumentSerif-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/InstrumentSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#142338',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tmpal.example.com'),
  title: {
    default: 'TMPal — Where design meets making.',
    template: '%s · TMPal',
  },
  description:
    'TMPal designs and manufactures steel and aluminium architectural systems — facades, fenestration, and custom metal — engineered with intent and made under one roof.',
  openGraph: {
    title: 'TMPal — Where design meets making.',
    description:
      'Steel and aluminium architectural systems, engineered with intent and made under one roof.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionConfig>{children}</MotionConfig>
      </body>
    </html>
  );
}
