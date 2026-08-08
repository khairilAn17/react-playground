import { createContext, useContext } from 'react'
import type { SidebarContextValue } from './types'

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(
      'useSidebar standard hook must be used within a <Sidebar> or <SidebarProvider> component.'
    )
  }
  return context
}

export function useSidebarOptional(): SidebarContextValue | null {
  return useContext(SidebarContext)
}
