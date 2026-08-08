import { useState, type ReactNode } from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Tooltip,
  Chip,
  Box,
  styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useSidebar } from './SidebarContext'
import type { SidebarBadge } from './types'

export interface SidebarCollapseProps {
  itemKey?: string
  icon?: ReactNode
  label: ReactNode
  badge?: ReactNode | SidebarBadge
  defaultOpen?: boolean
  disabled?: boolean
  children: ReactNode
  level?: number
}

const StyledCollapseButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'collapsed' && prop !== 'level',
})<{ collapsed?: boolean; level?: number }>(({ theme, collapsed, level = 0 }) => ({
  minHeight: 44,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  paddingLeft: collapsed ? theme.spacing(1.5) : theme.spacing(1.5 + level * 1.5),
  paddingRight: theme.spacing(1.5),
  justifyContent: collapsed ? 'center' : 'initial',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: collapsed ? 0 : 36,
    marginRight: collapsed ? 0 : theme.spacing(1),
    justifyContent: 'center',
    color: theme.palette.action.active,
  },
}))

export function SidebarCollapse({
  icon,
  label,
  badge,
  defaultOpen = false,
  disabled = false,
  children,
  level = 0,
}: SidebarCollapseProps) {
  const { collapsed } = useSidebar()
  const [open, setOpen] = useState(defaultOpen)

  const handleToggle = () => {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  const renderBadge = () => {
    if (!badge || collapsed) return null
    if (typeof badge === 'object' && badge !== null && 'content' in badge) {
      return (
        <Chip
          label={badge.content}
          size="small"
          color={badge.color ?? 'primary'}
          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, mr: 0.5 }}
        />
      )
    }
    return typeof badge === 'string' || typeof badge === 'number' ? (
      <Chip
        label={badge}
        size="small"
        color="primary"
        sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, mr: 0.5 }}
      />
    ) : (
      badge
    )
  }

  const buttonContent = (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <StyledCollapseButton
        collapsed={collapsed}
        level={level}
        disabled={disabled}
        onClick={handleToggle}
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
                  sx: { fontWeight: 500 },
                },
              }}
            />
            {renderBadge()}
            {open ? <ExpandMoreIcon fontSize="small" color="action" /> : <ChevronRightIcon fontSize="small" color="action" />}
          </>
        )}
      </StyledCollapseButton>
    </ListItem>
  )

  return (
    <Box>
      {collapsed ? (
        <Tooltip title={label} placement="right" arrow disableHoverListener={!collapsed}>
          <Box>{buttonContent}</Box>
        </Tooltip>
      ) : (
        buttonContent
      )}

      <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </Box>
  )
}
