import type { ReactNode } from 'react'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import { useSidebar } from './SidebarContext'

export interface SidebarHeaderProps {
  logo?: ReactNode
  title?: string
  subtitle?: string
  action?: ReactNode
  showToggle?: boolean
}

export function SidebarHeader({
  logo,
  title,
  subtitle,
  action,
  showToggle = true,
}: SidebarHeaderProps) {
  const { collapsed, setCollapsed } = useSidebar()

  const handleToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        px: collapsed ? 1.5 : 2.5,
        py: 2,
        mb: 1.5,
        minHeight: 64,
      }}
    >
      {/* Logo + Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
        {logo && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {logo}
          </Box>
        )}

        {!collapsed && (title || subtitle) && (
          <Box sx={{ overflow: 'hidden' }}>
            {title && (
              <Typography
                variant="subtitle1"
                noWrap
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: '#1E293B',
                  fontSize: '0.95rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                noWrap
                sx={{
                  display: 'block',
                  color: '#64748B',
                  fontWeight: 500,
                  fontSize: '0.72rem',
                  letterSpacing: '0.01em',
                  mt: 0.15,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {!collapsed && action && <Box sx={{ flexShrink: 0, ml: 1 }}>{action}</Box>}

      {showToggle && (
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
          <IconButton
            onClick={handleToggle}
            size="small"
            sx={{
              ml: collapsed ? 0 : 0.5,
              color: '#64748B',
              borderRadius: 1.5,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
            }}
          >
            {collapsed ? <MenuIcon fontSize="small" /> : <MenuOpenIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
