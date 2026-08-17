import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  TextField as PrimitiveTextField,
  type TextFieldProps as PrimitiveTextFieldProps,
  type TextFieldSize,
  type TextFieldSlotSx,
} from '../../textField'

export type { TextFieldSize, TextFieldSlotSx }

export interface FormTextFieldProps<T extends FieldValues>
  extends Omit<
    PrimitiveTextFieldProps,
    'name' | 'value' | 'defaultValue' | 'onChange' | 'ref' | 'inputRef'
  > {
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
 * A type-safe, reusable TextField component integrated with React Hook Form,
 * backed by the BYOND BIZNIS Layer 1 TextField primitive.
 */
export function FormTextField<T extends FieldValues>({
  name,
  control,
  helperText,
  label,
  placeholder,
  size = 'medium',
  borderRadius = '12px',
  prefixBlock,
  suffixBlock,
  startAdornment,
  endAdornment,
  clearable = false,
  showPasswordToggle = false,
  showCount = false,
  maxLength,
  disabled = false,
  readOnly = false,
  required = false,
  fullWidth = true,
  multiline = false,
  rows,
  minRows,
  maxRows,
  type = 'text',
  slotSx,
  sx,
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
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <PrimitiveTextField
          {...props}
          inputRef={ref}
          name={name}
          label={label}
          placeholder={placeholder}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error?.message ?? helperText}
          size={size}
          borderRadius={borderRadius}
          prefixBlock={prefixBlock}
          suffixBlock={suffixBlock}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          clearable={clearable}
          showPasswordToggle={showPasswordToggle}
          showCount={showCount}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          minRows={minRows}
          maxRows={maxRows}
          type={type}
          slotSx={slotSx}
          sx={sx}
        />
      )}
    />
  )
}
