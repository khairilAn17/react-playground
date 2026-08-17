import type { FieldValues, Path, Control } from 'react-hook-form'
import type {
  SelectOption,
  SelectOptionSlotSx,
  SelectSlotSx,
  SelectProps,
} from '../../select'

export type { SelectOption, SelectOptionSlotSx, SelectSlotSx }
export type FormSelectSlotSx = SelectSlotSx

export interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'inputRef'> {
  name: Path<T>
  control?: Control<T>
}
