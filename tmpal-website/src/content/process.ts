export interface ProcessStage {
  index: number;
  title: string;
  body: string;
}

export const processStages: ProcessStage[] = [
  {
    index: 1,
    title: 'We understand the vision.',
    body: 'We work closely with architects and designers from the initial concept stage to understand the design intent, materiality, and technical requirements.',
  },
  {
    index: 2,
    title: 'We engineer with precision.',
    body: 'Every detail is carefully studied, prototyped, and optimized for fabrication, ensuring accuracy, strength, and clean execution.',
  },
  {
    index: 3,
    title: 'We fabricate with expertise.',
    body: 'Using advanced laser cutting, metal processing, and finishing techniques, we transform ideas into high-quality architectural products.',
  },
  {
    index: 4,
    title: 'We deliver and support execution.',
    body: 'From production to installation support, we ensure smooth coordination so the final outcome matches the original vision perfectly.',
  },
];
