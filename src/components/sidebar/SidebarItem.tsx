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
})<{ active?: boolean; collapsed?: boolean; level?: number; component?: any; href?: string }>(({ theme, active, collapsed, level = 0 }) => ({
  minHeight: 44,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  paddingLeft: collapsed ? theme.spacing(1.5) : theme.spacing(1.5 + level * 1.5),
  paddingRight: theme.spacing(1.5),
  justifyContent: collapsed ? 'center' : 'initial',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  fontWeight: active ? 600 : 400,
  transition: theme.transitions.create(['background-color', 'color', 'padding'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: active
      ? theme.palette.action.selected
      : theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: collapsed ? 0 : 36,
    marginRight: collapsed ? 0 : theme.spacing(1),
    justifyContent: 'center',
    color: active ? theme.palette.primary.main : theme.palette.action.active,
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
          color={badge.color ?? 'primary'}
          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600 }}
        />
      )
    }
    return typeof badge === 'string' || typeof badge === 'number' ? (
      <Chip
        label={badge}
        size="small"
        color="primary"
        sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600 }}
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
