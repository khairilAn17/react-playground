import { useCallback, useMemo } from 'react'
import { TextField, Box } from '@mui/material'
import type { SxProps, Theme, AutocompleteRenderInputParams, AutocompleteValue } from '@mui/material'

import { toSxArray } from '../../select/utils'
import type {
  AutocompleteOption,
  AutocompleteSlotSx,
  AutocompleteRenderGetTagProps,
} from '../types'
import type { AutocompleteProps } from '../types'
import { AutocompleteOptionRow } from '../AutocompleteOptionRow'
import { renderDefaultTags } from '../AutocompleteTag'
import {
  getAutocompleteInputSx,
  getAutocompletePaperSx,
  getAutocompleteListboxSx,
} from '../utils'
import { extractMuiInputProps } from '../utils/defaults'

// ── Param types ───────────────────────────────────────────────────────────────

interface UseAutocompleteHandlersParams<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  size: 'small' | 'medium' | 'large'
  borderRadius: number | string
  error: boolean
  disabled: boolean
  hasBlocks: boolean
  name?: string
  inputRef?: React.Ref<HTMLInputElement>
  placeholder?: string
  textFieldProps?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['textFieldProps']
  getOptionLabel: (option: T) => string
  multiple: Multiple
  checkboxPlacement: 'left' | 'right' | false
  renderTags?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderTags']
  renderValue?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderValue']
  maxVisibleTags?: number
  tagDisplay: 'avatar+label' | 'label'
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  slotSx?: AutocompleteSlotSx
  slotProps?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['slotProps']
  onChange?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['onChange']
  onValueChange?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['onValueChange']
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAutocompleteHandlers<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  size,
  borderRadius,
  error,
  disabled,
  hasBlocks,
  name,
  inputRef,
  placeholder,
  textFieldProps,
  getOptionLabel,
  multiple,
  checkboxPlacement,
  renderTags,
  renderValue,
  maxVisibleTags,
  tagDisplay,
  startAdornment,
  endAdornment,
  slotSx,
  slotProps,
  onChange,
  onValueChange,
}: UseAutocompleteHandlersParams<T, Multiple, DisableClearable, FreeSolo>) {
  const isSmall = size === 'small'

  // ── Stable slotProps extractions ───────────────────────────────────────────
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

  // ── Normalized slotSx sub-objects ─────────────────────────────────────────
  // Each memo tracks only the keys it uses, so unrelated slotSx changes don't
  // invalidate downstream option/tag renderers.
  const normalizedOptionSlotSx = useMemo(
    () => ({
      option: slotSx?.option,
      optionLabel: slotSx?.optionLabel,
      optionSubtitle: slotSx?.optionSubtitle,
      optionCheckbox: slotSx?.optionCheckbox,
      optionAvatar: slotSx?.optionAvatar,
      optionIcon: slotSx?.optionIcon,
    }),
    [slotSx?.option, slotSx?.optionLabel, slotSx?.optionSubtitle, slotSx?.optionCheckbox, slotSx?.optionAvatar, slotSx?.optionIcon]
  )

  const normalizedTagSlotSx = useMemo(
    () => ({
      tagChip: slotSx?.tagChip,
      tagAvatar: slotSx?.tagAvatar,
      tagIcon: slotSx?.tagIcon,
      tagLabel: slotSx?.tagLabel,
      tagOverflow: slotSx?.tagOverflow,
    }),
    [slotSx?.tagChip, slotSx?.tagAvatar, slotSx?.tagIcon, slotSx?.tagLabel, slotSx?.tagOverflow]
  )

  // ── Option renderer ────────────────────────────────────────────────────────
  const defaultRenderOption = useCallback(
    (
      optionProps: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
      option: T,
      state: { selected: boolean }
    ) => {
      const { key, ...restOptionProps } = optionProps
      return (
        <AutocompleteOptionRow
          key={key}
          option={option as unknown as AutocompleteOption}
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

  // ── Tag / value renderer ───────────────────────────────────────────────────
  const resolvedRenderValue = useCallback(
    (tagValue: unknown, getItemProps: AutocompleteRenderGetTagProps, ownerState: unknown) => {
      if (renderValue) return renderValue(tagValue, getItemProps, ownerState)
      if (renderTags && Array.isArray(tagValue)) return renderTags(tagValue as T[], getItemProps)
      if (Array.isArray(tagValue)) {
        return renderDefaultTags({
          tagValue: tagValue as T[],
          getTagProps: getItemProps,
          size, maxVisibleTags, tagDisplay,
          tagSx: slotSx?.tag,
          slotSx: normalizedTagSlotSx,
          getOptionLabel,
        })
      }
      return null
    },
    [renderValue, renderTags, size, maxVisibleTags, tagDisplay, slotSx?.tag, normalizedTagSlotSx, getOptionLabel]
  )

  // ── Input renderer ─────────────────────────────────────────────────────────
  // When hasBlocks is true the TextField is borderless — the wrapper Box owns
  // the border and focus ring via CSS :focus-within.
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const muiInputProps = extractMuiInputProps(params)

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
    [hasBlocks, startAdornment, endAdornment, textFieldProps, name, inputRef, placeholder,
      error, size, borderRadius, disabled, slotSx?.startAdornment, slotSx?.endAdornment, slotSx?.textField]
  )

  // ── Change handler ─────────────────────────────────────────────────────────
  const handleChange = useCallback(
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

  // ── Resolved slotProps ─────────────────────────────────────────────────────
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

  return {
    renderInput,
    defaultRenderOption,
    resolvedRenderValueProp,
    resolvedSlotProps,
    handleChange,
    isSmall,
  }
}
