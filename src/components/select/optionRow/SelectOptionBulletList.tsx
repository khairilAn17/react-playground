import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export interface SelectOptionBulletListProps {
  bullets?: (string | ReactNode)[]
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  listSx?: SxProps<Theme>
  itemSx?: SxProps<Theme>
  textSx?: SxProps<Theme>
}

/**
 * SelectOptionBulletList
 *
 * Dedicated presentational sub-component for rendering bulleted feature/rule lists
 * inside dropdown options (e.g. Transfer Methods, Plan Features, Service Rules).
 */
export function SelectOptionBulletList({
  bullets,
  size = 'medium',
  disabled = false,
  listSx,
  itemSx,
  textSx,
}: SelectOptionBulletListProps) {
  if (!bullets || bullets.length === 0) return null

  const bulletFontSize = size === 'small' ? '0.75rem' : size === 'large' ? '0.875rem' : '0.8125rem'

  return (
    <Box
      component="ul"
      sx={[
        {
          m: 0,
          pl: 2,
          mt: 0.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.35,
          listStyleType: 'disc',
        },
        ...(listSx ? (Array.isArray(listSx) ? listSx : [listSx]) : []),
      ]}
    >
      {bullets.map((bullet, idx) => (
        <Box
          component="li"
          key={idx}
          sx={[
            {
              fontSize: bulletFontSize,
              color: disabled ? '#94A3B8' : '#475569',
              lineHeight: 1.4,
              whiteSpace: 'normal',
              pl: 0.25,
            },
            ...(itemSx ? (Array.isArray(itemSx) ? itemSx : [itemSx]) : []),
          ]}
        >
          {typeof bullet === 'string' ? (
            <Typography
              variant="caption"
              sx={[
                {
                  fontSize: bulletFontSize,
                  color: 'inherit',
                  lineHeight: 1.4,
                  display: 'block',
                  whiteSpace: 'pre-line',
                },
                ...(textSx ? (Array.isArray(textSx) ? textSx : [textSx]) : []),
              ]}
            >
              {bullet}
            </Typography>
          ) : (
            bullet
          )}
        </Box>
      ))}
    </Box>
  )
}
