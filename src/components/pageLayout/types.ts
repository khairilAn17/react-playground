import type { ReactNode } from 'react'

export type PageMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface PageLayoutContextValue {
  maxWidth: PageMaxWidth
  compact?: boolean
  loading?: boolean
}

export interface PageLayoutProps {
  /** Responsive container width preset: 'xs' (440), 'sm' (640), 'md' (900), 'lg' (1200), 'xl' (1536), 'full' (100%) */
  maxWidth?: PageMaxWidth
  /** Padding density override */
  compact?: boolean
  /** Full page loading skeleton state */
  loading?: boolean
  /** Custom background color or preset ('default' | 'paper' | 'transparent') */
  bgVariant?: 'default' | 'paper' | 'transparent'
  /** Children elements when using compound components */
  children?: ReactNode
}
