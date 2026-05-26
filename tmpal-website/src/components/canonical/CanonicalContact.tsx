'use client';
import { useState } from 'react';
import { Button } from './Button';
import { PatternBackdrop } from './PatternBackdrop';

export function CanonicalContact() {
  const [project, setProject] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-stone-100/30">
      <PatternBackdrop />
      <div className="relative z-10 mx-auto flex w-full max-w-shell flex-col items-center gap-7 px-5 py-section-y text-center sm:px-8 md:px-20">
        <h2 className="font-sans text-fluid-display font-bold leading-none text-red-intextor">
          Tell us what you&apos;re building.
        </h2>
        <p className="max-w-[720px] font-sans text-fluid-xl leading-[1.4] text-navy-600">
          Send us a project name and your email. We&apos;ll come back with the right person and an
          honest read on whether we can help.
        </p>
        {submitted ? (
          <div className="border border-navy-100 bg-white px-7 py-4 font-sans text-fluid-lg text-navy-700">
            Thanks — we&apos;ll be in touch within two working days.
          </div>
        ) : (
          <form
            className="flex w-full max-w-[720px] flex-col gap-3 md:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              required
              placeholder="Project name"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="flex-1 border border-navy-100 bg-white px-5 py-4 font-sans text-fluid-lg text-navy-600 outline-none transition-colors duration-fast focus:border-red-intextor"
            />
            <input
              type="email"
              required
              placeholder="you@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-navy-100 bg-white px-5 py-4 font-sans text-fluid-lg text-navy-600 outline-none transition-colors duration-fast focus:border-red-intextor"
            />
            <Button variant="outline" size="lg" type="submit">
              Request more info
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
