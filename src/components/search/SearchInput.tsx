import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import type { ChangeEvent, KeyboardEvent, ForwardedRef } from 'react'
import { InputBase, InputAdornment, IconButton, Typography, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'

import type { SearchInputProps } from './types'
import {
  TEAL_PRIMARY,
  TEXT_MAIN,
  TEXT_MUTED,
  getVariantStyles,
  getSizeStyles,
} from './utils'

export type { SearchInputProps, SearchVariant, SearchSize, SearchInputSlotSx } from './types'

// ─── Component ───────────────────────────────────────────────────────────────
export const SearchInput = forwardRef(function SearchInput(
  {
    variant = 'outlined',
    bgcolor,
    borderColor,
    focusBorderColor,
    borderRadius,
    focusBoxShadow,
    disableFocusRing = false,
    size = 'medium',
    value,
    defaultValue = '',
    placeholder = 'Search...',
    loading = false,
    loadingIndicator,
    onChange,
    onValueChange,
    onSearch,
    onClear,
    clearable = true,
    startIcon,
    endIcon,
    shortcut,
    fullWidth = true,
    disabled = false,
    autoFocus = false,
    slotSx,
    onKeyDown,
    ...inputBaseProps
  }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const innerRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const sizeStyle = getSizeStyles(size)
  const variantStyle = getVariantStyles(variant, {
    borderColor,
    focusBorderColor,
    borderRadius,
    focusBoxShadow,
    disableFocusRing,
  })

  const hasValue = Boolean(currentValue && currentValue.length > 0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value
    if (!isControlled) setInternalValue(nextVal)
    onValueChange?.(nextVal)
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue('')
    onClear?.()
    onValueChange?.('')
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    innerRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(currentValue ?? '')
    }
    if (e.key === 'Escape' && clearable && currentValue) handleClear()
    onKeyDown?.(e)
  }

  // ── End adornment: precedence — loading > clear > shortcut > endIcon ──────
  const endAdornment = (
    <>
      {loading && (
        <InputAdornment
          position="end"
          role="progressbar"
          aria-label="Loading search results"
          sx={[
            { color: TEAL_PRIMARY },
            ...(slotSx?.loadingIndicator
              ? Array.isArray(slotSx.loadingIndicator)
                ? slotSx.loadingIndicator
                : [slotSx.loadingIndicator]
              : []),
          ]}
        >
          {loadingIndicator ?? (
            <CircularProgress size={sizeStyle.spinnerSize} thickness={4.5} color="inherit" />
          )}
        </InputAdornment>
      )}

      {!loading && clearable && hasValue && !disabled && (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            aria-label="Clear search text"
            tabIndex={-1}
            sx={[
              { p: 0.2, color: 'grey.400', '&:hover': { color: 'grey.600' } },
              ...(slotSx?.clearButton
                ? Array.isArray(slotSx.clearButton)
                  ? slotSx.clearButton
                  : [slotSx.clearButton]
                : []),
            ]}
          >
            <CancelIcon sx={{ fontSize: sizeStyle.iconSize }} />
          </IconButton>
        </InputAdornment>
      )}

      {!loading && !hasValue && shortcut && (
        <InputAdornment position="end">
          <Typography
            variant="caption"
            sx={[
              {
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: TEXT_MUTED,
                bgcolor: variant === 'pill' ? 'grey.200' : 'grey.100',
                border: '1px solid',
                borderColor: 'grey.200',
                px: 0.75,
                py: 0.2,
                borderRadius: '4px',
                fontFamily: 'monospace',
                lineHeight: 1,
                userSelect: 'none',
              },
              ...(slotSx?.shortcut
                ? Array.isArray(slotSx.shortcut)
                  ? slotSx.shortcut
                  : [slotSx.shortcut]
                : []),
            ]}
          >
            {shortcut}
          </Typography>
        </InputAdornment>
      )}

      {endIcon && (
        <InputAdornment
          position="end"
          sx={[
            { color: 'grey.400' },
            ...(slotSx?.endIcon
              ? Array.isArray(slotSx.endIcon)
                ? slotSx.endIcon
                : [slotSx.endIcon]
              : []),
          ]}
        >
          {endIcon}
        </InputAdornment>
      )}
    </>
  )

  return (
    <InputBase
      inputRef={innerRef}
      value={currentValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      startAdornment={
        <InputAdornment
          position="start"
          sx={[
            { color: 'grey.400', mr: 0.5 },
            ...(slotSx?.startIcon
              ? Array.isArray(slotSx.startIcon)
                ? slotSx.startIcon
                : [slotSx.startIcon]
              : []),
          ]}
        >
          {startIcon ?? <SearchIcon sx={{ fontSize: sizeStyle.iconSize }} />}
        </InputAdornment>
      }
      endAdornment={endAdornment}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          width: fullWidth ? '100%' : 'auto',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
          opacity: disabled ? 0.6 : 1,
          py: sizeStyle.py,
          px: sizeStyle.px,
          minHeight: sizeStyle.minHeight,
          '& input': {
            fontSize: sizeStyle.fontSize,
            color: TEXT_MAIN,
            py: 0,
            px: 0,
            outline: 0,
            '&::placeholder': {
              color: 'text.disabled',
              opacity: 1,
            },
          },
          '& .MuiInputAdornment-root': {
            color: 'inherit',
          },
        },

        variantStyle,
        ...(bgcolor ? [{ bgcolor }] : []),
        ...(slotSx?.container
          ? Array.isArray(slotSx.container)
            ? slotSx.container
            : [slotSx.container]
          : []),
        ...(slotSx?.input
          ? Array.isArray(slotSx.input)
            ? slotSx.input.map((s) => ({ '& input': s }))
            : [{ '& input': slotSx.input }]
          : []),
      ]}
      {...inputBaseProps}
    />
  )
})

