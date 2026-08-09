import { useState } from 'react'
import type { MouseEvent } from 'react'
import {
  Box,
  IconButton,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Badge,
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import type { NotificationItem } from './types'

const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export interface NotificationMenuProps {
  unreadCount?: number
  notifications?: NotificationItem[]
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Persetujuan Payroll',
    message: 'Transaksi payroll Gaji Agustus membutuhkan persetujuan Anda.',
    time: '5 mnt yang lalu',
    read: false,
  },
  {
    id: '2',
    title: 'Transfer Berhasil',
    message: 'Transfer Rp 50.000.000 ke PT Jaya Abadi telah diproses.',
    time: '1 jam yang lalu',
    read: false,
  },
  {
    id: '3',
    title: 'Laporan Bulanan',
    message: 'Laporan transaksi bulan Juli siap diunduh.',
    time: 'Yesterday',
    read: true,
  },
]

export function NotificationMenu({
  unreadCount = 2,
  notifications = DEFAULT_NOTIFICATIONS,
}: NotificationMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleClick}
          aria-label="Open notifications"
          sx={{
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #E2E8F0',
            '&:hover': { bgcolor: '#F8FAFC' },
          }}
        >
          <Badge
            color="warning"
            variant={unreadCount > 0 ? 'dot' : 'standard'}
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <NotificationsNoneIcon sx={{ color: TEXT_MAIN, fontSize: 20 }} />
          </Badge>
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 340,
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid #E2E8F0',
              mt: 1,
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
            Notifikasi
          </Typography>
          <Button size="small" sx={{ fontSize: '0.72rem', textTransform: 'none', color: '#00A39D' }}>
            Tandai Dibaca
          </Button>
        </Box>
        <Divider />

        <List disablePadding sx={{ maxHeight: 320, overflowY: 'auto' }}>
          {notifications.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                py: 1.25,
                px: 2,
                bgcolor: item.read ? 'transparent' : 'rgba(0,163,157,0.04)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ fontWeight: item.read ? 600 : 800, fontSize: '0.825rem', color: TEXT_MAIN }}>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mt: 0.25, lineHeight: 1.3 }}>
                      {item.message}
                    </Typography>
                    {item.time && (
                      <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.68rem', mt: 0.5, display: 'block' }}>
                        {item.time}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  )
}
