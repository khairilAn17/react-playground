import { Container, Box } from '@mui/material'

import { PageHeader } from './PageHeader'
import { Breadcrumbs } from '../breadcrumbs'
import { PageContent } from './PageContent'
import { PageSection } from './PageSection'
import { PageSteps } from './PageSteps'
import { PageStickyFooter } from './PageStickyFooter'
import { PageSkeleton } from './PageSkeleton'

import type { PageLayoutProps } from './types'

export function PageLayout({
  maxWidth = 'lg',
  compact = false,
  loading = false,
  bgVariant = 'default',
  title,
  subtitle,
  subtitleDescription,
  actions,
  headerRight,
  extra,
  breadcrumbs,
  status,
  onBack,
  steps,
  currentStep,
  headerSlotSx,
  children,
}: PageLayoutProps) {
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

  const hasShorthandHeader = title || subtitle || actions || headerRight || extra || breadcrumbs || steps || onBack || status || headerSlotSx

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
                subtitle={subtitle}
                subtitleDescription={subtitleDescription}
                actions={actions}
                headerRight={headerRight}
                extra={extra}
                breadcrumbs={breadcrumbs}
                status={status}
                onBack={onBack}
                steps={steps}
                currentStep={currentStep}
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
PageLayout.Header = PageHeader
PageLayout.Steps = PageSteps
PageLayout.Section = PageSection
PageLayout.Breadcrumbs = Breadcrumbs
PageLayout.Content = PageContent
PageLayout.StickyFooter = PageStickyFooter
PageLayout.Skeleton = PageSkeleton
