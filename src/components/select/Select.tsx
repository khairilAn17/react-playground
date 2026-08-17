import { useMemo, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  ListSubheader,
  Box,
  Typography,
} from '@mui/material'
import type { SelectProps as MuiSelectProps, SxProps, Theme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { SearchInput } from '../search'
import { SelectOptionRow } from './optionRow'
import { formatRadius, filterSelectOptions, groupSelectOptions } from './utils'
import type { SelectProps } from './types'

export function Select({
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
  searchVariant = 'outlined',
  searchClearable = true,
  searchLoading = false,
  placeholder,
  showCheckmark = true,
  borderRadius,
  helperText,
  error = false,
  fullWidth = true,
  size = 'medium',
  sx,
  disabled,
  variant = 'outlined',
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
  ...props
}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const labelId = label ? `${id || name || 'select'}-label` : undefined
  const rawRadius = borderRadius ?? (label ? undefined : '12px')
  const effectiveBorderRadius = formatRadius(rawRadius)
  const isLarge = size === 'large'
  const isSmall = size === 'small'
  const muiSize = isLarge ? 'medium' : size

  const safeOptions = useMemo(() => options ?? [], [options])

  const filteredOptions = useMemo(() => {
    return filterSelectOptions(safeOptions, searchTerm, searchable)
  }, [safeOptions, searchTerm, searchable])

  const groupedOptions = useMemo(() => {
    return groupSelectOptions(filteredOptions, groupBy)
  }, [filteredOptions, groupBy])

  const handleClose = (event: React.SyntheticEvent) => {
    if (searchable) {
      setSearchTerm('')
    }
    onClose?.(event)
  }

  const mergedMenuProps: MuiSelectProps['MenuProps'] = {
    autoFocus: false,
    disableAutoFocusItem: searchable,
    ...MenuProps,
    slotProps: {
      ...MenuProps?.slotProps,
      paper: {
        ...MenuProps?.slotProps?.paper,
        sx: [
          {
            borderRadius: effectiveBorderRadius ?? '8px',
            mt: 1,
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E2E8F0',
            maxHeight: 380,
            '& .MuiMenuItem-root': [
              {
                py: isLarge ? 1.75 : isSmall ? 0.75 : 1.25,
                px: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(0, 163, 157, 0.08)',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 157, 0.12)',
                  },
                },
              },
              ...(menuItemSx ? (Array.isArray(menuItemSx) ? menuItemSx : [menuItemSx]) : []),
              ...(slotSx?.menuItem ? (Array.isArray(slotSx.menuItem) ? slotSx.menuItem : [slotSx.menuItem]) : []),
            ],
          },
          ...(menuPaperSx ? (Array.isArray(menuPaperSx) ? menuPaperSx : [menuPaperSx]) : []),
          ...(slotSx?.menuPaper ? (Array.isArray(slotSx.menuPaper) ? slotSx.menuPaper : [slotSx.menuPaper]) : []),
        ],
      },
    },
  }

  const mergedSelectSx: SxProps<Theme> = [
    {
      ...(effectiveBorderRadius !== undefined && {
        borderRadius: effectiveBorderRadius,
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: effectiveBorderRadius,
        },
      }),
      '& .MuiSelect-select.MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        ...(isLarge && {
          paddingTop: '20px !important',
          paddingBottom: '20px !important',
          paddingLeft: '18px !important',
          paddingRight: '38px !important',
          fontSize: '1.125rem',
          minHeight: '28px',
        }),
        ...(isSmall && {
          paddingTop: '8.5px !important',
          paddingBottom: '8.5px !important',
          paddingLeft: '12px !important',
          paddingRight: '32px !important',
          fontSize: '0.875rem',
        }),
      },
      '& .MuiFormHelperText-root': {
        mx: 0,
      },
    },
    ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
    ...(selectSx ? (Array.isArray(selectSx) ? selectSx : [selectSx]) : []),
    ...(slotSx?.select ? (Array.isArray(slotSx.select) ? slotSx.select : [slotSx.select]) : []),
  ]

  const optionRowProps = {
    size,
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
    slotSx: slotSx?.optionRow,
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      size={muiSize}
      sx={[
        ...(formControlSx ? (Array.isArray(formControlSx) ? formControlSx : [formControlSx]) : []),
        ...(slotSx?.formControl ? (Array.isArray(slotSx.formControl) ? slotSx.formControl : [slotSx.formControl]) : []),
      ]}
      disabled={disabled}
      variant={variant}
    >
      {label && (
        <InputLabel
          id={labelId}
          sx={[
            ...(inputLabelSx ? (Array.isArray(inputLabelSx) ? inputLabelSx : [inputLabelSx]) : []),
            ...(slotSx?.inputLabel ? (Array.isArray(slotSx.inputLabel) ? slotSx.inputLabel : [slotSx.inputLabel]) : []),
          ]}
        >
          {label}
        </InputLabel>
      )}

      <MuiSelect
        {...props}
        id={id}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={inputRef}
        size={muiSize}
        variant={variant}
        labelId={labelId}
        label={label}
        onClose={handleClose}
        displayEmpty={!label || Boolean(placeholder)}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={(selectedVal) => {
          if ((selectedVal === '' || selectedVal === undefined) && placeholder) {
            return (
              <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: isLarge ? '1.125rem' : isSmall ? '0.875rem' : undefined }}>
                {placeholder}
              </Typography>
            )
          }
          if (renderValue) {
            return renderValue(selectedVal)
          }
          const foundOpt = safeOptions.find((o) => o.value === selectedVal)
          if (foundOpt) {
            return (
              <SelectOptionRow
                option={foundOpt}
                isSelected={true}
                isMenu={false}
                showCheckmark={false}
                {...optionRowProps}
              />
            )
          }
          return String(selectedVal)
        }}
        sx={mergedSelectSx}
        MenuProps={mergedMenuProps}
      >
        {searchable && (
          <ListSubheader
            disableSticky
            sx={[
              {
                pt: 1,
                pb: 1,
                px: 1.5,
                bgcolor: 'background.paper',
                lineHeight: 'normal',
              },
              ...(listSubheaderSx ? (Array.isArray(listSubheaderSx) ? listSubheaderSx : [listSubheaderSx]) : []),
              ...(slotSx?.listSubheader ? (Array.isArray(slotSx.listSubheader) ? slotSx.listSubheader : [slotSx.listSubheader]) : []),
            ]}
          >
            <SearchInput
              size="small"
              fullWidth
              autoFocus
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              onClear={() => setSearchTerm('')}
              variant={searchVariant}
              clearable={searchClearable}
              loading={searchLoading}
              onKeyDown={(e) => {
                const allowedKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab']
                if (!allowedKeys.includes(e.key)) {
                  e.stopPropagation()
                }
              }}
              containerSx={[
                ...(searchFieldSx ? (Array.isArray(searchFieldSx) ? searchFieldSx : [searchFieldSx]) : []),
                ...(slotSx?.searchField ? (Array.isArray(slotSx.searchField) ? slotSx.searchField : [slotSx.searchField]) : []),
              ]}
            />
          </ListSubheader>
        )}

        {children ? (
          children
        ) : groupedOptions ? (
          groupedOptions.map((grp, grpIdx) => [
            grp.name ? (
              <ListSubheader
                key={`header-${grp.name}`}
                disableSticky
                sx={[
                  {
                    color: '#64748B',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    bgcolor: 'transparent',
                    lineHeight: '2',
                    pt: grpIdx === 0 ? 0.5 : 1.25,
                    pb: 0.25,
                    px: 2,
                  },
                  ...(groupHeaderSx ? (Array.isArray(groupHeaderSx) ? groupHeaderSx : [groupHeaderSx]) : []),
                  ...(slotSx?.groupHeader ? (Array.isArray(slotSx.groupHeader) ? slotSx.groupHeader : [slotSx.groupHeader]) : []),
                ]}
              >
                {grp.name}
              </ListSubheader>
            ) : null,
            ...grp.options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled} sx={{ alignItems: 'flex-start' }}>
                  <SelectOptionRow
                    option={opt}
                    isSelected={isSelected}
                    isMenu={true}
                    showCheckmark={showCheckmark}
                    {...optionRowProps}
                  />
                </MenuItem>
              )
            }),
          ])
        ) : filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => {
            const isSelected = opt.value === value
            return (
              <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled} sx={{ alignItems: 'flex-start' }}>
                <SelectOptionRow
                  option={opt}
                  isSelected={isSelected}
                  isMenu={true}
                  showCheckmark={showCheckmark}
                  {...optionRowProps}
                />
              </MenuItem>
            )
          })
        ) : (
          <MenuItem disabled sx={{ py: 1.5 }}>
            <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              No options found
            </Box>
          </MenuItem>
        )}
      </MuiSelect>

      {helperText && (
        <FormHelperText
          sx={[
            { mx: 0 },
            ...(helperTextSx ? (Array.isArray(helperTextSx) ? helperTextSx : [helperTextSx]) : []),
            ...(slotSx?.helperText ? (Array.isArray(slotSx.helperText) ? slotSx.helperText : [slotSx.helperText]) : []),
          ]}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
