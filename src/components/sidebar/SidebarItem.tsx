import type { ReactNode } from 'react'
import {
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { useSidebar } from './SidebarContext'
import type { SidebarBadge } from './types'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'
const ORANGE_ACCENT = '#F59E0B'

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

    // { content: '10' } shape from data-driven config
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

    // String / number badge → orange pill
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

    // ReactNode badge (e.g. Chip)
    return badge as ReactNode
  }

  const content = (
    <Box
      component={href ? 'a' : 'div'}
      href={href}
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: collapsed ? 1.5 : 2,
        py: 1.25,
        mx: 0.5,
        mb: 0.5,
        borderRadius: isSelected ? 50 : 2,
        bgcolor: isSelected ? TEAL_PRIMARY : 'transparent',
        color: isSelected ? 'white' : TEXT_MAIN,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        '&:hover': {
          bgcolor: isSelected ? TEAL_PRIMARY : 'rgba(0,163,157,0.08)',
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
              color: isSelected ? 'white' : TEXT_MUTED,
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
              fontWeight: isSelected ? 700 : 500,
              fontSize: '0.875rem',
              color: isSelected ? 'white' : TEXT_MAIN,
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        )}
      </Box>

      {!collapsed && renderBadge()}
    </Box>
  )

  if (collapsed) {
    return (
      <Tooltip title={label} placement="right" arrow>
        <Box>{content}</Box>
      </Tooltip>
    )
  }

  return content
}
