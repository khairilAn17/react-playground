import { useMemo } from 'react'
import { Container, Box } from '@mui/material'

import { PageLayoutContext } from './PageLayoutContext'
import { PageHeader } from './PageHeader'
import { PageBreadcrumbs } from './PageBreadcrumbs'
import { PageContent } from './PageContent'
import { PageSection } from './PageSection'
import { PageGrid } from './PageGrid'
import { PageStickyFooter } from './PageStickyFooter'
import { PageSkeleton } from './PageSkeleton'
import { PageTopBar } from './PageTopBar'

import type { PageLayoutProps, PageLayoutContextValue } from './types'

export function PageLayout({
  maxWidth = 'lg',
  compact = false,
  loading = false,
  bgVariant = 'default',
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
        return 'background.paper'
      case 'transparent':
        return 'transparent'
      case 'default':
      default:
        return 'background.default'
    }
  }

  return (
    <PageLayoutContext.Provider value={contextValue}>
      <Box
        sx={{
          bgcolor: getBgColor(),
          minHeight: '100%',
          py: compact ? 2 : { xs: 2.5, sm: 4 },
          px: compact ? 1 : 0,
        }}
      >
        <Container maxWidth={getContainerMaxWidth()} sx={{ px: { xs: 2, sm: 3 } }}>
          {loading ? <PageSkeleton /> : children}
        </Container>
      </Box>
    </PageLayoutContext.Provider>
  )
}

// Compound sub-component attachments
PageLayout.TopBar = PageTopBar
PageLayout.Header = PageHeader
PageLayout.Breadcrumbs = PageBreadcrumbs
PageLayout.Content = PageContent
PageLayout.Section = PageSection
PageLayout.Grid = PageGrid
PageLayout.StickyFooter = PageStickyFooter
PageLayout.Skeleton = PageSkeleton
