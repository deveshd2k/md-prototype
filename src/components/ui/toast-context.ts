import { createContext, useContext, useEffect, type ReactNode } from 'react'

export type ToastContextValue = {
  showSuccess: (message: ReactNode) => void
  /** Modals report themselves so toasts can move clear of them; returns an unregister function */
  registerModal: () => () => void
}

export const ToastContext = createContext<ToastContextValue>({
  showSuccess: () => {},
  registerModal: () => () => {},
})

// Show a toast from anywhere inside the app shell
export function useToast() {
  return useContext(ToastContext)
}

// Called by modals while they are open, so the toast sits at the top of the screen instead of
// under the Work management bar (which a modal covers).
export function useModalToastPosition(open: boolean) {
  const { registerModal } = useContext(ToastContext)
  useEffect(() => {
    if (!open) return
    return registerModal()
  }, [open, registerModal])
}
