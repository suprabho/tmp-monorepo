export interface SystemFamily {
  slug: 'facades' | 'fenestration' | 'custom-metal';
  title: string;
  description: string;
  /** Placeholder — replace with real photography during the asset extraction pass. */
  image: string;
}

export const families: SystemFamily[] = [
  {
    slug: 'facades',
    title: 'Facades',
    description:
      'Unitised and stick-built curtain wall systems engineered for performance, finished to architectural intent.',
    image: '/facades/placeholder.jpg',
  },
  {
    slug: 'fenestration',
    title: 'Fenestration',
    description:
      'Slim-sightline windows and door systems built around the architectural detail you draw.',
    image: '/fenestration/placeholder.jpg',
  },
  {
    slug: 'custom-metal',
    title: 'Custom Metal',
    description:
      'Bespoke screens, cladding, and metal expressions — fabricated to drawings, not to catalog.',
    image: '/custom-metal/placeholder.jpg',
  },
];
