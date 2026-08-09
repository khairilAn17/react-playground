import type { ReactNode } from 'react'
import { Box, Typography, IconButton, Tooltip, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { PageBreadcrumbs } from './PageBreadcrumbs'
import { PageSteps } from './PageSteps'
import type { BreadcrumbItem, PageStepItem } from './types'

export interface PageHeaderProps {
  title?: ReactNode
  subtitle?: ReactNode
  subtitleDescription?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  status?: ReactNode
  actions?: ReactNode
  extra?: ReactNode
  onBack?: () => void
  backTooltip?: string
  steps?: (string | PageStepItem)[]
  currentStep?: number
  onStepClick?: (index: number) => void
}

export function PageHeader({
  title,
  subtitle,
  subtitleDescription,
  breadcrumbs,
  status,
  actions,
  extra,
  onBack,
  backTooltip = 'Go back',
  steps,
  currentStep,
  onStepClick,
}: PageHeaderProps) {
  if (!title && !subtitle && !actions && !breadcrumbs && !steps) return null

  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} />}

      {/* Main Page Title Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          mb: subtitle || steps ? 2 : 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1, minWidth: 0 }}>
          {onBack && (
            <Tooltip title={backTooltip}>
              <IconButton onClick={onBack} size="small" sx={{ mt: 0.5 }}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {title && (
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                {typeof title === 'string' ? (
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B', letterSpacing: '-0.02em' }}>
                    {title}
                  </Typography>
                ) : (
                  title
                )}
                {status}
              </Box>
            </Box>
          )}
        </Box>

        {(actions || extra) && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ flexShrink: 0, alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            {actions}
            {extra}
          </Stack>
        )}
      </Box>

      {/* Multi-step progress wizard (if provided) */}
      {steps && <PageSteps steps={steps} currentStep={currentStep} onStepClick={onStepClick} />}

      {/* Subheader / Subtitle row with Description & Actions (e.g. "Daftar Akun Maker") */}
      {subtitle && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
            mt: title ? 1 : 0,
          }}
        >
          <Box>
            {typeof subtitle === 'string' ? (
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )}
            {subtitleDescription && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitleDescription}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
