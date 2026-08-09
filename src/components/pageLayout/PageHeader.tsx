import type { ReactNode } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { Breadcrumbs } from '../breadcrumbs'
import { Steps } from '../steps'
import type { StepItem } from '../steps'
import type { BreadcrumbItem } from '../breadcrumbs'

/**
 * Granular sx overrides for each slot in PageHeader.
 * All default values follow BYOND BIZNIS design tokens and can be fully overridden.
 */
export interface PageHeaderSlotSx {
  /** Root header wrapper Box (default: `{ mb: 3 }`) */
  root?: SxProps<Theme>
  /** Title row flex container Box (default: `{ mb: 1.5 | 0, gap: 2, ... }`) */
  titleRow?: SxProps<Theme>
  /** Title Typography (default: `{ fontWeight: 800, color: '#1E293B', letterSpacing: '-0.02em' }`) */
  title?: SxProps<Theme>
  /** Subtitle row flex container Box (default: `{ mt: 0.5 | 0, gap: 1.5, ... }`) */
  subtitleRow?: SxProps<Theme>
  /** Subtitle Typography (default: `{ fontWeight: 800, color: '#1E293B' }`) */
  subtitle?: SxProps<Theme>
  /** Subtitle description Typography (default: `{ mt: 0.25 }`) */
  subtitleDescription?: SxProps<Theme>
}

export interface PageHeaderProps {
  title?: ReactNode
  subtitle?: ReactNode
  subtitleDescription?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  status?: ReactNode
  /**
   * Page-level CTA buttons (e.g. "+ Tambah Maker").
   * In the subtitle row when subtitle is present; otherwise in the title row.
   */
  actions?: ReactNode
  /**
   * Global header controls always pinned to the title row (e.g. UserHeader — search, notifications, profile).
   */
  headerRight?: ReactNode
  /** Contextual side widget rendered alongside the subtitle (e.g. Prayer time card). */
  extra?: ReactNode
  onBack?: () => void
  backTooltip?: string
  steps?: (string | StepItem)[]
  currentStep?: number
  onStepClick?: (index: number) => void
  /**
   * Granular sx overrides for every slot inside PageHeader.
   * Use this to customize spacing, colors, and typography without losing defaults.
   * @example
   * slotSx={{ root: { mb: 2 }, title: { fontSize: '1.5rem' }, subtitleRow: { mt: 1 } }}
   */
  slotSx?: PageHeaderSlotSx
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
  steps,
  currentStep,
  onStepClick,
  slotSx = {},
}: PageHeaderProps) {
  if (!title && !subtitle && !actions && !headerRight && !breadcrumbs && !steps) return null

  const hasSubtitle = Boolean(subtitle)
  const titleRowActions = !hasSubtitle && actions
  const subtitleRowActions = hasSubtitle && actions

  return (
    <Box sx={{ mb: 3, ...slotSx.root }}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {/* ── Title Row: [Back] [Title + Status] ......... [titleRowActions] [headerRight] ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          mb: hasSubtitle || steps ? 1.5 : 0,
          ...slotSx.titleRow,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1, minWidth: 0 }}>
          {title && (
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                {typeof title === 'string' ? (
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: '#1E293B',
                      letterSpacing: '-0.02em',
                      ...slotSx.title,
                    }}
                  >
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

        {/* headerRight (UserHeader) + title-row actions when no subtitle */}
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

      {/* ── Subtitle Row: [Subtitle + Description] ......... [subtitleRowActions] [extra] ── */}
      {subtitle && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
            mt: title ? 0.5 : 0,
            ...slotSx.subtitleRow,
          }}
        >
          <Box>
            {typeof subtitle === 'string' ? (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#1E293B',
                  ...slotSx.subtitle,
                }}
              >
                {subtitle}
              </Typography>
            ) : (
              subtitle
            )}
            {subtitleDescription && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.25,
                  ...slotSx.subtitleDescription,
                }}
              >
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
