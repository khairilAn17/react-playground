import type { ReactNode } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { useSidebar } from './SidebarContext'

export interface SidebarSectionProps {
  title?: string
  children: ReactNode
  divider?: boolean
}

export function SidebarSection({ title, children, divider = false }: SidebarSectionProps) {
  const { collapsed } = useSidebar()

  return (
    <Box sx={{ mb: 0.5 }}>
      {divider && <Divider sx={{ my: 1.5, mx: 2, borderColor: '#E2E8F0' }} />}

      {title && !collapsed && (
        <Box sx={{ px: 2.5, pt: 1, pb: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: '#94A3B8',
              fontSize: '0.65rem',
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {title && collapsed && <Box sx={{ my: 1 }}><Divider sx={{ mx: 1.5, borderColor: '#E2E8F0' }} /></Box>}

      {children}
    </Box>
  )
}
