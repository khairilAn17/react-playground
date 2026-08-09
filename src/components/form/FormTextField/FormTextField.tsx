import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

export interface FormTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name'> {
  /**
   * The field name — must be a valid key (or dot-path) of your form schema type.
   * e.g. name="email" or name="address.street"
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   * If omitted, the component reads `control` from the nearest FormProvider via useFormContext.
   */
  control?: Control<T>
}

/**
 * FormTextField
 *
 * A type-safe, reusable MUI TextField wrapper for React Hook Form.
 */
export function FormTextField<T extends FieldValues>({
  name,
  control,
  helperText,
  ...props
}: FormTextFieldProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormTextField name="${String(name)}"> requires either:\n` +
      `  1. An ancestor <FormProvider> wrapping this component, or\n` +
      `  2. An explicit "control" prop passed directly.`
    )
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          value={field.value ?? ''}
          error={!!error}
          helperText={error?.message ?? helperText}
          sx={{
            '& .MuiFormHelperText-root': { mx: 0 },
            ...props.sx,
          }}
        />
      )}
    />
  )
}
