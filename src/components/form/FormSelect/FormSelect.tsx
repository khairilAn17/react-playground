import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListSubheader,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material'
import type { SelectProps, SxProps, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { SelectOptionRow } from './SelectOptionRow'
import type { SelectOption, FormSelectProps } from './types'

export type { SelectOption, FormSelectProps, SelectOptionSlotSx, FormSelectSlotSx } from './types'

function formatRadius(radius: number | string | undefined): string | number | undefined {
  if (radius === undefined) return undefined
  if (typeof radius === 'number') {
    return `${radius}px`
  }
  return radius
}

function toSearchable(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return ''
}

function buildSearchText(opt: SelectOption): string {
  const bulletTexts = opt.bullets ? opt.bullets.map(toSearchable).join(' ') : ''
  return [
    opt.label ?? '',
    toSearchable(opt.leftTitle),
    toSearchable(opt.leftSubtitle),
    toSearchable(opt.rightTitle),
    toSearchable(opt.rightSubtitle),
    bulletTexts,
  ]
    .join(' ')
    .toLowerCase()
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  children,
  searchable = false,
  searchPlaceholder = 'Search...',
  placeholder,
  showCheckmark = true,
  borderRadius,
  control,
  helperText,
  fullWidth = true,
  size = 'medium',
  sx,
  disabled,
  variant = 'outlined',
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
}: FormSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const formContext = useFormContext<T>()
  const resolvedControl = control ?? formContext?.control

  if (!resolvedControl) {
    throw new Error(
      `<FormSelect name="${String(name)}"> requires either:\n` +
      `  1. An ancestor <FormProvider> wrapping this component, or\n` +
      `  2. An explicit "control" prop passed directly.`
    )
  }

  const labelId = label ? `${String(name)}-label` : undefined
  const rawRadius = borderRadius ?? (label ? undefined : '12px')
  const effectiveBorderRadius = formatRadius(rawRadius)
  const isLarge = size === 'large'
  const isSmall = size === 'small'
  const muiSize = isLarge ? 'medium' : size

  const safeOptions = useMemo(() => options ?? [], [options])

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return safeOptions
    const term = searchTerm.toLowerCase()
    return safeOptions.filter((opt) => buildSearchText(opt).includes(term))
  }, [safeOptions, searchable, searchTerm])

  const handleClose = (event: React.SyntheticEvent) => {
    if (searchable) {
      setSearchTerm('')
    }
    onClose?.(event)
  }

  const mergedMenuProps: SelectProps['MenuProps'] = {
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
    <Controller
      name={name}
      control={resolvedControl}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          error={!!error}
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

          <Select
            {...props}
            size={muiSize}
            variant={variant}
            labelId={labelId}
            label={label}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
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
                <TextField
                  size="small"
                  fullWidth
                  autoFocus
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    const allowedKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Tab']
                    if (!allowedKeys.includes(e.key)) {
                      e.stopPropagation()
                    }
                  }}
                  sx={[
                    ...(searchFieldSx ? (Array.isArray(searchFieldSx) ? searchFieldSx : [searchFieldSx]) : []),
                    ...(slotSx?.searchField ? (Array.isArray(slotSx.searchField) ? slotSx.searchField : [slotSx.searchField]) : []),
                  ]}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </ListSubheader>
            )}

            {children ? (
              children
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
          </Select>

          {(error?.message || helperText) && (
            <FormHelperText
              sx={[
                { mx: 0 },
                ...(helperTextSx ? (Array.isArray(helperTextSx) ? helperTextSx : [helperTextSx]) : []),
                ...(slotSx?.helperText ? (Array.isArray(slotSx.helperText) ? slotSx.helperText : [slotSx.helperText]) : []),
              ]}
            >
              {error?.message ?? helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}