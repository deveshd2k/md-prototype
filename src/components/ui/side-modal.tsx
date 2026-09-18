import type { ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import closeIcon from '@/assets/figma/close.svg'
import { PortalContainerContext } from '@/components/ui/portal-container'
import { useModalToastPosition } from '@/components/ui/toast-context'
import { useState } from 'react'

type SideModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  actions?: ReactNode // footer, right side
  leftActions?: ReactNode // footer, left side (e.g. Back)
}

// Design system "Side Modal": 760px panel sliding in from the right, with a 24px header
export function SideModal({ open, onOpenChange, title, children, actions, leftActions }: SideModalProps) {
  const [content, setContent] = useState<HTMLDivElement | null>(null)
  useModalToastPosition(open)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-grey-500/60 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          ref={setContent}
          aria-describedby={undefined}
          // The panel closes only from its own buttons (Close / Cancel), never from a click
          // outside it or the Escape key — so a toast or a stray click can't dismiss it.
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
          // Focus the panel itself rather than the close button, so no focus ring flashes on open
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            content?.focus()
          }}
          className="fixed inset-y-0 right-0 z-50 flex w-[760px] max-w-full flex-col bg-white shadow-[0_8px_32px_0_rgb(52_58_63/0.05)] outline-none data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right"
        >
          <header className="flex shrink-0 items-start gap-2 px-6 pt-6 pb-5">
            <Dialog.Title className="flex-1 pl-2 text-2xl leading-8 font-semibold text-grey-1000">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="flex shrink-0 rounded-md p-1.5 outline-none hover:bg-grey-700/12 focus-visible:ring-2 focus-visible:ring-primary-500/40 active:bg-grey-800/18"
            >
              <img src={closeIcon} alt="" className="size-5" />
            </Dialog.Close>
          </header>
          <PortalContainerContext.Provider value={content}>
            <div className="scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto px-8 pb-8">{children}</div>
            {(actions || leftActions) && (
              <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-grey-300 px-8 py-6">
                <div className="flex items-center gap-3">{leftActions}</div>
                <div className="flex items-center gap-3">{actions}</div>
              </footer>
            )}
          </PortalContainerContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
