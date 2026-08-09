import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '../breadcrumbs'
import type { StepItem } from '../steps'

export type { BreadcrumbItem }
/** @deprecated Use StepItem from '../steps' directly */
export type PageStepItem = StepItem
export type PageMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

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
  /** Page-level CTA buttons (e.g. "+ Tambah Maker"). In the subtitle row when subtitle exists, otherwise title row. */
  actions?: ReactNode
  /** Global header controls always pinned to the title row (e.g. UserHeader — search, notifications, profile). */
  headerRight?: ReactNode
  /** Additional widget or side card (e.g. Prayer widget card) */
  extra?: ReactNode
  /** Optional breadcrumbs array */
  breadcrumbs?: BreadcrumbItem[]
  /** Status chip/badge displayed beside the title (e.g. <Chip label="Active" />) */
  status?: ReactNode
  /** Optional back button callback */
  onBack?: () => void
  /** Multi-step flow items array */
  steps?: (string | StepItem)[]
  /** Active zero-indexed step in multi-step wizard */
  currentStep?: number

  /** Children elements */
  children?: ReactNode
}
