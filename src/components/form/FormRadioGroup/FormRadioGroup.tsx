import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material'
import type { RadioGroupProps } from '@mui/material'

export interface RadioOption {
  label: ReactNode
  value: string | number | boolean
  disabled?: boolean
}

export interface FormRadioGroupProps<T extends FieldValues>
  extends Omit<RadioGroupProps, 'name' | 'value'> {
  /**
   * The field name — must be a valid key of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the RadioGroup section.
   */
  label?: ReactNode

  /**
   * List of radio options.
   */
  options: RadioOption[]

  /**
   * Display radio buttons horizontally.
   * @default false
   */
  row?: boolean

  /**
   * Disable the entire radio group.
   */
  disabled?: boolean

  /**
   * Optional helper text displayed below the group.
   */
  helperText?: ReactNode

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>
}

/**
 * FormRadioGroup
 *
 * A type-safe, reusable MUI RadioGroup wrapper for React Hook Form.
 */
export function FormRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
  row = false,
  control,
  helperText,
  sx,
  disabled,
  ...props
}: FormRadioGroupProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormRadioGroup name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  const labelId = `${String(name)}-radio-label`

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} sx={sx} disabled={disabled}>
          {label && <FormLabel id={labelId}>{label}</FormLabel>}
          <RadioGroup
            {...props}
            aria-labelledby={label ? labelId : undefined}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            row={row}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={String(opt.value)}
                value={opt.value}
                control={<Radio slotProps={{ input: { ref } }} />}
                label={opt.label}
                disabled={disabled || opt.disabled}
              />
            ))}
          </RadioGroup>
          {(error?.message || helperText) && (
            <FormHelperText>{error?.message ?? helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
