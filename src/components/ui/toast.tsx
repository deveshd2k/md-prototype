import { useCallback, useEffect, useState, type ReactNode } from 'react'
import closeIcon from '@/assets/figma/close-white.svg'
import successIcon from '@/assets/figma/success.svg'
import { ToastContext } from '@/components/ui/toast-context'

// How long a toast stays before closing on its own
const AUTO_CLOSE_MS = 6000

type Toast = { id: number; message: ReactNode }
// Holds the active toasts and renders them top-right, 16px below the Work management bar
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), [])
  const showSuccess = useCallback((message: ReactNode) => {
    setToasts((current) => [...current, { id: Date.now() + Math.random(), message }])
  }, [])

  return (
    <ToastContext.Provider value={{ showSuccess }}>
      {children}
      {/* OS bar (64px) + Work management bar (57px) + 16px gap */}
      <div aria-live="polite" className="fixed top-[137px] right-4 z-[60] flex flex-col items-end gap-2">
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
