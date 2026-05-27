'use client';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileDrawer } from '@/components/shared/MobileDrawer';
import { navItems } from '@/content/nav';

const tabBase =
  'group relative inline-flex items-center justify-center border-y border-l border-navy-50 px-6 py-2.5 ' +
  'font-sans uppercase tracking-[-0.03em] text-fluid-base text-navy-700 transition-colors duration-fast ease-out-quart ' +
  'hover:text-red-intextor ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor focus-visible:ring-offset-2 ' +
  'lg:px-10 lg:py-3 lg:text-fluid-lg';

const tabUnderline =
  'pointer-events-none absolute inset-x-6 bottom-0 h-[5px] origin-left scale-x-0 ' +
  'bg-red-intextor transition-transform duration-base ease-out-quart group-hover:scale-x-100 ' +
  'lg:inset-x-10';

export function V1Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full bg-white/70 text-navy-500 backdrop-blur transition-colors">
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Link href="/" className="inline-flex items-center" aria-label="TMP — home">
          <Logo tone="dark" className="text-2xl md:text-3xl" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          <ul className="flex items-center">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(tabBase, i === navItems.length - 1 && 'border-r')}
                >
                  {item.label}
                  <span aria-hidden className={tabUnderline} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#contact"
          className={cn(
            'hidden items-center justify-center bg-red-intextor px-6 py-3 font-sans font-bold uppercase tracking-[-0.03em] text-fluid-base text-white transition-colors hover:bg-red-intextor/90 md:inline-flex lg:px-10 lg:py-4 lg:text-fluid-lg',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor focus-visible:ring-offset-2',
          )}
        >
          Contact Us
        </Link>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </Container>
      <MobileDrawer open={open} onClose={() => setOpen(false)} tone="light" />
    </header>
  );
}
