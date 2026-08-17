import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { Autocomplete } from '../../autocomplete'
import type { AutocompleteOption } from '../../autocomplete'
import type { FormAutocompleteProps } from './types'

export type { AutocompleteOption, FormAutocompleteProps, FormAutocompleteSlotSx } from './types'

export function FormAutocomplete<
  T extends FieldValues,
  Option = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  name,
  control,
  options,
  helperText,
  multiple,
  ...props
}: FormAutocompleteProps<T, Option, Multiple, DisableClearable, FreeSolo>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormAutocomplete name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
        // Resolve Option object(s) from form value
        let resolvedValue: unknown = null

        if (multiple && Array.isArray(value)) {
          resolvedValue = value.map((v) => {
            if (typeof v === 'object' && v !== null) return v
            const found = options.find((opt: unknown) => {
              if (opt && typeof opt === 'object' && 'value' in opt) {
                return (opt as AutocompleteOption).value === v
              }
              return opt === v
            })
            return found ?? { label: String(v), value: v }
          })
        } else if (!multiple && value !== undefined && value !== null && value !== '') {
          if (typeof value === 'object' && value !== null) {
            resolvedValue = value
          } else {
            const found = options.find((opt: unknown) => {
              if (opt && typeof opt === 'object' && 'value' in opt) {
                return (opt as AutocompleteOption).value === value
              }
              return opt === value
            })
            resolvedValue = found ?? { label: String(value), value }
          }
        } else {
          resolvedValue = multiple ? [] : null
        }

        return (
          <Autocomplete<Option, Multiple, DisableClearable, FreeSolo>
            {...(props as unknown as FormAutocompleteProps<T, Option, Multiple, DisableClearable, FreeSolo>)}
            multiple={multiple}
            options={options}
            value={resolvedValue as any}
            onChange={(_, newValue) => {
              if (multiple && Array.isArray(newValue)) {
                const primitiveValues = newValue.map((item) => {
                  if (item && typeof item === 'object' && 'value' in item) {
                    return (item as unknown as AutocompleteOption).value
                  }
                  return item
                })
                onChange(primitiveValues)
              } else if (!multiple && newValue) {
                if (typeof newValue === 'object' && newValue !== null && 'value' in newValue) {
                  onChange((newValue as unknown as AutocompleteOption).value)
                } else {
                  onChange(newValue)
                }
              } else {
                onChange(multiple ? [] : null)
              }
            }}
            onBlur={onBlur}
            inputRef={ref}
            error={!!error}
            helperText={error?.message ?? helperText}
          />
        )
      }}
    />
  )
}
