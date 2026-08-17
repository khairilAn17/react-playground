import type { SxProps, Theme } from '@mui/material'
import type { SearchVariant, SearchSize } from '../types'

export const TEAL_PRIMARY = '#00A39D'
export const TEXT_MAIN = '#1E293B'
export const TEXT_MUTED = '#64748B'

export interface SearchSizeStyles {
  py: number
  px: number
  minHeight: number
  fontSize: string
  iconSize: string
  spinnerSize: number
}

export function formatBorderRadius(val?: number | string): string | undefined {
  if (val === undefined) return undefined
  return typeof val === 'number' ? `${val}px` : val
}

export interface CustomVariantStyleOptions {
  borderColor?: string
  focusBorderColor?: string
  borderRadius?: number | string
  focusBoxShadow?: string
  disableFocusRing?: boolean
}

/**
 * Returns sx styles for the InputBase root element per variant.
 * Uses MUI theme palette tokens so the component is dark-mode safe.
 */
export function getVariantStyles(
  variant: SearchVariant,
  custom?: CustomVariantStyleOptions
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
        bgcolor: 'grey.100',
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
        bgcolor: 'grey.50',
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
        bgcolor: 'background.paper',
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

export function getSizeStyles(size: SearchSize): SearchSizeStyles {
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
