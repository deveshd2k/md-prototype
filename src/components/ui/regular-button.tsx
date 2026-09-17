import type { ComponentProps, ReactNode } from 'react'

// Design system "Regular Button".
// Primary: filled · hover Primary 400 · pressed Primary 600
// Secondary: outlined · hover Primary 100 fill · pressed Primary 200 fill with Primary 600 border/text
// Disabled: the idle look at 40% opacity
const variants = {
  primary: 'bg-primary-500 text-white enabled:hover:bg-primary-400 enabled:active:bg-primary-600',
  secondary:
    'border border-primary-500 text-primary-500 enabled:hover:bg-primary-100 enabled:active:border-primary-600 enabled:active:bg-primary-200 enabled:active:text-primary-600',
}

const sizes = {
  m: 'h-10 rounded-lg px-5',
  s: 'h-8 rounded-md px-4',
}

type RegularButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: ReactNode
}

export function RegularButton({ variant = 'primary', size = 'm', icon, className = '', children, ...props }: RegularButtonProps) {
  return (
    <button
      type="button"
      className={[
        'flex shrink-0 items-center justify-center gap-2 text-sm leading-[22px] font-semibold whitespace-nowrap outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500/40 disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        sizes[size],
        icon && size === 's' ? 'pl-3' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
