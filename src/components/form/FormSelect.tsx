import { useState } from 'react'
import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues, Path, Control } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListSubheader,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material'
import type { SelectProps } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export interface SelectOption {
  label: string
  value: string | number
}

export interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'name' | 'value'> {
  /**
   * The field name — must be a valid key of your form schema type.
   * Fully type-safe via Path<T>.
   */
  name: Path<T>

  /**
   * Label for the Select component and InputLabel.
   */
  label: string

  /**
   * Options list to populate MenuItems.
   */
  options: SelectOption[]

  /**
   * Enable in-dropdown search input for filtering options.
   * @default false
   */
  searchable?: boolean

  /**
   * Placeholder text for the search input.
   * @default 'Search...'
   */
  searchPlaceholder?: string

  /**
   * Optional helper text displayed below the select field.
   */
  helperText?: ReactNode

  /**
   * Optional. Pass `control` explicitly when used outside a FormProvider.
   */
  control?: Control<T>
}

/**
 * FormSelect
 *
 * A type-safe, reusable MUI Select dropdown wrapper for React Hook Form.
 *
 * Features:
 * - Works inside <FormProvider> OR with explicit `control` prop
 * - Optional `searchable` prop enables live filtering inside the dropdown menu
 * - Automatically handles FormControl, InputLabel, Select, MenuItems, and FormHelperText
 * - Displays validation errors automatically
 * - Safe against uncontrolled/controlled warnings via `value ?? ''`
 */
export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  searchable = false,
  searchPlaceholder = 'Search...',
  control,
  helperText,
  fullWidth = true,
  size,
  sx,
  disabled,
  variant,
  onClose,
  ...props
}: FormSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormSelect name="${String(name)}"> requires either:\n` +
        `  1. An ancestor <FormProvider> wrapping this component, or\n` +
        `  2. An explicit "control" prop passed directly.`
    )
  }

  const labelId = `${String(name)}-label`

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  const handleClose = (event: React.SyntheticEvent) => {
    setSearchTerm('')
    if (onClose) {
      onClose(event)
    }
  }

  return (
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!error}
          size={size}
          sx={sx}
          disabled={disabled}
          variant={variant}
        >
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...props}
            variant={variant}
            labelId={labelId}
            label={label}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            onClose={handleClose}
            // Auto focus search input when dropdown opens
            MenuProps={{
              autoFocus: false,
              disableAutoFocusItem: searchable,
              ...props.MenuProps,
            }}
          >
            {searchable && (
              <ListSubheader
                disableSticky
                sx={{
                  pt: 1,
                  pb: 1,
                  px: 1.5,
                  bgcolor: 'background.paper',
                  lineHeight: 'normal',
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  autoFocus
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // Prevent spacebar or keyboard typing inside TextField from closing/navigating Select
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      e.stopPropagation()
                    }
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </ListSubheader>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled sx={{ py: 1.5 }}>
                <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  No options found
                </Box>
              </MenuItem>
            )}
          </Select>
          {(error?.message || helperText) && (
            <FormHelperText>{error?.message ?? helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
