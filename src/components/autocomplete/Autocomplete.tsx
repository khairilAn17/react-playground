import { useId, useCallback, useMemo } from 'react'
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material'
import type {
  SxProps,
  Theme,
  AutocompleteRenderInputParams,
  AutocompleteValue,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'

import { toSxArray } from '../select/utils'
import type {
  AutocompleteProps,
  AutocompleteOption,
  AutocompleteRenderGetTagProps,
} from './types'
import { AutocompleteOptionRow } from './AutocompleteOptionRow'
import { renderDefaultTags } from './AutocompleteTag'
import {
  getAutocompleteInputSx,
  getAutocompletePaperSx,
  getAutocompleteListboxSx,
} from './utils'

// ── Module-level stable defaults ──────────────────────────────────────────────
// Defined at module scope so their references are stable across renders.
// Defining them as inline prop defaults would create new function objects on
// every render, invalidating every useCallback that lists them as a dependency.
function defaultGetOptionLabel<T>(option: T): string {
  if (typeof option === 'string') return option
  if (option && typeof option === 'object' && 'label' in option) {
    return String((option as unknown as AutocompleteOption).label ?? '')
  }
  return String(option ?? '')
}

function defaultIsOptionEqualToValue<T>(option: T, value: T): boolean {
  if (option === value) return true
  if (
    option &&
    value &&
    typeof option === 'object' &&
    typeof value === 'object' &&
    'value' in option &&
    'value' in value
  ) {
    return (
      (option as unknown as AutocompleteOption).value ===
      (value as unknown as AutocompleteOption).value
    )
  }
  return false
}

// ── MUI InputProps escape hatch ───────────────────────────────────────────────
// MUI's AutocompleteRenderInputParams.InputProps is typed as a union of three
// InputBase variants (Outlined / Filled / Standard). We need to read its
// startAdornment / endAdornment to preserve the popup-indicator and tags that
// MUI injects there. Isolating the cast here keeps it out of component logic.
type RawMuiInputProps = {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  ref?: React.Ref<unknown>
  className?: string
  [key: string]: unknown
}

function extractMuiInputProps(params: AutocompleteRenderInputParams): RawMuiInputProps {
  const raw = params as unknown as { InputProps?: RawMuiInputProps }
  return raw.InputProps ?? {}
}

// ─────────────────────────────────────────────────────────────────────────────

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
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const generatedId = useId()
  const triggerId = id || generatedId
  const labelId = label ? `${triggerId}-label` : undefined
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  // Compute once; used in both the wrapper Box and getAutocompleteInputSx call.
  const formattedRadius =
    typeof borderRadius === 'number' ? `${borderRadius}px` : (borderRadius ?? '12px')

  // Whether prefix/suffix blocks are active — drives wrapper vs. normal render.
  const hasPrefixBlock = Boolean(prefixBlock)
  const hasSuffixBlock = Boolean(suffixBlock)
  const hasBlocks = hasPrefixBlock || hasSuffixBlock

  // ── Stable slotProps sub-objects ──────────────────────────────────────────────
  // Extract paper/listbox overrides into stable references so resolvedSlotProps
  // doesn't create a new object on every render when slotProps hasn't changed.
  const userPaperSlot = useMemo(
    () =>
      typeof slotProps?.paper === 'object' && slotProps.paper !== null
        ? (slotProps.paper as Record<string, unknown>)
        : {},
    [slotProps?.paper]
  )

  const userListboxSlot = useMemo(
    () =>
      typeof slotProps?.listbox === 'object' && slotProps.listbox !== null
        ? (slotProps.listbox as Record<string, unknown>)
        : {},
    [slotProps?.listbox]
  )

  // ── Normalized slotSx sub-objects ─────────────────────────────────────────────
  // Each memo uses only the individual slotSx keys it consumes rather than the
  // whole slotSx object, so the stable reference is maintained when only
  // unrelated keys change.
  const normalizedOptionSlotSx = useMemo(
    () => ({
      option: slotSx?.option,
      optionLabel: slotSx?.optionLabel,
      optionSubtitle: slotSx?.optionSubtitle,
      optionCheckbox: slotSx?.optionCheckbox,
      optionAvatar: slotSx?.optionAvatar,
      optionIcon: slotSx?.optionIcon,
    }),
    [
      slotSx?.option,
      slotSx?.optionLabel,
      slotSx?.optionSubtitle,
      slotSx?.optionCheckbox,
      slotSx?.optionAvatar,
      slotSx?.optionIcon,
    ]
  )

  const normalizedTagSlotSx = useMemo(
    () => ({
      tagChip: slotSx?.tagChip,
      tagAvatar: slotSx?.tagAvatar,
      tagIcon: slotSx?.tagIcon,
      tagLabel: slotSx?.tagLabel,
      tagOverflow: slotSx?.tagOverflow,
    }),
    [
      slotSx?.tagChip,
      slotSx?.tagAvatar,
      slotSx?.tagIcon,
      slotSx?.tagLabel,
      slotSx?.tagOverflow,
    ]
  )

  // ── Option renderer ────────────────────────────────────────────────────────────
  const defaultRenderOption = useCallback(
    (
      optionProps: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
      option: T,
      state: { selected: boolean }
    ) => {
      const { key, ...restOptionProps } = optionProps
      const opt = option as unknown as AutocompleteOption

      return (
        <AutocompleteOptionRow
          key={key}
          option={opt}
          label={getOptionLabel(option)}
          selected={state.selected}
          multiple={Boolean(multiple)}
          checkboxPlacement={checkboxPlacement}
          size={size}
          slotSx={normalizedOptionSlotSx}
          {...restOptionProps}
        />
      )
    },
    [getOptionLabel, multiple, checkboxPlacement, size, normalizedOptionSlotSx]
  )

  // ── Tag / value renderer (MUI v9 renderValue API) ─────────────────────────────
  const resolvedRenderValue = useCallback(
    (
      tagValue: unknown,
      getItemProps: AutocompleteRenderGetTagProps,
      ownerState: unknown
    ) => {
      if (renderValue) {
        return renderValue(tagValue, getItemProps, ownerState)
      }
      if (renderTags && Array.isArray(tagValue)) {
        return renderTags(tagValue as T[], getItemProps)
      }
      if (Array.isArray(tagValue)) {
        return renderDefaultTags({
          tagValue: tagValue as T[],
          getTagProps: getItemProps,
          size,
          maxVisibleTags,
          tagDisplay,
          tagSx: slotSx?.tag,
          slotSx: normalizedTagSlotSx,
          getOptionLabel,
        })
      }
      return null
    },
    [
      renderValue,
      renderTags,
      size,
      maxVisibleTags,
      tagDisplay,
      slotSx?.tag,
      normalizedTagSlotSx,
      getOptionLabel,
    ]
  )

  // ── Input renderer ────────────────────────────────────────────────────────────
  // When prefix/suffix blocks are present the TextField is rendered borderless —
  // the outer wrapper Box (see JSX below) owns the border, border-radius, and
  // focus ring via CSS :focus-within. In the normal (no-blocks) path the
  // TextField behaves exactly as before.
  const renderInputCallback = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const muiInputProps = extractMuiInputProps(params)

      // Merge user-supplied inline adornments around MUI's own popup-indicator /
      // chip adornments. Prefix/suffix blocks live in the wrapper, not here.
      const inputPropsOverride = {
        ...muiInputProps,
        startAdornment: startAdornment ? (
          <>
            <Box sx={[{ display: 'inline-flex', alignItems: 'center', mr: 0.75 }, ...toSxArray(slotSx?.startAdornment)]}>
              {startAdornment}
            </Box>
            {muiInputProps.startAdornment}
          </>
        ) : muiInputProps.startAdornment,
        endAdornment: endAdornment ? (
          <>
            {muiInputProps.endAdornment}
            <Box sx={[{ display: 'inline-flex', alignItems: 'center', ml: 0.75 }, ...toSxArray(slotSx?.endAdornment)]}>
              {endAdornment}
            </Box>
          </>
        ) : muiInputProps.endAdornment,
      }

      // Strip the OutlinedInput border when the wrapper Box owns it.
      const borderlessSx: SxProps<Theme> = hasBlocks ? {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          '& fieldset': { border: 'none' },
          '&:hover fieldset': { border: 'none' },
          '&.Mui-focused fieldset': { border: 'none' },
          '&.Mui-focused': { boxShadow: 'none' },
        },
      } : {}

      return (
        <TextField
          {...params}
          {...textFieldProps}
          name={name}
          inputRef={inputRef}
          placeholder={placeholder}
          error={error}
          {...({ InputProps: inputPropsOverride } as Record<string, unknown>)}
          sx={[
            ...toSxArray(getAutocompleteInputSx({ size, borderRadius, error, disabled })),
            borderlessSx,
            ...toSxArray(textFieldProps?.sx as SxProps<Theme>),
            ...toSxArray(slotSx?.textField),
          ]}
        />
      )
    },
    [
      hasBlocks,
      startAdornment,
      endAdornment,
      textFieldProps,
      name,
      inputRef,
      placeholder,
      error,
      size,
      borderRadius,
      disabled,
      slotSx?.startAdornment,
      slotSx?.endAdornment,
      slotSx?.textField,
    ]
  )

  // ── Change handler ─────────────────────────────────────────────────────────────
  // Bridges MUI's onChange with the simplified onValueChange helper prop.
  const handleMuiChange = useCallback(
    (
      event: React.SyntheticEvent,
      value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
      reason: string,
      details?: unknown
    ) => {
      onValueChange?.(value)
      onChange?.(event as React.SyntheticEvent, value, reason as never, details as never)
    },
    [onValueChange, onChange]
  )

  // ── Resolved slotProps ────────────────────────────────────────────────────────
  const resolvedSlotProps = useMemo(
    () => ({
      ...slotProps,
      paper: {
        ...userPaperSlot,
        sx: [
          ...toSxArray(getAutocompletePaperSx(borderRadius)),
          ...toSxArray(userPaperSlot.sx as SxProps<Theme>),
          ...toSxArray(slotSx?.paper),
        ],
      },
      listbox: {
        ...userListboxSlot,
        sx: [
          ...toSxArray(getAutocompleteListboxSx(size)),
          ...toSxArray(userListboxSlot.sx as SxProps<Theme>),
          ...toSxArray(slotSx?.listbox),
        ],
      },
    }),
    [slotProps, userPaperSlot, userListboxSlot, borderRadius, size, slotSx?.paper, slotSx?.listbox]
  )

  const resolvedRenderValueProp =
    multiple || renderValue || renderTags
      ? (resolvedRenderValue as typeof renderValue)
      : undefined

  // ── Shared MuiAutocomplete props ──────────────────────────────────────────────
  // Extracted once to avoid duplicating the full prop list in the two JSX
  // branches (with-wrapper vs. without-wrapper) below.
  type MuiProps = React.ComponentProps<typeof MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>>
  const sharedMuiProps: Omit<MuiProps, 'sx'> = {
    ...(props as unknown as Omit<MuiProps, 'sx'>),
    id: triggerId,
    multiple,
    disabled,
    fullWidth,
    options,
    getOptionLabel,
    isOptionEqualToValue,
    onChange: handleMuiChange,
    popupIcon: <KeyboardArrowDownIcon sx={{ fontSize: isSmall ? 20 : 22 }} />,
    clearIcon: <CloseIcon sx={{ fontSize: isSmall ? 18 : 20 }} />,
    slotProps: resolvedSlotProps,
    renderOption: renderOption ?? defaultRenderOption,
    renderValue: resolvedRenderValueProp,
    renderInput: renderInputCallback,
  }

  // ── Block sidebar styles ──────────────────────────────────────────────────────
  const blockSidebarSx = (side: 'left' | 'right'): SxProps<Theme> => [
    (theme: Theme) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      px: isLarge ? 2 : isSmall ? 1.25 : 1.75,
      bgcolor: '#F1F5F9',
      ...(side === 'left'
        ? { borderRight: '1px solid', borderColor: error ? theme.palette.error.main : theme.palette.divider }
        : { borderLeft: '1px solid', borderColor: error ? theme.palette.error.main : theme.palette.divider }),
      fontWeight: 700,
      fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
      color: theme.palette.text.primary,
      userSelect: 'none',
      flexShrink: 0,
    }),
    ...toSxArray(side === 'left' ? slotSx?.prefixBlock : slotSx?.suffixBlock),
  ]

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      sx={[
        { width: fullWidth ? '100%' : 'auto' },
        ...toSxArray(slotSx?.formControl),
      ]}
    >
      {label && (
        <InputLabel
          id={labelId}
          htmlFor={triggerId}
          shrink
          error={error}
          disabled={disabled}
          sx={[
            {
              position: 'static',
              transform: 'none',
              mb: 0.75,
              fontWeight: 600,
              fontSize: isSmall ? '0.8125rem' : '0.875rem',
              color: error ? 'error.main' : 'text.primary',
            },
            ...toSxArray(slotSx?.inputLabel),
          ]}
        >
          {label}
        </InputLabel>
      )}

      {/* When blocks are present: wrapper Box owns the border + focus ring via
          CSS :focus-within so no JS focus state is required. The TextField
          inside is rendered borderless (see renderInputCallback above). */}
      {hasBlocks ? (
        <Box
          sx={[
            (theme: Theme) => ({
              display: 'flex',
              alignItems: 'stretch',
              width: fullWidth ? '100%' : 'auto',
              minHeight: isLarge ? 56 : isSmall ? 40 : 48,
              borderRadius: formattedRadius,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: error ? theme.palette.error.main : theme.palette.divider,
              bgcolor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
              transition: theme.transitions.create(['border-color', 'box-shadow']),
              '&:hover': {
                borderColor: disabled ? undefined : error ? theme.palette.error.main : theme.palette.primary.main,
              },
              '&:focus-within': {
                borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'}`,
              },
            }),
          ]}
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
