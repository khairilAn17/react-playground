import { useState, useMemo, type ReactNode } from 'react'
import {
  Box,
  Drawer,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material'

import { SidebarContext } from './SidebarContext'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'
import { SidebarSection } from './SidebarSection'
import { SidebarItem } from './SidebarItem'
import { SidebarCollapse } from './SidebarCollapse'
import { SidebarFooter } from './SidebarFooter'
import { SidebarToggle } from './SidebarToggle'

import type {
  SidebarItemConfig,
  SidebarVariant,
  SidebarContextValue,
} from './types'

export interface SidebarProps {
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
  /** Sidebar layout variant */
  variant?: SidebarVariant
  /** Expanded width in pixels (default: 260) */
  width?: number
  /** Collapsed width in pixels (default: 68) */
  collapsedWidth?: number
  /** Data-driven items config (optional alternative to compound children) */
  items?: SidebarItemConfig[]
  /** Children elements when using compound components */
  children?: ReactNode
}

const StyledSidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'collapsed' && prop !== 'collapsedWidth',
})<{ width: number; collapsed: boolean; collapsedWidth: number }>(
  ({ theme, width, collapsed, collapsedWidth }) => ({
    width: collapsed ? collapsedWidth : width,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  })
)

/** Helper to render data-driven items config recursively */
function renderDataDrivenItems(items: SidebarItemConfig[], level = 0): ReactNode {
  return items.map((item, index) => {
    if (item.kind === 'header') {
      return <SidebarSection key={`header-${index}-${item.title}`} title={item.title}>{null}</SidebarSection>
    }
    if (item.kind === 'divider') {
      return <SidebarSection key={`divider-${index}`} divider>{null}</SidebarSection>
    }
    if (item.kind === 'item') {
      return (
        <SidebarItem
          key={item.key}
          itemKey={item.key}
          label={item.label}
          icon={item.icon}
          badge={item.badge}
          disabled={item.disabled}
          href={item.href}
          onClick={item.onClick}
          level={level}
        />
      )
    }
    if (item.kind === 'group') {
      return (
        <SidebarCollapse
          key={item.key}
          itemKey={item.key}
          label={item.label}
          icon={item.icon}
          badge={item.badge}
          disabled={item.disabled}
          defaultOpen={item.defaultOpen}
          level={level}
        >
          {renderDataDrivenItems(item.children, level + 1)}
        </SidebarCollapse>
      )
    }
    return null
  })
}

export function Sidebar({
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onToggleCollapsed,
  activeKey,
  onSelect,
  width = 260,
  collapsedWidth = 68,
  items,
  children,
}: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isCollapsed = controlledCollapsed ?? uncontrolledCollapsed

  const handleSetCollapsed = (action: boolean | ((prev: boolean) => boolean)) => {
    const nextState = typeof action === 'function' ? action(isCollapsed) : action
    if (controlledCollapsed === undefined) {
      setUncontrolledCollapsed(nextState)
    }
    if (onToggleCollapsed) {
      onToggleCollapsed(nextState)
    }
  }

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
    [isMobile, isCollapsed, mobileOpen, activeKey, onSelect, width, collapsedWidth]
  )

  const sidebarBody = (
    <StyledSidebarContainer
      width={width}
      collapsed={isMobile ? false : isCollapsed}
      collapsedWidth={collapsedWidth}
    >
      {children
        ? children
        : items && (
            <SidebarNav>
              {renderDataDrivenItems(items)}
            </SidebarNav>
          )}
    </StyledSidebarContainer>
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          slotProps={{
            paper: {
              sx: { width, borderRight: 'none' },
            },
          }}
        >
          {sidebarBody}
        </Drawer>
      ) : (
        sidebarBody
      )}
    </SidebarContext.Provider>
  )
}

// Compound sub-component attachments
Sidebar.Header = SidebarHeader
Sidebar.Nav = SidebarNav
Sidebar.Section = SidebarSection
Sidebar.Item = SidebarItem
Sidebar.Collapse = SidebarCollapse
Sidebar.Footer = SidebarFooter
Sidebar.Toggle = SidebarToggle
