import { useState, type ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import closeIcon from '@/assets/figma/close.svg'
import { PortalContainerContext } from '@/components/ui/portal-container'

type FullScreenModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  actions: ReactNode
  leftActions?: ReactNode // action bar, left side (e.g. Back)
}

// Design system "Full-screen Modal": 76px header, scrolling body, 104px action bar.
// Clicking the backdrop does not close it, so a half-finished flow isn't lost by accident.
export function FullScreenModal({ open, onOpenChange, title, children, actions, leftActions }: FullScreenModalProps) {
  const [content, setContent] = useState<HTMLDivElement | null>(null)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-grey-500/60 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          ref={setContent}
          onInteractOutside={(event) => event.preventDefault()}
          // Focus the element marked data-autofocus (e.g. a search box) instead of the close button
          onOpenAutoFocus={(event) => {
            const target = (event.currentTarget as HTMLElement | null)?.querySelector<HTMLElement>('[data-autofocus]')
            if (target) {
              event.preventDefault()
              target.focus()
            }
          }}
          aria-describedby={undefined}
          className="fixed inset-x-[38px] inset-y-[30px] z-50 flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_8px_32px_0_rgb(52_58_63/0.05)] outline-none data-open:animate-in data-open:fade-in-0"
        >
          <header className="flex h-[76px] shrink-0 items-start justify-between pt-6 pr-6 pl-8">
            <Dialog.Title className="text-2xl leading-8 font-semibold text-grey-1000">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="mt-0.5 flex items-center justify-center rounded-md p-1.5 outline-none hover:bg-grey-200 focus-visible:ring-2 focus-visible:ring-primary-500/40 active:bg-grey-300"
            >
              <img src={closeIcon} alt="" className="size-5" />
            </Dialog.Close>
          </header>
          <PortalContainerContext.Provider value={content}>
            <div className="flex min-h-0 flex-1 flex-col px-8">{children}</div>
          </PortalContainerContext.Provider>
          <footer className="flex h-[104px] shrink-0 items-start justify-between gap-3 px-8 pt-8">
            <div className="flex items-center gap-3 pt-1">{leftActions}</div>
            <div className="flex items-start gap-3">{actions}</div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
