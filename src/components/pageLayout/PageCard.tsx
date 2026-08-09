import type { ReactNode } from 'react'
import { Card, CardContent, Box, Typography, Stack, Divider } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * PageCard
 *
 * A self-contained outlined card with an optional header (title + subtitle + actions),
 * optional divider, and a content area.
 *
 * **When to use `PageCard` vs `PageLayout.Section`:**
 * - Use `PageCard` when you need a standalone, reusable card outside a PageLayout flow,
 *   or when building ad-hoc cards inside grids / custom layouts.
 * - Use `PageLayout.Section` (variant="card") when composing cards inside a
 *   `<PageLayout.Content>` flow — it handles spacing, padding, and consistent
 *   vertical rhythm automatically.
 *
 * @example
 * // Standalone card (e.g. inside a PageLayout.Grid):
 * <PageLayout.Card title="Limit Harian" subtitle="Rekening Utama">
 *   <LinearProgress value={75} />
 * </PageLayout.Card>
 *
 * // Section card inside content flow — prefer PageLayout.Section:
 * <PageLayout.Section variant="card" title="..." description="...">
 *   <Table>...</Table>
 * </PageLayout.Section>
 */
export interface PageCardProps {
  title?: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  divider?: boolean
  noPadding?: boolean
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

export function PageCard({
  title,
  subtitle,
  actions,
  children,
  divider = false,
  noPadding = false,
  sx,
  contentSx,
}: PageCardProps) {
  return (
    <Card
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
    </Card>
  )
}
