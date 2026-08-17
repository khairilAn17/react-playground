import type { ReactNode } from 'react'
import type { InputBaseProps, SxProps, Theme } from '@mui/material'

export type SearchVariant = 'outlined' | 'filled' | 'pill' | 'standard'
export type SearchSize = 'small' | 'medium' | 'large'

export interface SearchInputSlotSx {
  container?: SxProps<Theme>
  input?: SxProps<Theme>
  startIcon?: SxProps<Theme>
  endIcon?: SxProps<Theme>
  clearButton?: SxProps<Theme>
  shortcut?: SxProps<Theme>
  loadingIndicator?: SxProps<Theme>
}

export interface SearchInputProps
  extends Omit<InputBaseProps, 'size' | 'startAdornment' | 'endAdornment'> {
  variant?: SearchVariant
  bgcolor?: string
  borderColor?: string
  focusBorderColor?: string
  borderRadius?: number | string
  focusBoxShadow?: string
  disableFocusRing?: boolean
  value?: string
  defaultValue?: string
  loading?: boolean
  loadingIndicator?: ReactNode
  /** Convenience callback that receives the plain string value immediately on every keystroke. */
  onValueChange?: (value: string) => void
  /** Debounce delay in milliseconds before triggering onDebouncedChange. Defaults to 300ms if onDebouncedChange is supplied. */
  debounceMs?: number
  /** Callback triggered after user stops typing for debounceMs milliseconds, or immediately on Enter/Clear. */
  onDebouncedChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  clearable?: boolean
  size?: SearchSize
  startIcon?: ReactNode
  endIcon?: ReactNode
  shortcut?: string
  fullWidth?: boolean
  slotSx?: SearchInputSlotSx
}

