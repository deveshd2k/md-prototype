import { createContext, useContext } from 'react'

// Where floating layers (dropdowns) should render. Modals provide their own element so that
// dropdowns opened inside them stay inside, where scrolling and focus are allowed.
export const PortalContainerContext = createContext<HTMLElement | null>(null)

export function usePortalContainer() {
  return useContext(PortalContainerContext) ?? undefined
}
