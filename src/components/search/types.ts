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
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  clearable?: boolean
  size?: SearchSize
  startIcon?: ReactNode
  endIcon?: ReactNode
  shortcut?: string
  fullWidth?: boolean
  containerSx?: SxProps<Theme>
  slotSx?: SearchInputSlotSx
}
