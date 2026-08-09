import type { ReactNode } from 'react'
import { Card as MuiCard, CardContent, Box, Typography, Stack, Divider } from '@mui/material'
import type { CardProps as MuiCardProps, SxProps, Theme } from '@mui/material'

export interface CardProps extends Omit<MuiCardProps, 'title'> {
  /** Optional title rendered in the card header */
  title?: ReactNode
  /** Optional subtitle text or element */
  subtitle?: ReactNode
  /** Optional actions slot on the right side of the card header */
  actions?: ReactNode
  /** Main card content */
  children: ReactNode
  /** Render a subtle divider line below the header */
  divider?: boolean
  /** Remove padding from the CardContent area */
  noPadding?: boolean
  /** Custom Sx styling for the CardContent area */
  contentSx?: SxProps<Theme>
  /** Custom Sx styling for the card header container */
  headerSx?: SxProps<Theme>
  /** Custom Sx styling for the title typography */
  titleSx?: SxProps<Theme>
  /** Custom Sx styling for the subtitle typography */
  subtitleSx?: SxProps<Theme>
}

/**
 * Card
 *
 * An enhanced, customizable Material UI Card component with built-in header,
 * subtitle, action slots, divider line, and flexible padding options.
 * Extends standard MUI `CardProps` for complete prop customization.
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
  variant = 'outlined',
  sx,
  contentSx,
  headerSx,
  titleSx,
  subtitleSx,
  ...otherProps
}: CardProps) {
  return (
    <MuiCard
      variant={variant}
      sx={{
        borderRadius: 4,
        borderColor: '#E8ECEF',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        bgcolor: '#FFFFFF',
        mb: 2.5,
        overflow: 'hidden',
        ...sx,
      }}
      {...otherProps}
    >
      {(title || actions || subtitle) && (
        <Box sx={{ p: 3, pb: divider ? 2 : 1, ...headerSx }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              {typeof title === 'string' ? (
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', ...titleSx }}>
                  {title}
                </Typography>
              ) : (
                title
              )}
              {subtitle && (
                typeof subtitle === 'string' ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, ...subtitleSx }}>
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                )
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
