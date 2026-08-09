import type { ReactNode } from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
  Box,
  styled,
} from '@mui/material'
import { useSidebar } from './SidebarContext'
import type { SidebarBadge } from './types'

export interface SidebarItemProps {
  itemKey?: string
  icon?: ReactNode
  label: ReactNode
  badge?: ReactNode | SidebarBadge
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  href?: string
  inset?: boolean
  level?: number
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'collapsed' && prop !== 'level',
})<{ active?: boolean; collapsed?: boolean; level?: number; component?: any; href?: string }>(({ active, collapsed, level = 0 }) => ({
  minHeight: 44,
  borderRadius: active ? 50 : 8,
  marginBottom: 4,
  paddingLeft: collapsed ? 12 : 14 + level * 12,
  paddingRight: 14,
  justifyContent: collapsed ? 'center' : 'initial',
  color: active ? '#FFFFFF' : '#1E293B',
  backgroundColor: active ? '#00A39D' : 'transparent',
  fontWeight: active ? 700 : 500,
  transition: 'all 0.15s ease-in-out',
  '&:hover': {
    backgroundColor: active ? '#00A39D' : 'rgba(0, 163, 157, 0.08)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: collapsed ? 0 : 32,
    marginRight: collapsed ? 0 : 8,
    justifyContent: 'center',
    color: active ? '#FFFFFF' : '#64748B',
  },
}))

export function SidebarItem({
  itemKey,
  icon,
  label,
  badge,
  active,
  disabled = false,
  onClick,
  href,
  level = 0,
}: SidebarItemProps) {
  const { collapsed, activeKey, onSelect } = useSidebar()

  const isSelected = active ?? (itemKey ? activeKey === itemKey : false)

  const handleClick = () => {
    if (disabled) return
    if (itemKey && onSelect) {
      onSelect(itemKey)
    }
    if (onClick) {
      onClick()
    }
  }

  const renderBadge = () => {
    if (!badge || collapsed) return null
    if (typeof badge === 'object' && badge !== null && 'content' in badge) {
      return (
        <Chip
          label={badge.content}
          size="small"
          sx={{
            bgcolor: '#F59E0B',
            color: 'white',
            height: 20,
            fontSize: '0.72rem',
            fontWeight: 800,
            borderRadius: 50,
            px: 0.5,
          }}
        />
      )
    }
    return typeof badge === 'string' || typeof badge === 'number' ? (
      <Chip
        label={badge}
        size="small"
        sx={{
          bgcolor: '#F59E0B',
          color: 'white',
          height: 20,
          fontSize: '0.72rem',
          fontWeight: 800,
          borderRadius: 50,
          px: 0.5,
        }}
      />
    ) : (
      badge
    )
  }

  const content = (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <StyledListItemButton
        active={isSelected}
        collapsed={collapsed}
        level={level}
        disabled={disabled}
        onClick={handleClick}
        component={href ? 'a' : 'div'}
        href={href}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {!collapsed && (
          <>
            <ListItemText
              primary={label}
              slotProps={{
                primary: {
                  variant: 'body2',
                  noWrap: true,
                  sx: { fontWeight: isSelected ? 600 : 500 },
                },
              }}
            />
            {renderBadge()}
          </>
        )}
      </StyledListItemButton>
    </ListItem>
  )

  if (collapsed) {
    return (
      <Tooltip title={label} placement="right" arrow disableHoverListener={!collapsed}>
        <Box>{content}</Box>
      </Tooltip>
    )
  }

  return content
}
