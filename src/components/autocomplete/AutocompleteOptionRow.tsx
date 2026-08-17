import { memo, type HTMLAttributes, type ReactNode } from 'react'
import { Box, Typography, Avatar, Checkbox } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { toSxArray } from '../select/utils'
import type { AutocompleteOption } from './types'

export interface AutocompleteOptionRowSlotSx {
  /** Styles the outer `<li>` row container. */
  option?: SxProps<Theme>
  /** Styles the primary label `<Typography>`. Overrides selection-state defaults for `color` and `fontWeight`. */
  optionLabel?: SxProps<Theme>
  /** Styles the subtitle caption `<Typography>`. */
  optionSubtitle?: SxProps<Theme>
  /** Styles the `<Checkbox>` element (only rendered when `multiple` is true). */
  optionCheckbox?: SxProps<Theme>
  /** Styles the `<Avatar>` element (string avatar variant). */
  optionAvatar?: SxProps<Theme>
  /** Styles the icon wrapper `<Box>` (icon variant). */
  optionIcon?: SxProps<Theme>
}

export interface AutocompleteOptionRowProps extends HTMLAttributes<HTMLLIElement> {
  option: AutocompleteOption
  label: string
  selected: boolean
  multiple?: boolean
  checkboxPlacement?: 'left' | 'right' | false
  size?: 'small' | 'medium' | 'large'
  /** @deprecated – pass individual sub-slots via `slotSx` instead */
  optionSx?: SxProps<Theme>
  slotSx?: AutocompleteOptionRowSlotSx
}

export const AutocompleteOptionRow = memo(function AutocompleteOptionRow({
  option,
  label,
  selected,
  multiple = false,
  checkboxPlacement = 'right',
  size = 'medium',
  optionSx,
  slotSx,
  ...restProps
}: AutocompleteOptionRowProps) {
  const isSmall = size === 'small'
  const showCheckbox = multiple && checkboxPlacement !== false

  const checkboxElement = showCheckbox ? (
    <Checkbox
      checked={selected}
      tabIndex={-1}
      disableRipple
      size="small"
      sx={[
        {
          p: 0.5,
          flexShrink: 0,
          color: 'action.active',
          borderRadius: '6px',
          '&.Mui-checked': { color: '#00A39D' },
        },
        ...toSxArray(slotSx?.optionCheckbox),
      ]}
    />
  ) : null

  let avatarOrIconNode: ReactNode = null
  if (option.avatar) {
    if (typeof option.avatar === 'string') {
      const isUrl = option.avatar.startsWith('http') || option.avatar.startsWith('/')
      avatarOrIconNode = (
        <Avatar
          src={isUrl ? option.avatar : undefined}
          sx={[
            {
              width: isSmall ? 24 : 30,
              height: isSmall ? 24 : 30,
              fontSize: isSmall ? '0.75rem' : '0.8125rem',
              bgcolor: option.avatarBg || '#00A39D',
              color: '#FFFFFF',
              fontWeight: 600,
              flexShrink: 0,
            },
            ...toSxArray(slotSx?.optionAvatar),
          ]}
        >
          {!isUrl ? option.avatar : undefined}
        </Avatar>
      )
    } else {
      avatarOrIconNode = option.avatar
    }
  } else if (option.icon) {
    avatarOrIconNode = (
      <Box
        sx={[
          {
            color: selected ? '#00A39D' : 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            fontSize: isSmall ? 18 : 22,
            '& svg': { fontSize: 'inherit' },
          },
          ...toSxArray(slotSx?.optionIcon),
        ]}
      >
        {option.icon}
      </Box>
    )
  }

  return (
    <Box
      component="li"
      {...restProps}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          width: '100%',
        },
        // backward-compat: support legacy optionSx prop
        ...toSxArray(optionSx),
        ...toSxArray(slotSx?.option),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          minWidth: 0,
          flex: 1,
        }}
      >
        {checkboxPlacement === 'left' && checkboxElement}
        {avatarOrIconNode}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            noWrap
            sx={[
              {
                // Default selection-state styles — overridable via slotSx.optionLabel
                fontWeight: selected ? 600 : 500,
                color: selected ? '#00A39D' : 'text.primary',
                fontSize: isSmall ? '0.8125rem' : '0.875rem',
              },
              // Consumer-provided overrides always win (applied last)
              ...toSxArray(slotSx?.optionLabel),
            ]}
          >
            {label}
          </Typography>
          {option.subtitle && (
            <Typography
              variant="caption"
              noWrap
              sx={[
                {
                  color: 'text.secondary',
                  fontSize: isSmall ? '0.6875rem' : '0.75rem',
                  display: 'block',
                },
                ...toSxArray(slotSx?.optionSubtitle),
              ]}
            >
              {option.subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {checkboxPlacement === 'right' && checkboxElement}
    </Box>
  )
})
