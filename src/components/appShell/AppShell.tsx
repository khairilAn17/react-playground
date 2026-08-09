import type { ReactNode } from 'react'
import { Box } from '@mui/material'

import { Sidebar, SidebarProvider } from '../sidebar'
import type { SidebarItemConfig } from '../sidebar'

export interface AppShellProps {
  /** Logo slot inside sidebar header */
  logo?: ReactNode
  /** Application brand title */
  brandTitle?: string
  /** Application subtitle */
  brandSubtitle?: string
  /** Data-driven sidebar items configuration */
  sidebarItems?: SidebarItemConfig[]
  /** Custom sidebar compound children */
  sidebarChildren?: ReactNode
  /** User profile info for sidebar footer */
  user?: { name: string; email?: string; avatarUrl?: string }
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Callback on collapsed change */
  onToggleCollapsed?: (collapsed: boolean) => void
  /** Active navigation item key */
  activeKey?: string
  /** Callback when navigation item is selected */
  onSelect?: (key: string) => void
  /** Page content body — typically a <PageLayout> */
  children: ReactNode
}

export function AppShell({
  logo,
  brandTitle = 'React Playground',
  brandSubtitle = 'Design System',
  sidebarItems,
  sidebarChildren,
  user,
  collapsed,
  onToggleCollapsed,
  activeKey,
  onSelect,
  children,
}: AppShellProps) {
  return (
    <SidebarProvider
      collapsed={collapsed}
      onToggleCollapsed={onToggleCollapsed}
      activeKey={activeKey}
      onSelect={onSelect}
    >
      <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar items={sidebarChildren ? undefined : sidebarItems}>
          {sidebarChildren ?? (
            <>
              {(brandTitle || logo) && (
                <Sidebar.Header
                  logo={logo}
                  title={brandTitle}
                  subtitle={brandSubtitle}
                />
              )}
              {user && <Sidebar.Footer user={user} />}
            </>
          )}
        </Sidebar>

        {/* Main scrollable content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100vh',
            overflowY: 'auto',
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </SidebarProvider>
  )
}
