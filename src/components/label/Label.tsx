import { memo } from 'react'
import { Box, Typography, Tooltip } from '@mui/material'
import type { Theme } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { toSxArray } from '../select/utils'
import type { LabelProps } from './types'

export const Label = memo(function Label({
  htmlFor,
  children,
  text,
  required = false,
  optional = false,
  tooltip,
  tooltipPlacement = 'top',
  action,
  size = 'medium',
  error = false,
  disabled = false,
  slotSx,
  sx,
}: LabelProps) {
  const isSmall = size === 'small'
  const isLarge = size === 'large'
  const content = text ?? children

  if (!content && !action) return null

  const fontSize = isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem'

  return (
    <Box
      component="label"
      htmlFor={htmlFor}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          width: '100%',
          mb: 0.75,
          cursor: disabled ? 'not-allowed' : htmlFor ? 'pointer' : 'default',
          userSelect: 'none',
        },
        ...toSxArray(sx),
        ...toSxArray(slotSx?.root),
      ]}
    >
      {/* ── Left Container: Label Text + Required/Optional + Tooltip ── */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.625,
          minWidth: 0,
          flexWrap: 'wrap',
        }}
      >
        {/* Label Text */}
        {content && (
          <Typography
            component="span"
            sx={[
              (theme: Theme) => ({
                fontWeight: 600,
                fontSize,
                lineHeight: 1.35,
                color: disabled
                  ? theme.palette.text.disabled
                  : error
                    ? theme.palette.error.main
                    : theme.palette.text.primary,
                transition: theme.transitions.create('color'),
              }),
              ...toSxArray(slotSx?.text),
            ]}
          >
            {content}
          </Typography>
        )}

        {/* Required Asterisk */}
        {required && (
          <Box
            component="span"
            aria-hidden="true"
            sx={[
              (theme: Theme) => ({
                color: theme.palette.error.main,
                fontWeight: 700,
                fontSize,
                lineHeight: 1,
                ml: -0.25,
              }),
              ...toSxArray(slotSx?.asterisk),
            ]}
          >
            *
          </Box>
        )}

        {/* Optional Badge */}
        {optional && (
          <Typography
            component="span"
            sx={[
              (theme: Theme) => ({
                color: theme.palette.text.secondary,
                fontWeight: 400,
                fontSize: isLarge ? '0.875rem' : isSmall ? '0.6875rem' : '0.75rem',
                lineHeight: 1,
              }),
              ...toSxArray(slotSx?.optional),
            ]}
          >
            {typeof optional === 'boolean' ? '(Opsional)' : optional}
          </Typography>
        )}

        {/* Interactive Tooltip Icon */}
        {tooltip && (
          <Tooltip title={tooltip} placement={tooltipPlacement} arrow>
            <Box
              component="span"
              sx={[
                (theme: Theme) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: theme.palette.text.secondary,
                  cursor: 'help',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }),
                ...toSxArray(slotSx?.tooltipIcon),
              ]}
            >
              <InfoOutlinedIcon
                sx={{
                  fontSize: isLarge ? 18 : isSmall ? 14 : 16,
                }}
              />
            </Box>
          </Tooltip>
        )}
      </Box>

      {/* ── Right Container: Trailing Action Link/Button ── */}
      {action && (
        <Box
          sx={[
            {
              flexShrink: 0,
              fontSize: isSmall ? '0.75rem' : '0.8125rem',
              lineHeight: 1,
            },
            ...toSxArray(slotSx?.action),
          ]}
        >
          {action}
        </Box>
      )}
    </Box>
  )
})

Label.displayName = 'Label'
