'use client';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { ContactCTA } from './ContactCTA';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';
import { navItems } from '@/content/nav';
import type { Tone } from '@/lib/theme';

interface NavigationProps {
  tone?: Tone;
  /** Sticky transparent-until-scroll for hero pages with dark backgrounds. */
  variant?: 'solid-light' | 'transparent-dark' | 'rule-line';
}

const navStyles = {
  'solid-light': 'bg-white/70 text-navy-500 backdrop-blur',
  'transparent-dark': 'text-white',
  'rule-line': 'bg-editorial/70 text-navy-500 backdrop-blur',
};

/**
 * Top nav. Inline links at md+ (1025px+); hamburger + drawer below.
 * Variant controls the visual treatment per design direction.
 */
export function Navigation({ tone = 'light', variant = 'solid-light' }: NavigationProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cn('sticky top-0 z-30 w-full transition-colors', navStyles[variant])}>
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Link href="/" className="inline-flex items-center" aria-label="TMP — home">
          <Logo tone={tone === 'dark' ? 'light' : 'dark'} className="text-2xl md:text-3xl" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-1 py-3 font-sans text-fluid-base font-medium tracking-tight transition-colors duration-fast ease-out-quart hover:text-red-intextor"
            >
              {item.label}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-1.5 h-[5px] origin-left scale-x-0 bg-red-intextor transition-transform duration-base ease-out-quart group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ContactCTA tone={tone} />
        </div>
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full md:hidden"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </Container>
      <MobileDrawer open={open} onClose={() => setOpen(false)} tone={tone} />
    </header>
  );
}
