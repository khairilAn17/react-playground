import { useId } from 'react'
import {
  Autocomplete as MuiAutocomplete,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'

import { toSxArray } from '../select/utils'
import type { AutocompleteProps, AutocompleteOption } from './types'
import { defaultGetOptionLabel, defaultIsOptionEqualToValue } from './utils/defaults'
import { useAutocompleteHandlers } from './hooks/useAutocompleteHandlers'

export function Autocomplete<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  id,
  name,
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  fullWidth = true,
  size = 'medium',
  borderRadius = '12px',
  inputRef,
  textFieldProps,
  slotSx,
  options,
  getOptionLabel = defaultGetOptionLabel,
  isOptionEqualToValue = defaultIsOptionEqualToValue,
  renderOption,
  renderTags,
  renderValue,
  slotProps,
  multiple = false as Multiple,
  checkboxPlacement = 'right',
  maxVisibleTags,
  tagDisplay = 'avatar+label',
  prefixBlock,
  suffixBlock,
  startAdornment,
  endAdornment,
  onChange,
  onValueChange,
  inputValue,
  onInputChange,
  filterOptions,
  format,
  thousandSeparator,
  decimalSeparator,
  decimalScale,
  allowDecimals,
  fixedDecimals,
  allowNegative,
  formatter,
  parser,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const generatedId = useId()
  const triggerId = id || generatedId
  const isSmall = size === 'small'
  const isLarge = size === 'large'
  const formattedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : (borderRadius ?? '12px')
  const hasPrefixBlock = Boolean(prefixBlock)
  const hasSuffixBlock = Boolean(suffixBlock)
  const hasBlocks = hasPrefixBlock || hasSuffixBlock

  const {
    renderInput,
    defaultRenderOption,
    resolvedRenderValueProp,
    resolvedSlotProps,
    handleChange,
    handleInputChange,
    effectiveInputValue,
    effectiveFilterOptions,
  } = useAutocompleteHandlers<T, Multiple, DisableClearable, FreeSolo>({
    size, borderRadius, error, disabled, hasBlocks,
    name, inputRef, placeholder, textFieldProps,
    getOptionLabel, multiple, checkboxPlacement,
    renderTags, renderValue,
    maxVisibleTags, tagDisplay,
    startAdornment, endAdornment,
    slotSx, slotProps,
    onChange, onValueChange,
    inputValue, onInputChange, filterOptions,
    format, thousandSeparator, decimalSeparator,
    decimalScale, allowDecimals, fixedDecimals,
    allowNegative, formatter, parser,
  })

  // ── Shared MuiAutocomplete props ──────────────────────────────────────────
  type MuiProps = React.ComponentProps<typeof MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>>
  const sharedMuiProps: Omit<MuiProps, 'sx'> = {
    ...(props as unknown as Omit<MuiProps, 'sx'>),
    id: triggerId,
    multiple, disabled, fullWidth, options,
    getOptionLabel, isOptionEqualToValue,
    onChange: handleChange,
    ...(effectiveInputValue !== undefined ? { inputValue: effectiveInputValue } : {}),
    onInputChange: handleInputChange,
    ...(effectiveFilterOptions ? { filterOptions: effectiveFilterOptions } : {}),
    popupIcon: <KeyboardArrowDownIcon sx={{ fontSize: isSmall ? 20 : 22 }} />,
    clearIcon: <CloseIcon sx={{ fontSize: isSmall ? 18 : 20 }} />,
    slotProps: resolvedSlotProps,
    renderOption: renderOption ?? defaultRenderOption,
    renderValue: resolvedRenderValueProp,
    renderInput,
  }

  // ── Block sidebar (prefix / suffix shaded panel) ──────────────────────────
  const blockSidebarSx = (side: 'left' | 'right'): SxProps<Theme> => [
    (theme: Theme) => ({
      display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch',
      px: isLarge ? 2 : isSmall ? 1.25 : 1.75,
      bgcolor: '#F1F5F9',
      ...(side === 'left'
        ? { borderRight: '1px solid', borderColor: error ? theme.palette.error.main : theme.palette.divider }
        : { borderLeft: '1px solid', borderColor: error ? theme.palette.error.main : theme.palette.divider }),
      fontWeight: 700,
      fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
      color: theme.palette.text.primary,
      userSelect: 'none', flexShrink: 0,
    }),
    ...toSxArray(side === 'left' ? slotSx?.prefixBlock : slotSx?.suffixBlock),
  ]

  return (
    <FormControl
      fullWidth={fullWidth} error={error} disabled={disabled}
      sx={[{ width: fullWidth ? '100%' : 'auto' }, ...toSxArray(slotSx?.formControl)]}
    >
      {label && (
        <InputLabel
          id={label ? `${triggerId}-label` : undefined}
          htmlFor={triggerId} shrink error={error} disabled={disabled}
          sx={[
            { position: 'static', transform: 'none', mb: 0.75, fontWeight: 600,
              fontSize: isSmall ? '0.8125rem' : '0.875rem', color: error ? 'error.main' : 'text.primary' },
            ...toSxArray(slotSx?.inputLabel),
          ]}
        >
          {label}
        </InputLabel>
      )}

      {/* Wrapper owns border + :focus-within ring when prefix/suffix blocks are active */}
      {hasBlocks ? (
        <Box
          sx={[(theme: Theme) => ({
            display: 'flex', alignItems: 'stretch',
            width: fullWidth ? '100%' : 'auto',
            minHeight: isLarge ? 56 : isSmall ? 40 : 48,
            borderRadius: formattedRadius, overflow: 'hidden', border: '1px solid',
            borderColor: error ? theme.palette.error.main : theme.palette.divider,
            bgcolor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': { borderColor: disabled ? undefined : error ? theme.palette.error.main : theme.palette.primary.main },
            '&:focus-within': {
              borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
              boxShadow: `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'}`,
            },
          })]}
        >
          {hasPrefixBlock && <Box sx={blockSidebarSx('left')}>{prefixBlock}</Box>}
          <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
            {...sharedMuiProps}
            sx={[{ flex: 1, minWidth: 0 }, ...toSxArray(slotSx?.root)]}
          />
          {hasSuffixBlock && <Box sx={blockSidebarSx('right')}>{suffixBlock}</Box>}
        </Box>
      ) : (
        <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
          {...sharedMuiProps}
          sx={[{ width: fullWidth ? '100%' : 'auto' }, ...toSxArray(slotSx?.root)]}
        />
      )}

      {helperText && (
        <FormHelperText sx={[{ mx: 0, mt: 0.5 }, ...toSxArray(slotSx?.helperText)]}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

// Named displayName improves component identification in React DevTools and
// error stack traces for this generic component.
Autocomplete.displayName = 'Autocomplete'
