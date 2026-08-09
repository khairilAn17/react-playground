import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'
import { PageLayout } from '../../components/pageLayout'
import type { PageLayoutProps } from '../../components/pageLayout'
import { StickyFooter } from '../../components/stickyFooter'
import { ConnectedUserHeader } from '../userHeader'

export interface PageViewProps extends Omit<PageLayoutProps, 'actions'> {
  /** Right-hand page header action buttons. Defaults to `<ConnectedUserHeader />` if not passed */
  actions?: ReactNode
  /** Set to true to disable automatic `<ConnectedUserHeader />` rendering */
  disableUserHeader?: boolean

  /** Vertical spacing gap between children in PageLayout.Content. Default: 3 */
  contentGap?: number

  /** Sticky footer action buttons (e.g. Batal, Simpan) */
  footerActions?: ReactNode
  /** Sticky footer alignment option ('left' | 'center' | 'right' | 'between') */
  footerAlign?: 'left' | 'center' | 'right' | 'between'
  /** Custom Sx styling for StickyFooter container */
  footerSx?: SxProps<Theme>
}

/**
 * PageView Widget
 *
 * A composite Layer 2 widget that combines `PageLayout`, self-hydrating `ConnectedUserHeader`,
 * auto-wrapped `PageLayout.Content`, and `StickyFooter` into a single zero-boilerplate component.
 *
 * @example
 * <PageView
 *   title="Manajemen Akun"
 *   subtitle="Daftar Akun Maker"
 *   breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Maker' }]}
 *   footerActions={<Button variant="contained">Simpan</Button>}
 * >
 *   <Table />
 * </PageView>
 */
export function PageView({
  actions,
  disableUserHeader = false,
  contentGap = 3,
  footerActions,
  footerAlign = 'right',
  footerSx,
  children,
  ...pageLayoutProps
}: PageViewProps) {
  const resolvedActions = actions ?? (disableUserHeader ? undefined : <ConnectedUserHeader />)

  return (
    <PageLayout actions={resolvedActions} {...pageLayoutProps}>
      <PageLayout.Content gap={contentGap}>
        {children}
      </PageLayout.Content>

      {footerActions && (
        <StickyFooter align={footerAlign} sx={footerSx}>
          {footerActions}
        </StickyFooter>
      )}
    </PageLayout>
  )
}
