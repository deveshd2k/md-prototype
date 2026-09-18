type TabsProps<T extends string> = {
  tabs: { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
  label: string // for screen readers, e.g. "User details"
}

// Design system "Tabs" (size M): underlined selected tab, full-width divider underneath.
// Idle: Grey 800 · Hover: Primary 400 · Pressed: Primary 600 · Selected: Primary 500 + 2px highlight
export function Tabs<T extends string>({ tabs, active, onChange, label }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={label} className="relative flex gap-5">
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 rounded-sm bg-grey-300" />
      {tabs.map((tab) => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className="relative flex h-10 flex-col items-start outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
          >
            <span
              className={[
                'flex px-2 pt-2 pb-2.5 text-sm leading-[22px] font-semibold whitespace-nowrap',
                selected ? 'text-primary-500' : 'text-grey-800 hover:text-primary-400 active:text-primary-600',
              ].join(' ')}
            >
              {tab.label}
            </span>
            {/* Sits on top of the divider rather than below it, so the lines don't double up */}
            {selected && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-sm bg-primary-500" />}
          </button>
        )
      })}
    </div>
  )
}
