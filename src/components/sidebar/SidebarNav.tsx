import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import { useSidebar } from './SidebarContext'

export interface SidebarNavProps {
  children: ReactNode
}

export function SidebarNav({ children }: SidebarNavProps) {
  const { collapsed } = useSidebar()

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        py: 1,
        px: collapsed ? 0.5 : 0,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
      }}
    >
      {children}
    </Box>
  )
}
