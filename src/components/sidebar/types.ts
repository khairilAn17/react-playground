import type { ReactNode } from 'react'

export type SidebarVariant = 'permanent' | 'persistent' | 'temporary'

export interface SidebarContextValue {
  /** Whether the sidebar is in collapsed (mini) mode on desktop */
  collapsed: boolean
  /** Toggle collapsed state */
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void
  /** Whether mobile overlay drawer is open */
  mobileOpen: boolean
  /** Toggle mobile drawer state */
  setMobileOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  /** Active navigation item key or path */
  activeKey?: string
  /** Callback when any navigation item is selected */
  onSelect?: (key: string) => void
  /** Custom width when expanded (default: 260px) */
  width: number
  /** Custom width when collapsed (default: 68px) */
  collapsedWidth: number
}

export interface SidebarBadge {
  content: ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

/** Config interface for Data-Driven API */
export type SidebarItemConfig =
  | {
      kind: 'header'
      title: string
    }
  | {
      kind: 'divider'
    }
  | {
      kind: 'item'
      key: string
      label: string
      icon?: ReactNode
      badge?: ReactNode | SidebarBadge
      disabled?: boolean
      href?: string
      onClick?: () => void
    }
  | {
      kind: 'group'
      key: string
      label: string
      icon?: ReactNode
      badge?: ReactNode | SidebarBadge
      disabled?: boolean
      defaultOpen?: boolean
      children: SidebarItemConfig[]
    }
