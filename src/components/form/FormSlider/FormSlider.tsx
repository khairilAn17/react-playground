import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Slider,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material'
import type { SliderProps } from '@mui/material'

export interface FormSliderProps<T extends FieldValues>
  extends Omit<SliderProps, 'name' | 'value' | 'onChange'> {
  /**
   * The field name — must be a valid key of your form schema type (number or number[]).
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Optional label for the slider section.
   */
  label?: ReactNode

  /**
   * Optional helper text displayed below the slider.
   */
  helperText?: ReactNode

  /**
   * Whether the control takes full width.
   * @default true
   */
  fullWidth?: boolean

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>

  /**
   * Custom value formatter to display alongside the label (e.g. `(val) => `${val}%``).
   */
  formatValue?: (value: number | number[]) => ReactNode
}

/**
 * FormSlider
 *
 * A type-safe, reusable MUI Slider wrapper for React Hook Form.
 */
export function FormSlider<T extends FieldValues>({
  name,
  label,
  control,
  helperText,
  formatValue,
  min = 0,
  max = 100,
  step = 1,
  fullWidth = true,
  sx,
  disabled,
  ...props
}: FormSliderProps<T>) {
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormSlider name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  const labelId = `${String(name)}-slider-label`

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => {
        const numericValue = value ?? min

        return (
          <FormControl
            fullWidth={fullWidth}
            error={!!error}
            sx={sx}
            disabled={disabled}
          >
            {label && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <FormLabel id={labelId} sx={{ mb: 0 }}>
                  {label}
                </FormLabel>
                {formatValue && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {formatValue(numericValue)}
                  </Typography>
                )}
              </Box>
            )}
            <Slider
              {...props}
              name={name}
              min={min}
              max={max}
              step={step}
              value={numericValue}
              onChange={(_, newValue) => onChange(newValue)}
              onBlur={onBlur}
              ref={ref as any}
              aria-labelledby={label ? labelId : undefined}
            />
            {(error?.message || helperText) && (
              <FormHelperText>{error?.message ?? helperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
