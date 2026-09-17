import type { ComponentProps, ReactNode } from 'react'
import { NavLink } from 'react-router'

// Design system "Action Button", Type=Inverted (for dark surfaces).
// Idle: transparent · Hover: white 12% · Pressed / selected: white 18% · Disabled: grey text
const invertedClass = [
  'flex h-8 items-center rounded-md px-2 py-1 text-sm leading-6 font-medium whitespace-nowrap text-white outline-none',
  'hover:bg-grey-100/12 active:bg-grey-100/18 aria-[current=page]:bg-grey-100/18',
  'focus-visible:ring-2 focus-visible:ring-white/60',
  'disabled:pointer-events-none disabled:bg-transparent disabled:text-grey-500',
].join(' ')

export function InvertedActionButton({ className = '', ...props }: ComponentProps<'button'>) {
  return <button type="button" className={`${invertedClass} ${className}`} {...props} />
}

// Same look as a navigation link; marked selected when its route is active
export function InvertedActionLink({ className = '', ...props }: ComponentProps<typeof NavLink> & { className?: string }) {
  return <NavLink className={`${invertedClass} ${className}`} {...props} />
}

// Design system "Action Button", Type=Primary / Secondary (for light surfaces).
// Idle: transparent · Hover: Grey 700 at 12% · Pressed: Grey 800 at 18% (primary text darkens) · Disabled: 40%
const actionVariants = {
  primary: 'text-primary-500 enabled:active:text-primary-600',
  secondary: 'text-grey-900',
}

type ActionButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof actionVariants
  icon?: ReactNode // shown before the label, takes the text colour
}

export function ActionButton({ variant = 'primary', icon, className = '', children, ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      className={[
        'flex h-8 shrink-0 items-center gap-1 rounded-md py-[5px] text-sm leading-[22px] font-semibold whitespace-nowrap outline-none',
        icon ? 'pr-2 pl-1.5' : 'px-2',
        'enabled:hover:bg-grey-700/12 enabled:active:bg-grey-800/18',
        'focus-visible:ring-2 focus-visible:ring-primary-500/40 disabled:cursor-not-allowed disabled:opacity-40',
        actionVariants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

// Figma "Chevron" pointing left, in the current text colour
export function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7071 3.29289C13.0976 3.68342 13.0976 4.31658 12.7071 4.70711L7.41421 10L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289L11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289Z"
        fill="currentColor"
      />
    </svg>
  )
}
