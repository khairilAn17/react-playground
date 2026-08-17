import { useState, useRef, useImperativeHandle } from 'react'
import type { ChangeEvent, KeyboardEvent, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Box, InputBase, InputAdornment, IconButton, Typography, CircularProgress } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'

import type { SearchInputProps, SearchVariant, SearchSize } from './types'

export type { SearchInputProps, SearchVariant, SearchSize, SearchInputSlotSx } from './types'

// ─── Design tokens ───────────────────────────────────────────────────────────
const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatBorderRadius(val?: number | string): string | undefined {
  if (val === undefined) return undefined
  return typeof val === 'number' ? `${val}px` : val
}

/**
 * Returns sx styles for the InputBase root element per variant.
 * Uses MUI theme palette tokens so the component is dark-mode safe.
 */
function getVariantStyles(
  variant: SearchVariant,
  custom?: {
    borderColor?: string
    focusBorderColor?: string
    borderRadius?: number | string
    focusBoxShadow?: string
    disableFocusRing?: boolean
  }
): SxProps<Theme> {
  const customRadius = formatBorderRadius(custom?.borderRadius)
  const isFocusDisabled = custom?.disableFocusRing === true
  const focusBorder = custom?.focusBorderColor ?? TEAL_PRIMARY
  const focusShadow = custom?.focusBoxShadow ?? 'none'

  switch (variant) {
    case 'pill': {
      const idleBorder = custom?.borderColor ?? 'transparent'
      return {
        borderRadius: customRadius ?? '50px',
        bgcolor: 'grey.100',           // theme-aware: #F3F4F6
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          bgcolor: 'grey.200',
          borderColor: custom?.borderColor ?? 'grey.300',
        },
        '&.Mui-focused': {
          borderColor: isFocusDisabled ? idleBorder : focusBorder,
          ...(focusShadow !== 'none' && !isFocusDisabled && { boxShadow: focusShadow }),
        },
      }
    }
    case 'filled': {
      const idleBorder = custom?.borderColor ?? 'grey.200'
      return {
        borderRadius: customRadius ?? '10px',
        bgcolor: 'grey.50',            // theme-aware: #FAFAFA
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          borderColor: 'grey.300',
        },
        '&.Mui-focused': {
          borderColor: isFocusDisabled ? idleBorder : focusBorder,
          ...(focusShadow !== 'none' && !isFocusDisabled && { boxShadow: focusShadow }),
        },
      }
    }
    case 'standard': {
      const idleBorder = custom?.borderColor ?? 'grey.200'
      return {
        borderRadius: 0,
        bgcolor: 'transparent',
        borderBottom: '1px solid',
        borderBottomColor: idleBorder,
        '&:hover': {
          borderBottomColor: 'grey.300',
        },
        '&.Mui-focused': {
          borderBottomColor: isFocusDisabled ? idleBorder : focusBorder,
        },
      }
    }
    case 'outlined':
    default: {
      const idleBorder = custom?.borderColor ?? 'grey.300'
      return {
        borderRadius: customRadius ?? '10px',
        bgcolor: 'background.paper',   // theme-aware: #FFFFFF / dark: #1e1e1e
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          borderColor: 'grey.400',
        },
        '&.Mui-focused': {
          borderColor: isFocusDisabled ? idleBorder : focusBorder,
          ...(focusShadow !== 'none' && !isFocusDisabled && { boxShadow: focusShadow }),
        },
      }
    }
  }
}

function getSizeStyles(size: SearchSize) {
  switch (size) {
    case 'small':
      return { py: 0.25, px: 1.25, minHeight: 34, fontSize: '0.8125rem', iconSize: '1rem', spinnerSize: 15 }
    case 'large':
      return { py: 0.75, px: 2, minHeight: 48, fontSize: '1rem', iconSize: '1.35rem', spinnerSize: 22 }
    case 'medium':
    default:
      return { py: 0.5, px: 1.5, minHeight: 40, fontSize: '0.875rem', iconSize: '1.15rem', spinnerSize: 18 }
  }
}

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
    if (e.key === 'Enter') onSearch?.(currentValue ?? '')
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
        // Layout
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
          // Input element itself
          '& input': {
            fontSize: sizeStyle.fontSize,
            color: TEXT_MAIN,
            py: 0,
            px: 0,
            // Browsers apply a UA outline; remove it cleanly without !important
            // because InputBase is the real focus container
            outline: 0,
            '&::placeholder': {
              color: 'text.disabled',
              opacity: 1,
            },
          },
          // Adornment icons sizing
          '& .MuiInputAdornment-root': {
            color: 'inherit',
          },
        },
        // Variant-specific border / radius / bgcolor
        variantStyle,
        // Optional bgcolor override
        ...(bgcolor ? [{ bgcolor }] : []),
        // SlotSx container overrides
        ...(slotSx?.container
          ? Array.isArray(slotSx.container)
            ? slotSx.container
            : [slotSx.container]
          : []),
        // Input slot sx (targets the inner <input> element)
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

