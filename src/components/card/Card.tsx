import type { ReactNode } from 'react'
import { Card as MuiCard, CardContent, Box, Typography, Stack, Divider } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export interface CardProps {
  title?: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  divider?: boolean
  noPadding?: boolean
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

/**
 * Card
 *
 * A self-contained outlined card component with an optional header (title + subtitle + actions),
 * optional divider line, and padding-controlled content area.
 *
 * @example
 * <Card title="Limit Harian" subtitle="Rekening Utama" actions={<Button>Edit</Button>}>
 *   <LinearProgress value={75} />
 * </Card>
 */
export function Card({
  title,
  subtitle,
  actions,
  children,
  divider = false,
  noPadding = false,
  sx,
  contentSx,
}: CardProps) {
  return (
    <MuiCard
      variant="outlined"
      sx={{
        borderRadius: 4,
        borderColor: '#E8ECEF',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        bgcolor: '#FFFFFF',
        mb: 2.5,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {(title || actions || subtitle) && (
        <Box sx={{ p: 3, pb: divider ? 2 : 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              {typeof title === 'string' ? (
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
                  {title}
                </Typography>
              ) : (
                title
              )}
              {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {actions && <Stack direction="row" spacing={1}>{actions}</Stack>}
          </Box>
        </Box>
      )}

      {divider && <Divider sx={{ borderColor: '#F1F5F9' }} />}

      <CardContent sx={{ p: noPadding ? 0 : 3, '&:last-child': { pb: noPadding ? 0 : 3 }, ...contentSx }}>
        {children}
      </CardContent>
    </MuiCard>
  )
}
