import { useMemo } from 'react'
import { Container, Box, AppBar, Toolbar } from '@mui/material'

import { PageLayoutContext } from './PageLayoutContext'
import { PageHeader } from './PageHeader'
import { PageBreadcrumbs } from './PageBreadcrumbs'
import { PageContent } from './PageContent'
import { PageSection } from './PageSection'
import { PageGrid } from './PageGrid'
import { PageStickyFooter } from './PageStickyFooter'
import { PageSkeleton } from './PageSkeleton'
import { PageTopBar } from './PageTopBar'
import { PageTopBarSearch } from './PageTopBarSearch'
import { useAppBar } from '../appShell/AppBarContext'

import type { PageLayoutProps, PageLayoutContextValue } from './types'

export function PageLayout({
  maxWidth = 'lg',
  compact = false,
  loading = false,
  bgVariant = 'default',
  children,
}: PageLayoutProps) {
  const appBar = useAppBar()

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
      {/* AppBar — rendered by PageLayout when AppBarContext is available */}
      {appBar && (
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
            {/* Center/Fill — injected by <PageLayout.TopBar> */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
              {appBar.topBarSlot}
            </Box>

            {/* Right — global shell actions from AppShell.toolbarActions */}
            {appBar.headerRight && (
              <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {appBar.headerRight}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* Page Content */}
      <Box
        sx={{
          bgcolor: getBgColor(),
          minHeight: appBar ? 'calc(100% - 64px)' : '100%',
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
PageTopBar.Search = PageTopBarSearch
PageLayout.TopBar = PageTopBar
PageLayout.Header = PageHeader
PageLayout.Breadcrumbs = PageBreadcrumbs
PageLayout.Content = PageContent
PageLayout.Section = PageSection
PageLayout.Grid = PageGrid
PageLayout.StickyFooter = PageStickyFooter
PageLayout.Skeleton = PageSkeleton
