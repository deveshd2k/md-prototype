import type { ReactNode } from 'react'
import clearIcon from '@/assets/figma/clear.svg'

type PillProps = {
  children: ReactNode
  icon?: ReactNode
  onRemove?: () => void // shows the ✕ when provided
  removeLabel?: string
}

// Design system "Pill", Type=Display: read-only chip with an optional leading icon and remove button
export function Pill({ children, icon, onRemove, removeLabel = 'Remove' }: PillProps) {
  return (
    <span
      className={`flex h-8 shrink-0 items-center gap-1 rounded-full border border-grey-500 bg-white py-1 pr-2.5 ${icon ? 'pl-2.5' : 'pl-3'}`}
    >
      {icon}
      <span className="pr-0.5 text-sm leading-[22px] whitespace-nowrap text-grey-1000">{children}</span>
      {onRemove && (
        <button type="button" aria-label={removeLabel} onClick={onRemove} className="rounded outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40">
          <img src={clearIcon} alt="" className="size-5" />
        </button>
      )}
    </span>
  )
}

// Design system "Pills Group": pills 8px apart, wrapping onto new lines when needed
export function PillsGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>
}
