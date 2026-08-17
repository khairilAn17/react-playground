import type { SxProps, Theme } from '@mui/material'
import type { TextFieldSize } from './types'

export type SxItem = Exclude<SxProps<Theme>, ReadonlyArray<unknown>>

export function toSxArray(sx?: SxProps<Theme>): SxItem[] {
  if (sx == null) return []
  if (Array.isArray(sx)) return (sx as ReadonlyArray<SxItem>).slice()
  return [sx as SxItem]
}

export function getTextFieldInputSx({
  size = 'medium',
  borderRadius = '12px',
  error = false,
  disabled = false,
  hasBlocks = false,
  hideSpinButtons = true,
}: {
  size?: TextFieldSize
  borderRadius?: number | string
  error?: boolean
  disabled?: boolean
  hasBlocks?: boolean
  hideSpinButtons?: boolean
}): SxItem {
  const isSmall = size === 'small'
  const isLarge = size === 'large'
  const formattedRadius =
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

  const spinButtonStyles = hideSpinButtons
    ? {
        '& input[type=number]': {
          MozAppearance: 'textfield',
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
        },
      }
    : {}

  if (hasBlocks) {
    return (theme: Theme) => ({
      borderRadius: 0,
      bgcolor: 'transparent',
      fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
      fontWeight: 500,
      color: theme.palette.text.primary,
      ...spinButtonStyles,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-input': {
        py: isLarge ? 1.75 : isSmall ? 1 : 1.5,
        px: isLarge ? 2 : isSmall ? 1.25 : 1.75,
        '&::placeholder': {
          color: '#94A3B8',
          opacity: 1,
        },
      },
    })
  }

  return (theme: Theme) => ({
    borderRadius: formattedRadius,
    bgcolor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
    fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
    ...spinButtonStyles,

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: error ? theme.palette.error.main : '#E2E8F0',
      borderWidth: '1px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: disabled
        ? undefined
        : error
          ? theme.palette.error.main
          : '#CBD5E1',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: error ? theme.palette.error.main : '#00A39D',
      borderWidth: '1.5px',
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${
        error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'
      }`,
    },
    '& .MuiOutlinedInput-input': {
      py: isLarge ? 1.75 : isSmall ? 1 : 1.5,
      px: isLarge ? 2 : isSmall ? 1.25 : 1.75,
      '&::placeholder': {
        color: '#94A3B8',
        opacity: 1,
      },
    },
  })
}

export function getBlockSidebarSx(
  side: 'left' | 'right',
  size: TextFieldSize = 'medium',
  error = false,
  customSx?: SxProps<Theme>
): SxItem[] {
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  return [
    (theme: Theme) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      px: isLarge ? 2 : isSmall ? 1.25 : 1.75,
      bgcolor: '#F1F5F9',
      ...(side === 'left'
        ? {
            borderRight: '1px solid',
            borderColor: error ? theme.palette.error.main : '#E2E8F0',
          }
        : {
            borderLeft: '1px solid',
            borderColor: error ? theme.palette.error.main : '#E2E8F0',
          }),
      fontWeight: 700,
      fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
      color: theme.palette.text.primary,
      userSelect: 'none',
      flexShrink: 0,
    }),
    ...toSxArray(customSx),
  ]
}
