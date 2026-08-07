import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

interface FormTextFieldProps<T extends FieldValues>
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
   * This makes the component work in both patterns:
   *   - <FormTextField name="email" />                   (inside FormProvider)
   *   - <FormTextField name="email" control={control} /> (standalone)
   */
  control?: Control<T>
}

/**
 * FormTextField
 *
 * A type-safe, reusable MUI TextField wrapper for React Hook Form.
 *
 * Features:
 * - Works inside <FormProvider> (no props needed) OR with explicit `control` prop
 * - Automatically displays validation error message via helperText
 * - Prevents "uncontrolled → controlled" React warnings with `value ?? ''`
 * - All standard MUI TextFieldProps are passed through (variant, size, sx, etc.)
 *
 * @example — Inside FormProvider (recommended for app-level forms)
 * ```tsx
 * <FormProvider {...methods}>
 *   <FormTextField<LoginValues> name="email" label="Email" type="email" />
 *   <FormTextField<LoginValues> name="password" label="Password" type="password" />
 * </FormProvider>
 * ```
 *
 * @example — With explicit control (for design system / standalone usage)
 * ```tsx
 * const { control } = useForm<LoginValues>()
 * <FormTextField<LoginValues> name="email" control={control} label="Email" />
 * ```
 *
 * @example — Nested dot-path field name
 * ```tsx
 * <FormTextField<CheckoutValues> name="shipping.address" label="Street Address" />
 * ```
 */
export function FormTextField<T extends FieldValues>({
  name,
  control,
  helperText,
  ...props
}: FormTextFieldProps<T>) {
  // Attempt to read from FormProvider context.
  // `useFormContext` returns null if there is no ancestor FormProvider,
  // so we safely fall back to the explicit `control` prop.
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormTextField name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.\n\n` +
        `If you are using this in a test or Storybook, wrap it with a <FormWrapper>.`
    )
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field, fieldState: { error } }) => (
        <TextField
          // Spread RHF field props: value, onChange, onBlur, ref, name
          {...field}
          // Spread consumer's MUI props (label, type, variant, size, sx, etc.)
          {...props}
          // Guard against undefined to prevent uncontrolled → controlled warning
          value={field.value ?? ''}
          // Show validation error state
          error={!!error}
          // Error message takes priority; fall back to consumer's helperText
          helperText={error?.message ?? helperText}
          // Default to full width — overridable via props
          fullWidth={props.fullWidth ?? true}
        />
      )}
    />
  )
}
