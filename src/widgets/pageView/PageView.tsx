import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'
import { PageLayout } from '../../components/pageLayout'
import type { PageLayoutProps } from '../../components/pageLayout'
import { StickyFooter } from '../../components/stickyFooter'
import { ConnectedUserHeader } from '../userHeader'

export interface PageViewProps extends PageLayoutProps {
  /**
   * Header right action slot.
   * Defaults to `<ConnectedUserHeader />` if omitted. Pass `null` to explicitly disable.
   * @default <ConnectedUserHeader />
   */
  headerRight?: ReactNode
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
 * A composite Layer 2 widget combining `PageLayout`, `ConnectedUserHeader` (auto-injected into `headerRight`),
 * auto-wrapped `PageLayout.Content`, and optional `StickyFooter`.
 *
 * Layout:
 *   Title Row:    [Title + Status] ..... [headerRight = ConnectedUserHeader]
 *   Subtitle Row: [Subtitle + Description] ..... [actions = page CTA buttons]
 *
 * @example
 * <PageView
 *   title="Manajemen Akun"
 *   subtitle="Daftar Akun Maker"
 *   actions={<Button variant="contained">+ Tambah Maker</Button>}
 *   footerActions={<Button variant="contained">Simpan</Button>}
 * >
 *   <Table />
 * </PageView>
 */
export function PageView({
  headerRight = <ConnectedUserHeader />,
  contentGap = 3,
  footerActions,
  footerAlign = 'right',
  footerSx,
  children,
  ...pageLayoutProps
}: PageViewProps) {
  return (
    <PageLayout headerRight={headerRight ?? undefined} {...pageLayoutProps}>
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
