import type { SxProps, Theme } from '@mui/material'

export interface InputStyleParams {
  size?: 'small' | 'medium' | 'large'
  borderRadius?: number | string
  error?: boolean
  disabled?: boolean
}

export function getAutocompleteInputSx({
  size = 'medium',
  borderRadius = '12px',
  error = false,
  disabled = false,
}: InputStyleParams): SxProps<Theme> {
  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const minHeight = isLarge ? 56 : isSmall ? 40 : 48
  const paddingX = isLarge ? 2 : isSmall ? 1.25 : 1.75
  const paddingY = isLarge ? 1.25 : isSmall ? 0.5 : 0.875
  const formattedRadius =
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

  return (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      minHeight,
      px: paddingX,
      py: paddingY,
      borderRadius: formattedRadius,
      bgcolor: disabled
        ? theme.palette.action.disabledBackground
        : theme.palette.background.paper,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '& fieldset': {
        borderColor: error ? theme.palette.error.main : theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: disabled
          ? undefined
          : error
            ? theme.palette.error.main
            : theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
        borderWidth: '1.5px',
      },
      '&.Mui-focused': {
        boxShadow: `0 0 0 3px ${
          error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'
        }`,
      },
      '& .MuiAutocomplete-popupIndicator': {
        color: 'action.active',
        transition: 'transform 0.2s ease',
      },
      '& .MuiAutocomplete-popupIndicatorOpen': {
        transform: 'rotate(180deg)',
      },
      '& .MuiAutocomplete-clearIndicator': {
        color: 'action.active',
      },
      '& .MuiAutocomplete-input': {
        py: 0.25,
        fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
      },
      flexWrap: 'wrap',
      '& .MuiAutocomplete-tag': {
        m: 0.25,
      },
    },
  })
}

export function getAutocompletePaperSx(borderRadius: number | string = '12px'): SxProps<Theme> {
  const formattedRadius =
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

  return (theme: Theme) => ({
    borderRadius: formattedRadius,
    mt: 1,
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: 320,
  })
}

export function getAutocompleteListboxSx(size: 'small' | 'medium' | 'large' = 'medium'): SxProps<Theme> {
  const isSmall = size === 'small'
  return {
    p: 0.75,
    '& .MuiAutocomplete-option': {
      borderRadius: '8px',
      my: 0.25,
      py: isSmall ? 0.75 : 1,
      px: 1.5,
      fontSize: isSmall ? '0.8125rem' : '0.875rem',
      fontWeight: 500,
      color: 'text.primary',
      transition: 'background-color 0.15s ease',
      '&[aria-selected="true"]': {
        bgcolor: 'rgba(0, 163, 157, 0.08) !important',
        color: '#00A39D',
        fontWeight: 600,
      },
      '&.Mui-focused': {
        bgcolor: 'rgba(0, 163, 157, 0.04)',
      },
      '&:hover': {
        bgcolor: 'rgba(0, 163, 157, 0.06)',
      },
    },
  }
}

export function getChipBaseSx(size: 'small' | 'medium' | 'large' = 'medium'): SxProps<Theme> {
  const isSmall = size === 'small'
  return {
    borderRadius: '999px',
    border: '1.5px solid rgba(0, 163, 157, 0.45)',
    bgcolor: '#fff',
    color: '#1E293B',
    fontWeight: 500,
    fontSize: isSmall ? '0.75rem' : '0.8125rem',
    height: isSmall ? 24 : 28,
    '& .MuiChip-label': { px: 1, py: 0 },
    '& .MuiChip-deleteIcon': {
      color: '#00A39D',
      fontSize: isSmall ? 14 : 16,
      '&:hover': { color: '#007A76' },
      mr: 0.25,
    },
  }
}

export function getOverflowChipSx(size: 'small' | 'medium' | 'large' = 'medium'): SxProps<Theme> {
  const base = getChipBaseSx(size)
  return {
    ...base,
    bgcolor: 'rgba(0, 163, 157, 0.08)',
    border: '1.5px solid rgba(0, 163, 157, 0.3)',
    color: '#00A39D',
    fontWeight: 600,
  }
}
