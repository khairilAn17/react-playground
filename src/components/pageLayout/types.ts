import type { ReactNode } from 'react'

export type PageMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface PageStepItem {
  key?: string
  label: string
  completed?: boolean
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
  
  /* ── Shorthand Props (Zero Boilerplate Mode) ── */
  /** Main page title (e.g. "Manajemen Akun", "Payroll", "Assalamualaikum, Shafa") */
  title?: ReactNode
  /** Page subtitle or subheader title (e.g. "Daftar Akun Maker") */
  subtitle?: ReactNode
  /** Detailed subheader description text */
  subtitleDescription?: ReactNode
  /** Right-hand page header action buttons (e.g. "+ Tambah Maker") */
  actions?: ReactNode
  /** Additional widget or side card (e.g. Prayer widget card) */
  extra?: ReactNode
  /** Optional breadcrumbs array */
  breadcrumbs?: BreadcrumbItem[]
  /** Optional back button callback */
  onBack?: () => void
  /** Multi-step flow items array */
  steps?: (string | PageStepItem)[]
  /** Active zero-indexed step in multi-step wizard */
  currentStep?: number

  /** Children elements */
  children?: ReactNode
}
