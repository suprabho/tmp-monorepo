import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { PlusMark } from '@/components/shared/PlusMark';
import { VariantPickerCard } from '@/components/shared/VariantPickerCard';

export const metadata = {
  title: 'TMPal — Brand & design showcase',
};

const palette = [
  { name: 'Intextor red', token: 'red-intextor', value: '#FE1116', textOn: 'text-white' },
  { name: 'Navy 700', token: 'navy-700', value: '#142338', textOn: 'text-white' },
  { name: 'Navy 500', token: 'navy-500', value: '#223A5E', textOn: 'text-white' },
  { name: 'Slate 500', token: 'slate-500', value: '#465A78', textOn: 'text-white' },
  { name: 'Stone 100', token: 'stone-100', value: '#D5D9DF', textOn: 'text-navy-700' },
  { name: 'Editorial', token: 'editorial', value: '#FAF7F2', textOn: 'text-navy-700' },
];

export default function ShowcasePage() {
  return (
    <main id="main" className="min-h-dvh bg-editorial text-navy-500">
      <header className="border-b border-navy-100/40">
        <Container className="flex items-center justify-between py-6">
          <Logo tone="dark" className="text-2xl md:text-3xl" />
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Brand & design showcase
          </span>
        </Container>
      </header>

      {/* Brand hero */}
      <section className="py-section-y">
        <Container className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="flex items-center gap-4 text-red-intextor">
              <PlusMark className="h-5 w-5" />
              <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em]">
                TMPal — architectural metal fabricator
              </span>
            </div>
            <h1 className="font-serif text-fluid-display leading-[1.02] text-navy-500">
              Where design meets <span className="italic">making.</span>
            </h1>
            <p className="text-fluid-lg leading-relaxed text-navy-400">
              A showcase of the TMPal brand and the four design directions we&apos;ve explored for
              the marketing site. The mark — a red intersection plus — sits at the heart of the
              identity; each exploration treats it differently.
            </p>
            <div className="mt-2 flex flex-wrap gap-4 font-sans text-fluid-sm">
              <Link
                href="/canonical"
                className="inline-flex items-center gap-2 border-b-2 border-red-intextor pb-1 font-medium text-red-intextor hover:opacity-80"
              >
                Open the canonical landing →
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-44 w-44 shrink-0 md:h-64 md:w-64">
            <PlusMark className="h-full w-full text-red-intextor" />
          </div>
        </Container>
      </section>

      {/* Variant explorations */}
      <section className="border-t border-navy-100/40 py-section-y">
        <Container className="flex flex-col gap-block-y">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-red-intextor">
              Four explorations
            </span>
            <h2 className="font-serif text-fluid-3xl leading-[1.05] text-navy-500">
              One brand, four ways to land it.
            </h2>
            <p className="text-fluid-base leading-relaxed text-navy-400">
              The canonical direction is the design system that shipped from the Figma handoff.
              V1, V2, and V3 are earlier motion explorations of the intersection mark — open each
              and scroll to compare.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <CanonicalShowcaseCard />
            <VariantPickerCard variant="v1" />
            <VariantPickerCard variant="v2" />
            <VariantPickerCard variant="v3" />
          </div>
        </Container>
      </section>

      {/* Design tokens at a glance */}
      <section className="border-t border-navy-100/40 bg-white py-section-y">
        <Container className="flex flex-col gap-block-y">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-red-intextor">
              Design system
            </span>
            <h2 className="font-serif text-fluid-3xl leading-[1.05] text-navy-500">
              Tokens at a glance.
            </h2>
            <p className="text-fluid-base leading-relaxed text-navy-400">
              Two type families, a navy / red / stone palette, and a signature asymmetric corner
              radius. Full tokens live in <code className="font-mono text-fluid-sm">tailwind.config.ts</code>.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Palette */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-fluid-base font-bold uppercase tracking-[0.12em] text-navy-500">
                Palette
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {palette.map((c) => (
                  <div
                    key={c.token}
                    className="flex aspect-[5/4] flex-col justify-end p-4"
                    style={{ backgroundColor: c.value }}
                  >
                    <div className={`font-sans text-fluid-xs font-bold uppercase tracking-[0.12em] ${c.textOn}`}>
                      {c.name}
                    </div>
                    <div className={`font-mono text-fluid-xs opacity-80 ${c.textOn}`}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-6">
              <h3 className="font-sans text-fluid-base font-bold uppercase tracking-[0.12em] text-navy-500">
                Type
              </h3>
              <div className="flex flex-col gap-2 border-l-2 border-navy-100/60 pl-5">
                <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-red-intextor">
                  Space Grotesk · structural
                </span>
                <span className="font-sans text-fluid-display-sm font-bold leading-none text-navy-500">
                  Where design meets making.
                </span>
                <span className="font-sans text-fluid-sm leading-relaxed text-navy-400">
                  Display, UI, body, buttons. Weights 400 / 500 / 700.
                </span>
              </div>
              <div className="flex flex-col gap-2 border-l-2 border-red-intextor/60 pl-5">
                <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-red-intextor">
                  Instrument Serif · poetic
                </span>
                <span className="font-serif text-fluid-display-sm italic leading-tight text-red-intextor">
                  More than a symbol — a structural form.
                </span>
                <span className="font-sans text-fluid-sm leading-relaxed text-navy-400">
                  Reserved for italic pull-quotes — the “moment of feeling”.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brand context */}
      <section className="border-t border-navy-100/40 py-section-y">
        <Container className="flex flex-col gap-block-y">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] text-red-intextor">
              The brand
            </span>
            <h2 className="font-serif text-fluid-3xl leading-[1.05] text-navy-500">
              Industrial precision, restrained voice.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-fluid-base font-bold text-navy-500">
                The intersection mark
              </h3>
              <p className="font-sans text-fluid-sm leading-relaxed text-navy-400">
                A red plus with concave inner corners. It represents the meeting point of design
                intent and physical making. Rendered photographically (chrome) at hero scale, or
                flat-red inside the wordmark — never re-drawn ad-hoc.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-fluid-base font-bold text-navy-500">Voice</h3>
              <p className="font-sans text-fluid-sm leading-relaxed text-navy-400">
                Plain-spoken senior craftsperson. Short, declarative sentences. The brand
                describes the work, not the buyer. Sentence case everywhere; emoji never.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-fluid-base font-bold text-navy-500">
                Signature radius
              </h3>
              <p className="font-sans text-fluid-sm leading-relaxed text-navy-400">
                One giant corner (80–280px), three small (4–20px). Cards look <em>cut</em>{' '}
                against the intersection mark. Reach for the <code className="font-mono">corner-*</code>{' '}
                tokens.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-navy-100/40 py-10">
        <Container className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Logo tone="dark" className="text-xl" />
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Internal — not for distribution
          </span>
        </Container>
      </footer>
    </main>
  );
}

function CanonicalShowcaseCard() {
  return (
    <Link
      href="/canonical"
      aria-label="Open the canonical landing"
      className="group relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-red-intextor p-8 text-white transition-transform duration-500 hover:-translate-y-1 md:p-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-fluid-xs font-medium uppercase tracking-[0.18em] opacity-80">
          Canonical · landing
        </span>
        <span className="font-sans text-fluid-xs opacity-70">Open →</span>
      </div>

      <div className="relative h-32 md:h-44">
        <div className="absolute inset-0 grid place-items-center">
          <Image
            src="/brand/intersection-mark.svg"
            alt=""
            width={160}
            height={160}
            className="h-full w-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:scale-110"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-fluid-2xl leading-tight">
          Where design meets <span className="italic">making.</span>
        </h3>
        <p className="text-fluid-sm leading-relaxed opacity-90">
          The shipped landing — full design-system handoff, asymmetric radii, four-stage process,
          and the intersection mark at hero scale.
        </p>
      </div>
    </Link>
  );
}
