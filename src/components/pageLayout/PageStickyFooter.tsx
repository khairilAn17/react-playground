import type { ReactNode } from 'react'
import { Paper, Stack, Box } from '@mui/material'

export interface PageStickyFooterProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right' | 'between'
}

export function PageStickyFooter({ children, align = 'right' }: PageStickyFooterProps) {
  const getJustifyContent = () => {
    switch (align) {
      case 'left':
        return 'flex-start'
      case 'center':
        return 'center'
      case 'between':
        return 'space-between'
      case 'right':
      default:
        return 'flex-end'
    }
  }

  return (
    <Paper
      elevation={3}
      variant="outlined"
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        mt: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        borderColor: 'divider',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: getJustifyContent(),
          gap: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          {children}
        </Stack>
      </Box>
    </Paper>
  )
}
