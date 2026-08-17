import { forwardRef, useState, useId, useCallback } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import type { Theme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import type { TextFieldProps } from './types'
import { toSxArray, getTextFieldInputSx, getBlockSidebarSx } from './utils'

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  function TextField(
    {
      id,
      name,
      label,
      placeholder,
      value: controlledValue,
      defaultValue,
      onChange,
      onValueChange,
      onClear,
      prefixBlock,
      suffixBlock,
      startAdornment,
      endAdornment,
      clearable = false,
      showPasswordToggle = false,
      showCount = false,
      maxLength,
      min,
      max,
      step,
      hideSpinButtons = true,
      allowScrollWheel = false,
      error = false,
      disabled = false,
      readOnly = false,
      required = false,
      fullWidth = true,
      size = 'medium',
      borderRadius = '12px',
      helperText,
      multiline = false,
      rows,
      minRows,
      maxRows,
      type = 'text',
      slotSx,
      inputRef,
      sx,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const labelId = label ? `${inputId}-label` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = useState<string | number>(
      defaultValue ?? ''
    )
    const currentValue = isControlled ? controlledValue : internalValue
    const stringValue = currentValue !== undefined && currentValue !== null ? String(currentValue) : ''

    // Password show/hide state
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === 'password'
    const effectiveType = isPasswordType && showPassword ? 'text' : type

    const isSmall = size === 'small'
    const isLarge = size === 'large'
    const formattedRadius =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

    const hasPrefixBlock = Boolean(prefixBlock)
    const hasSuffixBlock = Boolean(suffixBlock)
    const hasBlocks = hasPrefixBlock || hasSuffixBlock

    // Change handler
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nextVal = event.target.value
        if (maxLength !== undefined && nextVal.length > maxLength) {
          return
        }
        if (!isControlled) {
          setInternalValue(nextVal)
        }
        onChange?.(event)
        onValueChange?.(nextVal)
      },
      [isControlled, maxLength, onChange, onValueChange]
    )

    // Clear handler
    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue('')
      }
      onValueChange?.('')
      onClear?.()
    }, [isControlled, onValueChange, onClear])

    // Toggle password visibility
    const handleTogglePassword = useCallback(() => {
      setShowPassword((prev) => !prev)
    }, [])

    // ── Build End Adornments ──────────────────────────────────────────────────
    const renderEndAdornments = () => {
      const showClearBtn = clearable && stringValue.length > 0 && !disabled && !readOnly
      const showPwdToggle = isPasswordType && showPasswordToggle && !disabled

      if (!endAdornment && !showClearBtn && !showPwdToggle && !showCount) {
        return null
      }

      return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, ml: 0.75 }}>
          {endAdornment}

          {/* Clear button */}
          {showClearBtn && (
            <IconButton
              size="small"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear input text"
              sx={[
                {
                  p: 0.5,
                  color: '#94A3B8',
                  '&:hover': { color: '#64748B', bgcolor: 'rgba(0,0,0,0.04)' },
                },
                ...toSxArray(slotSx?.clearButton),
              ]}
            >
              <CloseIcon sx={{ fontSize: isSmall ? 16 : 18 }} />
            </IconButton>
          )}

          {/* Password show/hide toggle */}
          {showPwdToggle && (
            <IconButton
              size="small"
              onClick={handleTogglePassword}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              sx={[
                {
                  p: 0.5,
                  color: '#94A3B8',
                  '&:hover': { color: '#64748B', bgcolor: 'rgba(0,0,0,0.04)' },
                },
                ...toSxArray(slotSx?.passwordToggleButton),
              ]}
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: isSmall ? 18 : 20 }} />
              ) : (
                <Visibility sx={{ fontSize: isSmall ? 18 : 20 }} />
              )}
            </IconButton>
          )}

          {/* Character counter (e.g. 15/75) */}
          {showCount && (
            <Typography
              component="span"
              sx={[
                {
                  fontSize: isSmall ? '0.75rem' : '0.8125rem',
                  fontWeight: 500,
                  color:
                    maxLength && stringValue.length >= maxLength
                      ? 'error.main'
                      : '#94A3B8',
                  userSelect: 'none',
                  ml: 0.5,
                },
                ...toSxArray(slotSx?.characterCount),
              ]}
            >
              {stringValue.length}
              {maxLength !== undefined ? `/${maxLength}` : ''}
            </Typography>
          )}
        </Box>
      )
    }

    const startAdornmentElement = startAdornment ? (
      <Box
        sx={[
          {
            display: 'inline-flex',
            alignItems: 'center',
            mr: 1,
            color: '#64748B',
          },
          ...toSxArray(slotSx?.startAdornment),
        ]}
      >
        {startAdornment}
      </Box>
    ) : undefined

    const inputComponent = (
      <OutlinedInput
        {...props}
        inputRef={inputRef || ref}
        id={inputId}
        name={name}
        type={effectiveType}
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        inputProps={{
          maxLength,
          min,
          max,
          step,
          'aria-describedby': helperText ? helperId : undefined,
          ...props.inputProps,
        }}
        onWheel={(e) => {
          if (effectiveType === 'number' && !allowScrollWheel) {
            ;(e.target as HTMLElement).blur()
          }
        }}
        startAdornment={startAdornmentElement}
        endAdornment={renderEndAdornments()}
        sx={[
          ...toSxArray(
            getTextFieldInputSx({
              size,
              borderRadius,
              error,
              disabled,
              hasBlocks,
              hideSpinButtons,
            })
          ),
          ...toSxArray(slotSx?.input),
        ]}
      />
    )

    return (
      <FormControl
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
        required={required}
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
          <InputLabel
            id={labelId}
            htmlFor={inputId}
            shrink
            error={error}
            disabled={disabled}
            required={required}
            sx={[
              {
                position: 'static',
                transform: 'none',
                mb: 0.75,
                fontWeight: 600,
                fontSize: isSmall ? '0.8125rem' : '0.875rem',
                color: error ? 'error.main' : 'text.primary',
                '&.Mui-focused': {
                  color: error ? 'error.main' : '#00A39D',
                },
              },
              ...toSxArray(slotSx?.inputLabel),
            ]}
          >
            {label}
          </InputLabel>
        )}

        {/* When prefix/suffix blocks are present: wrapper Box manages border + :focus-within */}
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
                borderColor: error ? theme.palette.error.main : '#E2E8F0',
                bgcolor: disabled
                  ? theme.palette.action.disabledBackground
                  : theme.palette.background.paper,
                transition: theme.transitions.create(['border-color', 'box-shadow']),
                '&:hover': {
                  borderColor: disabled
                    ? undefined
                    : error
                      ? theme.palette.error.main
                      : '#CBD5E1',
                },
                '&:focus-within': {
                  borderColor: error ? theme.palette.error.main : '#00A39D',
                  boxShadow: `0 0 0 3px ${
                    error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'
                  }`,
                },
              }),
            ]}
          >
            {hasPrefixBlock && (
              <Box sx={getBlockSidebarSx('left', size, error, slotSx?.prefixBlock)}>
                {prefixBlock}
              </Box>
            )}

            {inputComponent}

            {hasSuffixBlock && (
              <Box sx={getBlockSidebarSx('right', size, error, slotSx?.suffixBlock)}>
                {suffixBlock}
              </Box>
            )}
          </Box>
        ) : (
          inputComponent
        )}

        {helperText && (
          <FormHelperText
            id={helperId}
            sx={[
              {
                mx: 0,
                mt: 0.5,
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

TextField.displayName = 'TextField'
