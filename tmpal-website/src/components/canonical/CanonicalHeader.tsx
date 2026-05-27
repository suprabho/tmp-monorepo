'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Container } from '@/components/shared/Container';
import { MobileDrawer } from '@/components/shared/MobileDrawer';
import { Button } from './Button';

interface CanonicalHeaderProps {
  active?: string;
  onNav?: (id: string) => void;
}

const items = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
];

export function CanonicalHeader({ active = 'home', onNav }: CanonicalHeaderProps) {
  const [open, setOpen] = useState(false);

  const click = (id: string) => (e: React.MouseEvent) => {
    if (!onNav) return;
    e.preventDefault();
    onNav(id);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/[0.04] bg-white">
      <Container className="flex h-[98px] items-center">
        <Link
          href="#home"
          onClick={click('home')}
          className="inline-flex items-center"
          aria-label="TMPal — home"
        >
          <Image
            src="/brand/wordmark-tmpal.png"
            alt="TMPal"
            width={170}
            height={38}
            priority
            className="h-[34px] w-auto md:h-[38px]"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="mx-auto hidden items-center gap-8 md:flex"
        >
          {items.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              onClick={click(it.id)}
              className={cn(
                'relative px-1 py-3 font-sans text-fluid-base transition-colors duration-fast ease-out-quart',
                active === it.id ? 'text-red-intextor' : 'text-navy-600 hover:text-red-intextor',
              )}
            >
              {it.label}
              {active === it.id && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1.5 h-[2px] bg-red-intextor"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden md:block">
          <Button variant="dark" href="#contact" onClick={click('contact')}>
            Contact Us
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full text-navy-600 md:hidden"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </Container>
      <MobileDrawer open={open} onClose={() => setOpen(false)} tone="light" />
    </header>
  );
}
