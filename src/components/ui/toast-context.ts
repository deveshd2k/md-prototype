import { createContext, useContext, type ReactNode } from 'react'

export type ToastContextValue = { showSuccess: (message: ReactNode) => void }

export const ToastContext = createContext<ToastContextValue>({ showSuccess: () => {} })

// Show a toast from anywhere inside the app shell
export function useToast() {
  return useContext(ToastContext)
}
