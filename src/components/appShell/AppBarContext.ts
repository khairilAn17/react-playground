import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export interface AppBarContextValue {
  /** Inject arbitrary content into the AppBar slot (called by PageLayout.TopBar) */
  setTopBarSlot: (content: ReactNode) => void
  /** Clear the injected content on unmount */
  clearTopBarSlot: () => void
}

export const AppBarContext = createContext<AppBarContextValue | null>(null)

/** Returns the AppBar context — null-safe, works outside AppShell too. */
export function useAppBar(): AppBarContextValue | null {
  return useContext(AppBarContext)
}
