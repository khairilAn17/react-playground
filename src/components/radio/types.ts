import type { ReactNode } from 'react'
import type {
  RadioProps as MuiRadioProps,
  RadioGroupProps as MuiRadioGroupProps,
  SxProps,
  Theme,
} from '@mui/material'

export type RadioValue = string | number | boolean

export type RadioSize = 'small' | 'medium' | 'large'

export type RadioVariant = 'default' | 'card'

export type RadioLayout = 'row' | 'column' | 'grid'

export type RadioPlacement = 'left' | 'right' | 'none'

export interface RadioOption<V = RadioValue> {
  /** The value associated with this radio option. */
  value: V
  /** Primary label text or ReactNode. */
  label: ReactNode
  /** Optional secondary subtitle or description below the label. */
  description?: ReactNode
  /** Optional leading icon or avatar. */
  icon?: ReactNode
  /** Optional badge or chip placed next to the label (e.g. "Rekomendasi"). */
  badge?: ReactNode
  /** Optional right-aligned content (e.g. price `Rp 50.000 / bln`). */
  endContent?: ReactNode
  /** Whether this specific option is disabled. */
  disabled?: boolean
}

export interface RadioSlotSx {
  /** Styles the outer `<FormControl>` wrapper. */
  root?: SxProps<Theme>
  /** Alias for `root` — styles the outer `<FormControl>` wrapper. */
  formControl?: SxProps<Theme>
  /** Styles the section `<FormLabel>`. */
  formLabel?: SxProps<Theme>
  /** Styles the `<RadioGroup>` container. */
  radioGroup?: SxProps<Theme>
  /** Styles the `<Radio>` icon component. */
  radio?: SxProps<Theme>
  /** Styles the individual card container (when `variant="card"`). */
  card?: SxProps<Theme>
  /** Styles the primary label typography/box inside the card. */
  cardLabel?: SxProps<Theme>
  /** Styles the secondary description typography inside the card. */
  cardDescription?: SxProps<Theme>
  /** Styles the badge container inside the card. */
  cardBadge?: SxProps<Theme>
  /** Styles the leading icon container inside the card. */
  cardIcon?: SxProps<Theme>
  /** Styles the trailing right content inside the card. */
  cardEndContent?: SxProps<Theme>
  /** Styles the `<FormHelperText>` below the group. */
  helperText?: SxProps<Theme>
}

export interface RadioProps extends Omit<MuiRadioProps, 'size'> {
  /** Size of the radio button. @default 'medium' */
  size?: RadioSize
}

export interface RadioCardProps<V = RadioValue> {
  /** Option configuration. */
  option: RadioOption<V>
  /** Whether this card is currently checked/selected. */
  checked?: boolean
  /** Size token. @default 'medium' */
  size?: RadioSize
  /** Border radius for the card container. @default '12px' */
  borderRadius?: number | string
  /** Where to render the radio indicator, or 'none' to hide it. @default 'left' */
  radioPlacement?: RadioPlacement
  /** Whether the card is disabled. */
  disabled?: boolean
  /** Whether the field is in an error state. */
  error?: boolean
  /** Whether the card should stretch to 100% width. @default true */
  fullWidth?: boolean
  /** Custom slot styles. */
  slotSx?: RadioSlotSx
  /** Ref for the hidden input element. */
  inputRef?: React.Ref<HTMLInputElement>
  /** Name attribute for the radio input. */
  name?: string
  /** Change event handler. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

export interface RadioGroupProps<V = RadioValue>
  extends Omit<MuiRadioGroupProps, 'name' | 'value' | 'onChange' | 'defaultValue'> {
  /** The name attribute for radio inputs. */
  name?: string
  /** Optional section label displayed above the radio group. */
  label?: ReactNode
  /** List of radio options. */
  options: RadioOption<V>[]
  /** Controlled selected value. */
  value?: V
  /** Default selected value for uncontrolled usage. */
  defaultValue?: V
  /** Callback fired when the selected value changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  /** Simplified callback passing only the newly selected value. */
  onValueChange?: (value: V) => void
  /** Visual presentation variant. @default 'default' */
  variant?: RadioVariant
  /** Arrangement layout: 'row' (flex wrap), 'column' (vertical), or 'grid' (MUI Grid). @default 'column' */
  layout?: RadioLayout
  /** Number of grid columns when `layout="grid"`. Can be a number or responsive object `{ xs: 1, sm: 2, md: 3 }`. @default 2 */
  gridColumns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  /** Position of the radio indicator in cards. @default 'left' */
  radioPlacement?: RadioPlacement
  /** Size token for the radio and card padding. @default 'medium' */
  size?: RadioSize
  /** Border radius for cards (when `variant="card"`). @default '12px' */
  borderRadius?: number | string
  /** Disable the entire group. */
  disabled?: boolean
  /** Display group in an error state. */
  error?: boolean
  /** Helper text or validation error message displayed below the group. */
  helperText?: ReactNode
  /** Whether cards expand to full width of their container. @default true */
  fullWidth?: boolean
  /** Fine-grained sx slot overrides. */
  slotSx?: RadioSlotSx
  /** Ref passed to the input element. */
  inputRef?: React.Ref<HTMLInputElement>
}
