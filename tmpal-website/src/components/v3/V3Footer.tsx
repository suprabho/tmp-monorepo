import type { ReactNode } from 'react';
import { CONTACT_CTA } from '@/content/copy';

/** Right-hand navigation, grouped as in the reference. */
const navColumns = [
  {
    heading: 'Systems',
    links: [
      { label: 'Facades', href: '#services' },
      { label: 'Fenestration', href: '#services' },
      { label: 'Custom metal', href: '#services' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'Work', href: '#projects' },
      { label: 'Process', href: '#process' },
      { label: 'Capability deck', href: '#contact' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#partnership' },
      { label: 'Press', href: '#' },
      { label: 'Events', href: '#' },
    ],
  },
];

const legalLinks = ['Terms of Service', 'Privacy Policy', 'Manage Cookies'];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 12s0-3.2-.41-4.73a2.47 2.47 0 0 0-1.74-1.74C19.31 5.12 12 5.12 12 5.12s-7.31 0-8.85.41A2.47 2.47 0 0 0 1.41 7.27C1 8.8 1 12 1 12s0 3.2.41 4.73a2.47 2.47 0 0 0 1.74 1.74c1.54.41 8.85.41 8.85.41s7.31 0 8.85-.41a2.47 2.47 0 0 0 1.74-1.74C23 15.2 23 12 23 12ZM9.75 15.02V8.98L15 12l-5.25 3.02Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v6h3v-6h2.5l.5-3H14V9z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 5.5c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.96-2.47 8.94 8.94 0 0 1-2.83 1.08 4.46 4.46 0 0 0-7.6 4.06A12.65 12.65 0 0 1 2.79 4.23a4.46 4.46 0 0 0 1.38 5.95 4.42 4.42 0 0 1-2.02-.56v.06a4.46 4.46 0 0 0 3.58 4.37 4.5 4.5 0 0 1-2.01.08 4.46 4.46 0 0 0 4.16 3.1A8.94 8.94 0 0 1 1 19.07a12.6 12.6 0 0 0 6.83 2c8.2 0 12.68-6.79 12.68-12.68l-.01-.58A9.05 9.05 0 0 0 23 5.5Z" />
      </svg>
    ),
  },
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
];

/**
 * v3 footer. A pattern-backed CTA zone — large decorative rounded white
 * shapes carved out of the TMP tessellation on the left, the contact
 * heading + navy button centred — sits above a bold red block holding the
 * navigation, brand mark, legal links and socials.
 */
export function V3Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-navy-500">
      {/* Footer background — BG footer.svg (TMP cross tessellation, #C4C4C4)
          spanning the WHOLE section (CTA zone + red footer) behind everything,
          tiled at native size. Visible wherever the red block doesn't cover it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/projects/BG%20footer.svg')] bg-[position:0px_-5%] bg-repeat [mask-image:linear-gradient(to_bottom,transparent,#000_160px)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_160px)]"
      />
      {/* Decorative logo_stroke mark — moved to the footer level and anchored
          to the footer's bottom edge so it runs the full height (down past /
          behind the red block). White fill, thin grey outline; above the
          pattern (z-1), below the red block (z-2) and the CTA content (z-10). */}
      <img
        src="/projects/logo_stroke.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[12px] bottom-0 z-[1] hidden h-[600px] w-auto md:block"
      />
      {/* ── CTA zone ───────────────────────────────────────────────── */}
      <div className="relative">
        {/* CTA block — ~280px from the left edge, 140px from the top,
            left-aligned. */}
        <div className="relative z-10 px-6 pb-[100px] pt-[140px] md:pl-[230px] md:pr-12">
          <div className="max-w-[580px] text-left md:ml-[5%] md:mt-[3%] md:-translate-y-[40px]">
            <h2 className="whitespace-nowrap font-sans font-bold leading-[1.1] text-red-intextor" style={{ fontSize: '34px' }}>
              {CONTACT_CTA}
            </h2>
            <p className="mt-5 max-w-[560px] font-sans text-fluid-base leading-relaxed text-navy-500/70">
              Send us a project name and your email. We&rsquo;ll come back with the right person
              and an honest read on whether we can help.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-[4px] bg-navy-700 px-9 py-4 font-sans text-fluid-base text-white transition-colors hover:bg-navy-500"
            >
              Request more info
            </a>
          </div>
        </div>
      </div>

      {/* ── Red footer block — compact, narrower, bottom-right, overlapping
          the CTA section. The 200px top-left curve echoes the decorative
          icon's roundness. ──────────────────────────────────────────── */}
      <div className="relative z-[2] -mt-[70px] ml-auto w-full rounded-tl-[200px] rounded-tr-[200px] bg-red-intextor text-white md:w-[88%]">
        {/* White TMPal wordmark — large, on the right side. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden
          alt=""
          src="/brand/Tmpal%20logo%20white.svg"
          className="absolute right-[5%] top-1/2 hidden w-[180px] -translate-y-1/2 md:block lg:w-[234px]"
        />
        <div className="relative px-8 py-10 md:pb-[48px] md:pl-[200px] md:pr-[260px] md:pt-[50px]">
          {/* Navigation columns — compact, clear of the rounded corner. */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-5 sm:grid-cols-3">
            {navColumns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="font-sans text-fluid-xs font-bold uppercase tracking-[0.18em] text-white/60">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="font-sans text-fluid-base text-white/90 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-5 h-px bg-white/25" />

          {/* Brand mark + legal + socials */}
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-fluid-sm text-white/80">
                {legalLinks.map((label) => (
                  <li key={label}>
                    <a href="#" className="transition-colors hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
                <li className="text-white/60">© {year} TMPal</li>
              </ul>
            </div>

            <ul className="flex items-center gap-5">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="block text-white/80 transition-colors hover:text-white"
                  >
                    <span className="block h-5 w-5">{s.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
