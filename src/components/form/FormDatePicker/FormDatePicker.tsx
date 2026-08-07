import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control, PathValue } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import type { Dayjs } from 'dayjs'
import type { TextFieldProps } from '@mui/material'

export interface FormDatePickerProps<T extends FieldValues>
  extends Omit<DatePickerProps, 'name' | 'value' | 'onChange'> {
  /**
   * The field name — must be a valid key (or dot-path) of your form schema type.
   * e.g. name="birthDate" or name="event.startDate"
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Optional helper text displayed below the picker.
   */
  helperText?: string

  /**
   * MUI TextField slotProps to forward to the inner input.
   */
  textFieldProps?: Partial<TextFieldProps>

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   * If omitted, the component reads `control` from the nearest FormProvider via useFormContext.
   */
  control?: Control<T>
}

/**
 * FormDatePicker
 *
 * A type-safe, reusable MUI DatePicker wrapper for React Hook Form.
 * Requires a LocalizationProvider ancestor wrapping your app or form.
 *
 * @example
 * ```tsx
 * // Make sure your app wraps with LocalizationProvider:
 * <LocalizationProvider dateAdapter={AdapterDayjs}>
 *   <Form ...>
 *     <Field.DatePicker name="birthDate" label="Date of Birth" />
 *   </Form>
 * </LocalizationProvider>
 * ```
 */
export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  helperText,
  textFieldProps,
  ...props
}: FormDatePickerProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormDatePicker name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...props}
          value={(field.value as Dayjs | null) ?? null}
          onChange={(date) => {
            field.onChange(date as PathValue<T, Path<T>>)
          }}
          slotProps={{
            textField: {
              ...textFieldProps,
              fullWidth: textFieldProps?.fullWidth ?? true,
              error: !!error,
              helperText: error?.message ?? helperText,
              onBlur: field.onBlur,
              inputRef: field.ref,
            } as unknown as object,
          }}
        />
      )}
    />
  )
}
