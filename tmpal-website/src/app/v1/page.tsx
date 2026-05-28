import { Footer } from '@/components/shared/Footer';
import { SystemFamilies } from '@/components/shared/SystemFamilies';
import { HowWeWork } from '@/components/shared/HowWeWork';
import { ProcuralBlock } from '@/components/shared/ProcuralBlock';
import { V1Hero } from '@/components/v1/V1Hero';
import { V1Intersection } from '@/components/v1/V1Intersection';
import { V1Navigation } from '@/components/v1/V1Navigation';
import { V1Partners } from '@/components/v1/V1Partners';
import { V1SelectedWork } from '@/components/v1/V1SelectedWork';

export const metadata = {
  title: 'V1 / Light',
};

export default function V1Page() {
  return (
    <>
      <V1Navigation />
      <main id="main">
        <V1Hero />
        <V1Partners />
        <V1Intersection />
        <SystemFamilies tone="light" headline="System Families" />
        <V1SelectedWork />
        <HowWeWork tone="light" headline="How We Work" />
        <ProcuralBlock tone="light" emphasis="subtle" />
      </main>
      <Footer tone="light" />
    </>
  );
}
