import type { ReactNode } from 'react'
import type { SxProps, Theme, TooltipProps } from '@mui/material'

export interface LabelSlotSx {
  /** Styles the root label container `<Box>`. */
  root?: SxProps<Theme>
  /** Styles the primary label text `<Typography>`. */
  text?: SxProps<Theme>
  /** Styles the required `*` asterisk `<Box>`. */
  asterisk?: SxProps<Theme>
  /** Styles the optional badge `<Typography>`. */
  optional?: SxProps<Theme>
  /** Styles the info tooltip icon wrapper `<Box>`. */
  tooltipIcon?: SxProps<Theme>
  /** Styles the trailing action container `<Box>`. */
  action?: SxProps<Theme>
}

export interface LabelProps {
  /** Target input element ID for accessibility `htmlFor` association. */
  htmlFor?: string
  /** Primary label text or JSX content. */
  children?: ReactNode
  /** Alias for `children`. */
  text?: ReactNode
  /** If true, displays a red `*` asterisk indicating a mandatory field. */
  required?: boolean
  /**
   * If true, displays an `(Opsional)` tag.
   * If a ReactNode is provided, custom optional indicator is rendered.
   */
  optional?: boolean | ReactNode
  /**
   * Tooltip description shown when hovering or focusing the info icon.
   */
  tooltip?: ReactNode
  /**
   * Placement of the info tooltip popover.
   * @default 'top'
   */
  tooltipPlacement?: TooltipProps['placement']
  /**
   * Custom trailing action element (e.g. "Lupa Password?", "Lihat Format").
   */
  action?: ReactNode
  /**
   * Label size variant:
   * - `'small'`: 13px font
   * - `'medium'` (default): 14px font (0.875rem)
   * - `'large'`: 16px font (1rem)
   */
  size?: 'small' | 'medium' | 'large'
  /** If true, applies error color palette. */
  error?: boolean
  /** If true, fades color and cursor. */
  disabled?: boolean
  /** Granular slot SX styling overrides. */
  slotSx?: LabelSlotSx
  /** Custom root SX override shorthand. */
  sx?: SxProps<Theme>
}
