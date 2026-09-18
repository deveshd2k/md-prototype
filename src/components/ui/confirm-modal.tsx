import { Dialog } from 'radix-ui'
import { RegularButton } from '@/components/ui/regular-button'

type ConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
}

// Design system "Modal": small centred dialog for confirming a destructive action
export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-grey-500/60 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[60] w-[440px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] bg-white shadow-[0_8px_32px_0_rgb(52_58_63/0.05)] outline-none data-open:animate-in data-open:fade-in-0">
          <Dialog.Title className="px-6 pt-5 pb-4 text-xl leading-8 font-semibold text-grey-1000">{title}</Dialog.Title>
          <Dialog.Description className="px-6 text-sm leading-[22px] text-grey-1000">{description}</Dialog.Description>
          <div className="flex items-center justify-end gap-3 px-6 pt-6 pb-6">
            <RegularButton size="s" variant="secondary" onClick={() => onOpenChange(false)}>
              {cancelLabel}
            </RegularButton>
            <RegularButton size="s" variant="danger" onClick={onConfirm}>
              {confirmLabel}
            </RegularButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
