import { useMemo } from 'react'
import { Container, Box } from '@mui/material'

import { PageLayoutContext } from './PageLayoutContext'
import { PageHeader } from './PageHeader'
import { PageBreadcrumbs } from './PageBreadcrumbs'
import { PageContent } from './PageContent'
import { PageSection } from './PageSection'
import { PageCard } from './PageCard'
import { PageSteps } from './PageSteps'
import { PageStickyFooter } from './PageStickyFooter'
import { PageSkeleton } from './PageSkeleton'
import { PageTopBar } from './PageTopBar'
import { PageTopBarSearch } from './PageTopBarSearch'

import type { PageLayoutProps, PageLayoutContextValue } from './types'

export function PageLayout({
  maxWidth = 'lg',
  compact = false,
  loading = false,
  bgVariant = 'default',
  title,
  subtitle,
  subtitleDescription,
  actions,
  extra,
  breadcrumbs,
  status,
  onBack,
  steps,
  currentStep,
  children,
}: PageLayoutProps) {
  const contextValue: PageLayoutContextValue = useMemo(
    () => ({
      maxWidth,
      compact,
      loading,
    }),
    [maxWidth, compact, loading]
  )

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

  const hasShorthandHeader = title || subtitle || actions || extra || breadcrumbs || steps || onBack || status

  return (
    <PageLayoutContext.Provider value={contextValue}>
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
                  extra={extra}
                  breadcrumbs={breadcrumbs}
                  status={status}
                  onBack={onBack}
                  steps={steps}
                  currentStep={currentStep}
                />
              )}
              {children}
            </>
          )}
        </Container>
      </Box>
    </PageLayoutContext.Provider>
  )
}

// Compound sub-component attachments
PageTopBar.Search = PageTopBarSearch
PageLayout.TopBar = PageTopBar
PageLayout.Header = PageHeader
PageLayout.Steps = PageSteps
PageLayout.Card = PageCard
PageLayout.Section = PageSection
PageLayout.Breadcrumbs = PageBreadcrumbs
PageLayout.Content = PageContent
PageLayout.StickyFooter = PageStickyFooter
PageLayout.Skeleton = PageSkeleton
