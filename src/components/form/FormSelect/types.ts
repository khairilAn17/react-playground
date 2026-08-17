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
  /**
   * The field name — must be a valid key (or dot-path) of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   * If omitted, reads `control` from the nearest FormProvider via useFormContext.
   */
  control?: Control<T>
}
