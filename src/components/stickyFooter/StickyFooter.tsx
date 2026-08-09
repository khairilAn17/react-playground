import type { ReactNode } from 'react'
import { Paper, Stack, Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export interface StickyFooterProps {
  children: ReactNode
  /** Horizontal alignment of action buttons */
  align?: 'left' | 'center' | 'right' | 'between'
  /** Custom sx override for the Paper container */
  sx?: SxProps<Theme>
}

/**
 * StickyFooter
 *
 * A sticky bottom action bar for forms, dialogs, drawers and page layouts.
 * Supports left, center, right, and space-between alignment of action buttons.
 *
 * @example
 * <StickyFooter align="between">
 *   <Button variant="outlined">Cancel</Button>
 *   <Button variant="contained">Submit</Button>
 * </StickyFooter>
 */
export function StickyFooter({ children, align = 'right', sx }: StickyFooterProps) {
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
        ...sx,
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
        {align === 'between' ? (
          children
        ) : (
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {children}
          </Stack>
        )}
      </Box>
    </Paper>
  )
}
