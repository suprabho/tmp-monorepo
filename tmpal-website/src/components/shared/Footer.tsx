import { Container } from './Container';
import { Logo } from './Logo';
import { cn } from '@/lib/cn';
import type { Tone } from '@/lib/theme';

interface FooterProps {
  tone?: Tone;
}

const footerColumns = [
  {
    heading: 'Practice',
    links: [
      { label: 'Approach', href: '#approach' },
      { label: 'Studio', href: '#studio' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'Facades',
    links: [
      { label: 'Unitised', href: '#facades-unitised' },
      { label: 'Stick-built', href: '#facades-stick' },
      { label: 'Rainscreen', href: '#facades-rainscreen' },
    ],
  },
  {
    heading: 'Fenestration',
    links: [
      { label: 'Windows', href: '#fen-windows' },
      { label: 'Doors', href: '#fen-doors' },
      { label: 'Sliding', href: '#fen-sliding' },
    ],
  },
  {
    heading: 'Custom Metal',
    links: [
      { label: 'Screens', href: '#cm-screens' },
      { label: 'Cladding', href: '#cm-cladding' },
      { label: 'Bespoke', href: '#cm-bespoke' },
    ],
  },
];

const socialLinks: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="10" x2="8" y2="17" />
        <line x1="8" y1="7" x2="8" y2="7.01" />
        <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
        <line x1="12" y1="10" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://behance.net/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 6h6a3 3 0 0 1 0 6H3z" />
        <path d="M3 12h7a3 3 0 0 1 0 6H3z" />
        <line x1="15" y1="7" x2="20" y2="7" />
        <path d="M14 14h7a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 6.5 1.8" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 21l2-8" />
        <path d="M8 12c0-2.5 2-4 4-4s4 1.5 4 4-2 4-4 4c-1 0-2-.5-2-1.5" />
      </svg>
    ),
  },
];

export function Footer({ tone = 'light' }: FooterProps) {
  const isDark = tone === 'dark';
  return (
    <footer
      className={cn(
        'mt-section-y border-t',
        isDark
          ? 'border-navy-500/40 bg-slate-900 text-slate-200'
          : 'border-slate-200 bg-white text-navy-500',
      )}
    >
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)] md:gap-8">
          <div>
            <Logo tone={isDark ? 'light' : 'dark'} className="text-2xl md:text-3xl" />
            <p className="mt-6 max-w-xs text-fluid-sm leading-relaxed opacity-80">
              TMPal designs and manufactures steel and aluminium architectural systems, engineered with intent and made under one roof.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-full transition-colors',
                    isDark
                      ? 'bg-navy-500/40 text-slate-200 hover:bg-red-intextor hover:text-white'
                      : 'bg-navy-50 text-navy-500 hover:bg-red-intextor hover:text-white',
                  )}
                >
                  <span className="block h-4 w-4">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-sans text-fluid-sm font-bold uppercase tracking-widest opacity-60">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-sans text-fluid-base hover:text-red-intextor"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-current/10 pt-6 text-fluid-sm opacity-70 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} TMPal. All rights reserved.</span>
          <span className="font-serif italic">Design through finish, one facility.</span>
        </div>
      </Container>
    </footer>
  );
}
