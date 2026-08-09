import { Container, Box } from '@mui/material'

import { PageHeader } from './PageHeader'
import { Breadcrumbs } from '../breadcrumbs'
import { PageContent } from './PageContent'
import { PageSection } from './PageSection'
import { PageSteps } from './PageSteps'
import { PageStickyFooter } from './PageStickyFooter'
import { PageSkeleton } from './PageSkeleton'

import type { PageShellProps } from './types'

export function PageShell({
  maxWidth = 'lg',
  compact = false,
  loading = false,
  bgVariant = 'default',
  title,
  titleDescription,
  subtitle,
  subtitleDescription,
  actions,
  headerRight,
  extra,
  breadcrumbs,
  status,
  steps,
  currentStep,
  onStepClick,
  headerSlotSx,
  children,
}: PageShellProps) {
  const getContainerMaxWidth = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false => {
    if (maxWidth === 'full') return false
    return maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }

  const getBgColor = () => {
    switch (bgVariant) {
      case 'paper':
        return '#FFFFFF'
      case 'transparent':
        return 'transparent'
      case 'default':
      default:
        return '#F4F5F7'
    }
  }

  const hasShorthandHeader = title || titleDescription || subtitle || actions || headerRight || extra || breadcrumbs || steps || status || headerSlotSx

  return (
    <Box
      sx={{
        bgcolor: getBgColor(),
        minHeight: '100%',
        py: compact ? 2 : { xs: 2.5, sm: 3.5 },
        px: compact ? 1 : 0,
      }}
    >
      <Container maxWidth={getContainerMaxWidth()} sx={{ px: { xs: 2, sm: 3 } }}>
        {loading ? (
          <PageSkeleton />
        ) : (
          <>
            {hasShorthandHeader && (
              <PageHeader
                title={title}
                titleDescription={titleDescription}
                subtitle={subtitle}
                subtitleDescription={subtitleDescription}
                actions={actions}
                headerRight={headerRight}
                extra={extra}
                breadcrumbs={breadcrumbs}
                status={status}
                steps={steps}
                currentStep={currentStep}
                onStepClick={onStepClick}
                slotSx={headerSlotSx}
              />
            )}
            {children}
          </>
        )}
      </Container>
    </Box>
  )
}

// Compound sub-component attachments
PageShell.Header = PageHeader
PageShell.Steps = PageSteps
PageShell.Section = PageSection
PageShell.Breadcrumbs = Breadcrumbs
PageShell.Content = PageContent
PageShell.StickyFooter = PageStickyFooter
PageShell.Skeleton = PageSkeleton
