import type { ReactNode } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'

import { Sidebar, SidebarProvider, SidebarToggle } from '../sidebar'
import type { SidebarItemConfig } from '../sidebar'

export interface AppShellProps {
  /** Logo slot inside sidebar header */
  logo?: ReactNode
  /** Application brand title */
  brandTitle?: string
  /** Application subtitle */
  brandSubtitle?: string
  /** Active page title shown in top app bar */
  pageTitle?: string
  /** Data-driven sidebar items configuration */
  sidebarItems?: SidebarItemConfig[]
  /** Custom sidebar compound children */
  sidebarChildren?: ReactNode
  /** User profile info for sidebar footer */
  user?: { name: string; email?: string; avatarUrl?: string }
  /** Right-hand toolbar actions in top app bar */
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
  pageTitle,
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
  return (
    <SidebarProvider
      collapsed={collapsed}
      onToggleCollapsed={onToggleCollapsed}
      activeKey={activeKey}
      onSelect={onSelect}
    >
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
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SidebarToggle />
                {pageTitle && (
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    {pageTitle}
                  </Typography>
                )}
              </Box>

              {toolbarActions && <Box>{toolbarActions}</Box>}
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
    </SidebarProvider>
  )
}
