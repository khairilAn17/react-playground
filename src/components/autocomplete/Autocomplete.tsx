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

// ── Fix 1: Module-level stable defaults ───────────────────────────────────────
// Defined once at module scope so they are stable references across renders.
// Inline parameter defaults create new function objects on every render,
// busting all useCallback caches that list them as dependencies.
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

  // ── Fix 2: Memoize slotProps.paper and slotProps.listbox extractions ────────
  // Without useMemo, new object references are created on every render even
  // when nothing has changed, causing downstream effects to re-fire.
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

  // ── Fix 6: Normalize slotSx into stable sub-slot objects once ───────────────
  // Pass the whole slotSx object as a single dep instead of listing every key
  // individually across three separate useCallback dep arrays.
  const normalizedOptionSlotSx = useMemo(
    () => ({
      option: slotSx?.option,
      optionLabel: slotSx?.optionLabel,
      optionSubtitle: slotSx?.optionSubtitle,
      optionCheckbox: slotSx?.optionCheckbox,
      optionAvatar: slotSx?.optionAvatar,
      optionIcon: slotSx?.optionIcon,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slotSx]
  )

  const normalizedTagSlotSx = useMemo(
    () => ({
      tagChip: slotSx?.tagChip,
      tagAvatar: slotSx?.tagAvatar,
      tagIcon: slotSx?.tagIcon,
      tagLabel: slotSx?.tagLabel,
      tagOverflow: slotSx?.tagOverflow,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slotSx]
  )

  // ── 1. Memoized option renderer ──────────────────────────────────────────────
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

  // ── 2. Memoized tag / value renderer (MUI v9 renderValue) ────────────────────
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

  // ── 3. Memoized input renderer ────────────────────────────────────────────────
  const renderInputCallback = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const blockPx = isLarge ? 2 : isSmall ? 1.25 : 1.75

      const prefixBlockElement = prefixBlock ? (
        <Box
          sx={[
            (theme: Theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // The MuiOutlinedInput root has `pl` zeroed below — this block fills from the left edge
              alignSelf: 'stretch',
              // Counteract MUI's internal 14px left padding on the adornment wrapper
              ml: '-14px',
              mr: 1.5,
              px: blockPx,
              bgcolor: '#F1F5F9',
              borderRight: '1px solid',
              borderColor: error ? theme.palette.error.main : theme.palette.divider,
              fontWeight: 700,
              fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
              color: theme.palette.text.primary,
              userSelect: 'none',
              flexShrink: 0,
            }),
            ...toSxArray(slotSx?.prefixBlock),
          ]}
        >
          {prefixBlock}
        </Box>
      ) : null

      const suffixBlockElement = suffixBlock ? (
        <Box
          sx={[
            (theme: Theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'stretch',
              // Counteract MUI's internal 8px right padding on the adornment wrapper
              mr: '-8px',
              ml: 1,
              px: blockPx,
              bgcolor: '#F1F5F9',
              borderLeft: '1px solid',
              borderColor: error ? theme.palette.error.main : theme.palette.divider,
              fontWeight: 700,
              fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
              color: theme.palette.text.primary,
              userSelect: 'none',
              flexShrink: 0,
            }),
            ...toSxArray(slotSx?.suffixBlock),
          ]}
        >
          {suffixBlock}
        </Box>
      ) : null

      const rawParams = params as unknown as {
        InputProps?: {
          startAdornment?: React.ReactNode
          endAdornment?: React.ReactNode
          ref?: React.Ref<unknown>
          className?: string
          [key: string]: unknown
        }
        [key: string]: unknown
      }
      const rawInputProps = rawParams.InputProps ?? {}

      const inputPropsOverride = {
        ...rawInputProps,
        startAdornment: (
          <>
            {prefixBlockElement}
            {startAdornment && (
              <Box sx={[{ display: 'inline-flex', alignItems: 'center', mr: 0.75 }, ...toSxArray(slotSx?.startAdornment)]}>
                {startAdornment}
              </Box>
            )}
            {rawInputProps.startAdornment}
          </>
        ),
        endAdornment: (
          <>
            {endAdornment && (
              <Box sx={[{ display: 'inline-flex', alignItems: 'center', ml: 0.75 }, ...toSxArray(slotSx?.endAdornment)]}>
                {endAdornment}
              </Box>
            )}
            {rawInputProps.endAdornment}
            {suffixBlockElement}
          </>
        ),
      }

      // When prefix/suffix blocks are present, zero out the root's left/right padding
      // so the blocks flush to the container edge (overflow:hidden on the root clips cleanly)
      const blockOverrideSx: SxProps<Theme> = (prefixBlock || suffixBlock) ? {
        '& .MuiOutlinedInput-root': {
          overflow: 'hidden',
          ...(prefixBlock ? { pl: 0 } : {}),
          ...(suffixBlock ? { pr: 0 } : {}),
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
          {...({
            InputProps: inputPropsOverride,
          } as Record<string, unknown>)}
          sx={[
            ...toSxArray(getAutocompleteInputSx({ size, borderRadius, error, disabled })),
            blockOverrideSx,
            ...toSxArray(textFieldProps?.sx as SxProps<Theme>),
            ...toSxArray(slotSx?.textField),
          ]}
        />
      )
    },
    [
      prefixBlock,
      suffixBlock,
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
      isLarge,
      isSmall,
      slotSx?.prefixBlock,
      slotSx?.suffixBlock,
      slotSx?.startAdornment,
      slotSx?.endAdornment,
      slotSx?.textField,
    ]
  )

  // ── 4. Memoized change handler supporting onValueChange ──────────────────────
  // Fix 3: Narrow `value` to the proper generic type instead of casting to `any`.
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

  // ── Memoized resolved slotProps ───────────────────────────────────────────────
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

  // Fix 4: Clean ternary instead of conditional spread for renderValue
  const resolvedRenderValueProp =
    multiple || renderValue || renderTags
      ? (resolvedRenderValue as typeof renderValue)
      : undefined

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

      <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
        {...(props as unknown as object)}
        id={triggerId}
        multiple={multiple}
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={handleMuiChange}
        popupIcon={<KeyboardArrowDownIcon sx={{ fontSize: isSmall ? 20 : 22 }} />}
        clearIcon={<CloseIcon sx={{ fontSize: isSmall ? 18 : 20 }} />}
        slotProps={resolvedSlotProps}
        renderOption={renderOption ?? defaultRenderOption}
        renderValue={resolvedRenderValueProp}
        renderInput={renderInputCallback}
        sx={[
          { width: fullWidth ? '100%' : 'auto' },
          ...toSxArray(slotSx?.root),
        ]}
      />

      {helperText && (
        <FormHelperText sx={[{ mx: 0, mt: 0.5 }, ...toSxArray(slotSx?.helperText)]}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

// Fix 5: Named displayName for React DevTools identification
Autocomplete.displayName = 'Autocomplete'
