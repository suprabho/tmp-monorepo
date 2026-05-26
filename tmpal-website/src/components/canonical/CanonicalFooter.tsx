import Link from 'next/link';
import { Icon, type IconName } from './Icon';

const cols = [
  { title: 'Systems', links: ['Façades', 'Fenestration', 'Custom metal'] },
  { title: 'Studio', links: ['Selected work', 'Process', 'Capability deck'] },
  { title: 'Company', links: ['About', 'Press', 'Events'] },
];

const socials: { name: IconName; label: string }[] = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'twitter', label: 'Twitter' },
  { name: 'facebook', label: 'Facebook' },
  { name: 'youtube', label: 'YouTube' },
  { name: 'linkedin', label: 'LinkedIn' },
];

export function CanonicalFooter() {
  return (
    <footer
      className="bg-red-intextor text-white"
      style={{ borderRadius: '240px 0 0 0' }}
    >
      <div className="mx-auto w-full max-w-shell px-5 pb-8 pt-20 sm:px-8 md:px-20 md:pt-24">
        <div className="grid gap-10 md:grid-cols-3">
          {cols.map((c) => (
            <div key={c.title} className="flex flex-col">
              <h4 className="mb-4 font-sans text-fluid-sm font-bold uppercase tracking-[0.05em]">
                {c.title}
              </h4>
              {c.links.map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="block py-2 font-sans text-fluid-base text-white/90 transition-[opacity,padding] duration-fast ease-out-quart hover:pl-1 hover:opacity-100"
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-6 border-t border-white/40 pt-6 md:flex-row md:items-center md:gap-8">
          <span className="font-sans text-fluid-xl font-bold tracking-[-0.04em] text-white">
            TMP<em className="not-italic text-navy-600">al</em>
          </span>
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link href="#" className="font-sans text-fluid-xs opacity-85 hover:opacity-100">
              Terms of Service
            </Link>
            <Link href="#" className="font-sans text-fluid-xs opacity-85 hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="#" className="font-sans text-fluid-xs opacity-85 hover:opacity-100">
              Manage Cookies
            </Link>
          </div>
          <div className="flex gap-3.5 md:ml-auto">
            {socials.map((s) => (
              <Link
                key={s.name}
                href="#"
                aria-label={s.label}
                className="inline-flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-80"
              >
                <Icon name={s.name} size={22} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
