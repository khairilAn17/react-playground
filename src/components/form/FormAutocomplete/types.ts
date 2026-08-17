import type { FieldValues, Path, Control } from 'react-hook-form'
import type { AutocompleteProps, AutocompleteOption, AutocompleteSlotSx } from '../../autocomplete'

export type { AutocompleteOption, AutocompleteSlotSx }
export type FormAutocompleteSlotSx = AutocompleteSlotSx

export interface FormAutocompleteProps<
  T extends FieldValues,
  Option = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
    AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>,
    'name' | 'value' | 'onChange' | 'onBlur' | 'inputRef'
  > {
  /**
   * The field name — must be a valid key of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>
}
