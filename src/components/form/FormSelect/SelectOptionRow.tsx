import { Box, Typography, Avatar } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import type { SelectOption, SelectOptionSlotSx } from './types'

export interface SelectOptionRowProps {
  option: SelectOption
  isSelected?: boolean
  isMenu?: boolean
  showCheckmark?: boolean
  size?: 'small' | 'medium' | 'large'
  leftTitleSx?: SxProps<Theme>
  leftSubtitleSx?: SxProps<Theme>
  rightTitleSx?: SxProps<Theme>
  rightSubtitleSx?: SxProps<Theme>
  avatarSx?: SxProps<Theme>
  optionRowSx?: SxProps<Theme>
  checkmarkSx?: SxProps<Theme>
  statusIconSx?: SxProps<Theme>
  slotSx?: SelectOptionSlotSx
}

export function SelectOptionRow({
  option,
  isSelected = false,
  isMenu = false,
  showCheckmark = true,
  size = 'medium',
  leftTitleSx,
  leftSubtitleSx,
  rightTitleSx,
  rightSubtitleSx,
  avatarSx,
  optionRowSx,
  checkmarkSx,
  statusIconSx,
  slotSx = {},
}: SelectOptionRowProps) {
  const leftTitle = option.leftTitle ?? option.label
  const leftSubtitle = option.leftSubtitle
  const rightTitle = option.rightTitle
  const rightSubtitle = option.rightSubtitle

  const hasRichMeta = leftTitle || leftSubtitle || rightTitle || rightSubtitle || option.avatar

  const avatarSize = size === 'small' ? 28 : size === 'large' ? 44 : 36
  const avatarFontSize = size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem'
  const titleFontSize = size === 'small' ? '0.8125rem' : size === 'large' ? '1rem' : '0.875rem'
  const subtitleFontSize = size === 'small' ? '0.6875rem' : size === 'large' ? '0.8125rem' : '0.75rem'

  const combinedLeftTitleSx: SxProps<Theme> = [
    ...(leftTitleSx ? (Array.isArray(leftTitleSx) ? leftTitleSx : [leftTitleSx]) : []),
    ...(slotSx.leftTitle ? (Array.isArray(slotSx.leftTitle) ? slotSx.leftTitle : [slotSx.leftTitle]) : []),
  ]

  const combinedLeftSubtitleSx: SxProps<Theme> = [
    ...(leftSubtitleSx ? (Array.isArray(leftSubtitleSx) ? leftSubtitleSx : [leftSubtitleSx]) : []),
    ...(slotSx.leftSubtitle ? (Array.isArray(slotSx.leftSubtitle) ? slotSx.leftSubtitle : [slotSx.leftSubtitle]) : []),
  ]

  const combinedRightTitleSx: SxProps<Theme> = [
    ...(rightTitleSx ? (Array.isArray(rightTitleSx) ? rightTitleSx : [rightTitleSx]) : []),
    ...(slotSx.rightTitle ? (Array.isArray(slotSx.rightTitle) ? slotSx.rightTitle : [slotSx.rightTitle]) : []),
  ]

  const combinedRightSubtitleSx: SxProps<Theme> = [
    ...(rightSubtitleSx ? (Array.isArray(rightSubtitleSx) ? rightSubtitleSx : [rightSubtitleSx]) : []),
    ...(slotSx.rightSubtitle ? (Array.isArray(slotSx.rightSubtitle) ? slotSx.rightSubtitle : [slotSx.rightSubtitle]) : []),
  ]

  const combinedAvatarSx: SxProps<Theme> = [
    ...(avatarSx ? (Array.isArray(avatarSx) ? avatarSx : [avatarSx]) : []),
    ...(slotSx.avatar ? (Array.isArray(slotSx.avatar) ? slotSx.avatar : [slotSx.avatar]) : []),
  ]

  const combinedRootSx: SxProps<Theme> = [
    ...(optionRowSx ? (Array.isArray(optionRowSx) ? optionRowSx : [optionRowSx]) : []),
    ...(slotSx.root ? (Array.isArray(slotSx.root) ? slotSx.root : [slotSx.root]) : []),
  ]

  const combinedCheckmarkSx: SxProps<Theme> = [
    ...(checkmarkSx ? (Array.isArray(checkmarkSx) ? checkmarkSx : [checkmarkSx]) : []),
    ...(slotSx.checkmark ? (Array.isArray(slotSx.checkmark) ? slotSx.checkmark : [slotSx.checkmark]) : []),
  ]

  const combinedStatusIconSx: SxProps<Theme> = [
    ...(statusIconSx ? (Array.isArray(statusIconSx) ? statusIconSx : [statusIconSx]) : []),
    ...(slotSx.statusIcon ? (Array.isArray(slotSx.statusIcon) ? slotSx.statusIcon : [slotSx.statusIcon]) : []),
  ]

  if (!hasRichMeta) {
    return (
      <Box
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            opacity: option.disabled ? 0.6 : 1,
          },
          ...combinedRootSx,
        ]}
      >
        <Typography
          variant="body2"
          sx={[
            {
              fontWeight: isSelected ? 700 : 500,
              fontSize: titleFontSize,
              color: option.disabled ? 'text.disabled' : '#1E293B',
            },
            ...combinedLeftTitleSx,
          ]}
        >
          {option.label ?? String(option.value)}
        </Typography>

        {isMenu && isSelected && showCheckmark && (
          <CheckIcon
            sx={[
              { color: '#00A39D', fontSize: size === 'large' ? '1.5rem' : '1.25rem', ml: 1 },
              ...combinedCheckmarkSx,
            ]}
          />
        )}
      </Box>
    )
  }

  const isOptionDisabled = Boolean(option.disabled)
  const defaultStatusColor = isOptionDisabled ? '#D97706' : '#64748B'

  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: size === 'large' ? 2 : 1.5,
          py: isMenu ? (size === 'large' ? 1 : size === 'small' ? 0.25 : 0.5) : 0,
          opacity: isOptionDisabled ? 0.75 : 1,
        },
        ...combinedRootSx,
      ]}
    >
      {/* ── Left Column: Avatar + leftTitle / leftSubtitle ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: size === 'large' ? 2 : 1.5, minWidth: 0, flex: 1 }}>
        {option.avatar && (
          typeof option.avatar === 'string' ? (
            <Avatar
              sx={[
                {
                  width: avatarSize,
                  height: avatarSize,
                  fontSize: avatarFontSize,
                  fontWeight: 700,
                  bgcolor: option.avatarBg || '#F59E0B',
                  color: '#FFFFFF',
                  flexShrink: 0,
                  opacity: isOptionDisabled ? 0.8 : 1,
                },
                ...combinedAvatarSx,
              ]}
            >
              {option.avatar}
            </Avatar>
          ) : (
            option.avatar
          )
        )}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={[
              {
                fontWeight: 700,
                fontSize: titleFontSize,
                color: isOptionDisabled ? '#94A3B8' : '#1E293B',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              ...combinedLeftTitleSx,
            ]}
          >
            {leftTitle}
          </Typography>

          {leftSubtitle && (
            <Typography
              variant="caption"
              sx={[
                {
                  fontSize: subtitleFontSize,
                  color: isOptionDisabled ? '#CBD5E1' : '#64748B',
                  display: 'block',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
                ...combinedLeftSubtitleSx,
              ]}
            >
              {leftSubtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* ── Right Column: rightTitle / rightSubtitle + Checkmark ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0, ml: 'auto' }}>
        {(rightTitle || rightSubtitle) && (
          <Box sx={{ textAlign: 'right' }}>
            {rightTitle && (
              <Typography
                variant="body2"
                sx={[
                  {
                    fontWeight: 600,
                    fontSize: titleFontSize,
                    color: isOptionDisabled ? '#94A3B8' : '#1E293B',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.3,
                  },
                  ...combinedRightTitleSx,
                ]}
              >
                {rightTitle}
              </Typography>
            )}

            {rightSubtitle && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 0.5,
                  mt: 0.2,
                }}
              >
                {option.statusIcon ?? (
                  isOptionDisabled ? (
                    <WarningAmberIcon
                      sx={[
                        { fontSize: size === 'large' ? '1rem' : '0.9rem', color: option.statusColor || defaultStatusColor },
                        ...combinedStatusIconSx,
                      ]}
                    />
                  ) : null
                )}
                <Typography
                  variant="caption"
                  sx={[
                    {
                      fontWeight: 600,
                      fontSize: subtitleFontSize,
                      color: option.statusColor || defaultStatusColor,
                      whiteSpace: 'nowrap',
                      lineHeight: 1.2,
                    },
                    ...combinedRightSubtitleSx,
                  ]}
                >
                  {rightSubtitle}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* ── Far Right Checkmark Indicator ── */}
        {isMenu && isSelected && showCheckmark && (
          <CheckIcon
            sx={[
              {
                color: '#00A39D',
                fontSize: size === 'large' ? '1.5rem' : '1.25rem',
                flexShrink: 0,
              },
              ...combinedCheckmarkSx,
            ]}
          />
        )}
      </Box>
    </Box>
  )
}
