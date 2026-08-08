import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppBar } from '../appShell/AppBarContext'

export interface PageTopBarProps {
  children: ReactNode
}

/**
 * PageLayout.TopBar
 *
 * Injects arbitrary children into the AppShell AppBar slot via context.
 * Place it anywhere inside <PageLayout> — it renders nothing in-place
 * but projects its children into the AppBar between <SidebarToggle> and
 * the global toolbarActions.
 *
 * Usage:
 * ```tsx
 * <PageLayout maxWidth="lg">
 *   <PageLayout.TopBar>
 *     <Typography variant="subtitle1" fontWeight={700}>Page Title</Typography>
 *     <Chip label="Status" color="primary" size="small" />
 *   </PageLayout.TopBar>
 *   <PageLayout.Header ... />
 *   <PageLayout.Content>...</PageLayout.Content>
 * </PageLayout>
 * ```
 */
export function PageTopBar({ children }: PageTopBarProps) {
  const appBar = useAppBar()

  useEffect(() => {
    if (!appBar) return
    appBar.setTopBarSlot(children)
    return () => {
      appBar.clearTopBarSlot()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  // Renders nothing in the page content flow
  return null
}
