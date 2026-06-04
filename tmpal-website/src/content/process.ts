export interface ProcessStage {
  index: number;
  title: string;
  body: string;
}

export const processStages: ProcessStage[] = [
  {
    index: 1,
    title: 'Drawing board',
    body: 'We engage at concept. Reviewing intent before committing to system selection.',
  },
  {
    index: 2,
    title: 'Engineering review',
    body: 'Performance, code, buildability. We resolve tolerance and connection logic.',
  },
  {
    index: 3,
    title: 'Prototype',
    body: 'Full-scale mock-ups. Tested in the same facility that will produce at scale.',
  },
  {
    index: 4,
    title: 'Production',
    body: 'CNC-led manufacture, consistent across run. Coordinated delivery to site.',
  },
];
