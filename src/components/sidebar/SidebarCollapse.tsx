import { useState, type ReactNode } from 'react'
import {
  Collapse,
  Tooltip,
  Box,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useSidebar } from './SidebarContext'
import type { SidebarBadge } from './types'

const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'
const ORANGE_ACCENT = '#F59E0B'

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

export function SidebarCollapse({
  itemKey,
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
        <Box
          sx={{
            bgcolor: ORANGE_ACCENT,
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 800,
            px: 1,
            py: 0.25,
            borderRadius: 50,
            lineHeight: 1.2,
          }}
        >
          {(badge as SidebarBadge).content}
        </Box>
      )
    }

    if (typeof badge === 'string' || typeof badge === 'number') {
      return (
        <Box
          sx={{
            bgcolor: ORANGE_ACCENT,
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 800,
            px: 1,
            py: 0.25,
            borderRadius: 50,
            lineHeight: 1.2,
          }}
        >
          {badge}
        </Box>
      )
    }

    return badge as ReactNode
  }

  const contentId = itemKey ? `sidebar-collapse-${itemKey}` : undefined

  const buttonContent = (
    <Box
      onClick={handleToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: collapsed ? 1.5 : 2,
        py: 1.25,
        mx: 0.5,
        mb: 0.5,
        borderRadius: 2,
        bgcolor: 'transparent',
        color: TEXT_MAIN,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all 0.15s ease',
        '&:hover': {
          bgcolor: 'rgba(0,163,157,0.08)',
        },
        pl: collapsed ? 1.5 : 2 + level * 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1.5, minWidth: 0 }}>
        {icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: TEXT_MUTED,
              '& svg': { fontSize: '1.1rem' },
            }}
          >
            {icon}
          </Box>
        )}

        {!collapsed && (
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
              color: TEXT_MAIN,
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        )}
      </Box>

      {!collapsed && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {renderBadge()}
          {open
            ? <ExpandMoreIcon sx={{ fontSize: 16, color: TEXT_MUTED }} />
            : <ChevronRightIcon sx={{ fontSize: 16, color: TEXT_MUTED }} />
          }
        </Box>
      )}
    </Box>
  )

  return (
    <Box>
      {collapsed ? (
        <Tooltip title={label} placement="right" arrow>
          <Box>{buttonContent}</Box>
        </Tooltip>
      ) : (
        buttonContent
      )}

      <Collapse id={contentId} in={open && !collapsed} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}
