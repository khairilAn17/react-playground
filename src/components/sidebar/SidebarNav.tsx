import type { ReactNode } from 'react'
import { List, Box } from '@mui/material'
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
        py: 1.5,
        px: collapsed ? 1 : 1.5,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '3px',
        },
      }}
    >
      <List component="nav" disablePadding>
        {children}
      </List>
    </Box>
  )
}
