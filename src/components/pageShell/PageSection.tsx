import type { ReactNode } from 'react'
import { Box, Typography, Stack, Divider } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { Card } from '../card'

export interface PageSectionProps {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children: ReactNode
  variant?: 'card' | 'plain'
  divider?: boolean
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

export function PageSection({
  title,
  description,
  actions,
  children,
  variant = 'card',
  divider = false,
  sx,
  contentSx,
}: PageSectionProps) {
  if (variant === 'plain') {
    return (
      <Box sx={{ mb: 3, ...sx }}>
        {(title || actions) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1.5,
            }}
          >
            <Box>
              {typeof title === 'string' ? (
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
                  {title}
                </Typography>
              ) : (
                title
              )}
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
            {actions && <Stack direction="row" spacing={1}>{actions}</Stack>}
          </Box>
        )}
        {divider && <Divider sx={{ mb: 2 }} />}
        {children}
      </Box>
    )
  }

  return (
    <Card
      title={title}
      subtitle={description}
      actions={actions}
      divider={divider}
      sx={sx}
      contentSx={contentSx}
    >
      {children}
    </Card>
  )
}
