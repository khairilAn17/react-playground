import type { ReactNode } from 'react'
import { Box, Typography, IconButton, Tooltip, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Breadcrumbs } from '../breadcrumbs'
import { Steps } from '../steps'
import type { StepItem } from '../steps'
import type { BreadcrumbItem } from '../breadcrumbs'

export interface PageHeaderProps {
  title?: ReactNode
  subtitle?: ReactNode
  subtitleDescription?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  status?: ReactNode
  /**
   * Page-level CTA buttons (e.g. "+ Tambah Maker").
   * Rendered in the subtitle row when subtitle is present, or in the title row when there is no subtitle.
   */
  actions?: ReactNode
  /**
   * Global header controls pinned to the title row (e.g. UserHeader — search, notifications, profile).
   * Always rendered on the right of the title, regardless of subtitle presence.
   */
  headerRight?: ReactNode
  /** Contextual side widget rendered alongside the subtitle (e.g. Prayer time card). */
  extra?: ReactNode
  onBack?: () => void
  backTooltip?: string
  steps?: (string | StepItem)[]
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
  headerRight,
  extra,
  onBack,
  backTooltip = 'Go back',
  steps,
  currentStep,
  onStepClick,
}: PageHeaderProps) {
  if (!title && !subtitle && !actions && !headerRight && !breadcrumbs && !steps) return null

  const hasSubtitle = Boolean(subtitle)
  // actions go in subtitle row when subtitle exists, otherwise fall to title row
  const titleRowActions = !hasSubtitle && actions
  const subtitleRowActions = hasSubtitle && actions

  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {/* ── Title Row: [Back] [Title + Status] ......... [headerRight] ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          mb: subtitle || steps ? 1.5 : 0,
        }}
      >
        {/* Left: Back button + Title + Status + title-row actions (when no subtitle) */}
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

        {/* Right: headerRight (UserHeader) + title-row actions (when no subtitle) */}
        {(headerRight || titleRowActions) && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ flexShrink: 0, alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            {titleRowActions}
            {headerRight}
          </Stack>
        )}
      </Box>

      {/* ── Step Wizard ── */}
      {steps && <Steps steps={steps} currentStep={currentStep} onStepClick={onStepClick} />}

      {/* ── Subtitle Row: [Subtitle + Description] ......... [actions] [extra] ── */}
      {subtitle && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
            mt: title ? 0.5 : 0,
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

          {/* Page CTA actions + contextual extra widget */}
          {(subtitleRowActions || extra) && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ flexShrink: 0, alignItems: { xs: 'stretch', sm: 'center' } }}
            >
              {subtitleRowActions}
              {extra}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}
