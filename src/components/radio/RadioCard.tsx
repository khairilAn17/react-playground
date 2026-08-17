import { forwardRef } from 'react'
import { Box, Typography } from '@mui/material'
import type { Theme } from '@mui/material'
import { Radio } from './Radio'
import type { RadioCardProps, RadioValue } from './types'

function toSxArray(sx: unknown) {
  if (!sx) return []
  return Array.isArray(sx) ? sx : [sx]
}

export const RadioCard = forwardRef<HTMLButtonElement, RadioCardProps<RadioValue>>(
  function RadioCard(
    {
      option,
      checked = false,
      size = 'medium',
      borderRadius = '12px',
      radioPlacement = 'left',
      disabled = false,
      error = false,
      fullWidth = true,
      slotSx,
      inputRef,
      name,
      onChange,
    },
    ref
  ) {
    const isOptionDisabled = disabled || option.disabled
    const isSmall = size === 'small'
    const isLarge = size === 'large'

    const formattedRadius =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

    const radioElement = radioPlacement !== 'none' && (
      <Radio
        ref={ref}
        name={name}
        value={option.value}
        checked={checked}
        disabled={isOptionDisabled}
        size={size}
        slotProps={{ input: { ref: inputRef } }}
        onChange={onChange}
        sx={[
          {
            p: 0,
            mr: radioPlacement === 'left' ? 1.5 : 0,
            ml: radioPlacement === 'right' ? 1.5 : 0,
            flexShrink: 0,
          },
          ...toSxArray(slotSx?.radio),
        ]}
      />
    )

    return (
      <Box
        component="label"
        sx={[
          (theme: Theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            width: fullWidth ? '100%' : 'auto',
            minHeight: isLarge ? 64 : isSmall ? 44 : 52,
            py: isLarge ? 2 : isSmall ? 1 : 1.5,
            px: isLarge ? 2.5 : isSmall ? 1.5 : 2,
            borderRadius: formattedRadius,
            cursor: isOptionDisabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            transition: theme.transitions.create([
              'background-color',
              'border-color',
              'box-shadow',
            ]),

            // Border & Background states
            border: checked
              ? '1.5px solid'
              : '1px solid',
            borderColor: isOptionDisabled
              ? theme.palette.divider
              : error
                ? theme.palette.error.main
                : checked
                  ? '#00A39D'
                  : '#E2E8F0',
            bgcolor: isOptionDisabled
              ? theme.palette.action.disabledBackground
              : checked
                ? error
                  ? 'rgba(239, 68, 68, 0.04)'
                  : '#F0FDFA'
                : '#FFFFFF',

            // Hover state
            '&:hover': {
              borderColor: isOptionDisabled
                ? theme.palette.divider
                : error
                  ? theme.palette.error.main
                  : checked
                    ? '#008E89'
                    : '#CBD5E1',
              bgcolor: isOptionDisabled
                ? undefined
                : checked
                  ? '#ECFDF5'
                  : '#F8FAFC',
            },

            // Focus-within ring for keyboard accessibility
            '&:focus-within': {
              borderColor: error ? theme.palette.error.main : '#00A39D',
              boxShadow: `0 0 0 3px ${
                error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'
              }`,
            },
          }),
          ...toSxArray(slotSx?.card),
        ]}
      >
        {/* Left container: (Radio + Icon + Text) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            flex: 1,
          }}
        >
          {radioPlacement === 'left' && radioElement}

          {/* Optional leading icon / avatar */}
          {option.icon && (
            <Box
              sx={[
                {
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  color: isOptionDisabled
                    ? 'text.disabled'
                    : checked
                      ? '#00A39D'
                      : 'text.secondary',
                  flexShrink: 0,
                },
                ...toSxArray(slotSx?.cardIcon),
              ]}
            >
              {option.icon}
            </Box>
          )}

          {/* Primary Text Content & Description */}
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography
                component="span"
                sx={[
                  {
                    fontWeight: checked ? 600 : 500,
                    fontSize: isSmall
                      ? '0.875rem'
                      : isLarge
                        ? '1.0625rem'
                        : '0.9375rem',
                    color: isOptionDisabled
                      ? 'text.disabled'
                      : 'text.primary',
                    lineHeight: 1.4,
                    display: 'block',
                  },
                  ...toSxArray(slotSx?.cardLabel),
                ]}
              >
                {option.label}
              </Typography>

              {option.badge && (
                <Box
                  sx={[
                    {
                      display: 'inline-flex',
                      alignItems: 'center',
                    },
                    ...toSxArray(slotSx?.cardBadge),
                  ]}
                >
                  {option.badge}
                </Box>
              )}
            </Box>

            {option.description && (
              <Typography
                component="span"
                sx={[
                  {
                    display: 'block',
                    mt: 0.25,
                    fontSize: isSmall ? '0.75rem' : '0.8125rem',
                    color: isOptionDisabled
                      ? 'text.disabled'
                      : 'text.secondary',
                    lineHeight: 1.35,
                  },
                  ...toSxArray(slotSx?.cardDescription),
                ]}
              >
                {option.description}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right container: (EndContent + Radio) */}
        {(option.endContent || radioPlacement === 'right') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 1.5,
              flexShrink: 0,
            }}
          >
            {option.endContent && (
              <Box
                sx={[
                  {
                    display: 'inline-flex',
                    alignItems: 'center',
                  },
                  ...toSxArray(slotSx?.cardEndContent),
                ]}
              >
                {option.endContent}
              </Box>
            )}

            {radioPlacement === 'right' && radioElement}
          </Box>
        )}

        {/* Hidden radio input for 'none' radioPlacement so form & keyboard selection still works */}
        {radioPlacement === 'none' && (
          <Radio
            ref={ref}
            name={name}
            value={option.value}
            checked={checked}
            disabled={isOptionDisabled}
            slotProps={{ input: { ref: inputRef } }}
            onChange={onChange}
            sx={{
              position: 'absolute',
              opacity: 0,
              width: 0,
              height: 0,
              p: 0,
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>
    )
  }
)

RadioCard.displayName = 'RadioCard'
