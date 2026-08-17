import type { Key, ReactNode } from 'react'
import { Box, Avatar, Chip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { toSxArray } from '../select/utils'
import type { AutocompleteOption, AutocompleteRenderGetTagProps } from './types'
import { getChipBaseSx, getOverflowChipSx } from './utils'

export interface AutocompleteTagProps {
  opt: AutocompleteOption
  tagProps: Record<string, unknown>
  size?: 'small' | 'medium' | 'large'
  tagDisplay?: 'avatar+label' | 'label'
  tagSx?: SxProps<Theme>
  labelFallback?: string
}

export function ChipDecoration({
  opt,
  size = 'medium',
}: {
  opt: AutocompleteOption
  size?: 'small' | 'medium' | 'large'
}) {
  const isSmall = size === 'small'

  if (opt.avatar) {
    if (typeof opt.avatar === 'string') {
      const isUrl = opt.avatar.startsWith('http') || opt.avatar.startsWith('/')
      return (
        <Avatar
          src={isUrl ? opt.avatar : undefined}
          sx={{
            width: isSmall ? 16 : 20,
            height: isSmall ? 16 : 20,
            fontSize: isSmall ? '0.5rem' : '0.625rem',
            bgcolor: opt.avatarBg ?? '#00A39D',
            color: '#fff',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {!isUrl ? opt.avatar : null}
        </Avatar>
      )
    }
    return <>{opt.avatar}</>
  }

  if (opt.icon) {
    return (
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: isSmall ? 14 : 16,
          flexShrink: 0,
          '& svg': { fontSize: 'inherit' },
        }}
      >
        {opt.icon}
      </Box>
    )
  }

  return null
}

export function AutocompleteTag({
  opt,
  tagProps,
  size = 'medium',
  tagDisplay = 'avatar+label',
  tagSx,
  labelFallback,
}: AutocompleteTagProps) {
  const isSmall = size === 'small'
  const showDecoration =
    tagDisplay === 'avatar+label' && (Boolean(opt.avatar) || Boolean(opt.icon))

  const labelContent: ReactNode = showDecoration ? (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        lineHeight: 1,
      }}
    >
      <ChipDecoration opt={opt} size={size} />
      {opt.label ?? labelFallback}
    </Box>
  ) : (
    opt.label ?? labelFallback
  )

  return (
    <Chip
      {...tagProps}
      size={isSmall ? 'small' : 'medium'}
      label={labelContent}
      sx={[...toSxArray(getChipBaseSx(size)), ...toSxArray(tagSx)]}
    />
  )
}

export interface RenderTagsParams<T> {
  tagValue: T[]
  getTagProps: AutocompleteRenderGetTagProps
  size?: 'small' | 'medium' | 'large'
  maxVisibleTags?: number
  tagDisplay?: 'avatar+label' | 'label'
  tagSx?: SxProps<Theme>
  getOptionLabel?: (option: T) => string
}

export function renderDefaultTags<T>({
  tagValue,
  getTagProps,
  size = 'medium',
  maxVisibleTags,
  tagDisplay = 'avatar+label',
  tagSx,
  getOptionLabel,
}: RenderTagsParams<T>): ReactNode {
  const visible =
    maxVisibleTags !== undefined ? tagValue.slice(0, maxVisibleTags) : tagValue
  const hiddenCount = tagValue.length - visible.length

  return (
    <>
      {visible.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index })
        const opt = option as unknown as AutocompleteOption
        const labelFallback = getOptionLabel ? getOptionLabel(option) : undefined

        return (
          <AutocompleteTag
            key={(key as Key) ?? index}
            opt={opt}
            tagProps={tagProps}
            size={size}
            tagDisplay={tagDisplay}
            tagSx={tagSx}
            labelFallback={labelFallback}
          />
        )
      })}

      {hiddenCount > 0 && (
        <Chip
          key="__overflow"
          label={`+${hiddenCount}`}
          size={size === 'small' ? 'small' : 'medium'}
          sx={[...toSxArray(getOverflowChipSx(size)), ...toSxArray(tagSx)]}
        />
      )}
    </>
  )
}
