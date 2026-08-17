import { useState, useRef, useImperativeHandle } from 'react'
import type { ChangeEvent, KeyboardEvent, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Box, InputBase, IconButton, Typography, CircularProgress } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'

import type { SearchInputProps, SearchVariant, SearchSize } from './types'

export type { SearchInputProps, SearchVariant, SearchSize, SearchInputSlotSx } from './types'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

function formatBorderRadius(val?: number | string): string | undefined {
  if (val === undefined) return undefined
  return typeof val === 'number' ? `${val}px` : val
}

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
        bgcolor: '#F1F5F9',
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          bgcolor: '#E2E8F0',
          borderColor: custom?.borderColor ?? '#CBD5E1',
        },
        '&:focus-within': {
          borderColor: isFocusDisabled ? idleBorder : focusBorder,
          ...(focusShadow !== 'none' && !isFocusDisabled && { boxShadow: focusShadow }),
        },
      }
    }
    case 'filled': {
      const idleBorder = custom?.borderColor ?? '#E2E8F0'
      return {
        borderRadius: customRadius ?? '10px',
        bgcolor: '#F8FAFC',
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          borderColor: '#CBD5E1',
        },
        '&:focus-within': {
          borderColor: isFocusDisabled ? idleBorder : focusBorder,
          ...(focusShadow !== 'none' && !isFocusDisabled && { boxShadow: focusShadow }),
        },
      }
    }
    case 'standard': {
      const idleBorder = custom?.borderColor ?? '#E2E8F0'
      return {
        borderRadius: 0,
        bgcolor: 'transparent',
        borderBottom: '1px solid',
        borderBottomColor: idleBorder,
        '&:hover': {
          borderBottomColor: '#CBD5E1',
        },
        '&:focus-within': {
          borderBottomColor: isFocusDisabled ? idleBorder : focusBorder,
        },
      }
    }
    case 'outlined':
    default: {
      const idleBorder = custom?.borderColor ?? '#CBD5E1'
      return {
        borderRadius: customRadius ?? '10px',
        bgcolor: '#FFFFFF',
        border: '1px solid',
        borderColor: idleBorder,
        '&:hover': {
          borderColor: '#94A3B8',
        },
        '&:focus-within': {
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
      return {
        py: 0.25,
        px: 1.25,
        minHeight: 34,
        fontSize: '0.8125rem',
        iconSize: '1rem',
        spinnerSize: 15,
      }
    case 'large':
      return {
        py: 0.75,
        px: 2,
        minHeight: 48,
        fontSize: '1rem',
        iconSize: '1.35rem',
        spinnerSize: 22,
      }
    case 'medium':
    default:
      return {
        py: 0.5,
        px: 1.5,
        minHeight: 40,
        fontSize: '0.875rem',
        iconSize: '1.15rem',
        spinnerSize: 18,
      }
  }
}

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
    onSearch,
    onClear,
    clearable = true,
    startIcon,
    endIcon,
    shortcut,
    fullWidth = true,
    disabled = false,
    autoFocus = false,
    containerSx,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value
    if (!isControlled) {
      setInternalValue(nextVal)
    }
    onChange?.(nextVal, e)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('')
    }
    onClear?.()
    onChange?.('', { target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    innerRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(currentValue)
    }
    if (e.key === 'Escape' && clearable && currentValue) {
      handleClear()
    }
    onKeyDown?.(e)
  }

  const hasValue = Boolean(currentValue && currentValue.length > 0)

  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: fullWidth ? '100%' : 'auto',
          boxSizing: 'border-box',
          transition: 'all 0.15s ease-in-out',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          py: sizeStyle.py,
          px: sizeStyle.px,
          minHeight: sizeStyle.minHeight,
        },
        variantStyle,
        ...(bgcolor ? [{ bgcolor }] : []),
        ...(containerSx ? (Array.isArray(containerSx) ? containerSx : [containerSx]) : []),
        ...(slotSx?.container ? (Array.isArray(slotSx.container) ? slotSx.container : [slotSx.container]) : []),
      ]}
      onClick={() => {
        if (!disabled) {
          innerRef.current?.focus()
        }
      }}
    >
      {/* ── Leading Search Icon ── */}
      <Box
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            color: '#94A3B8',
            flexShrink: 0,
          },
          ...(slotSx?.startIcon ? (Array.isArray(slotSx.startIcon) ? slotSx.startIcon : [slotSx.startIcon]) : []),
        ]}
      >
        {startIcon ?? <SearchIcon sx={{ fontSize: sizeStyle.iconSize }} />}
      </Box>

      <InputBase
        inputRef={innerRef}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        fullWidth
        sx={[
          {
            fontSize: sizeStyle.fontSize,
            color: TEXT_MAIN,
            '& input': {
              py: 0,
              px: 0,
              outline: 'none !important',
              border: 'none !important',
              boxShadow: 'none !important',
              '&:focus': {
                outline: 'none !important',
                boxShadow: 'none !important',
              },
              '&::placeholder': {
                color: '#94A3B8',
                opacity: 1,
              },
            },
          },
          ...(slotSx?.input ? (Array.isArray(slotSx.input) ? slotSx.input : [slotSx.input]) : []),
        ]}
        {...inputBaseProps}
      />

      {/* ── Optional Keyboard Shortcut Badge (e.g. ⌘K) ── */}
      {shortcut && !hasValue && !loading && (
        <Typography
          variant="caption"
          sx={[
            {
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: TEXT_MUTED,
              bgcolor: variant === 'pill' ? '#E2E8F0' : '#F1F5F9',
              border: '1px solid #E2E8F0',
              px: 0.75,
              py: 0.2,
              borderRadius: '4px',
              fontFamily: 'monospace',
              lineHeight: 1,
              flexShrink: 0,
              userSelect: 'none',
            },
            ...(slotSx?.shortcut ? (Array.isArray(slotSx.shortcut) ? slotSx.shortcut : [slotSx.shortcut]) : []),
          ]}
        >
          {shortcut}
        </Typography>
      )}

      {/* ── Loading Spinner State ── */}
      {loading && (
        <Box
          role="progressbar"
          aria-label="Loading search results"
          sx={[
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: TEAL_PRIMARY,
              flexShrink: 0,
            },
            ...(slotSx?.loadingIndicator ? (Array.isArray(slotSx.loadingIndicator) ? slotSx.loadingIndicator : [slotSx.loadingIndicator]) : []),
          ]}
        >
          {loadingIndicator ?? (
            <CircularProgress
              size={sizeStyle.spinnerSize}
              thickness={4.5}
              color="inherit"
            />
          )}
        </Box>
      )}

      {/* ── (X) Clear Button (shown when text is present and not loading) ── */}
      {clearable && hasValue && !disabled && !loading && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            handleClear()
          }}
          aria-label="Clear search text"
          sx={[
            {
              p: 0.2,
              color: '#94A3B8',
              flexShrink: 0,
              '&:hover': {
                color: '#64748B',
              },
            },
            ...(slotSx?.clearButton ? (Array.isArray(slotSx.clearButton) ? slotSx.clearButton : [slotSx.clearButton]) : []),
          ]}
        >
          <CancelIcon sx={{ fontSize: sizeStyle.iconSize }} />
        </IconButton>
      )}

      {/* ── Optional Custom End Icon / Action Slot ── */}
      {endIcon && !hasValue && !loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {endIcon}
        </Box>
      )}
    </Box>
  )
})
