'use client';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ContactCTA } from './ContactCTA';
import { Logo } from './Logo';
import { navItems } from '@/content/nav';
import type { Tone } from '@/lib/theme';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  tone?: Tone;
}

/**
 * Right-side slide-in drawer for mobile nav. Locks body scroll while open;
 * Escape closes. The CTA pin to the bottom of the drawer (matches the comp).
 */
export function MobileDrawer({ open, onClose, tone = 'light' }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            className="fixed inset-0 z-40 bg-navy-700/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className={cn(
              'fixed right-0 top-0 z-50 flex h-dvh w-[min(420px,90vw)] flex-col',
              tone === 'dark' ? 'bg-navy-700 text-white' : 'bg-white text-navy-500',
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Logo tone={tone === 'dark' ? 'light' : 'dark'} className="text-2xl" />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-navy-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-2 px-6 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 font-serif text-fluid-2xl italic hover:text-red-intextor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-6">
              <ContactCTA tone={tone} className="w-full" size="lg" />
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
