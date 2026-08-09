import { useState } from 'react'
import type { MouseEvent } from 'react'
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Skeleton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import type { UserProfileData } from './types'

const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export interface UserProfilePillProps {
  user?: UserProfileData
  loading?: boolean
  onLogout?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
}

const DEFAULT_USER: UserProfileData = {
  name: 'Shafa Riani',
  role: 'Maker',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  email: 'shafa@byondbiznis.co.id',
}

export function UserProfilePill({
  user = DEFAULT_USER,
  loading = false,
  onLogout,
  onProfileClick,
  onSettingsClick,
}: UserProfilePillProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (loading) return
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 0.75,
          borderRadius: 50,
          border: '1px solid #E2E8F0',
          bgcolor: 'white',
        }}
      >
        <Skeleton variant="circular" width={32} height={32} />
        <Box sx={{ pr: 1 }}>
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={40} height={12} />
        </Box>
      </Paper>
    )
  }

  return (
    <>
      <Paper
        elevation={0}
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 0.75,
          borderRadius: 50,
          border: '1px solid #E2E8F0',
          bgcolor: 'white',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: '#F8FAFC',
            borderColor: '#CBD5E1',
          },
        }}
      >
        <Avatar
          src={user.avatarUrl}
          alt={user.name}
          sx={{ width: 32, height: 32, fontWeight: 700, fontSize: '0.8rem', bgcolor: '#00A39D' }}
        >
          {user.name.substring(0, 2).toUpperCase()}
        </Avatar>

        <Box sx={{ pr: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2, color: TEXT_MAIN }}>
            {user.name}
          </Typography>
          {user.role && (
            <Typography variant="caption" sx={{ color: TEXT_MUTED, fontSize: '0.72rem', display: 'block', lineHeight: 1 }}>
              {user.role}
            </Typography>
          )}
        </Box>

        <MenuIcon sx={{ color: TEXT_MAIN, fontSize: 18, ml: 0.5 }} />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              width: 220,
              borderRadius: 3,
              mt: 1,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
            {user.name}
          </Typography>
          {user.email && (
            <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block' }}>
              {user.email}
            </Typography>
          )}
        </Box>
        <Divider />

        <MenuItem
          onClick={() => {
            handleClose()
            onProfileClick?.()
          }}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profil Akun" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose()
            onSettingsClick?.()
          }}
        >
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pengaturan" />
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            handleClose()
            onLogout?.()
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Keluar" />
        </MenuItem>
      </Menu>
    </>
  )
}
