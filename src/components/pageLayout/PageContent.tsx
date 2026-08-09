import type { ReactNode } from 'react'
import { Box, type BoxProps } from '@mui/material'

export interface PageContentProps {
  children: ReactNode
  /** Vertical gap between sections (MUI spacing unit). Default: 3 */
  gap?: number,
  sx?: BoxProps['sx']
}

export function PageContent({ children, gap = 3, sx }: PageContentProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap, flexGrow: 1, ...sx }}>
      {children}
    </Box>
  )
}
