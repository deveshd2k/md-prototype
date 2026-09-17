import type { ReactNode } from 'react'

type ListItemProps = {
  type?: 'primary' | 'multiple' // single choice (e.g. radio) or multiple choice (checkbox)
  leading?: ReactNode // left slot: radio, checkbox or icon
  title: string
  subtitle?: string
  trailing?: string // right slot text
  selected?: boolean
  disabled?: boolean
}

// Design system "List Item" (the whole row is the click target).
// Default: no fill · Hover: Grey 200 · Pressed: Grey 300 · Disabled: 40% opacity
// Selected: Primary 100 fill, medium title, Primary 500 text.
//   Primary type has no hover/pressed change when selected;
//   Multiple type: title Primary 400 on hover, title + subtitle Primary 600 when pressed.
export function ListItem({ type = 'primary', leading, title, subtitle, trailing, selected = false, disabled = false }: ListItemProps) {
  const interactive = !disabled && !(selected && type === 'primary')
  return (
    <label
      aria-disabled={disabled || undefined}
      className={[
        'group/item flex items-start overflow-hidden rounded-md pl-1 transition-colors',
        selected ? 'bg-primary-100 text-primary-500' : 'text-grey-900',
        !selected && !disabled && 'hover:bg-grey-200 active:bg-grey-300',
        disabled && 'pointer-events-none opacity-40',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leading && <span className="flex shrink-0 items-center px-1 py-1.5">{leading}</span>}
      <span className="flex min-w-0 flex-1 items-center">
        <span
          className={[
            'flex min-w-0 flex-1 flex-col py-1 pr-2 pl-1',
            selected && type === 'multiple' && interactive && 'group-active/item:text-primary-600',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span
            className={[
              'truncate text-sm leading-6',
              selected ? 'font-medium' : '',
              selected && type === 'multiple' ? 'group-hover/item:text-primary-400 group-active/item:text-primary-600' : '',
            ].join(' ')}
          >
            {title}
          </span>
          {subtitle && (
            <span className={`truncate text-xs leading-5 ${selected ? '' : 'text-grey-700'}`}>{subtitle}</span>
          )}
        </span>
        {trailing && <span className="shrink-0 py-1 pr-2 text-right text-sm leading-6 text-grey-800">{trailing}</span>}
      </span>
    </label>
  )
}
