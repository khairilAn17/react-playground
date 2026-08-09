import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  LinearProgress,
} from '@mui/material'

import GridViewIcon from '@mui/icons-material/GridView'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'

const TEAL_PRIMARY = '#00A39D'
const ORANGE_ACCENT = '#F59E0B'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export interface ByondSidebarProps {
  activeKey?: string
  onSelect?: (key: string) => void
  onSwitchWorkspace?: () => void
}

export function ByondSidebar({ activeKey = 'beranda', onSelect, onSwitchWorkspace }: ByondSidebarProps) {
  const [currentKey, setCurrentKey] = useState(activeKey)

  const handleItemClick = (key: string) => {
    setCurrentKey(key)
    if (onSelect) onSelect(key)
  }

  const menuItems = [
    {
      key: 'beranda',
      label: 'Beranda',
      icon: <GridViewIcon fontSize="small" />,
    },
    {
      key: 'tugas-saya',
      label: 'Tugas Saya',
      icon: <AssignmentOutlinedIcon fontSize="small" />,
      badge: '10',
    },
    {
      key: 'info-rekening',
      label: 'Info Rekening',
      icon: <MenuBookOutlinedIcon fontSize="small" />,
      hasChevron: true,
    },
    {
      key: 'transaksi',
      label: 'Transaksi',
      icon: <SyncAltIcon fontSize="small" />,
      hasChevron: true,
    },
    {
      key: 'layanan-kami',
      label: 'Layanan Kami',
      icon: <AppsOutlinedIcon fontSize="small" />,
      hasChevron: true,
    },
    {
      key: 'bank-emas',
      label: 'Bank Emas',
      icon: <SavingsOutlinedIcon fontSize="small" />,
    },
    {
      key: 'manajemen-akun',
      label: 'Manajemen Akun',
      icon: <ManageAccountsOutlinedIcon fontSize="small" />,
    },
  ]

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#F4F5F7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2.5,
        borderRight: '1px solid #E2E8F0',
        flexShrink: 0,
      }}
    >
      {/* Top Header & Brand Logo */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 1 }}>
          {/* Custom BYOND Wave SVG Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 4C6 4 14 2 18 10C22 18 14 28 6 28C2 28 0 24 0 20C0 12 6 4 6 4Z"
                fill="#EAA827"
              />
              <path
                d="M12 4C18 4 28 10 28 20C28 26 22 28 16 28C10 28 8 24 10 18C12 12 12 4 12 4Z"
                fill="#00A99D"
              />
            </svg>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 900,
                color: '#EAA827',
                letterSpacing: '0.05em',
                lineHeight: 1,
                fontSize: '1.05rem',
              }}
            >
              BYOND
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: '#00A99D',
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                display: 'block',
                mt: 0.2,
              }}
            >
              BIZNIS{' '}
              <Typography component="span" sx={{ color: '#00A99D', fontSize: '0.65rem', fontWeight: 600 }}>
                by BSI
              </Typography>
            </Typography>
          </Box>
        </Box>

        {/* Navigation List */}
        <Stack spacing={1}>
          {menuItems.map((item) => {
            const isActive = currentKey === item.key

            return (
              <Box
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.25,
                  borderRadius: isActive ? 50 : 2,
                  bgcolor: isActive ? TEAL_PRIMARY : 'transparent',
                  color: isActive ? 'white' : TEXT_MAIN,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isActive ? TEAL_PRIMARY : 'rgba(0,163,157,0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: isActive ? 'white' : TEXT_MUTED,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.875rem',
                      color: isActive ? 'white' : TEXT_MAIN,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>

                {item.badge && (
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
                    {item.badge}
                  </Box>
                )}

                {item.hasChevron && !isActive && (
                  <ChevronRightIcon sx={{ fontSize: 16, color: TEXT_MUTED }} />
                )}
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Bottom Footer Widgets */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Limit Harian Card */}
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
            Limit Harian Tersedia
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: TEXT_MAIN, mt: 0.25, mb: 1 }}>
            Rp180.000.000
          </Typography>
          <LinearProgress
            variant="determinate"
            value={75}
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

        {/* Logout / Switch Workspace Action */}
        <Box
          onClick={onSwitchWorkspace}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            cursor: 'pointer',
            color: TEXT_MAIN,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
          }}
        >
          <LogoutIcon fontSize="small" sx={{ color: TEXT_MAIN }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Logout
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
