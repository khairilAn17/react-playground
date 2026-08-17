import type { ReactNode } from 'react'
import type { InputBaseProps, SxProps, Theme } from '@mui/material'

export type SearchVariant = 'outlined' | 'filled' | 'pill' | 'standard'
export type SearchSize = 'small' | 'medium' | 'large'

export interface SearchInputSlotSx {
  container?: SxProps<Theme>
  input?: SxProps<Theme>
  startIcon?: SxProps<Theme>
  clearButton?: SxProps<Theme>
  shortcut?: SxProps<Theme>
  loadingIndicator?: SxProps<Theme>
}

export interface SearchInputProps
  extends Omit<InputBaseProps, 'onChange' | 'size' | 'value' | 'defaultValue'> {
  /** Visual variant matching design tokens: 'outlined' | 'filled' | 'pill' | 'standard' */
  variant?: SearchVariant
  /** Controlled input value */
  value?: string
  /** Uncontrolled initial default value */
  defaultValue?: string
  /** Whether the search is currently loading / fetching results */
  loading?: boolean
  /** Custom loading indicator element (defaults to CircularProgress) */
  loadingIndicator?: ReactNode
  /** Change callback with string value and native event */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  /** Triggered on pressing Enter */
  onSearch?: (value: string) => void
  /** Triggered when (X) clear button is clicked */
  onClear?: () => void
  /** Show (X) clear button when input has text (default: true) */
  clearable?: boolean
  /** Size variant: 'small' | 'medium' | 'large' */
  size?: SearchSize
  /** Custom leading search icon */
  startIcon?: ReactNode
  /** Custom trailing icon / action */
  endIcon?: ReactNode
  /** Optional keyboard shortcut hint text (e.g. "⌘K" or "↵") */
  shortcut?: string
  /** Full width container (default: true) */
  fullWidth?: boolean
  /** Custom Sx for the container root */
  containerSx?: SxProps<Theme>
  /** Granular slot Sx overrides */
  slotSx?: SearchInputSlotSx
}
