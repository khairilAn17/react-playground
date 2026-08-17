import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { Select } from '../../select'
import type { FormSelectProps } from './types'
import type { SelectChangeEvent } from '../../select/types'

export type { SelectOption, FormSelectProps, SelectOptionSlotSx, FormSelectSlotSx } from './types'

export function FormSelect<T extends FieldValues>({
  name,
  control,
  helperText,
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

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <Select
          {...props}
          name={name}
          value={value ?? ''}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
          onBlur={onBlur}
          inputRef={ref}
          error={!!error}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  )
}