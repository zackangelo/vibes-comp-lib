export const COMPONENT_LIBRARY: any = {
  "Accordions": {
    deps: [],
    registryDeps: ['clsx', '@radix-ui/react-accordion'],
    files: {
      'index.tsx': `'use client';

import * as AccordionsPrimitive from '@radix-ui/react-accordion';
import React from 'react';

function Accordion({
  children,
  title,
  ...rest
}: React.ComponentPropsWithoutRef<typeof AccordionsPrimitive.Item>) {
  return (
    <AccordionsPrimitive.Item {...rest}>
      <AccordionsPrimitive.Header>
        <AccordionsPrimitive.Trigger asChild>
          <div className="group cursor-pointer items-start gap-8 py-3 last:flex @md:py-4">
            <div className="flex-1 select-none font-mono text-sm uppercase text-contrast-400 transition-colors duration-300 ease-out group-hover:text-foreground">
              {title}
            </div>
            <AnimatedChevron />
          </div>
        </AccordionsPrimitive.Trigger>
      </AccordionsPrimitive.Header>
      <AccordionsPrimitive.Content className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <div className="pb-5 font-body font-medium leading-normal text-foreground">{children}</div>
      </AccordionsPrimitive.Content>
    </AccordionsPrimitive.Item>
  );
}

function AnimatedChevron(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="mt-1 shrink-0 [&>line]:origin-center [&>line]:stroke-contrast-500 [&>line]:transition [&>line]:duration-300 [&>line]:ease-out [&>line]:group-hover:stroke-foreground"
      viewBox="0 0 10 10"
      width={16}
      {...props}
    >
      {/* Left Line of Chevron */}
      <line
        className="group-data-[state=open]:-translate-y-[3px] group-data-[state=open]:-rotate-90"
        stroke="currentColor"
        strokeLinecap="round"
        x1={2}
        x2={5}
        y1={2}
        y2={5}
      />
      {/* Right Line of Chevron */}
      <line
        className="group-data-[state=open]:-translate-y-[3px] group-data-[state=open]:rotate-90"
        stroke="currentColor"
        strokeLinecap="round"
        x1={8}
        x2={5}
        y1={2}
        y2={5}
      />
    </svg>
  );
}

const Accordions = AccordionsPrimitive.Root;

export { Accordions, Accordion };
`,
    },
  },
  "Alert": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import { X } from 'lucide-react';

import { Button } from '@/vibes/soul/primitives/button';

interface Props {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string;
  description?: string;
  dismissLabel?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

export function Alert({
  variant,
  message,
  description,
  action,
  dismissLabel = 'Dismiss',
  onDismiss,
}: Props) {
  return (
    <div
      className={clsx(
        'flex min-w-[284px] max-w-[356px] items-center justify-between gap-2 rounded-xl border border-foreground/10 py-3 pe-3 ps-4 shadow-sm ring-foreground group-focus-visible:outline-none group-focus-visible:ring-2',
        {
          success: 'bg-success-highlight',
          warning: 'bg-warning-highlight',
          error: 'bg-error-highlight',
          info: 'bg-background',
        }[variant],
      )}
      role="alert"
    >
      <div className="flex flex-col">
        <span className="text-sm font-normal text-foreground">{message}</span>
        {Boolean(description) && (
          <span className="text-xs font-medium text-contrast-400">{description}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {action && (
          <Button onClick={action.onClick} size="x-small" variant="ghost">
            {action.label}
          </Button>
        )}

        <Button aria-label={dismissLabel} onClick={onDismiss} size="icon-small" variant="ghost">
          <X size={20} strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
}
`,
    },
  },
  "AnimatedLink": {
    deps: [],
    registryDeps: [],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import Link from 'next/link';

export interface AnimatedLinkProps {
  link: {
    href: string;
    target?: string;
  };
  label: string;
  className?: string;
}

export function AnimatedLink({ link, label, className }: AnimatedLinkProps) {
  return (
    <Link
      className={clsx(
        'origin-left pb-0.5 font-semibold transition-[background-size] duration-300 [background:linear-gradient(0deg,hsl(var(--primary)),hsl(var(--primary)))_no-repeat_left_bottom_/_0_2px] hover:bg-[size:100%_2px] focus:outline-none focus-visible:bg-[size:100%_2px]',
        className,
      )}
      href={link.href}
    >
      {label}
    </Link>
  );
}
`,
    },
  },
  "Badge": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'pill' | 'rounded';
  color?: 'primary' | 'accent' | 'warning' | 'danger' | 'success' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'rounded', className, color = 'primary' }: Props) {
  return (
    <span
      className={clsx(
        'bg-primary-highlight px-2 py-0.5 font-mono text-xs uppercase tracking-tighter text-foreground',
        {
          pill: 'rounded-full',
          rounded: 'rounded',
        }[variant],
        {
          primary: 'bg-primary-highlight',
          accent: 'bg-accent-highlight',
          warning: 'bg-warning-highlight',
          danger: 'bg-danger-highlight',
          success: 'bg-success-highlight',
          info: 'bg-info-highlight',
        }[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
`,
    },
  },
  "Banner": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react'],
    files: {
      'index.tsx': `'use client';

import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { ForwardedRef, forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';

export const Banner = forwardRef(
  (
    {
      id,
      children,
      hideDismiss = false,
      className,
      onDismiss,
    }: {
      id: string;
      children: ReactNode;
      hideDismiss?: boolean;
      className?: string;
      onDismiss?: () => void;
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [banner, setBanner] = useState({ dismissed: false, initialized: false });

    useEffect(() => {
      const hidden = localStorage.getItem(\`\${id}-hidden-banner\`) === 'true';

      setBanner({ dismissed: hidden, initialized: true });
    }, [id]);

    const hideBanner = useCallback(() => {
      setBanner((prev) => ({ ...prev, dismissed: true }));
      localStorage.setItem(\`\${id}-hidden-banner\`, 'true');
      onDismiss?.();
    }, [id, onDismiss]);

    if (!banner.initialized) return null;

    return (
      <div
        className={clsx(
          'relative w-full overflow-hidden bg-primary transition-all duration-300 ease-in @container',
          banner.dismissed ? 'pointer-events-none max-h-0' : 'max-h-32',
          className,
        )}
        id="announcement-bar"
        ref={ref}
      >
        <div className="p-3 pr-12 text-sm text-foreground @xl:px-12 @xl:text-center @xl:text-base">
          {children}
        </div>

        {!hideDismiss && (
          <button
            aria-label="Dismiss banner"
            className="absolute right-3 top-3 grid h-8 w-8 place-content-center rounded-full text-foreground/50 transition-colors duration-300 hover:bg-background/40 hover:text-foreground @xl:top-1/2 @xl:-translate-y-1/2"
            onClick={(e) => {
              e.preventDefault();
              hideBanner();
            }}
          >
            <X absoluteStrokeWidth size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = 'Banner';
`,
    },
  },
  "BlogPostCard": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export interface BlogPost {
  id: string;
  author?: string | null;
  content: string;
  date: string;
  image?: {
    src: string;
    alt: string;
  };
  href: string;
  title: string;
  className?: string;
}

export const BlogPostCard = function BlogPostCard({
  title,
  image,
  content,
  href,
  date,
  author,
  className,
}: BlogPost) {
  return (
    <Link
      className={clsx(
        'group max-w-full rounded-b-lg rounded-t-2xl text-foreground ring-primary ring-offset-4 @container focus:outline-0 focus-visible:ring-2',
        className,
      )}
      href={href}
    >
      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-contrast-100">
        {image?.src != null && image.src !== '' ? (
          <Image
            alt={image.alt}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image.src}
          />
        ) : (
          <div className="p-4 text-5xl font-bold leading-none tracking-tighter text-foreground/15">
            {title}
          </div>
        )}
      </div>

      <div className="text-lg font-medium leading-snug">{title}</div>
      <p className="mb-3 mt-1.5 line-clamp-3 text-sm font-normal text-contrast-400">{content}</p>
      <div className="text-sm">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {date !== '' && author != null && author !== '' && (
          <span className="after:mx-2 after:content-['•']" />
        )}
        {author != null && author !== '' && <span>{author}</span>}
      </div>
    </Link>
  );
};

export const BlogPostCardSkeleton = function BlogPostCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx('flex max-w-md animate-pulse flex-col gap-2 rounded-xl', className)}>
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-contrast-100" />

      {/* Title */}
      <div className="h-4 w-24 rounded-lg bg-contrast-100" />

      {/* Content */}
      <div className="h-3 w-full rounded-lg bg-contrast-100" />
      <div className="h-3 w-full rounded-lg bg-contrast-100" />
      <div className="h-3 w-1/2 rounded-lg bg-contrast-100" />

      <div className="flex flex-wrap items-center">
        {/* Date */}
        <div className="h-4 w-16 rounded-lg bg-contrast-100" />
        <span className="after:mx-2 after:text-contrast-100 after:content-['•']" />
        {/* Author */}
        <div className="h-4 w-20 rounded-lg bg-contrast-100" />
      </div>
    </div>
  );
};
`,
    },
  },
  "Button": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'large' | 'medium' | 'small' | 'x-small' | 'icon' | 'icon-small';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({
  variant = 'primary',
  size = 'large',
  onClick,
  loading = false,
  disabled = false,
  className,
  children,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      aria-busy={loading}
      className={clsx(
        'relative z-0 h-fit overflow-hidden rounded-full border font-semibold leading-normal after:absolute after:inset-0 after:-z-10 after:-translate-x-[105%] after:rounded-full after:transition-[opacity,transform] after:duration-300 after:[animation-timing-function:cubic-bezier(0,0.25,0,1)] focus-visible:outline-none focus-visible:ring-2',
        {
          primary:
            'border-primary bg-primary text-foreground ring-foreground after:bg-background/40',
          secondary:
            'border-foreground bg-foreground text-background ring-primary after:bg-background',
          tertiary:
            'border-contrast-200 bg-background text-foreground ring-primary after:bg-contrast-100',
          ghost:
            'border-transparent bg-transparent text-foreground ring-primary after:bg-foreground/5',
        }[variant],
        !loading && !disabled && 'hover:after:translate-x-0',
        disabled && 'cursor-not-allowed opacity-30',
        className,
      )}
      onClick={onClick}
      type={type}
      {...props}
    >
      <span
        className={clsx(
          'inline-flex items-center justify-center transition-all duration-300 ease-in-out',
          loading ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100',
          {
            'icon-small': 'min-h-8 p-1.5 text-xs',
            icon: 'min-h-10 p-2.5 text-sm',
            'x-small': 'min-h-8 gap-x-2 px-3 py-1.5 text-xs',
            small: 'min-h-10 gap-x-2 px-4 py-2.5 text-sm',
            medium: 'min-h-12 gap-x-2.5 px-5 py-3 text-base',
            large: 'min-h-14 gap-x-3 px-6 py-4 text-base',
          }[size],
          variant === 'secondary' && 'mix-blend-difference',
        )}
      >
        {children}
      </span>

      <span
        className={clsx(
          'absolute inset-0 grid place-content-center transition-all duration-300 ease-in-out',
          loading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        )}
      >
        <Loader2 className={clsx('animate-spin', variant === 'tertiary' && 'text-foreground')} />
      </span>
    </button>
  );
}
`,
    },
  },
  "ButtonLink": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import Link from 'next/link';

export type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'large' | 'medium' | 'small' | 'x-small' | 'icon' | 'icon-small';
  href: string;
};

export function ButtonLink({
  variant = 'primary',
  size = 'large',
  href,
  className,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={clsx(
        'relative z-0 inline-flex h-fit select-none items-center justify-center overflow-hidden rounded-full border text-center font-semibold leading-normal after:absolute after:inset-0 after:-z-10 after:-translate-x-[105%] after:rounded-full after:transition-[opacity,transform] after:duration-300 after:[animation-timing-function:cubic-bezier(0,0.25,0,1)] hover:after:translate-x-0 focus-visible:outline-none focus-visible:ring-2',
        {
          primary:
            'border-primary bg-primary text-foreground ring-foreground after:bg-background/40',
          secondary:
            'border-foreground bg-foreground text-background ring-primary after:bg-background',
          tertiary:
            'border-contrast-200 bg-background text-foreground ring-primary after:bg-contrast-100',
          ghost:
            'border-transparent bg-transparent text-foreground ring-primary after:bg-foreground/5',
        }[variant],
        {
          'icon-small': 'min-h-8 p-1.5 text-xs',
          icon: 'min-h-10 p-2.5 text-sm',
          'x-small': 'min-h-8 gap-x-2 px-3 py-1.5 text-xs',
          small: 'min-h-10 gap-x-2 px-4 py-2.5 text-sm',
          medium: 'min-h-12 gap-x-2.5 px-5 py-3 text-base',
          large: 'min-h-14 gap-x-3 px-6 py-4 text-base',
        }[size],
        className,
      )}
      href={href}
    >
      <span className={clsx(variant === 'secondary' && 'mix-blend-difference')}>{children}</span>
    </Link>
  );
}
`,
    },
  },
  "Card": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface CardProps {
  className?: string;
  title: string;
  image?: { src: string; alt: string };
  href: string;
  textContrast?: 'light' | 'dark';
}

export function Card({ className, title, image, href, textContrast = 'dark' }: CardProps) {
  return (
    <div className={className}>
      <Link
        className="group relative flex cursor-pointer flex-col gap-2 rounded-xl ring-primary ring-offset-4 focus-visible:outline-0 focus-visible:ring-2 @md:rounded-2xl"
        href={href}
      >
        <ArrowUpRight
          className={clsx(
            'absolute right-2.5 top-2.5 z-10 transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:translate-x-1.5 @4xl:right-5 @4xl:top-5',
            textContrast === 'light' ? 'text-background' : 'text-foreground',
          )}
          strokeWidth={1.5}
        />
        <div className="relative aspect-[5/6] overflow-hidden rounded-[inherit] bg-contrast-100">
          {image != null ? (
            <Image
              alt={image.alt}
              className="w-full scale-100 select-none bg-contrast-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 70vw, 33vw"
              src={image.src}
            />
          ) : (
            <div className="pl-2 pt-3 text-7xl font-bold leading-[0.8] tracking-tighter text-contrast-300 transition-transform duration-500 ease-out group-hover:scale-105">
              {title}
            </div>
          )}
        </div>
        <span
          className={clsx(
            'line-clamp-1 text-lg font-medium text-foreground',
            textContrast === 'light' ? '@4xl:text-background' : '@4xl:text-foreground',
          )}
        >
          {title}
        </span>
      </Link>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="relative flex aspect-[3/4] w-full animate-pulse flex-col gap-2 @4xl:min-w-72">
      {/* Image */}
      <div className="h-full w-full overflow-hidden rounded-lg bg-contrast-100 @4xl:rounded-xl" />
      {/* Title */}
      <div className="mb-1 line-clamp-1 h-6 w-20 rounded-lg bg-contrast-100 @4xl:absolute @4xl:bottom-5 @4xl:left-5" />
    </div>
  );
}
`,
    },
  },
  "Checkbox": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react', '@radix-ui/react-checkbox'],
    files: {
      'index.tsx': `import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface Props {
  id?: string;
  checked: boolean;
  // TODO: refactor props here
  setChecked?: (checked: boolean) => void;
  label?: React.ReactNode;
  error?: string;
  className?: string;
}

export function Checkbox({ id, checked = false, setChecked, label, error, className }: Props) {
  return (
    <div>
      <div className={clsx('flex items-center gap-2', className)}>
        <RadixCheckbox.Root
          checked={checked}
          className={clsx(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-150',
            'focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-primary',
            checked ? 'border-foreground bg-foreground' : 'border-contrast-300 bg-background',
            error != null && error !== '' ? 'border-error' : 'border-contrast-300',
          )}
          defaultChecked
          id={id}
          onCheckedChange={setChecked}
        >
          <RadixCheckbox.Indicator>
            <Check className="h-4 w-4" color="white" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>

        {label != null && label !== '' && (
          <label className="cursor-pointer select-none text-foreground" htmlFor={id}>
            {label}
          </label>
        )}
      </div>
      {error != null && error !== '' && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
`,
    },
  },
  "Counter": {
    deps: [],
    registryDeps: ['lucide-react'],
    files: {
      'index.tsx': `'use client';

import { clsx } from 'clsx';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
  current?: number;
  max?: number;
  decrementAriaLabel?: string;
  incrementAriaLabel?: string;
}

export const Counter = function Counter({
  current = 0,
  decrementAriaLabel,
  incrementAriaLabel,
}: Props) {
  const [count, setCount] = useState(current);
  const decrement = () => {
    setCount((prev) => prev - 1);
  };
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border">
      <button
        aria-label={decrementAriaLabel ?? 'Decrease count'}
        className={clsx(
          'group rounded-l-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          { 'hover:bg-contrast-100/50': count > 0 },
        )}
        disabled={count === 0}
        onClick={decrement}
      >
        <Minus
          className={clsx('text-contrast-300 transition-colors duration-300', {
            'group-hover:text-foreground': count > 0,
          })}
          size={18}
          strokeWidth={1.5}
        />
      </button>
      <input
        className="w-8 select-none text-center focus-visible:outline-none"
        // type="number"
        // style={{
        //   appearance: 'none', // Remove default styling
        //   MozAppearance: 'textfield', // For Firefox
        //   WebkitAppearance: 'none', // For Chrome and Safari
        // }}
        value={count}
      />

      <button
        aria-label={incrementAriaLabel ?? 'Increase count'}
        className="group rounded-r-lg p-3 transition-colors duration-300 hover:bg-contrast-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={increment}
      >
        <Plus
          className="text-contrast-300 transition-colors duration-300 group-hover:text-foreground"
          size={18}
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
};
`,
    },
  },
  "Pagination": {
    deps: [],
    registryDeps: ['lucide-react', 'nuqs', 'clsx'],
    files: {
      'index.tsx': `'use client';

import { clsx } from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createSerializer, parseAsString } from 'nuqs';
import { Suspense, use } from 'react';

export interface CursorPaginationInfo {
  startCursorParamName?: string;
  startCursor?: string | null;
  endCursorParamName?: string;
  endCursor?: string | null;
}

interface Props {
  info: CursorPaginationInfo | Promise<CursorPaginationInfo>;
  scroll?: boolean;
}

export function CursorPagination(props: Props) {
  return (
    <Suspense fallback={<CursorPaginationSkeleton />}>
      <CursorPaginationResolved {...props} />
    </Suspense>
  );
}

function CursorPaginationResolved({ info, scroll }: Props) {
  const {
    startCursorParamName = 'before',
    endCursorParamName = 'after',
    startCursor,
    endCursor,
  } = info instanceof Promise ? use(info) : info;
  const searchParams = useSearchParams();
  const serialize = createSerializer({
    [startCursorParamName]: parseAsString,
    [endCursorParamName]: parseAsString,
  });

  return (
    <div className="flex w-full items-center justify-center gap-3 py-10">
      {startCursor != null ? (
        <PaginationLink
          href={serialize(searchParams, {
            [startCursorParamName]: startCursor,
            [endCursorParamName]: null,
          })}
          scroll={scroll}
        >
          <ArrowLeft size={24} strokeWidth={1} />
        </PaginationLink>
      ) : (
        <SkeletonLink>
          <ArrowLeft size={24} strokeWidth={1} />
        </SkeletonLink>
      )}
      {endCursor != null ? (
        <PaginationLink
          href={serialize(searchParams, {
            [endCursorParamName]: endCursor,
            [startCursorParamName]: null,
          })}
          scroll={scroll}
        >
          <ArrowRight size={24} strokeWidth={1} />
        </PaginationLink>
      ) : (
        <SkeletonLink>
          <ArrowRight size={24} strokeWidth={1} />
        </SkeletonLink>
      )}
    </div>
  );
}

function PaginationLink({
  href,
  children,
  scroll,
}: {
  href: string;
  children: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <Link
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full border border-contrast-100 text-foreground ring-primary transition-colors duration-300 hover:border-contrast-200 hover:bg-contrast-100 focus-visible:outline-0 focus-visible:ring-2',
      )}
      href={href}
      scroll={scroll}
    >
      {children}
    </Link>
  );
}

function SkeletonLink({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-contrast-100 text-foreground opacity-50 duration-300">
      {children}
    </div>
  );
}

export function CursorPaginationSkeleton() {
  return (
    <div className="flex w-full justify-center bg-background py-10 text-xs">
      <div className="flex gap-2">
        <SkeletonLink>
          <ArrowLeft />
        </SkeletonLink>
        <SkeletonLink>
          <ArrowRight />
        </SkeletonLink>
      </div>
    </div>
  );
}
`,
    },
  },
  "Dropdown": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react', '@radix-ui/react-dropdown-menu'],
    files: {
      'index.tsx': `'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuTriggerProps,
} from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Label } from '@/vibes/soul/primitives/label';

interface Props {
  label: string;
  labelOnTop?: boolean;
  variant?: 'round' | 'rectangle';
  items: string[];
  required?: boolean;
  error?: string;
}

export const Dropdown = function Dropdown({
  label,
  labelOnTop = false,
  variant = 'rectangle',
  items,
  required,
  error,
  ...props
}: Props & DropdownMenuTriggerProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        {labelOnTop && <Label className="mb-2 block text-foreground">{label}</Label>}
        {required === true && <span className="text-xs text-contrast-300">Required</span>}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={clsx(
            variant === 'rectangle' ? 'rounded-lg' : 'rounded-full',
            'flex h-fit w-full select-none items-center justify-between gap-3 border bg-white p-2 px-5 py-3 font-medium text-foreground',
            'text-sm ring-primary transition-colors hover:bg-contrast-100 focus-visible:outline-none focus-visible:ring-2',
            error != null && error !== '' ? 'border-error' : 'border-contrast-100',
          )}
          {...props}
        >
          {selectedItem ?? label}
          <ChevronDown className="w-5 text-foreground transition-transform" strokeWidth={1.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-50 mt-2 max-h-80 w-full overflow-y-scroll rounded-xl bg-background p-2 shadow-[2px_4px_24px_#00000010] 
          data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
          @4xl:rounded-3xl @4xl:p-4"
        >
          {items.map((item) => (
            <DropdownMenuItem
              className={clsx(
                'w-full cursor-default select-none rounded-xl px-3 py-2 text-sm font-medium text-contrast-400 outline-none transition-colors',
                'hover:bg-contrast-100 hover:text-foreground @4xl:text-base',
                {
                  'text-foreground': selectedItem === item,
                },
              )}
              key={item}
              onSelect={() => setSelectedItem(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error != null && error !== '' && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};
`,
    },
  },
  "Favorite": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'styles.css': `.heart-pulse {
  animation: heart-pulse 0.75s forwards;
}

@keyframes heart-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
`,
      'heart.tsx': `import { clsx } from 'clsx';

import './styles.css';

export function Heart({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      className="group-active:heart-pulse transform-gpu transition-transform duration-300 ease-out group-active:scale-75 sm:group-hover:scale-110"
      fill="none"
      height="21"
      viewBox="0 0 20 21"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Line Heart */}
      <path
        className={clsx({
          '-translate-x-px -translate-y-px scale-110 opacity-0 transition-[opacity,transform] delay-100':
            filled,
        })}
        d="M17.3666 4.34166C16.941 3.91583 16.4356 3.57803 15.8794 3.34757C15.3232 3.1171 14.727 2.99847 14.1249 2.99847C13.5229 2.99847 12.9267 3.1171 12.3705 3.34757C11.8143 3.57803 11.3089 3.91583 10.8833 4.34166L9.99994 5.225L9.1166 4.34166C8.25686 3.48192 7.0908 2.99892 5.87494 2.99892C4.65908 2.99892 3.49301 3.48192 2.63327 4.34166C1.77353 5.20141 1.29053 6.36747 1.29053 7.58333C1.29053 8.79919 1.77353 9.96525 2.63327 10.825L3.5166 11.7083L9.99994 18.1917L16.4833 11.7083L17.3666 10.825C17.7924 10.3994 18.1302 9.89401 18.3607 9.33779C18.5912 8.78158 18.7098 8.1854 18.7098 7.58333C18.7098 6.98126 18.5912 6.38508 18.3607 5.82887C18.1302 5.27265 17.7924 4.76729 17.3666 4.34166Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Filler Heart */}
      <path
        className={clsx(
          'origin-center transition-transform duration-300 ease-out',
          filled ? 'scale-100 fill-current' : 'scale-0',
        )}
        d="M17.3666 4.34166C16.941 3.91583 16.4356 3.57803 15.8794 3.34757C15.3232 3.1171 14.727 2.99847 14.1249 2.99847C13.5229 2.99847 12.9267 3.1171 12.3705 3.34757C11.8143 3.57803 11.3089 3.91583 10.8833 4.34166L9.99994 5.225L9.1166 4.34166C8.25686 3.48192 7.0908 2.99892 5.87494 2.99892C4.65908 2.99892 3.49301 3.48192 2.63327 4.34166C1.77353 5.20141 1.29053 6.36747 1.29053 7.58333C1.29053 8.79919 1.77353 9.96525 2.63327 10.825L3.5166 11.7083L9.99994 18.1917L16.4833 11.7083L17.3666 10.825C17.7924 10.3994 18.1302 9.89401 18.3607 9.33779C18.5912 8.78158 18.7098 8.1854 18.7098 7.58333C18.7098 6.98126 18.5912 6.38508 18.3607 5.82887C18.1302 5.27265 17.7924 4.76729 17.3666 4.34166Z"
      />
    </svg>
  );
}
`,
      'index.tsx': `import { clsx } from 'clsx';

import { Heart } from '@/vibes/soul/primitives/favorite/heart';

interface Props {
  checked?: boolean;
  setChecked: (liked: boolean) => void;
}

export const Favorite = function Favorite({ checked, setChecked }: Props) {
  return (
    <label
      className={clsx(
        'group relative flex h-[50px] w-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-contrast-100 text-foreground ring-primary transition-[colors,transform] duration-300 focus-within:outline-0 focus-within:ring-2',
        checked === true ? 'bg-contrast-100' : 'hover:border-contrast-200',
      )}
    >
      <input
        aria-label="Favorite"
        checked={checked}
        className="absolute h-0 w-0 opacity-0"
        id="favorite-checkbox"
        onChange={() => {
          setChecked(checked === true ? false : true);
        }}
        type="checkbox"
      />
      <Heart filled={checked} />
    </label>
  );
};
`,
    },
  },
  "Input": {
    deps: [],
    registryDeps: ['clsx', 'lucide-react'],
    files: {
      'index.tsx': `'use client';

import { clsx } from 'clsx';
import { ComponentPropsWithRef, Ref, forwardRef } from 'react';

import { Label } from '@/vibes/soul/primitives/label';

export interface Props extends ComponentPropsWithRef<'input'> {
  prepend?: string;
  label?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef(function Input(
  { prepend, label, className, required, error, ...rest }: Props,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between">
        {label != null && label !== '' && (
          <Label className="mb-2 block text-foreground">{label}</Label>
        )}
        {required === true && <span className="text-xs text-contrast-300">Required</span>}
      </div>
      <div
        className={clsx(
          'relative overflow-hidden rounded-lg border bg-background transition-colors duration-200 focus-within:border-foreground focus:outline-none',
          error != null && error !== '' ? 'border-error' : 'border-contrast-100',
        )}
      >
        {prepend != null && prepend !== '' && (
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">
            {prepend}
          </span>
        )}
        <input
          ref={ref}
          {...rest}
          className={clsx(
            'placeholder-contrast-gray-500 w-full bg-transparent px-6 py-3 text-foreground [appearance:textfield] placeholder:font-normal focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            {
              'py-3 pl-10 pr-6': prepend,
            },
          )}
        />
      </div>
      {error != null && error !== '' && <span className="text-xs text-error">{error}</span>}
    </div>
  );
});
`,
    },
  },
  "InlineEmailForm": {
    deps: [],
    registryDeps: ['lucide-react', '@conform-to/react', '@conform-to/zod'],
    files: {
      'index.tsx': `'use client';

import { SubmissionResult, getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';
import { useActionState } from 'react';

import { FormStatus } from '@/vibes/soul/form/form-status';
import { Button } from '@/vibes/soul/primitives/button';

import { schema } from './schema';

type Action<State, Payload> = (
  prevState: Awaited<State>,
  formData: Payload,
) => State | Promise<State>;

export function InlineEmailForm({
  className,
  action,
  submitLabel = 'Submit',
  placeholder = 'Enter your email',
}: {
  className?: string;
  placeholder?: string;
  submitLabel?: string;
  action: Action<{ lastResult: SubmissionResult | null; successMessage?: string }, FormData>;
}) {
  const [{ lastResult, successMessage }, formAction, isPending] = useActionState(action, {
    lastResult: null,
  });

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  });

  const { errors = [] } = fields.email;

  return (
    <form {...getFormProps(form)} action={formAction} className={clsx('space-y-2', className)}>
      <div
        className={clsx(
          'relative rounded-xl border bg-background text-base transition-colors duration-200 focus-within:border-primary focus:outline-none',
          errors.length ? 'border-error' : 'border-black',
        )}
      >
        <input
          {...getInputProps(fields.email, { type: 'email' })}
          className="placeholder-contrast-gray-500 h-14 w-full bg-transparent pl-5 pr-16 text-foreground placeholder:font-normal focus:outline-none"
          data-1p-ignore
          key={fields.email.id}
          placeholder={placeholder}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
          <Button
            aria-label={submitLabel}
            loading={isPending}
            size="icon"
            type="submit"
            variant="secondary"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      {errors.map((error, index) => (
        <FormStatus key={index} type="error">
          {error}
        </FormStatus>
      ))}
      {form.status === 'success' && successMessage != null && (
        <FormStatus>{successMessage}</FormStatus>
      )}
    </form>
  );
}
`,
      'schema.ts': `import { z } from 'zod';

export const schema = z.object({
  email: z.string().email(),
});
`,
    },
  },
  "ProductCard": {
    deps: ['badge', 'checkbox', 'price-label'],
    registryDeps: ['clsx'],
    files: {
      'compare.tsx': `'use client';

import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

import { Checkbox } from '@/vibes/soul/form/checkbox';

interface Props {
  productId: string;
  paramName?: string;
  label?: string;
}

export const Compare = function Compare({
  productId,
  paramName = 'compare',
  label = 'Compare',
}: Props) {
  const [param, setParam] = useQueryState(
    paramName,
    parseAsArrayOf(parseAsString).withOptions({ shallow: false }),
  );

  return (
    <Checkbox
      checked={param?.includes(productId) ?? false}
      className="text-contrast-500 transition-colors duration-300 hover:text-foreground"
      id={\`\${paramName}-\${productId}\`}
      label={label}
      onCheckedChange={(value) => {
        void setParam((prev) => {
          const next =
            value === true
              ? [...(prev ?? []), productId]
              : (prev ?? []).filter((v) => v !== productId);

          return next.length > 0 ? next : null;
        });
      }}
    />
  );
};
`,
      'index.tsx': `import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/vibes/soul/primitives/badge';
import { Price, PriceLabel } from '@/vibes/soul/primitives/price-label';

import { Compare } from './compare';

export interface CardProduct {
  id: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
  price?: Price;
  subtitle?: string;
  badge?: string;
  rating?: number;
}

interface Props {
  className?: string;
  showCompare?: boolean;
  compareLabel?: string;
  compareParamName?: string;
  product: CardProduct;
}

export function ProductCard({
  product: { id, title, subtitle, badge, price, image, href },
  className,
  showCompare = false,
  compareLabel,
  compareParamName,
}: Props) {
  return (
    <div className={className}>
      <Link
        aria-label={title}
        className="group flex cursor-pointer flex-col gap-2 rounded-xl ring-primary ring-offset-4 focus-visible:outline-0 focus-visible:ring-2 @md:rounded-2xl"
        href={href}
        id={id}
      >
        <div className="relative aspect-[5/6] overflow-hidden rounded-[inherit] bg-contrast-100">
          {image != null ? (
            <Image
              alt={image.alt}
              className="w-full scale-100 select-none bg-contrast-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 70vw, 33vw"
              src={image.src}
            />
          ) : (
            <div className="pl-2 pt-3 text-7xl font-bold leading-[0.8] tracking-tighter text-contrast-300 transition-transform duration-500 ease-out group-hover:scale-105">
              {title}
            </div>
          )}
          {badge != null && badge !== '' && (
            <Badge className="absolute left-3 top-3" variant="rounded">
              {badge}
            </Badge>
          )}
        </div>
      </Link>

      <div className="mt-2 flex flex-col items-start gap-x-4 gap-y-3 px-1 @xs:mt-3 @2xl:flex-row">
        <div className="flex-1">
          <Link className="group text-base" href={href} tabIndex={-1}>
            <span className="block font-semibold">{title}</span>

            {subtitle != null && subtitle !== '' && (
              <span className="mb-2 block text-sm font-normal text-contrast-400">{subtitle}</span>
            )}
            {price != null && <PriceLabel price={price} />}
          </Link>
        </div>

        {showCompare && (
          <div className="mt-0.5 shrink-0">
            <Compare label={compareLabel} paramName={compareParamName} productId={id} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex aspect-[5/6] flex-col gap-2 rounded-xl bg-contrast-100 @md:rounded-2xl" />
      <div className="mt-2 flex flex-col items-start gap-x-4 gap-y-3 px-1 @xs:mt-3 @2xl:flex-row">
        <div className="flex-1">
          <div className="flex flex-col text-base">
            <div className="flex h-[1lh] items-center">
              <span className="block h-[1ex] w-[10ch] rounded-sm bg-contrast-100" />
            </div>
            <div className="mb-2 flex h-[1lh] items-center text-sm font-normal text-contrast-400">
              <span className="block h-[1ex] w-[8ch] rounded-sm bg-contrast-100" />
            </div>
            <div className="flex h-[1lh] items-center">
              <span className="block h-[1ex] w-[5ch] rounded-sm bg-contrast-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    },
  },
  "ProductsCarousel": {
    deps: ['product-card', 'carousel'],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';

import {
  Carousel,
  CarouselButtons,
  CarouselContent,
  CarouselItem,
  CarouselScrollbar,
} from '@/vibes/soul/primitives/carousel';
import {
  CardProduct,
  ProductCard,
  ProductCardSkeleton,
} from '@/vibes/soul/primitives/product-card';

import { Stream, Streamable } from '../../lib/streamable';

export type CarouselProduct = CardProduct;

interface Props {
  products: Streamable<CarouselProduct[]>;
  className?: string;
  emptyStateTitle?: string;
  emptyStateSubtitle?: string;
}

export function ProductsCarousel({
  products: streamableProducts,
  className,
  emptyStateTitle,
  emptyStateSubtitle,
}: Props) {
  return (
    <Stream fallback={<ProductsCarouselSkeleton pending />} value={streamableProducts}>
      {(products) => {
        if (products.length === 0) {
          return (
            <ProductsCarouselEmptyState
              emptyStateSubtitle={emptyStateSubtitle}
              emptyStateTitle={emptyStateTitle}
            />
          );
        }

        return (
          <Carousel className={className}>
            <CarouselContent className="mb-10">
              {products.map((product) => (
                <CarouselItem
                  className="basis-full @md:basis-1/2 @lg:basis-1/3 @2xl:basis-1/4"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex w-full items-center justify-between">
              <CarouselScrollbar />
              <CarouselButtons />
            </div>
          </Carousel>
        );
      }}
    </Stream>
  );
}

export function ProductsCarouselSkeleton({
  className,
  count = 8,
  pending = false,
}: {
  className?: string;
  count?: number;
  pending?: boolean;
}) {
  return (
    <Carousel className={className} data-pending={pending ? '' : undefined}>
      <CarouselContent className="mb-10">
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem
            className="basis-full @md:basis-1/2 @lg:basis-1/3 @2xl:basis-1/4"
            key={index}
          >
            <ProductCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex w-full items-center justify-between">
        <CarouselScrollbar />
        <CarouselButtons />
      </div>
    </Carousel>
  );
}

export function ProductsCarouselEmptyState({
  className,
  count = 8,
  emptyStateTitle,
  emptyStateSubtitle,
}: {
  className?: string;
  count?: number;
  emptyStateTitle?: string;
  emptyStateSubtitle?: string;
}) {
  return (
    <Carousel className={clsx('relative', className)}>
      <CarouselContent
        className={clsx(
          'mb-10 [mask-image:linear-gradient(to_top,_transparent_0%,_hsl(var(--background))_75%)]',
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem
            className="basis-full @md:basis-1/2 @lg:basis-1/3 @2xl:basis-1/4"
            key={index}
          >
            <ProductCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute inset-0 mx-auto px-3 py-16 pb-3 @4xl:px-10 @4xl:pb-10 @4xl:pt-28">
        <div className="mx-auto max-w-xl space-y-2 text-center @4xl:space-y-3">
          <h3 className="@4x:leading-none font-heading text-2xl leading-tight text-foreground @4xl:text-4xl">
            {emptyStateTitle}
          </h3>
          <p className="text-sm text-contrast-500 @4xl:text-lg">{emptyStateSubtitle}</p>
        </div>
      </div>
    </Carousel>
  );
}
`,
    },
  },
  "ProductList": {
    deps: ['product-card'],
    registryDeps: [],
    files: {
      'compare-drawer.tsx': `'use client';

import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { startTransition } from 'react';

import { Button } from '@/vibes/soul/primitives/button';
import { Drawer } from '@/vibes/soul/primitives/drawer';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface DrawerItem {
  id: string;
  image?: { src: string; alt: string };
  href: string;
  title: string;
}

interface Props {
  items: DrawerItem[];
  paramName?: string;
  action?: React.ComponentProps<'form'>['action'];
  submitLabel?: string;
}

export function CompareDrawer({
  items,
  paramName = 'compare',
  action,
  submitLabel = 'Compare',
}: Props) {
  const [, setParam] = useQueryState(
    paramName,
    parseAsArrayOf(parseAsString).withOptions({ shallow: false, scroll: false }),
  );

  return (
    items.length > 0 && (
      <Drawer>
        <form
          action={action}
          className="mx-auto flex w-full max-w-7xl flex-col items-start justify-end gap-x-3 gap-y-4 @md:flex-row"
        >
          <div className="flex flex-1 flex-wrap justify-end gap-4">
            {items.map((item) => (
              <div className="relative" key={item.id}>
                <input key={item.id} name={paramName} type="hidden" value={item.id} />
                <Link
                  className="group relative flex max-w-56 items-center whitespace-nowrap rounded-xl border border-contrast-100 bg-background font-semibold ring-primary transition-all duration-150 hover:bg-contrast-100 focus:outline-0 focus:ring-2"
                  href={item.href}
                >
                  <div className="bg-primary-highlight/10 relative aspect-square w-12 shrink-0">
                    {item.image?.src != null ? (
                      <Image
                        alt={item.image.alt}
                        className="rounded-lg object-cover @4xl:rounded-r-none"
                        fill
                        src={item.image.src}
                      />
                    ) : (
                      <span className="max-w-full break-all p-1 text-xs text-primary-shadow opacity-20">
                        {getInitials(item.title)}
                      </span>
                    )}
                  </div>
                  <span className="hidden truncate pl-3 pr-5 text-foreground @4xl:block">
                    {item.title}
                  </span>
                </Link>

                <button
                  aria-label={\`Remove \${item.title}\`}
                  className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-contrast-100 bg-background text-contrast-400 transition-colors duration-150 hover:border-contrast-200 hover:bg-contrast-100 hover:text-foreground"
                  onClick={() => {
                    startTransition(async () => {
                      await setParam((prev) => {
                        const next = prev?.filter((v) => v !== item.id) ?? [];

                        return next.length > 0 ? next : null;
                      });
                    });
                  }}
                  type="button"
                >
                  <X absoluteStrokeWidth size={16} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>

          <Button className="hidden @md:block" size="medium" type="submit" variant="primary">
            {submitLabel} <ArrowRight absoluteStrokeWidth size={20} strokeWidth={1} />
          </Button>

          <Button className="w-full @md:hidden" size="small" type="submit" variant="primary">
            {submitLabel} <ArrowRight absoluteStrokeWidth size={16} strokeWidth={1} />
          </Button>
        </form>
      </Drawer>
    )
  );
}
`,
      'index.tsx': `import { clsx } from 'clsx';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import {
  CardProduct,
  ProductCard,
  ProductCardSkeleton,
} from '@/vibes/soul/primitives/product-card';

import { CompareDrawer } from './compare-drawer';

export type ListProduct = CardProduct;

interface Props {
  products: Streamable<ListProduct[]>;
  compareProducts?: Streamable<ListProduct[] | null>;
  className?: string;
  showCompare?: boolean;
  compareAction?: React.ComponentProps<'form'>['action'];
  compareLabel?: string;
  compareParamName?: string;
}

export function ProductsList({
  products: streamableProducts,
  className,
  showCompare,
  compareAction,
  compareProducts: streamableCompareProducts,
  compareLabel,
  compareParamName,
}: Props) {
  return (
    <>
      <div className={clsx('w-full @container', className)}>
        <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-6 @sm:grid-cols-2 @2xl:grid-cols-3 @2xl:gap-x-5 @2xl:gap-y-8 @5xl:grid-cols-4 @7xl:grid-cols-5">
          <Stream
            fallback={Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
            value={streamableProducts}
          >
            {(products) =>
              products.map((product) => (
                <ProductCard
                  compareLabel={compareLabel}
                  compareParamName={compareParamName}
                  key={product.id}
                  product={product}
                  showCompare={showCompare}
                />
              ))
            }
          </Stream>
        </div>
      </div>
      <Stream value={streamableCompareProducts}>
        {(compareProducts) =>
          compareProducts && (
            <CompareDrawer
              action={compareAction}
              items={compareProducts}
              paramName={compareParamName}
              submitLabel={compareLabel}
            />
          )
        }
      </Stream>
    </>
  );
}

export function ProductsListSkeleton({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div className={clsx('relative w-full @container', className)}>
      <div
        className={clsx(
          'mx-auto grid grid-cols-1 gap-x-4 gap-y-6 @sm:grid-cols-2 @2xl:grid-cols-3 @2xl:gap-x-5 @2xl:gap-y-8 @5xl:grid-cols-4 @7xl:grid-cols-5',
          message != null &&
            message !== '' &&
            '[mask-image:radial-gradient(circle,transparent,black)]',
        )}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-xl">{message}</div>
    </div>
  );
}
`,
    },
  },
  "Rating": {
    deps: [],
    registryDeps: [],
    files: {
      'index.tsx': `import { clsx } from 'clsx';

export interface Props {
  showRating?: boolean;
  rating: number;
  className?: string;
}

interface StarType {
  type: 'empty' | 'half' | 'full';
}

const Star = ({ type }: StarType) => {
  const paths = {
    empty: (
      <path
        d="M9.99984 1.66669L12.5748 6.88335L18.3332 7.72502L14.1665 11.7834L15.1498 17.5167L9.99984 14.8084L4.84984 17.5167L5.83317 11.7834L1.6665 7.72502L7.42484 6.88335L9.99984 1.66669Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
      />
    ),
    half: (
      <>
        <path
          d="M9.99984 1.66669L12.5748 6.88335L18.3332 7.72502L14.1665 11.7834L15.1498 17.5167L9.99984 14.8084L4.84984 17.5167L5.83317 11.7834L1.6665 7.72502L7.42484 6.88335L9.99984 1.66669Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0003 1.6665V14.8082L4.85033 17.5165L5.83366 11.7832L1.66699 7.72484L7.42533 6.88317L10.0003 1.6665Z"
          fill="currentColor"
        />
      </>
    ),
    full: (
      <path
        d="M9.99984 1.66669L12.5748 6.88335L18.3332 7.72502L14.1665 11.7834L15.1498 17.5167L9.99984 14.8084L4.84984 17.5167L5.83317 11.7834L1.6665 7.72502L7.42484 6.88335L9.99984 1.66669Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg
      className="inline-block text-foreground"
      fill="none"
      height={20}
      viewBox="0 0 20 20"
      width={20}
    >
      {paths[type]}
    </svg>
  );
};

export const Rating = function Rating({ showRating = true, rating, className }: Readonly<Props>) {
  const adjustedRating = Math.min(rating, 5);

  const stars: StarType['type'][] = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(adjustedRating)) return 'full';
    if (index < Math.ceil(adjustedRating)) return 'half';
    return 'empty';
  });

  return (
    <div className={clsx('flex items-center', className)}>
      {stars.map((type, index) => (
        <Star key={index} type={type} />
      ))}

      {showRating && (
        <span className="ml-1.5 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full border border-contrast-100 px-1 text-xs font-medium text-contrast-400">
          {adjustedRating % 1 !== 0 ? adjustedRating.toFixed(1) : adjustedRating}
        </span>
      )}
    </div>
  );
};
`,
    },
  },
  "Spinner": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `import { clsx } from 'clsx';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loadingAriaLabel?: string;
}

export const Spinner = function Spinner({ size = 'sm', loadingAriaLabel }: Props) {
  return (
    <span
      aria-label={loadingAriaLabel ?? 'Loading...'}
      className={clsx(
        'box-border inline-block animate-spin rounded-full border-contrast-100 border-b-primary-shadow',
        {
          xs: 'h-5 w-5 border-2',
          sm: 'h-6 w-6 border-2',
          md: 'h-10 w-10 border-[3px]',
          lg: 'h-14 w-14 border-4',
        }[size],
      )}
      role="status"
    ></span>
  );
};
`,
    },
  },
  "TextArea": {
    deps: [],
    registryDeps: ['clsx'],
    files: {
      'index.tsx': `'use client';

import { clsx } from 'clsx';
import { ComponentPropsWithRef, Ref, forwardRef } from 'react';

import { Label } from '@/vibes/soul/primitives/label';

export interface Props extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  className?: string;
}

export const TextArea = forwardRef(function TextArea(
  { label, className, required, ...rest }: Props,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between">
        {label != null && label !== '' && (
          <Label className="mb-2 block text-foreground">{label}</Label>
        )}
        {required === true && <span className="text-xs text-contrast-300">Required</span>}
      </div>
      <div className="relative overflow-hidden rounded-lg border border-contrast-100 bg-background transition-colors duration-200 focus-within:border-foreground focus:outline-none">
        <textarea
          ref={ref}
          {...rest}
          className={clsx(
            'placeholder-contrast-gray-500 w-full bg-transparent p-3 text-foreground placeholder:font-normal focus:outline-none',
          )}
        />
      </div>
    </div>
  );
});
`,
    },
  },
};
