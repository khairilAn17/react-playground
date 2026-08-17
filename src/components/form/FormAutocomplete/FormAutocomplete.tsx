import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { Autocomplete } from '../../autocomplete'
import type { AutocompleteOption } from '../../autocomplete'
import type { FormAutocompleteProps } from './types'

export type { AutocompleteOption, FormAutocompleteProps, FormAutocompleteSlotSx } from './types'

// ── Helpers ───────────────────────────────────────────────────────────────────
// Defined outside the component so they are stable module-level references
// and do not participate in hook dependency arrays.

/**
 * Resolves a primitive form value (or array of primitives) back to the
 * full AutocompleteOption object(s) that MUI Autocomplete expects as `value`.
 */
function resolveFormValue<Option>(
  value: unknown,
  options: readonly Option[],
  multiple: boolean | undefined
): Option | Option[] | null {
  if (multiple) {
    if (!Array.isArray(value)) return []
    return value.map((v) => {
      if (typeof v === 'object' && v !== null) return v as Option
      const found = options.find((opt) => {
        if (opt && typeof opt === 'object' && 'value' in opt) {
          return (opt as unknown as AutocompleteOption).value === v
        }
        return opt === v
      })
      return (found ?? { label: String(v), value: v }) as Option
    })
  }

  if (value === undefined || value === null || value === '') return null

  if (typeof value === 'object' && value !== null) return value as Option

  const found = options.find((opt) => {
    if (opt && typeof opt === 'object' && 'value' in opt) {
      return (opt as unknown as AutocompleteOption).value === value
    }
    return opt === value
  })
  return (found ?? { label: String(value), value }) as Option
}

/**
 * Converts MUI Autocomplete's selected Option object(s) back to the primitive
 * value (or array of primitives) that React Hook Form stores in the field.
 */
function toPrimitiveValue<Option>(
  newValue: Option | Option[] | null,
  multiple: boolean | undefined
): unknown {
  if (multiple) {
    if (!Array.isArray(newValue)) return []
    return newValue.map((item) => {
      if (item && typeof item === 'object' && 'value' in item) {
        return (item as unknown as AutocompleteOption).value
      }
      return item
    })
  }

  if (!newValue) return null
  if (typeof newValue === 'object' && 'value' in (newValue as object)) {
    return (newValue as unknown as AutocompleteOption).value
  }
  return newValue
}

// ─────────────────────────────────────────────────────────────────────────────

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
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <Autocomplete<Option, Multiple, DisableClearable, FreeSolo>
          {...props}
          multiple={multiple}
          options={options}
          value={resolveFormValue(value, options, multiple) as never}
          onChange={(_, newValue) => onChange(toPrimitiveValue(newValue as Option | Option[] | null, multiple))}
          onBlur={onBlur}
          inputRef={ref}
          error={!!error}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  )
}
