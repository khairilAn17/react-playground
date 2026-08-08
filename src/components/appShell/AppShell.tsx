import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Box, AppBar, Toolbar } from '@mui/material'

import { Sidebar, SidebarProvider, SidebarToggle } from '../sidebar'
import type { SidebarItemConfig } from '../sidebar'
import { AppBarContext } from './AppBarContext'

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
  /** Right-hand global shell actions (always visible, e.g. theme toggle, GitHub link) */
  toolbarActions?: ReactNode
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Callback on collapsed change */
  onToggleCollapsed?: (collapsed: boolean) => void
  /** Active navigation item key */
  activeKey?: string
  /** Callback when navigation item is selected */
  onSelect?: (key: string) => void
  /** Page content body */
  children: ReactNode
}

export function AppShell({
  logo,
  brandTitle = 'React Playground',
  brandSubtitle = 'Design System',
  sidebarItems,
  sidebarChildren,
  user,
  toolbarActions,
  collapsed,
  onToggleCollapsed,
  activeKey,
  onSelect,
  children,
}: AppShellProps) {
  const [topBarSlot, setTopBarSlotState] = useState<ReactNode>(null)

  const appBarContextValue = useMemo(
    () => ({
      setTopBarSlot: (content: ReactNode) => setTopBarSlotState(content),
      clearTopBarSlot: () => setTopBarSlotState(null),
    }),
    []
  )

  return (
    <SidebarProvider
      collapsed={collapsed}
      onToggleCollapsed={onToggleCollapsed}
      activeKey={activeKey}
      onSelect={onSelect}
    >
      <AppBarContext.Provider value={appBarContextValue}>
        <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
          {/* Sidebar Component */}
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

          {/* Main View Area */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            {/* Top Header Bar */}
            <AppBar
              position="static"
              color="inherit"
              elevation={0}
              sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
            >
              <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
                {/* Left — SidebarToggle always present */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <SidebarToggle />
                </Box>

                {/* Center/Fill — injected by PageLayout.TopBar */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                  {topBarSlot}
                </Box>

                {/* Right — global shell actions */}
                {toolbarActions && (
                  <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {toolbarActions}
                  </Box>
                )}
              </Toolbar>
            </AppBar>

            {/* Page Body Container */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                bgcolor: 'background.default',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </AppBarContext.Provider>
    </SidebarProvider>
  )
}
