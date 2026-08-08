import type { ReactNode } from 'react'
import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSidebar } from './SidebarContext'

export interface UserInfo {
  name: string
  email?: string
  avatarUrl?: string
}

export interface SidebarFooterProps {
  user?: UserInfo
  children?: ReactNode
  onLogout?: () => void
}

export function SidebarFooter({ user, children, onLogout }: SidebarFooterProps) {
  const { collapsed } = useSidebar()

  if (children) {
    return (
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: collapsed ? 1.5 : 2,
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'initial',
        }}
      >
        {children}
      </Box>
    )
  }

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        p: collapsed ? 1.5 : 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        minHeight: 64,
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
        <Avatar
          src={user.avatarUrl}
          sx={{
            width: 36,
            height: 36,
            fontSize: '0.875rem',
            fontWeight: 600,
            bgcolor: 'primary.main',
          }}
        >
          {!user.avatarUrl && getInitials(user.name)}
        </Avatar>

        {!collapsed && (
          <Box sx={{ overflow: 'hidden' }}>
            <Typography
              variant="body2"
              noWrap
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              {user.name}
            </Typography>
            {user.email && (
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ display: 'block' }}
              >
                {user.email}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {!collapsed && onLogout && (
        <Tooltip title="Log out">
          <IconButton size="small" onClick={onLogout} color="default">
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
