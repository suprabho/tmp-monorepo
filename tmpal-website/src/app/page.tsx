import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { PlusMark } from '@/components/shared/PlusMark';
import { VariantPickerCard } from '@/components/shared/VariantPickerCard';

export default function PickerPage() {
  return (
    <main id="main" className="min-h-dvh bg-editorial text-navy-500">
      <header className="border-b border-navy-100/40">
        <Container className="flex items-center justify-between py-6">
          <Logo tone="dark" className="text-2xl md:text-3xl" />
          <span className="font-sans text-fluid-xs uppercase tracking-[0.18em] text-navy-400">
            Internal preview
          </span>
        </Container>
      </header>

      <section className="py-section-y">
        <Container className="flex flex-col gap-block-y">
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="flex items-center gap-4 text-red-intextor">
              <PlusMark className="h-6 w-6" />
              <span className="font-sans text-fluid-sm font-medium uppercase tracking-[0.18em]">
                Three directions for the same homepage
              </span>
            </div>
            <h1 className="font-serif text-fluid-display leading-[1.02] text-navy-500">
              Where design meets <span className="italic">making.</span>
            </h1>
            <p className="text-fluid-lg leading-relaxed text-navy-400">
              Three motion choreographies for the TMPal brand mark. Open each one — assembly,
              deconstruct-and-reassemble, or drawn-then-materialised — and compare them at
              full scroll.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <VariantPickerCard variant="v1" />
            <VariantPickerCard variant="v2" />
            <VariantPickerCard variant="v3" />
          </div>
        </Container>
      </section>
    </main>
  );
}
