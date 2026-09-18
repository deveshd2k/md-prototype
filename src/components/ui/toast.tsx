import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import closeIcon from '@/assets/figma/close-white.svg'
import successIcon from '@/assets/figma/success.svg'
import { ToastContext } from '@/components/ui/toast-context'

// How long a toast stays before closing on its own
const AUTO_CLOSE_MS = 6000

type Toast = { id: number; message: ReactNode }
// Holds the active toasts and renders them top-right, 16px below the Work management bar
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const [modalCount, setModalCount] = useState(0)

  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), [])
  const showSuccess = useCallback((message: ReactNode) => {
    setToasts((current) => [...current, { id: Date.now() + Math.random(), message }])
  }, [])
  const registerModal = useCallback(() => {
    setModalCount((count) => count + 1)
    return () => setModalCount((count) => count - 1)
  }, [])
  const value = useMemo(() => ({ showSuccess, registerModal }), [showSuccess, registerModal])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Below the Work management bar (64 + 57 + 16), or 16px from the top while a modal covers it.
          pointer-events-auto keeps the toast clickable: modals switch off pointer events elsewhere. */}
      <div
        aria-live="polite"
        data-toast-viewport=""
        className={`pointer-events-auto fixed right-4 z-[60] flex flex-col items-end gap-2 ${
          modalCount > 0 ? 'top-4' : 'top-[137px]'
        }`}
      >
        {toasts.map((toast) => (
          <SuccessToast key={toast.id} message={toast.message} onClose={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Design system "System Notification", success type
function SuccessToast({ message, onClose }: { message: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_CLOSE_MS)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="status"
      className="flex w-[404px] items-start gap-2 rounded-lg bg-grey-900 py-3 pr-3 pl-4 shadow-pinned animate-in fade-in-0 slide-in-from-right-4"
    >
      <div className="flex min-w-0 flex-1 items-start gap-2 py-1">
        <span className="flex shrink-0 rounded-full bg-success-200 p-1">
          <img src={successIcon} alt="" className="size-4" />
        </span>
        <p className="min-w-0 flex-1 pt-px text-sm leading-[22px] text-white">{message}</p>
      </div>
      <button
        type="button"
        aria-label="Close notification"
        onClick={onClose}
        className="flex shrink-0 rounded-md p-1.5 outline-none hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-white/60 active:bg-white/18"
      >
        <img src={closeIcon} alt="" className="size-5" />
      </button>
    </div>
  )
}
