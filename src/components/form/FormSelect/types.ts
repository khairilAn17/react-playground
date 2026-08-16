import type { ReactNode } from 'react'
import type { SxProps, Theme, SelectProps } from '@mui/material'
import type { FieldValues, Path, Control } from 'react-hook-form'

export interface SelectOptionSlotSx {
  root?: SxProps<Theme>
  avatar?: SxProps<Theme>
  leftTitle?: SxProps<Theme>
  leftSubtitle?: SxProps<Theme>
  rightTitle?: SxProps<Theme>
  rightSubtitle?: SxProps<Theme>
  checkmark?: SxProps<Theme>
  statusIcon?: SxProps<Theme>
}

export interface SelectOption {
  value: string | number
  label?: string
  leftTitle?: ReactNode
  leftSubtitle?: ReactNode
  rightTitle?: ReactNode
  rightSubtitle?: ReactNode
  avatar?: ReactNode
  avatarBg?: string
  statusColor?: string
  statusIcon?: ReactNode
  disabled?: boolean
}

export interface FormSelectSlotSx {
  formControl?: SxProps<Theme>
  inputLabel?: SxProps<Theme>
  select?: SxProps<Theme>
  menuPaper?: SxProps<Theme>
  menuItem?: SxProps<Theme>
  optionRow?: SelectOptionSlotSx
  listSubheader?: SxProps<Theme>
  searchField?: SxProps<Theme>
  helperText?: SxProps<Theme>
}

export interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps<string | number>, 'name' | 'value' | 'variant' | 'size'> {
  name: Path<T>
  label?: string
  options?: SelectOption[]
  searchable?: boolean
  searchPlaceholder?: string
  placeholder?: ReactNode
  showCheckmark?: boolean
  borderRadius?: number | string
  helperText?: ReactNode
  control?: Control<T>
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium' | 'large'
  leftTitleSx?: SxProps<Theme>
  leftSubtitleSx?: SxProps<Theme>
  rightTitleSx?: SxProps<Theme>
  rightSubtitleSx?: SxProps<Theme>
  avatarSx?: SxProps<Theme>
  optionRowSx?: SxProps<Theme>
  checkmarkSx?: SxProps<Theme>
  statusIconSx?: SxProps<Theme>
  selectSx?: SxProps<Theme>
  menuPaperSx?: SxProps<Theme>
  menuItemSx?: SxProps<Theme>
  listSubheaderSx?: SxProps<Theme>
  searchFieldSx?: SxProps<Theme>
  formControlSx?: SxProps<Theme>
  inputLabelSx?: SxProps<Theme>
  helperTextSx?: SxProps<Theme>
  slotSx?: FormSelectSlotSx
  children?: ReactNode
}
