import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  Switch,
  FormHelperText,
} from '@mui/material'
import type { SwitchProps, FormControlLabelProps } from '@mui/material'

export interface FormSwitchProps<T extends FieldValues>
  extends Omit<SwitchProps, 'name' | 'checked'> {
  /**
   * The field name — must be a valid key of your form schema type (typically boolean).
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the switch control.
   */
  label: ReactNode

  /**
   * Optional helper text displayed below the switch.
   */
  helperText?: ReactNode

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>

  /**
   * Placement of the label relative to the switch.
   * @default 'end'
   */
  labelPlacement?: FormControlLabelProps['labelPlacement']
}

/**
 * FormSwitch
 *
 * A type-safe, reusable MUI Switch wrapper for React Hook Form.
 *
 * MUI v9 note: Ref is forwarded via `slotProps={{ input: { ref } }}`.
 * The legacy `inputRef` and `inputProps` props no longer exist in v9.
 *
 * Features:
 * - Works inside <FormProvider> OR with explicit `control` prop
 * - Binds `checked` and `onChange` to RHF state
 * - Displays validation error state and helper messages automatically
 */
export function FormSwitch<T extends FieldValues>({
  name,
  label,
  control,
  helperText,
  labelPlacement = 'end',
  sx,
  disabled,
  ...props
}: FormSwitchProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormSwitch name="${String(name)}"> requires either:\n` +
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
              <Switch
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
