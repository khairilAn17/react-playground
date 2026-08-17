import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  RadioGroup as PrimitiveRadioGroup,
  type RadioGroupProps as PrimitiveRadioGroupProps,
  type RadioOption,
  type RadioVariant,
  type RadioLayout,
  type RadioPlacement,
  type RadioSize,
  type RadioSlotSx,
} from '../../radio'

export type { RadioOption, RadioVariant, RadioLayout, RadioPlacement, RadioSize, RadioSlotSx }

export interface FormRadioGroupProps<T extends FieldValues>
  extends Omit<
    PrimitiveRadioGroupProps,
    'name' | 'value' | 'defaultValue' | 'onChange' | 'ref' | 'inputRef'
  > {
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
   * Visual variant: 'default' or 'card'.
   * @default 'default'
   */
  variant?: RadioVariant

  /**
   * Arrangement layout: 'row', 'column', or 'grid'.
   * @default 'column'
   */
  layout?: RadioLayout

  /**
   * Number of columns when `layout="grid"`.
   * @default 2
   */
  gridColumns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }

  /**
   * Position of the radio indicator inside cards.
   * @default 'left'
   */
  radioPlacement?: RadioPlacement

  /**
   * Display radio buttons horizontally (convenience alias for layout="row").
   * @default false
   */
  row?: boolean

  /**
   * Size token.
   * @default 'medium'
   */
  size?: RadioSize

  /**
   * Border radius for card options.
   * @default '12px'
   */
  borderRadius?: number | string

  /**
   * Disable the entire radio group.
   */
  disabled?: boolean

  /**
   * Optional helper text displayed below the group.
   */
  helperText?: ReactNode

  /**
   * Fine-grained sx styling slots.
   */
  slotSx?: RadioSlotSx

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>
}

/**
 * FormRadioGroup
 *
 * A type-safe, reusable RadioGroup component integrated with React Hook Form,
 * backed by the BYOND BIZNIS Radio primitive.
 */
export function FormRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
  variant = 'default',
  layout,
  row = false,
  gridColumns,
  radioPlacement = 'left',
  size = 'medium',
  borderRadius = '12px',
  control,
  helperText,
  sx,
  slotSx,
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

  // Resolve effective layout ('row' boolean flag maps to layout="row" for backward compatibility)
  const resolvedLayout: RadioLayout = layout ?? (row ? 'row' : 'column')

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({
        field: { value, onChange, ref },
        fieldState: { error },
      }) => (
        <PrimitiveRadioGroup
          {...props}
          name={name}
          label={label}
          options={options}
          value={value ?? ''}
          onChange={(_, nextVal) => onChange(nextVal)}
          variant={variant}
          layout={resolvedLayout}
          gridColumns={gridColumns}
          radioPlacement={radioPlacement}
          size={size}
          borderRadius={borderRadius}
          disabled={disabled}
          error={!!error}
          helperText={error?.message ?? helperText}
          slotSx={slotSx}
          inputRef={ref}
          sx={sx}
        />
      )}
    />
  )
}
