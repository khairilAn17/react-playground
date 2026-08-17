import type { ReactNode, Ref } from 'react'
import type {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderGetTagProps,
  SxProps,
  Theme,
  TextFieldProps,
} from '@mui/material'

export interface AutocompleteOption {
  value: string | number
  label: string
  subtitle?: ReactNode
  avatar?: ReactNode
  avatarBg?: string
  icon?: ReactNode
  group?: string
  disabled?: boolean
  [key: string]: unknown
}

export interface AutocompleteSlotSx {
  root?: SxProps<Theme>
  formControl?: SxProps<Theme>
  inputLabel?: SxProps<Theme>
  textField?: SxProps<Theme>
  paper?: SxProps<Theme>
  listbox?: SxProps<Theme>
  option?: SxProps<Theme>
  tag?: SxProps<Theme>
  helperText?: SxProps<Theme>
}

export interface AutocompleteProps<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput' | 'size' | 'renderTags'
  > {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  helperText?: ReactNode
  error?: boolean
  size?: 'small' | 'medium' | 'large'
  borderRadius?: number | string
  inputRef?: Ref<HTMLInputElement>
  textFieldProps?: Partial<Omit<TextFieldProps, 'error' | 'helperText' | 'label' | 'placeholder' | 'size'>>
  slotSx?: AutocompleteSlotSx
  renderTags?: (value: T[], getTagProps: AutocompleteRenderGetTagProps) => ReactNode
}
