import { useId, useCallback } from 'react'
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import type { SxProps, Theme, AutocompleteRenderInputParams } from '@mui/material'
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
  getOptionLabel = (option) => {
    if (typeof option === 'string') return option
    if (option && typeof option === 'object' && 'label' in option) {
      return String((option as unknown as AutocompleteOption).label ?? '')
    }
    return String(option ?? '')
  },
  isOptionEqualToValue = (option, value) => {
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
  },
  renderOption,
  renderTags,
  renderValue,
  slotProps,
  multiple = false as Multiple,
  checkboxPlacement = 'right',
  maxVisibleTags,
  tagDisplay = 'avatar+label',
  onChange,
  onValueChange,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const generatedId = useId()
  const triggerId = id || generatedId
  const labelId = label ? `${triggerId}-label` : undefined
  const isSmall = size === 'small'

  const userPaperSlot =
    typeof slotProps?.paper === 'object' && slotProps?.paper !== null
      ? (slotProps.paper as Record<string, unknown>)
      : {}
  const userListboxSlot =
    typeof slotProps?.listbox === 'object' && slotProps?.listbox !== null
      ? (slotProps.listbox as Record<string, unknown>)
      : {}

  // ── 1. Memoized option renderer ──────────────────────────────────────────
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
          slotSx={{
            option: slotSx?.option,
            optionLabel: slotSx?.optionLabel,
            optionSubtitle: slotSx?.optionSubtitle,
            optionCheckbox: slotSx?.optionCheckbox,
            optionAvatar: slotSx?.optionAvatar,
            optionIcon: slotSx?.optionIcon,
          }}
          {...restOptionProps}
        />
      )
    },
    [
      getOptionLabel,
      multiple,
      checkboxPlacement,
      size,
      slotSx?.option,
      slotSx?.optionLabel,
      slotSx?.optionSubtitle,
      slotSx?.optionCheckbox,
      slotSx?.optionAvatar,
      slotSx?.optionIcon,
    ]
  )

  // ── 2. Memoized tag / value renderer (MUI v9 renderValue) ────────────────
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
          slotSx: {
            tagChip: slotSx?.tagChip,
            tagAvatar: slotSx?.tagAvatar,
            tagIcon: slotSx?.tagIcon,
            tagLabel: slotSx?.tagLabel,
            tagOverflow: slotSx?.tagOverflow,
          },
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
      slotSx?.tagChip,
      slotSx?.tagAvatar,
      slotSx?.tagIcon,
      slotSx?.tagLabel,
      slotSx?.tagOverflow,
      getOptionLabel,
    ]
  )

  // ── 3. Memoized input renderer ───────────────────────────────────────────
  const renderInputCallback = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        {...textFieldProps}
        name={name}
        inputRef={inputRef}
        placeholder={placeholder}
        error={error}
        sx={[
          ...toSxArray(getAutocompleteInputSx({ size, borderRadius, error, disabled })),
          ...toSxArray(textFieldProps?.sx as SxProps<Theme>),
          ...toSxArray(slotSx?.textField),
        ]}
      />
    ),
    [
      textFieldProps,
      name,
      inputRef,
      placeholder,
      error,
      size,
      borderRadius,
      disabled,
      slotSx?.textField,
    ]
  )

  // ── 4. Memoized change handler supporting onValueChange ─────────────────
  const handleMuiChange = useCallback(
    (
      event: React.SyntheticEvent,
      value: unknown,
      reason: string,
      details?: unknown
    ) => {
      onValueChange?.(value as any)
      onChange?.(event as any, value as any, reason as any, details as any)
    },
    [onValueChange, onChange]
  )

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
        slotProps={{
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
        }}
        renderOption={renderOption ?? defaultRenderOption}
        {...(multiple || renderValue || renderTags
          ? { renderValue: resolvedRenderValue as typeof renderValue }
          : {})}
        renderInput={renderInputCallback}
        sx={[
          { width: fullWidth ? '100%' : 'auto' },
          ...toSxArray(slotSx?.root),
        ]}
      />

      {helperText && (
        <FormHelperText
          sx={[{ mx: 0, mt: 0.5 }, ...toSxArray(slotSx?.helperText)]}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
