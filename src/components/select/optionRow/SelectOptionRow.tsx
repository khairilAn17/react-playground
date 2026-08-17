import { isValidElement } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import type { SxProps, Theme, AvatarProps } from '@mui/material'

function isImageUrl(val: string): boolean {
  return /^(https?:\/\/|\/|data:image\/|blob:)/i.test(val) || /\.(png|jpg|jpeg|svg|webp|gif)$/i.test(val)
}
import CheckIcon from '@mui/icons-material/Check'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { SelectOptionBulletList } from './SelectOptionBulletList'
import type { SelectOption, SelectOptionSlotSx } from '../types'

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
  bulletListSx?: SxProps<Theme>
  bulletItemSx?: SxProps<Theme>
  bulletTextSx?: SxProps<Theme>
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
  bulletListSx,
  bulletItemSx,
  bulletTextSx,
  slotSx = {},
}: SelectOptionRowProps) {
  const leftTitle = option.leftTitle ?? option.label
  const leftSubtitle = option.leftSubtitle
  const rightTitle = option.rightTitle
  const rightSubtitle = option.rightSubtitle
  const bullets = option.bullets
  const compactSelected = option.compactSelected ?? true

  const shouldRenderBullets = Boolean(bullets && bullets.length > 0 && (isMenu || !compactSelected))

  const hasRichMeta =
    leftTitle ||
    leftSubtitle ||
    rightTitle ||
    rightSubtitle ||
    option.avatar ||
    shouldRenderBullets

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

  const combinedBulletListSx: SxProps<Theme> = [
    ...(bulletListSx ? (Array.isArray(bulletListSx) ? bulletListSx : [bulletListSx]) : []),
    ...(slotSx.bulletList ? (Array.isArray(slotSx.bulletList) ? slotSx.bulletList : [slotSx.bulletList]) : []),
  ]

  const combinedBulletItemSx: SxProps<Theme> = [
    ...(bulletItemSx ? (Array.isArray(bulletItemSx) ? bulletItemSx : [bulletItemSx]) : []),
    ...(slotSx.bulletItem ? (Array.isArray(slotSx.bulletItem) ? slotSx.bulletItem : [slotSx.bulletItem]) : []),
  ]

  const combinedBulletTextSx: SxProps<Theme> = [
    ...(bulletTextSx ? (Array.isArray(bulletTextSx) ? bulletTextSx : [bulletTextSx]) : []),
    ...(slotSx.bulletText ? (Array.isArray(slotSx.bulletText) ? slotSx.bulletText : [slotSx.bulletText]) : []),
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
          alignItems: shouldRenderBullets ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: size === 'large' ? 2 : 1.5,
          py: isMenu ? (shouldRenderBullets ? 0.75 : size === 'large' ? 1 : size === 'small' ? 0.25 : 0.5) : 0,
          opacity: isOptionDisabled ? 0.75 : 1,
        },
        ...combinedRootSx,
      ]}
    >
      <Box sx={{ display: 'flex', alignItems: shouldRenderBullets ? 'flex-start' : 'center', gap: size === 'large' ? 2 : 1.5, minWidth: 0, flex: 1 }}>
        {(() => {
          const rawAvatar = option.avatar
          const rawAvatarProps = option.avatarProps

          if (!rawAvatar && !rawAvatarProps) return null

          if (isValidElement(rawAvatar)) {
            return rawAvatar
          }

          let mergedAvatarProps: AvatarProps = { ...rawAvatarProps }

          if (typeof rawAvatar === 'string') {
            if (isImageUrl(rawAvatar)) {
              mergedAvatarProps = { src: rawAvatar, ...mergedAvatarProps }
            } else {
              mergedAvatarProps = { children: rawAvatar, ...mergedAvatarProps }
            }
          } else if (typeof rawAvatar === 'object' && rawAvatar !== null) {
            mergedAvatarProps = { ...(rawAvatar as AvatarProps), ...mergedAvatarProps }
          }

          const { src, children: avatarChildren, sx: extraSx, ...restAvatarProps } = mergedAvatarProps
          const hasSrc = Boolean(src)

          return (
            <Avatar
              src={src}
              sx={[
                {
                  width: avatarSize,
                  height: avatarSize,
                  fontSize: avatarFontSize,
                  fontWeight: 700,
                  bgcolor: hasSrc ? 'transparent' : (option.avatarBg || '#F59E0B'),
                  color: '#FFFFFF',
                  flexShrink: 0,
                  opacity: isOptionDisabled ? 0.8 : 1,
                  mt: shouldRenderBullets ? 0.25 : 0,
                },
                ...combinedAvatarSx,
                ...(extraSx ? (Array.isArray(extraSx) ? extraSx : [extraSx]) : []),
              ]}
              {...restAvatarProps}
            >
              {!hasSrc && avatarChildren}
            </Avatar>
          )
        })()}

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            sx={[
              {
                fontWeight: 700,
                fontSize: titleFontSize,
                color: isOptionDisabled ? '#94A3B8' : '#1E293B',
                lineHeight: 1.35,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: shouldRenderBullets ? 'normal' : 'nowrap',
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
                  mt: 0.25,
                },
                ...combinedLeftSubtitleSx,
              ]}
            >
              {leftSubtitle}
            </Typography>
          )}

          {shouldRenderBullets && (
            <SelectOptionBulletList
              bullets={bullets}
              size={size}
              disabled={isOptionDisabled}
              listSx={combinedBulletListSx}
              itemSx={combinedBulletItemSx}
              textSx={combinedBulletTextSx}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: shouldRenderBullets ? 'flex-start' : 'center', gap: 1.5, flexShrink: 0, ml: 'auto', mt: shouldRenderBullets ? 0.25 : 0 }}>
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
