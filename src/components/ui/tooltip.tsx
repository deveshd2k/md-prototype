import type { ReactNode } from 'react'
import { Tooltip as TooltipPrimitive } from 'radix-ui'
import { usePortalContainer } from '@/components/ui/portal-container'

type TooltipProps = {
  content: ReactNode
  children: ReactNode
}

// Design system "Tooltip" (Default, Dark): dark grey bubble with a pointer, shown above the trigger
export function Tooltip({ content, children }: TooltipProps) {
  const container = usePortalContainer()
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={container}>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={4}
            collisionPadding={8}
            className="z-[70] max-w-[280px] rounded-md bg-grey-800 px-2 py-1.5 text-sm leading-[22px] text-white shadow-pinned data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          >
            {content}
            <TooltipPrimitive.Arrow width={32} height={4} className="fill-grey-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
