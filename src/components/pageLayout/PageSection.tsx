import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, Divider, Typography, Box, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

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
  divider = true,
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
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
    <Card variant="outlined" sx={{ mb: 2, ...sx }}>
      {(title || actions || description) && (
        <>
          <CardHeader
            title={title}
            subheader={description}
            action={actions}
            titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
            subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
          />
          {divider && <Divider />}
        </>
      )}
      <CardContent sx={contentSx}>{children}</CardContent>
    </Card>
  )
}
