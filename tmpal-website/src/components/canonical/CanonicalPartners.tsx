const partners = ['Studio Lotus', 'JES', 'Rapiscan', 'HBL', 'Architect Hafeez'];

export function CanonicalPartners() {
  return (
    <div className="mx-auto flex w-full max-w-shell flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-12 opacity-90 sm:px-8 md:gap-x-16 md:px-20">
      {partners.map((p) => (
        <div
          key={p}
          className="font-sans text-fluid-lg font-bold italic tracking-[0.05em] text-navy-300"
        >
          {p}
        </div>
      ))}
    </div>
  );
}
