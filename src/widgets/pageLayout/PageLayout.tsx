import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'
import { PageShell } from '../../components/pageShell'
import type { PageShellProps } from '../../components/pageShell'
import { StickyFooter } from '../../components/stickyFooter'
import { ConnectedUserHeader } from '../userHeader'

export interface PageLayoutProps extends PageShellProps {
  /**
   * Header right action slot.
   * Defaults to `<ConnectedUserHeader />` if omitted. Pass `null` to explicitly disable.
   * @default <ConnectedUserHeader />
   */
  headerRight?: ReactNode
  /** Vertical spacing gap between children in PageShell.Content. Default: 3 */
  contentGap?: number

  /** Sticky footer action buttons (e.g. Batal, Simpan) */
  footerActions?: ReactNode
  /** Sticky footer alignment option ('left' | 'center' | 'right' | 'between') */
  footerAlign?: 'left' | 'center' | 'right' | 'between'
  /** Custom Sx styling for StickyFooter container */
  footerSx?: SxProps<Theme>
}

/**
 * PageLayout Widget
 *
 * A composite Layer 2 widget combining `PageShell`, `ConnectedUserHeader` (auto-injected into `headerRight`),
 * auto-wrapped `PageShell.Content`, and optional `StickyFooter`.
 *
 * Layout:
 *   Title Row:    [Title + Status] ..... [headerRight = ConnectedUserHeader]
 *   Subtitle Row: [Subtitle + Description] ..... [actions = page CTA buttons]
 *
 * @example
 * <PageLayout
 *   title="Manajemen Akun"
 *   subtitle="Daftar Akun Maker"
 *   actions={<Button variant="contained">+ Tambah Maker</Button>}
 *   footerActions={<Button variant="contained">Simpan</Button>}
 * >
 *   <Table />
 * </PageLayout>
 */
export function PageLayout({
  headerRight = <ConnectedUserHeader />,
  contentGap = 3,
  footerActions,
  footerAlign = 'right',
  footerSx,
  children,
  ...pageShellProps
}: PageLayoutProps) {
  return (
    <PageShell headerRight={headerRight ?? undefined} {...pageShellProps}>
      <PageShell.Content gap={contentGap}>
        {children}
      </PageShell.Content>

      {footerActions && (
        <StickyFooter align={footerAlign} sx={footerSx}>
          {footerActions}
        </StickyFooter>
      )}
    </PageShell>
  )
}

// Compound sub-component attachments (passthrough from PageShell)
PageLayout.Header = PageShell.Header
PageLayout.Steps = PageShell.Steps
PageLayout.Section = PageShell.Section
PageLayout.Breadcrumbs = PageShell.Breadcrumbs
PageLayout.Content = PageShell.Content
PageLayout.StickyFooter = PageShell.StickyFooter
PageLayout.Skeleton = PageShell.Skeleton

