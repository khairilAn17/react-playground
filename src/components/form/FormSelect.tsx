import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import type { SelectProps } from '@mui/material'

export interface SelectOption {
  label: string
  value: string | number
}

export interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'name' | 'value'> {
  /**
   * The field name — must be a valid key of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the Select component and InputLabel.
   */
  label: string

  /**
   * Options list to populate MenuItems.
   */
  options: SelectOption[]

  /**
   * Optional helper text displayed below the select field.
   */
  helperText?: ReactNode

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>
}

/**
 * FormSelect
 *
 * A type-safe, reusable MUI Select dropdown wrapper for React Hook Form.
 *
 * Features:
 * - Works inside <FormProvider> OR with explicit `control` prop
 * - Automatically handles FormControl, InputLabel, Select, MenuItems, and FormHelperText
 * - Displays validation errors automatically
 * - Safe against uncontrolled/controlled warnings via `value ?? ''`
 */
export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  control,
  helperText,
  fullWidth = true,
  size,
  sx,
  disabled,
  variant,
  ...props
}: FormSelectProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormSelect name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  const labelId = `${String(name)}-label`

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!error}
          size={size}
          sx={sx}
          disabled={disabled}
          variant={variant}
        >
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...props}
            variant={variant}
            labelId={labelId}
            label={label}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {(error?.message || helperText) && (
            <FormHelperText>{error?.message ?? helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
