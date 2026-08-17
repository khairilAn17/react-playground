import { useId, useMemo, useRef, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Popover,
  MenuList,
  MenuItem,
  FormHelperText,
  ListSubheader,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { SearchInput } from '../search'
import { SelectOptionRow } from './optionRow'
import { formatRadius, filterSelectOptions, groupSelectOptions, toSxArray } from './utils'
import type { SelectOption, SelectProps } from './types'

export function Select(props: SelectProps) {

  const {
    id,
    name,
    value,
    onChange,
    onBlur,
    inputRef,
    label,
    options,
    children,
    searchable = false,
    searchPlaceholder = 'Search...',
    searchVariant = 'filled',
    searchClearable = true,
    searchLoading = false,
    searchMode = 'client',
    onSearchChange,
    onLoadMore,
    hasMore = false,
    loadingMore = false,
    loadingMoreText = 'Memuat lebih banyak...',
    loadMoreThreshold = 60,
    placeholder,
    showCheckmark = true,
    borderRadius,
    helperText,
    error = false,
    fullWidth = true,
    size = 'medium',
    sx,
    disabled,
    groupBy,
    MenuProps,
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
    groupHeaderSx,
    selectSx,
    menuPaperSx,
    menuItemSx,
    listSubheaderSx,
    searchFieldSx,
    formControlSx,
    inputLabelSx,
    helperTextSx,
    slotSx,
    onClose,
    renderValue,
    searchInputProps,
  } = props

  const generatedId = useId()
  const triggerId = id || generatedId
  const labelId = label ? `${triggerId}-label` : undefined
  const listboxId = `${triggerId}-listbox`

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const triggerRef = useRef<HTMLDivElement>(null)

  const isLarge = size === 'large'
  const isSmall = size === 'small'
  const effectiveBorderRadius = formatRadius(borderRadius ?? (label ? undefined : '12px'))

  const safeOptions = useMemo(() => options ?? [], [options])

  const filteredOptions = useMemo(
    () => searchMode === 'server' ? safeOptions : filterSelectOptions(safeOptions, searchTerm, searchable),
    [safeOptions, searchTerm, searchable, searchMode]
  )

  const groupedOptions = useMemo(
    () => groupSelectOptions(filteredOptions, groupBy),
    [filteredOptions, groupBy]
  )

  const handleClose = () => {
    setOpen(false)
    if (searchable) {
      setSearchTerm('')
      if (searchMode === 'server') onSearchChange?.('')
    }
    onClose?.({} as React.SyntheticEvent)
    onBlur?.({} as React.FocusEvent<HTMLElement>)
  }

  const handleSelect = (selectedVal: string | number) => {
    if (disabled) return
    onChange?.({ target: { name, value: selectedVal } })
    handleClose()
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement | HTMLUListElement>) => {
    const target = e.currentTarget
    if (hasMore && !loadingMore && onLoadMore) {
      if (target.scrollHeight - target.scrollTop - target.clientHeight <= loadMoreThreshold) {
        onLoadMore()
      }
    }
    const paperSlot = MenuProps?.slotProps?.paper
    if (paperSlot && typeof paperSlot === 'object' && 'onScroll' in paperSlot) {
      (paperSlot.onScroll as React.UIEventHandler<HTMLDivElement> | undefined)?.(e as React.UIEvent<HTMLDivElement>)
    }
  }

  const userPaperSlot = MenuProps?.slotProps?.paper
  const { sx: userPaperSx, onScroll: _userOnScroll, ...restUserPaperSlot } =
    (typeof userPaperSlot === 'object' && userPaperSlot !== null ? userPaperSlot : {}) as {
      sx?: SxProps<Theme>
      onScroll?: React.UIEventHandler<HTMLDivElement>
    }

  const optionRowProps = {
    size, leftTitleSx, leftSubtitleSx, rightTitleSx, rightSubtitleSx,
    avatarSx, optionRowSx, checkmarkSx, statusIconSx,
    bulletListSx, bulletItemSx, bulletTextSx,
    slotSx: slotSx?.optionRow,
  }

  const mergedMenuItemSx: SxProps<Theme> = [
    {
      py: isLarge ? 1.75 : isSmall ? 0.75 : 1.25,
      px: 2,
      alignItems: 'flex-start',
      '&.Mui-selected': {
        bgcolor: 'rgba(0, 163, 157, 0.08)',
        fontWeight: 700,
        '&:hover': { bgcolor: 'rgba(0, 163, 157, 0.12)' },
      },
    },
    ...toSxArray(menuItemSx),
    ...toSxArray(slotSx?.menuItem),
  ]

  const triggerSx: SxProps<Theme> = [
    (theme: Theme) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
      width: '100%',
      minHeight: isLarge ? 56 : isSmall ? 40 : 48,
      px: isLarge ? 2.25 : isSmall ? 1.5 : 2,
      py: isLarge ? 1.5 : isSmall ? 0.75 : 1,
      borderRadius: effectiveBorderRadius ?? '12px',
      border: '1px solid',
      borderColor: error ? theme.palette.error.main : open ? theme.palette.primary.main : theme.palette.divider,
      bgcolor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxSizing: 'border-box',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      ...(open && { boxShadow: `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'}` }),
      '&:hover': { borderColor: disabled ? undefined : error ? theme.palette.error.main : theme.palette.primary.main },
      '&:focus-visible': {
        borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'}`,
      },
    }),
    ...toSxArray(sx),
    ...toSxArray(selectSx),
    ...toSxArray(slotSx?.select),
  ]

  const renderTriggerContent = () => {
    if ((value === '' || value === undefined) && placeholder) {
      return (
        <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: isLarge ? '1.125rem' : isSmall ? '0.875rem' : undefined, userSelect: 'none' }}>
          {placeholder}
        </Typography>
      )
    }
    if (renderValue) return renderValue(value as string | number)
    const foundOpt = safeOptions.find((o) => o.value === value)
    if (foundOpt) {
      return <SelectOptionRow option={foundOpt} isSelected isMenu={false} showCheckmark={false} {...optionRowProps} />
    }
    return (
      <Typography variant="body2" sx={{ color: 'text.primary', fontSize: isLarge ? '1.125rem' : isSmall ? '0.875rem' : undefined }}>
        {String(value ?? '')}
      </Typography>
    )
  }

  const renderOption = (opt: SelectOption) => {
    const isSelected = opt.value === value
    return (
      <MenuItem
        key={opt.value}
        value={opt.value}
        selected={isSelected}
        disabled={opt.disabled}
        onClick={() => handleSelect(opt.value)}
        sx={mergedMenuItemSx}
      >
        <SelectOptionRow option={opt} isSelected={isSelected} isMenu showCheckmark={showCheckmark} {...optionRowProps} />
      </MenuItem>
    )
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      size={isLarge ? 'medium' : size}
      disabled={disabled}
      sx={[...toSxArray(formControlSx), ...toSxArray(slotSx?.formControl)]}
    >
      {label && (
        <InputLabel
          id={labelId}
          htmlFor={triggerId}
          shrink
          error={error}
          disabled={disabled}
          sx={[
            { position: 'static', transform: 'none', mb: 0.75, fontWeight: 600, fontSize: isSmall ? '0.8125rem' : '0.875rem', color: error ? 'error.main' : 'text.primary' },
            ...toSxArray(inputLabelSx),
            ...toSxArray(slotSx?.inputLabel),
          ]}
        >
          {label}
        </InputLabel>
      )}

      {/* ── Trigger Box (Combobox) ── */}
      <Box
        ref={triggerRef}
        id={triggerId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : typeof placeholder === 'string' ? placeholder : undefined}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={(e) => { if (disabled) return; e.preventDefault(); setOpen((p) => !p) }}
        onKeyDown={(e) => {
          if (disabled) return
          if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); setOpen(true) }
        }}
        sx={triggerSx}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {renderTriggerContent()}
        </Box>
        <KeyboardArrowDownIcon sx={{ color: 'action.active', flexShrink: 0, transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
      </Box>

      {/* Hidden input for form integration / inputRef */}
      <input type="hidden" name={name} value={value ?? ''} ref={inputRef} />

      {/* ── Dropdown Popover ── */}
      <Popover
        open={open}
        anchorEl={triggerRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            onScroll: handleScroll,
            sx: [
              (theme: Theme) => ({
                width: triggerRef.current?.offsetWidth ?? 'auto',
                minWidth: triggerRef.current?.offsetWidth ?? 200,
                borderRadius: effectiveBorderRadius ?? '8px',
                mt: 0.75,
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${theme.palette.divider}`,
                maxHeight: 380,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }),
              ...toSxArray(menuPaperSx),
              ...toSxArray(slotSx?.menuPaper),
              ...toSxArray(userPaperSx),
            ],
            ...restUserPaperSlot,
          },
        }}
      >
        {/* 1. Fixed Search Header */}
        {searchable && (
          <Box sx={[{ p: 1.5, bgcolor: 'background.paper', flexShrink: 0 }, ...toSxArray(listSubheaderSx), ...toSxArray(slotSx?.listSubheader)]}>
            <SearchInput
              size="medium"
              fullWidth
              autoFocus
              placeholder={searchPlaceholder}
              value={searchTerm}
              onValueChange={(val) => { setSearchTerm(val); onSearchChange?.(val) }}
              onClear={() => { setSearchTerm(''); onSearchChange?.('') }}
              variant={searchVariant}
              clearable={searchClearable}
              loading={searchLoading}
              {...searchInputProps}
              slotSx={{
                ...searchInputProps?.slotSx,
                container: [
                  ...toSxArray(searchFieldSx),
                  ...toSxArray(slotSx?.searchField),
                  ...toSxArray(searchInputProps?.slotSx?.container),
                ],
              }}
            />
          </Box>
        )}

        {/* 2. Scrollable Options */}
        <MenuList
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? labelId : undefined}
          onScroll={handleScroll}
          sx={{ flex: 1, overflowY: 'auto', py: 0.5, px: 0, outline: 'none' }}
        >
          {children ? children : groupedOptions ? (
            groupedOptions.map((grp, grpIdx) => [
              grp.name ? (
                <ListSubheader
                  key={`header-${grp.name}`}
                  disableSticky
                  sx={[
                    { color: 'text.secondary', fontWeight: 600, fontSize: '0.8125rem', bgcolor: 'transparent', lineHeight: '2', pt: grpIdx === 0 ? 0.5 : 1.25, pb: 0.25, px: 2 },
                    ...toSxArray(groupHeaderSx),
                    ...toSxArray(slotSx?.groupHeader),
                  ]}
                >
                  {grp.name}
                </ListSubheader>
              ) : null,
              ...grp.options.map(renderOption),
            ])
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map(renderOption)
          ) : (
            <MenuItem disabled sx={{ py: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>No options found</Typography>
            </MenuItem>
          )}

          {/* 3. Infinite Scroll Loader */}
          {loadingMore && (
            <Box
              data-testid="select-loading-more"
              aria-live="polite"
              sx={[{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25, py: 1.5, px: 2, fontSize: '0.8125rem', borderTop: '1px dashed', borderColor: 'divider', bgcolor: 'grey.50', userSelect: 'none' }, ...toSxArray(slotSx?.loadingMore)]}
            >
              <CircularProgress size={16} thickness={4.5} sx={{ color: '#00A39D' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{loadingMoreText}</Typography>
            </Box>
          )}
        </MenuList>
      </Popover>

      {helperText && (
        <FormHelperText sx={[{ mx: 0, mt: 0.5 }, ...toSxArray(helperTextSx), ...toSxArray(slotSx?.helperText)]}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
