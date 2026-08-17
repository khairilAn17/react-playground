import type { Key, ReactNode, Ref } from 'react'
import type {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteValue,
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

export type AutocompleteRenderGetTagProps = (params: { index: number }) => {
  key?: Key
  [key: string]: unknown
}

export interface AutocompleteProps<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput' | 'size' | 'renderTags' | 'renderValue'
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
  /**
   * Modern value-first change handler (Radix / Mantine / Shadcn pattern).
   * Directly receives the updated value without requiring a throwaway event parameter.
   *
   * @example
   * ```tsx
   * // Single-select: value is `T | null`
   * <Autocomplete options={INFAQ_OPTIONS} value={value} onValueChange={setValue} />
   *
   * // Multi-select: value is `T[]`
   * <Autocomplete multiple options={INFAQ_OPTIONS} value={multi} onValueChange={setMulti} />
   * ```
   */
  onValueChange?: (
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => void
  /**
   * Custom tags renderer for multiple selection.
   */
  renderTags?: (value: T[], getTagProps: AutocompleteRenderGetTagProps) => ReactNode
  /**
   * Custom value renderer (MUI v9 renderValue).
   */
  renderValue?: (
    value: unknown,
    getItemProps: AutocompleteRenderGetTagProps,
    ownerState: unknown
  ) => ReactNode
  /**
   * Show a checkbox in each dropdown option row (only applies when `multiple` is true).
   * - `'right'` (default) — checkbox placed at the trailing end of each row (matches design screenshot)
   * - `'left'` — checkbox placed before the avatar/icon
   * - `false` — no checkbox shown
   */
  checkboxPlacement?: 'left' | 'right' | false
  /**
   * Maximum number of selected value chips to display in the input before collapsing
   * the rest into a "+N more" overflow chip. Defaults to `undefined` (show all).
   */
  maxVisibleTags?: number
  /**
   * Controls what is rendered inside each selected value chip.
   * - `'avatar+label'` (default) — shows the option's avatar / icon alongside the label
   * - `'label'` — shows only the label text
   */
  tagDisplay?: 'avatar+label' | 'label'
}
