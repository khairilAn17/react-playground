import { forwardRef, useId, useState, useCallback } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormHelperText,
  Box,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import type { Theme } from '@mui/material'
import { Radio } from './Radio'
import { RadioCard } from './RadioCard'
import type { RadioGroupProps, RadioValue, RadioOption } from './types'

function toSxArray(sx: unknown) {
  if (!sx) return []
  return Array.isArray(sx) ? sx : [sx]
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps<RadioValue>>(
  function RadioGroup(
    {
      name,
      id,
      label,
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      variant = 'default',
      layout = 'column',
      gridColumns = 2,
      radioPlacement = 'left',
      size = 'medium',
      borderRadius = '12px',
      disabled = false,
      error = false,
      helperText,
      fullWidth = true,
      slotSx,
      inputRef,
      sx,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const groupId = id || generatedId
    const labelId = label ? `${groupId}-label` : undefined
    const helperId = helperText ? `${groupId}-helper` : undefined

    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = useState<RadioValue | undefined>(
      defaultValue ?? (options.length > 0 ? undefined : '')
    )
    const currentValue = isControlled ? controlledValue : internalValue

    const handleValueChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>, nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue)
        }
        onChange?.(event, nextValue)

        // Find the matched typed value from options if possible
        const matchedOption = options.find((opt) => String(opt.value) === nextValue)
        const typedValue = matchedOption ? matchedOption.value : nextValue
        onValueChange?.(typedValue)
      },
      [isControlled, onChange, onValueChange, options]
    )

    const isSmall = size === 'small'

    // Render individual item (Default or Card)
    const renderOptionItem = (option: RadioOption<RadioValue>) => {
      const isChecked = String(currentValue) === String(option.value)
      const isOptionDisabled = disabled || option.disabled

      if (variant === 'card') {
        return (
          <RadioCard
            key={String(option.value)}
            name={name}
            option={option}
            checked={isChecked}
            size={size}
            borderRadius={borderRadius}
            radioPlacement={radioPlacement}
            disabled={isOptionDisabled}
            error={error}
            fullWidth={fullWidth}
            slotSx={slotSx}
            inputRef={isChecked ? inputRef : undefined}
            onChange={(e) => handleValueChange(e, String(option.value))}
          />
        )
      }

      return (
        <FormControlLabel
          key={String(option.value)}
          value={option.value}
          disabled={isOptionDisabled}
          control={
            <Radio
              size={size}
              slotProps={{ input: { ref: isChecked ? inputRef : undefined } }}
              sx={slotSx?.radio}
            />
          }
          label={option.label}
          sx={[
            {
              m: 0,
              '& .MuiFormControlLabel-label': {
                fontSize: isSmall ? '0.875rem' : '0.9375rem',
                fontWeight: isChecked ? 600 : 400,
                color: isOptionDisabled ? 'text.disabled' : 'text.primary',
                ml: 0.75,
              },
            },
          ]}
        />
      )
    }

    // Layout arrangement wrapper
    const renderContent = () => {
      if (layout === 'grid') {
        const gridColSize =
          typeof gridColumns === 'number'
            ? Math.floor(12 / Math.max(1, Math.min(12, gridColumns)))
            : undefined

        const responsiveSize =
          typeof gridColumns === 'object'
            ? {
                xs: gridColumns.xs ? Math.floor(12 / gridColumns.xs) : 12,
                sm: gridColumns.sm ? Math.floor(12 / gridColumns.sm) : undefined,
                md: gridColumns.md ? Math.floor(12 / gridColumns.md) : undefined,
                lg: gridColumns.lg ? Math.floor(12 / gridColumns.lg) : undefined,
                xl: gridColumns.xl ? Math.floor(12 / gridColumns.xl) : undefined,
              }
            : { xs: 12, sm: gridColSize ?? 6 }

        return (
          <Grid container spacing={1.5}>
            {options.map((option) => (
              <Grid key={String(option.value)} size={responsiveSize}>
                {renderOptionItem(option)}
              </Grid>
            ))}
          </Grid>
        )
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: layout === 'row' ? 'row' : 'column',
            flexWrap: layout === 'row' ? 'wrap' : 'nowrap',
            gap: 1.5,
            width: fullWidth ? '100%' : 'auto',
          }}
        >
          {options.map(renderOptionItem)}
        </Box>
      )
    }

    return (
      <FormControl
        ref={ref}
        error={error}
        disabled={disabled}
        sx={[
          {
            width: fullWidth ? '100%' : 'auto',
          },
          ...toSxArray(slotSx?.root),
          ...toSxArray(slotSx?.formControl),
          ...toSxArray(sx),
        ]}
      >
        {label && (
          <FormLabel
            id={labelId}
            sx={[
              (theme: Theme) => ({
                mb: 1,
                fontWeight: 600,
                fontSize: isSmall ? '0.8125rem' : '0.875rem',
                color: error ? theme.palette.error.main : theme.palette.text.primary,
                '&.Mui-focused': {
                  color: error ? theme.palette.error.main : '#00A39D',
                },
              }),
              ...toSxArray(slotSx?.formLabel),
            ]}
          >
            {label}
          </FormLabel>
        )}

        <MuiRadioGroup
          {...props}
          id={groupId}
          name={name}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          value={currentValue !== undefined ? String(currentValue) : ''}
          onChange={handleValueChange}
          sx={[
            {
              width: fullWidth ? '100%' : 'auto',
            },
            ...toSxArray(slotSx?.radioGroup),
          ]}
        >
          {renderContent()}
        </MuiRadioGroup>

        {helperText && (
          <FormHelperText
            id={helperId}
            sx={[
              {
                mx: 0,
                mt: 0.75,
                fontSize: '0.8125rem',
              },
              ...toSxArray(slotSx?.helperText),
            ]}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
