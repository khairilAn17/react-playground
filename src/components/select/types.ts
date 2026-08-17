import type { ReactNode } from 'react'
import type { SxProps, Theme, SelectProps as MuiSelectProps, AvatarProps } from '@mui/material'
import type { SearchVariant } from '../search'

export interface SelectOptionSlotSx {
  root?: SxProps<Theme>
  avatar?: SxProps<Theme>
  leftTitle?: SxProps<Theme>
  leftSubtitle?: SxProps<Theme>
  rightTitle?: SxProps<Theme>
  rightSubtitle?: SxProps<Theme>
  checkmark?: SxProps<Theme>
  statusIcon?: SxProps<Theme>
  bulletList?: SxProps<Theme>
  bulletItem?: SxProps<Theme>
  bulletText?: SxProps<Theme>
  bulletItemSx?: SxProps<Theme>
  bulletTextSx?: SxProps<Theme>
}

export interface SelectOption {
  value: string | number
  label?: string

  /* ── 1. Group Header (e.g. "Proxy", "Semua Bank") ── */
  group?: string

  /* ── 2. Header (Title & Subtitle) ── */
  leftTitle?: ReactNode
  leftSubtitle?: ReactNode
  rightTitle?: ReactNode
  rightSubtitle?: ReactNode

  /* ── 3. Detailed Bullet List (for Transfer Methods, Features, Rules) ── */
  bullets?: (string | ReactNode)[]
  /**
   * If true (default), the closed select trigger only shows the header (compact).
   * In the dropdown menu, the full bullet list is always rendered.
   * @default true
   */
  compactSelected?: boolean

  /* ── 4. Avatar & Status Metadata ── */
  /**
   * Avatar text initials ("HB"), image URL ("https://...", "/logo.png"), ReactNode element (<Avatar src="..." />),
   * or MUI AvatarProps object ({ src: '/logo.png', variant: 'square' }).
   */
  avatar?: ReactNode | AvatarProps
  /**
   * Additional MUI AvatarProps passed directly to the Avatar component.
   */
  avatarProps?: AvatarProps
  avatarBg?: string
  statusColor?: string
  statusIcon?: ReactNode
  disabled?: boolean
}

export interface SelectSlotSx {
  formControl?: SxProps<Theme>
  inputLabel?: SxProps<Theme>
  select?: SxProps<Theme>
  menuPaper?: SxProps<Theme>
  menuItem?: SxProps<Theme>
  groupHeader?: SxProps<Theme>
  optionRow?: SelectOptionSlotSx
  listSubheader?: SxProps<Theme>
  searchField?: SxProps<Theme>
  helperText?: SxProps<Theme>
  loadingMore?: SxProps<Theme>
}

export interface SelectProps
  extends Omit<MuiSelectProps<string | number>, 'variant' | 'size'> {
  label?: string
  options?: SelectOption[]
  searchable?: boolean
  searchPlaceholder?: string
  searchVariant?: SearchVariant
  searchClearable?: boolean
  searchLoading?: boolean
  /**
   * Mode for option filtering when searchable=true:
   * - 'client' (default): filters the in-memory `options` array synchronously.
   * - 'server': leaves `options` as-is, delegating filtering to `onSearchChange`.
   */
  searchMode?: 'client' | 'server'
  /**
   * Emits the search string whenever user types in the search subheader.
   * Useful for triggering debounced API queries in server search mode.
   */
  onSearchChange?: (searchTerm: string) => void

  /* ── Infinite Scroll & Pagination Props ── */
  /**
   * Callback fired when user scrolls near the bottom of the dropdown menu.
   */
  onLoadMore?: () => void
  /**
   * If true, infinite scroll listener is active.
   */
  hasMore?: boolean
  /**
   * If true, displays a bottom loading indicator in the dropdown list.
   */
  loadingMore?: boolean
  /**
   * Custom text or ReactNode for the bottom loading indicator.
   * @default 'Memuat lebih banyak...'
   */
  loadingMoreText?: ReactNode
  /**
   * Pixel distance from the bottom to trigger `onLoadMore`.
   * @default 60
   */
  loadMoreThreshold?: number

  placeholder?: ReactNode
  showCheckmark?: boolean
  borderRadius?: number | string
  helperText?: ReactNode
  error?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium' | 'large'

  /**
   * Optional custom group resolver function.
   * By default, reads `option.group`.
   */
  groupBy?: (option: SelectOption) => string | undefined

  /* ── Direct Element Style Props ── */
  leftTitleSx?: SxProps<Theme>
  leftSubtitleSx?: SxProps<Theme>
  rightTitleSx?: SxProps<Theme>
  rightSubtitleSx?: SxProps<Theme>
  avatarSx?: SxProps<Theme>
  optionRowSx?: SxProps<Theme>
  checkmarkSx?: SxProps<Theme>
  statusIconSx?: SxProps<Theme>
  bulletListSx?: SxProps<Theme>
  bulletItemSx?: SxProps<Theme>
  bulletTextSx?: SxProps<Theme>
  groupHeaderSx?: SxProps<Theme>
  selectSx?: SxProps<Theme>
  menuPaperSx?: SxProps<Theme>
  menuItemSx?: SxProps<Theme>
  listSubheaderSx?: SxProps<Theme>
  searchFieldSx?: SxProps<Theme>
  formControlSx?: SxProps<Theme>
  inputLabelSx?: SxProps<Theme>
  helperTextSx?: SxProps<Theme>

  slotSx?: SelectSlotSx
  children?: ReactNode
}
