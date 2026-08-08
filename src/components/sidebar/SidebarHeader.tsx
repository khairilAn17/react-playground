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
        px: collapsed ? 1.5 : 2,
        py: 2,
        minHeight: 64,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          overflow: 'hidden',
        }}
      >
        {logo && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
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
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textOverflow: 'ellipsis',
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ display: 'block' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {!collapsed && action && <Box sx={{ flexShrink: 0, ml: 1 }}>{action}</Box>}

      {showToggle && !collapsed && (
        <Tooltip title="Collapse sidebar" placement="right">
          <IconButton onClick={handleToggle} size="small" sx={{ ml: 0.5 }}>
            <MenuOpenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {showToggle && collapsed && (
        <Tooltip title="Expand sidebar" placement="right">
          <IconButton onClick={handleToggle} size="small">
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
