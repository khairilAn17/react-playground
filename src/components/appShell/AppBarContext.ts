import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export interface AppBarContextValue {
  /** Static right-side actions provided by AppShell (e.g. theme toggle, GitHub link) */
  headerRight?: ReactNode
}

export const AppBarContext = createContext<AppBarContextValue | null>(null)

/** Returns the AppBar context — null-safe, works outside AppShell too. */
export function useAppBar(): AppBarContextValue | null {
  return useContext(AppBarContext)
}
