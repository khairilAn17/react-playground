import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material'
import type { CheckboxProps, FormControlLabelProps } from '@mui/material'

export interface FormCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, 'name' | 'checked'> {
  /**
   * The field name — must be a valid key of your form schema type (typically boolean).
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the checkbox control.
   */
  label: ReactNode

  /**
   * Optional helper text displayed below the checkbox.
   */
  helperText?: ReactNode

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>

  /**
   * Placement of the label relative to the checkbox.
   * @default 'end'
   */
  labelPlacement?: FormControlLabelProps['labelPlacement']
}

/**
 * FormCheckbox
 *
 * A type-safe, reusable MUI Checkbox wrapper for React Hook Form.
 *
 * MUI v9 note: Ref is forwarded via `slotProps={{ input: { ref } }}`.
 * The legacy `inputRef` and `inputProps` props no longer exist in v9.
 *
 * Features:
 * - Works inside <FormProvider> OR with explicit `control` prop
 * - Automatically binds `checked` and `onChange` to RHF state
 * - Displays validation error state and helper messages automatically
 */
export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  control,
  helperText,
  labelPlacement = 'end',
  sx,
  disabled,
  ...props
}: FormCheckboxProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormCheckbox name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} sx={sx} disabled={disabled}>
          <FormControlLabel
            label={label}
            labelPlacement={labelPlacement}
            control={
              <Checkbox
                {...props}
                name={name}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                slotProps={{ input: { ref } }}
              />
            }
          />
          {(error?.message || helperText) && (
            <FormHelperText>{error?.message ?? helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
