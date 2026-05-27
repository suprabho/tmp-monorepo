import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'dark' | 'outline';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children: ReactNode;
  className?: string;
}

const variantCls: Record<Variant, string> = {
  primary: 'bg-red-intextor text-white hover:bg-red-intextor/90',
  dark:
    'bg-slate-700 text-white hover:bg-slate-700/90 font-bold tracking-[-0.03em] ' +
    'px-7 py-3 text-fluid-lg leading-none',
  outline:
    'bg-transparent text-red-intextor border border-red-intextor hover:bg-red-intextor/5',
};

const sizeCls: Record<Size, string> = {
  md: 'px-8 py-4 text-fluid-lg',
  lg: 'px-10 py-[18px] text-fluid-xl min-h-[58px]',
};

const baseCls =
  'inline-flex items-center justify-center gap-2.5 font-sans font-medium tracking-[0.5px] ' +
  'transition-[opacity,transform] duration-fast ease-out-quart active:scale-[0.98] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-intextor focus-visible:ring-offset-2';

function classes(variant: Variant, size: Size, extra?: string) {
  // Dark variant overrides its own padding/typography — skip generic size padding for it.
  return cn(baseCls, variant === 'dark' ? variantCls.dark : cn(variantCls[variant], sizeCls[size]), extra);
}

type ButtonAsButton = BaseProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>;

type ButtonAsLink = BaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'children' | 'className' | 'href'>;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', icon, iconRight, children, className, ...rest } = props;
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'lg' ? 22 : 20} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 22 : 20} />}
    </>
  );
  const finalCls = classes(variant, size, className);

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={finalCls} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={finalCls} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
