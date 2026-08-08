import type { ReactNode } from 'react'
import { Typography, Divider, Box } from '@mui/material'
import { useSidebar } from './SidebarContext'

export interface SidebarSectionProps {
  title?: string
  children: ReactNode
  divider?: boolean
}

export function SidebarSection({ title, children, divider = false }: SidebarSectionProps) {
  const { collapsed } = useSidebar()

  return (
    <Box sx={{ mb: 1.5 }}>
      {divider && <Divider sx={{ my: 1.5 }} />}
      {title && (
        <Box sx={{ px: 2, py: 0.75, minHeight: collapsed ? 12 : 'auto' }}>
          {!collapsed ? (
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                fontSize: '0.6875rem',
              }}
            >
              {title}
            </Typography>
          ) : (
            <Divider sx={{ my: 0.5 }} />
          )}
        </Box>
      )}
      {children}
    </Box>
  )
}
