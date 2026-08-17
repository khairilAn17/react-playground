import type { Key, ReactNode } from 'react'
import { Box, Avatar, Chip } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { toSxArray } from '../select/utils'
import type { AutocompleteOption, AutocompleteRenderGetTagProps } from './types'
import { getChipBaseSx, getOverflowChipSx } from './utils'

// ── Slot interface (mirrors AutocompleteSlotSx tag-related keys) ─────────────
export interface AutocompleteTagSlotSx {
  /** Styles the `<Chip>` element itself. Overrides the chip base defaults. */
  tagChip?: SxProps<Theme>
  /** Styles the `<Avatar>` inside the chip (string avatar variant). */
  tagAvatar?: SxProps<Theme>
  /** Styles the icon wrapper `<Box>` inside the chip (icon variant). */
  tagIcon?: SxProps<Theme>
  /** Styles the label container `<Box>` that wraps the avatar/icon + text. */
  tagLabel?: SxProps<Theme>
  /** Styles the `+N` overflow `<Chip>`. */
  tagOverflow?: SxProps<Theme>
}

// ── ChipDecoration ───────────────────────────────────────────────────────────
export function ChipDecoration({
  opt,
  size = 'medium',
  slotSx,
}: {
  opt: AutocompleteOption
  size?: 'small' | 'medium' | 'large'
  slotSx?: AutocompleteTagSlotSx
}) {
  const isSmall = size === 'small'

  if (opt.avatar) {
    if (typeof opt.avatar === 'string') {
      const isUrl = opt.avatar.startsWith('http') || opt.avatar.startsWith('/')
      return (
        <Avatar
          src={isUrl ? opt.avatar : undefined}
          sx={[
            {
              width: isSmall ? 16 : 20,
              height: isSmall ? 16 : 20,
              fontSize: isSmall ? '0.5rem' : '0.625rem',
              bgcolor: opt.avatarBg ?? '#00A39D',
              color: '#fff',
              fontWeight: 700,
              flexShrink: 0,
            },
            // Consumer overrides applied last — always wins
            ...toSxArray(slotSx?.tagAvatar),
          ]}
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
        sx={[
          {
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: isSmall ? 14 : 16,
            flexShrink: 0,
            '& svg': { fontSize: 'inherit' },
          },
          ...toSxArray(slotSx?.tagIcon),
        ]}
      >
        {opt.icon}
      </Box>
    )
  }

  return null
}

// ── AutocompleteTagProps ─────────────────────────────────────────────────────
export interface AutocompleteTagProps {
  opt: AutocompleteOption
  tagProps: Record<string, unknown>
  size?: 'small' | 'medium' | 'large'
  tagDisplay?: 'avatar+label' | 'label'
  /** @deprecated – use `slotSx.tagChip` instead. Kept for backward compat. */
  tagSx?: SxProps<Theme>
  slotSx?: AutocompleteTagSlotSx
  labelFallback?: string
}

// ── AutocompleteTag ──────────────────────────────────────────────────────────
export function AutocompleteTag({
  opt,
  tagProps,
  size = 'medium',
  tagDisplay = 'avatar+label',
  tagSx,
  slotSx,
  labelFallback,
}: AutocompleteTagProps) {
  const isSmall = size === 'small'
  const showDecoration =
    tagDisplay === 'avatar+label' && (Boolean(opt.avatar) || Boolean(opt.icon))

  const labelContent: ReactNode = showDecoration ? (
    <Box
      component="span"
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          lineHeight: 1,
        },
        ...toSxArray(slotSx?.tagLabel),
      ]}
    >
      <ChipDecoration opt={opt} size={size} slotSx={slotSx} />
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
      sx={[
        // Base chip defaults
        ...toSxArray(getChipBaseSx(size)),
        // Legacy tagSx (backward compat)
        ...toSxArray(tagSx),
        // Granular tagChip override — applied last, always wins
        ...toSxArray(slotSx?.tagChip),
      ]}
    />
  )
}

// ── RenderTagsParams ─────────────────────────────────────────────────────────
export interface RenderTagsParams<T> {
  tagValue: T[]
  getTagProps: AutocompleteRenderGetTagProps
  size?: 'small' | 'medium' | 'large'
  maxVisibleTags?: number
  tagDisplay?: 'avatar+label' | 'label'
  /** @deprecated – use `slotSx.tagChip` instead. */
  tagSx?: SxProps<Theme>
  slotSx?: AutocompleteTagSlotSx
  getOptionLabel?: (option: T) => string
}

// ── renderDefaultTags ────────────────────────────────────────────────────────
export function renderDefaultTags<T>({
  tagValue,
  getTagProps,
  size = 'medium',
  maxVisibleTags,
  tagDisplay = 'avatar+label',
  tagSx,
  slotSx,
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
            slotSx={slotSx}
            labelFallback={labelFallback}
          />
        )
      })}

      {hiddenCount > 0 && (
        <Chip
          key="__overflow"
          label={`+${hiddenCount}`}
          size={size === 'small' ? 'small' : 'medium'}
          sx={[
            ...toSxArray(getOverflowChipSx(size)),
            // tagSx also tints overflow chip for consistent theme (backward compat)
            ...toSxArray(tagSx),
            // Dedicated overflow slot wins over everything
            ...toSxArray(slotSx?.tagOverflow),
          ]}
        />
      )}
    </>
  )
}
