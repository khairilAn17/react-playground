import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import { Autocomplete, TextField } from '@mui/material'
import type { AutocompleteProps, TextFieldProps } from '@mui/material'

export interface AutocompleteOption {
  label: string
  value: string | number
}

export interface FormAutocompleteProps<
  T extends FieldValues,
  Option = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends Omit<
    AutocompleteProps<Option, Multiple, DisableClearable, FreeSolo>,
    'name' | 'renderInput' | 'options' | 'value' | 'onChange'
  > {
  /**
   * The field name — must be a valid key of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the underlying TextField.
   */
  label: string

  /**
   * List of available options.
   */
  options: Option[]

  /**
   * Helper text for the TextField.
   */
  helperText?: ReactNode

  /**
   * Optional custom getOptionLabel resolver.
   */
  getOptionLabel?: (option: Option | string) => string

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>

  /**
   * Additional props for the inner TextField component.
   */
  textFieldProps?: Omit<TextFieldProps, 'label' | 'error' | 'helperText'>
}

/**
 * FormAutocomplete
 *
 * A type-safe, reusable MUI Autocomplete wrapper for React Hook Form.
 *
 * Features:
 * - Bridges RHF Controller with MUI Autocomplete's custom `onChange` signature
 * - Works inside <FormProvider> OR with explicit `control` prop
 * - Supports custom options, single/multiple selections, freeSolo
 * - Displays validation errors on the inner TextField automatically
 */
export function FormAutocomplete<
  T extends FieldValues,
  Option extends AutocompleteOption = AutocompleteOption,
>({
  name,
  label,
  options,
  control,
  helperText,
  getOptionLabel = (opt) => (typeof opt === 'string' ? opt : opt.label),
  textFieldProps,
  disabled,
  fullWidth = true,
  ...props
}: FormAutocompleteProps<T, Option>) {
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
        // Resolve current option object matching the stored primitive value (if value is string/number)
        const selectedOption =
          options.find((opt) => opt.value === value) ?? (value ? { label: String(value), value } : null)

        return (
          <Autocomplete
            {...props}
            options={options}
            disabled={disabled}
            fullWidth={fullWidth}
            value={selectedOption as Option | null}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            onChange={(_, newValue) => {
              // Extract string/number value or entire object based on preference
              const val = newValue as Option | null
              onChange(val ? val.value : null)
            }}
            onBlur={onBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                {...textFieldProps}
                inputRef={ref}
                label={label}
                error={!!error}
                helperText={error?.message ?? helperText}
              />
            )}
          />
        )
      }}
    />
  )
}
