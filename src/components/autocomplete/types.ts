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
  /** Styles the outer `<FormControl>` wrapper. */
  root?: SxProps<Theme>
  formControl?: SxProps<Theme>
  /** Styles the floating `<InputLabel>` above the field. */
  inputLabel?: SxProps<Theme>
  /** Styles the inner `<TextField>` input element. */
  textField?: SxProps<Theme>
  /** Styles the dropdown `<Paper>` popover container. */
  paper?: SxProps<Theme>
  /** Styles the `<ul>` listbox inside the popover. */
  listbox?: SxProps<Theme>
  /** Styles the outer `<li>` row element of each dropdown option. */
  option?: SxProps<Theme>
  /**
   * Styles the primary label `<Typography>` inside each option row.
   * Note: `color` and `fontWeight` here override the selection-state defaults.
   */
  optionLabel?: SxProps<Theme>
  /** Styles the subtitle `<Typography>` inside each option row. */
  optionSubtitle?: SxProps<Theme>
  /** Styles the `<Checkbox>` inside each option row (only when `multiple` is true). */
  optionCheckbox?: SxProps<Theme>
  /** Styles the `<Avatar>` element inside each option row. */
  optionAvatar?: SxProps<Theme>
  /** Styles the icon wrapper `<Box>` inside each option row. */
  optionIcon?: SxProps<Theme>
  /** Styles the selected value chip(s) displayed in the input. */
  tag?: SxProps<Theme>
  /** Styles the `<Chip>` element itself for each selected value tag. */
  tagChip?: SxProps<Theme>
  /** Styles the `<Avatar>` inside each selected value chip (string avatar variant). */
  tagAvatar?: SxProps<Theme>
  /** Styles the icon wrapper `<Box>` inside each selected value chip. */
  tagIcon?: SxProps<Theme>
  /** Styles the label container `<Box>` inside each selected value chip (wraps avatar/icon + text). */
  tagLabel?: SxProps<Theme>
  /** Styles the `+N` overflow `<Chip>` that appears when `maxVisibleTags` is exceeded. */
  tagOverflow?: SxProps<Theme>
  /** Styles the `<FormHelperText>` below the field. */
  helperText?: SxProps<Theme>
  /** Styles the left shaded prefix block container (e.g. "Rp", "$"). */
  prefixBlock?: SxProps<Theme>
  /** Styles the right shaded suffix block container (e.g. ".com", "/bln"). */
  suffixBlock?: SxProps<Theme>
  /** Styles the start adornment wrapper. */
  startAdornment?: SxProps<Theme>
  /** Styles the end adornment wrapper. */
  endAdornment?: SxProps<Theme>
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
  /**
   * Shaded block element rendered flush against the left edge (e.g. `"Rp"`, `"$"`).
   * Spans the full height of the input with a light gray background and divider.
   */
  prefixBlock?: ReactNode
  /**
   * Shaded block element rendered flush against the right edge (e.g. `".com"`, `"/bln"`).
   */
  suffixBlock?: ReactNode
  /**
   * Inline start adornment icon or element (rendered before text/chips without solid block).
   */
  startAdornment?: ReactNode
  /**
   * Inline end adornment icon or element (rendered before the popup arrow).
   */
  endAdornment?: ReactNode
  /**
   * Automatic number/currency formatting for typed input.
   * - `'currency'` — formats live with thousand and decimal separators (e.g. `1.000.000`)
   * - `'number'` — formats numeric input
   * - `'custom'` — uses custom `formatter` / `parser`
   */
  format?: 'currency' | 'number' | 'custom'
  /** Character used to group thousands (default `.` for Indonesian locale). */
  thousandSeparator?: string
  /** Character used for decimal point (default `,` for Indonesian locale). */
  decimalSeparator?: string
  /** Maximum number of decimal digits allowed (default `2`). */
  decimalScale?: number
  /** Whether decimal entry is permitted (default `true`). */
  allowDecimals?: boolean
  /** Whether to format with fixed trailing decimal zeros (e.g. `,00`) on blur (default `false`). */
  fixedDecimals?: boolean
  /** Whether negative numbers are allowed (default `false`). */
  allowNegative?: boolean
  /** Custom formatter function when `format="custom"`. */
  formatter?: (value: string | number) => string
  /** Custom parser function when `format="custom"`. */
  parser?: (value: string) => string
}
