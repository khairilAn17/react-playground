import type { ReactNode } from 'react'
import { Box } from '@mui/material'

export interface PageContentProps {
  children: ReactNode
}

export function PageContent({ children }: PageContentProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1 }}>
      {children}
    </Box>
  )
}
