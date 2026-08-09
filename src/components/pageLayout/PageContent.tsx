import type { ReactNode } from 'react'
import { Box } from '@mui/material'

export interface PageContentProps {
  children: ReactNode
  /** Vertical gap between sections (MUI spacing unit). Default: 3 */
  gap?: number
}

export function PageContent({ children, gap = 3 }: PageContentProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap, flexGrow: 1 }}>
      {children}
    </Box>
  )
}
