import { forwardRef } from 'react'
import { Radio as MuiRadio, SvgIcon } from '@mui/material'
import type { RadioProps, RadioSize } from './types'

// ── Custom SVG Radio Icons ───────────────────────────────────────────────────

function getIconDimensions(size: RadioSize) {
  switch (size) {
    case 'small':
      return { sizePx: 18, strokeWidth: 1.5, innerR: 3.5 }
    case 'large':
      return { sizePx: 26, strokeWidth: 2, innerR: 5 }
    case 'medium':
    default:
      return { sizePx: 22, strokeWidth: 1.75, innerR: 4.25 }
  }
}

/** Unchecked hollow circle matching BYOND BIZNIS clean border styling. */
function RadioUncheckedIcon({ size = 'medium' }: { size?: RadioSize }) {
  const { sizePx, strokeWidth } = getIconDimensions(size)
  return (
    <SvgIcon sx={{ fontSize: sizePx, width: sizePx, height: sizePx }} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r={12 - strokeWidth}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </SvgIcon>
  )
}

/** Checked teal circle with crisp inner white dot matching reference design. */
function RadioCheckedIcon({ size = 'medium' }: { size?: RadioSize }) {
  const { sizePx, innerR } = getIconDimensions(size)
  return (
    <SvgIcon sx={{ fontSize: sizePx, width: sizePx, height: sizePx }} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <circle cx="12" cy="12" r={innerR} fill="#FFFFFF" />
    </SvgIcon>
  )
}

// ── Radio Primitive Component ─────────────────────────────────────────────────

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { size = 'medium', sx, ...props },
  ref
) {
  return (
    <MuiRadio
      ref={ref}
      icon={<RadioUncheckedIcon size={size} />}
      checkedIcon={<RadioCheckedIcon size={size} />}
      disableRipple={false}
      sx={[
        {
          color: '#CBD5E1',
          p: size === 'small' ? 0.5 : 0.75,
          '&.Mui-checked': {
            color: '#00A39D',
          },
          '&:hover': {
            bgcolor: 'rgba(0, 163, 157, 0.06)',
            color: '#94A3B8',
            '&.Mui-checked': {
              color: '#008E89',
            },
          },
          '&.Mui-disabled': {
            color: '#E2E8F0',
            '&.Mui-checked': {
              color: '#CBD5E1',
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  )
})

Radio.displayName = 'Radio'
