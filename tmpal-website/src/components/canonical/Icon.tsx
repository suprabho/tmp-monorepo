import type { SVGProps } from 'react';

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'plus'
  | 'world'
  | 'pencil'
  | 'circle'
  | 'close'
  | 'chevron-down'
  | 'home'
  | 'drawing'
  | 'gears'
  | 'cube'
  | 'truck'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'facebook';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {glyph(name)}
    </svg>
  );
}

function glyph(name: IconName) {
  switch (name) {
    case 'arrow-right':
      return <path d="M5 12h14M13 5l7 7-7 7" />;
    case 'arrow-left':
      return <path d="M19 12H5M11 5l-7 7 7 7" />;
    case 'plus':
      return <path d="M12 5v14M5 12h14" />;
    case 'world':
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </>
      );
    case 'pencil':
      return <path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />;
    case 'circle':
      return <circle cx="12" cy="12" r="8" />;
    case 'close':
      return <path d="M6 6l12 12M18 6l-12 12" />;
    case 'chevron-down':
      return <path d="M6 9l6 6 6-6" />;
    case 'home':
      return <path d="M3 12l9-9 9 9M5 10v10h14V10" />;
    case 'drawing':
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M9 3v18" />
        </>
      );
    case 'gears':
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </>
      );
    case 'cube':
      return (
        <>
          <path d="M21 7.5l-9-5-9 5 9 5 9-5z" />
          <path d="M3 7.5v9l9 5 9-5v-9M12 12.5v10" />
        </>
      );
    case 'truck':
      return (
        <>
          <rect x="1" y="6" width="14" height="11" />
          <path d="M15 9h4l3 4v4h-7" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="19" r="2" />
        </>
      );
    case 'instagram':
      return (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </>
      );
    case 'linkedin':
      return (
        <>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-11h4v2a4 4 0 014-4z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      );
    case 'twitter':
      return (
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.62 3c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.11 1A12.94 12.94 0 013 4.5a4.48 4.48 0 001.4 6c-.7-.02-1.4-.2-2-.5v.06a4.5 4.5 0 003.6 4.4 4.5 4.5 0 01-2 .07 4.5 4.5 0 004.2 3.1A9 9 0 012 19.54 12.7 12.7 0 008.9 21.5c8.3 0 12.85-6.9 12.85-12.86 0-.2 0-.4-.02-.58A9.2 9.2 0 0023 3z" />
      );
    case 'youtube':
      return (
        <>
          <path d="M22.54 6.42a2.78 2.78 0 00-1.96-2C18.88 4 12 4 12 4s-6.88 0-8.58.42a2.78 2.78 0 00-1.96 2A29 29 0 001 11.5a29 29 0 00.46 5.08 2.78 2.78 0 001.96 2C5.12 19 12 19 12 19s6.88 0 8.58-.42a2.78 2.78 0 001.96-2 29 29 0 00.46-5.08 29 29 0 00-.46-5.08z" />
          <path d="M9.75 14.5l5-3-5-3z" fill="currentColor" stroke="none" />
        </>
      );
    case 'facebook':
      return <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />;
  }
}
