import { useState, useMemo, useCallback, type ReactNode } from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import { SidebarContext } from './SidebarContext'
import type { SidebarContextValue } from './types'

export interface SidebarProviderProps {
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Initial collapsed state when uncontrolled */
  defaultCollapsed?: boolean
  /** Callback on collapsed change */
  onToggleCollapsed?: (collapsed: boolean) => void
  /** Active navigation item key or path */
  activeKey?: string
  /** Callback when navigation item selected */
  onSelect?: (key: string) => void
  /** Expanded width in pixels (default: 260) */
  width?: number
  /** Collapsed width in pixels (default: 68) */
  collapsedWidth?: number
  /** Children nodes */
  children: ReactNode
}

export function SidebarProvider({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onToggleCollapsed,
  activeKey,
  onSelect,
  width = 260,
  collapsedWidth = 68,
  children,
}: SidebarProviderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isCollapsed = controlledCollapsed ?? uncontrolledCollapsed

  const handleSetCollapsed = useCallback(
    (action: boolean | ((prev: boolean) => boolean)) => {
      const nextState = typeof action === 'function' ? action(isCollapsed) : action
      if (controlledCollapsed === undefined) {
        setUncontrolledCollapsed(nextState)
      }
      if (onToggleCollapsed) {
        onToggleCollapsed(nextState)
      }
    },
    [isCollapsed, controlledCollapsed, onToggleCollapsed]
  )

  const contextValue: SidebarContextValue = useMemo(
    () => ({
      collapsed: isMobile ? false : isCollapsed,
      setCollapsed: handleSetCollapsed,
      mobileOpen,
      setMobileOpen,
      activeKey,
      onSelect,
      width,
      collapsedWidth,
    }),
    [isMobile, isCollapsed, handleSetCollapsed, mobileOpen, activeKey, onSelect, width, collapsedWidth]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
