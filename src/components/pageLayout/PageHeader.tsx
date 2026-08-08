import type { ReactNode } from 'react'
import { Box, Typography, IconButton, Tooltip, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PageBreadcrumbs } from './PageBreadcrumbs'
import type { BreadcrumbItem } from './types'

export interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  status?: ReactNode
  actions?: ReactNode
  onBack?: () => void
  backTooltip?: string
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  status,
  actions,
  onBack,
  backTooltip = 'Go back',
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {onBack && (
            <Tooltip title={backTooltip}>
              <IconButton onClick={onBack} size="small" sx={{ mt: 0.5 }}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              {typeof title === 'string' ? (
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {title}
                </Typography>
              ) : (
                title
              )}
              {status}
            </Box>

            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {actions && (
          <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0, alignItems: 'center' }}>
            {actions}
          </Stack>
        )}
      </Box>
    </Box>
  )
}
