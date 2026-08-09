import type { ReactNode } from 'react'
import { Box, Avatar, Typography, IconButton, Tooltip, Paper, LinearProgress } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSidebar } from './SidebarContext'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export interface UserInfo {
  name: string
  email?: string
  avatarUrl?: string
}

export interface SidebarFooterProps {
  user?: UserInfo
  children?: ReactNode
  widget?: ReactNode
  onLogout?: () => void
}

export function SidebarFooter({ user, children, widget, onLogout }: SidebarFooterProps) {
  const { collapsed } = useSidebar()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  if (children) {
    return (
      <Box
        sx={{
          p: collapsed ? 1.5 : 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {!collapsed && widget}
        {children}
      </Box>
    )
  }

  if (!user && !widget) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: collapsed ? 1.5 : 2,
      }}
    >
      {/* Optional widget slot (e.g. limit card) — only shown when expanded */}
      {!collapsed && widget}

      {/* User row */}
      {user && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            px: collapsed ? 0 : 0.5,
            py: 0.5,
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
            transition: 'background 0.15s',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
            <Avatar
              src={user.avatarUrl}
              sx={{
                width: 34,
                height: 34,
                fontSize: '0.8rem',
                fontWeight: 700,
                bgcolor: TEAL_PRIMARY,
                flexShrink: 0,
              }}
            >
              {!user.avatarUrl && getInitials(user.name)}
            </Avatar>

            {!collapsed && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontWeight: 700, lineHeight: 1.2, color: TEXT_MAIN, fontSize: '0.875rem' }}
                >
                  {user.name}
                </Typography>
                {user.email && (
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ display: 'block', color: TEXT_MUTED, fontSize: '0.72rem' }}
                  >
                    {user.email}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          {!collapsed && onLogout && (
            <Tooltip title="Log out">
              <IconButton
                size="small"
                onClick={onLogout}
                sx={{ color: TEXT_MUTED, '&:hover': { color: TEXT_MAIN } }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  )
}

/**
 * A ready-made "Limit Harian" widget card matching ByondSidebar's footer widget.
 * Pass as <SidebarFooter widget={<SidebarLimitWidget ... />} />
 */
export function SidebarLimitWidget({
  label = 'Limit Harian Tersedia',
  amount = 'Rp 180.000.000',
  progress = 75,
}: {
  label?: string
  amount?: string
  progress?: number
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: 'white',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      }}
    >
      <Typography variant="caption" sx={{ color: TEXT_MUTED, fontWeight: 600, display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: TEXT_MAIN, mt: 0.25, mb: 1 }}>
        {amount}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: '#E2E8F0',
          '& .MuiLinearProgress-bar': {
            bgcolor: TEAL_PRIMARY,
            borderRadius: 3,
          },
        }}
      />
    </Paper>
  )
}
