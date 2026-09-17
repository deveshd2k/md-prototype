import { useState, type ReactNode } from 'react'
import closeIcon from '@/assets/figma/close.svg'
import infoIcon from '@/assets/figma/info-message.svg'

type InlineMessageProps = {
  title?: string
  children: ReactNode
  dismissible?: boolean
}

// Design system "Inline Message / L", Type=Info: callout with a bulb icon, optional title and a close button
export function InlineMessage({ title, children, dismissible = false }: InlineMessageProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div role="note" className="flex items-start gap-6 rounded-lg bg-grey-300/60 py-3 pr-3 pl-4">
      <div className="flex min-w-0 flex-1 items-start gap-2 py-1">
        <span className="flex shrink-0 py-0.5">
          <img src={infoIcon} alt="" className="size-5" />
        </span>
        <div className="flex max-w-[600px] min-w-40 flex-1 flex-col gap-0.5">
          {title && <p className="text-base leading-6 font-semibold text-grey-1000">{title}</p>}
          <div className="pt-px text-sm leading-[22px] text-grey-1000">{children}</div>
        </div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="flex shrink-0 rounded-md p-1.5 outline-none hover:bg-grey-700/12 focus-visible:ring-2 focus-visible:ring-primary-500/40 active:bg-grey-800/18"
        >
          <img src={closeIcon} alt="" className="size-5" />
        </button>
      )}
    </div>
  )
}
