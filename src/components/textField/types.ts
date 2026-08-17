import type { ReactNode } from 'react'
import type { OutlinedInputProps, SxProps, Theme } from '@mui/material'

export type TextFieldSize = 'small' | 'medium' | 'large'

export interface TextFieldSlotSx {
  /** Styles the outer `<FormControl>` wrapper. */
  root?: SxProps<Theme>
  /** Alias for root — styles the outer `<FormControl>` wrapper. */
  formControl?: SxProps<Theme>
  /** Styles the `<InputLabel>` above the field. */
  inputLabel?: SxProps<Theme>
  /** Styles the `<OutlinedInput>` / `<InputBase>` container. */
  input?: SxProps<Theme>
  /** Styles the left shaded prefix block container (e.g. "Rp", "$"). */
  prefixBlock?: SxProps<Theme>
  /** Styles the right shaded suffix block container (e.g. ".com", "/bln"). */
  suffixBlock?: SxProps<Theme>
  /** Styles the start adornment wrapper. */
  startAdornment?: SxProps<Theme>
  /** Styles the end adornment wrapper. */
  endAdornment?: SxProps<Theme>
  /** Styles the character count typography / wrapper. */
  characterCount?: SxProps<Theme>
  /** Styles the clear icon button. */
  clearButton?: SxProps<Theme>
  /** Styles the password visibility toggle button. */
  passwordToggleButton?: SxProps<Theme>
  /** Styles the `<FormHelperText>` below the field. */
  helperText?: SxProps<Theme>
}

export interface TextFieldProps
  extends Omit<
    OutlinedInputProps,
    'size' | 'onChange' | 'value' | 'defaultValue' | 'startAdornment' | 'endAdornment'
  > {
  /** Form field name. */
  name?: string
  /** Controlled input value. */
  value?: string | number
  /** Default value for uncontrolled usage. */
  defaultValue?: string | number
  /** Standard change event handler. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /** Simplified callback passing only the updated string value. */
  onValueChange?: (value: string) => void
  /** Callback fired when the clear button is clicked. */
  onClear?: () => void
  /** Floating or static label displayed above the field. */
  label?: ReactNode
  /** Placeholder text. */
  placeholder?: string
  /** Left shaded prefix block (e.g. "Rp", "$"). */
  prefixBlock?: ReactNode
  /** Right shaded suffix block (e.g. ".com", "/bln"). */
  suffixBlock?: ReactNode
  /** Inline leading icon or adornment element. */
  startAdornment?: ReactNode
  /** Inline trailing icon or adornment element. */
  endAdornment?: ReactNode
  /** Display a clear 'X' icon button when the field has text. @default false */
  clearable?: boolean
  /** Show eye toggle icon button when `type="password"`. @default false */
  showPasswordToggle?: boolean
  /** Show character count indicator (e.g. "15/75"). @default false */
  showCount?: boolean
  /** Maximum number of characters allowed. */
  maxLength?: number
  /** Minimum numerical value when type="number". */
  min?: number
  /** Maximum numerical value when type="number". */
  max?: number
  /** Stepper interval when type="number" (e.g. 1, 0.01, 1000). */
  step?: number | 'any'
  /** Hide native browser spin buttons for type="number". @default true */
  hideSpinButtons?: boolean
  /** Allow mouse wheel scrolling to increment/decrement numbers when focused. @default false */
  allowScrollWheel?: boolean
  /** Whether the field is in an error state. @default false */
  error?: boolean
  /** Whether the field is disabled. @default false */
  disabled?: boolean
  /** Whether the field is read-only. @default false */
  readOnly?: boolean
  /** Whether the field is required (displays asterisk in label). @default false */
  required?: boolean
  /** Whether the field expands to full container width. @default true */
  fullWidth?: boolean
  /** Size token for the input height and typography. @default 'medium' */
  size?: TextFieldSize
  /** Border radius for the field container. @default '12px' */
  borderRadius?: number | string
  /** Helper text or error message rendered below the field. */
  helperText?: ReactNode
  /** Fine-grained sx slot styling overrides. */
  slotSx?: TextFieldSlotSx
  /** Ref passed directly to the underlying `<input>` or `<textarea>` element. */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>
}
