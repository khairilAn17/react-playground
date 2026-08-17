import { useId } from 'react'
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  Avatar,
} from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'

import { toSxArray } from '../select/utils'
import type { AutocompleteProps, AutocompleteOption } from './types'

export function Autocomplete<
  T = AutocompleteOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  id,
  name,
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  fullWidth = true,
  size = 'medium',
  borderRadius = '12px',
  inputRef,
  textFieldProps,
  slotSx,
  options,
  getOptionLabel = (option) => {
    if (typeof option === 'string') return option
    if (option && typeof option === 'object' && 'label' in option) {
      return String((option as unknown as AutocompleteOption).label ?? '')
    }
    return String(option ?? '')
  },
  isOptionEqualToValue = (option, value) => {
    if (option === value) return true
    if (
      option &&
      value &&
      typeof option === 'object' &&
      typeof value === 'object' &&
      'value' in option &&
      'value' in value
    ) {
      return (
        (option as unknown as AutocompleteOption).value ===
        (value as unknown as AutocompleteOption).value
      )
    }
    return false
  },
  renderOption,
  renderTags,
  slotProps,
  multiple = false as Multiple,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const generatedId = useId()
  const triggerId = id || generatedId
  const labelId = label ? `${triggerId}-label` : undefined

  const isSmall = size === 'small'
  const isLarge = size === 'large'

  const minHeight = isLarge ? 56 : isSmall ? 40 : 48
  const paddingX = isLarge ? 2 : isSmall ? 1.25 : 1.75
  const paddingY = isLarge ? 1.25 : isSmall ? 0.5 : 0.875
  const formattedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius

  const userChipSlot = typeof slotProps?.chip === 'object' && slotProps?.chip !== null ? (slotProps.chip as Record<string, unknown>) : {}
  const userPaperSlot = typeof slotProps?.paper === 'object' && slotProps?.paper !== null ? (slotProps.paper as Record<string, unknown>) : {}
  const userListboxSlot = typeof slotProps?.listbox === 'object' && slotProps?.listbox !== null ? (slotProps.listbox as Record<string, unknown>) : {}

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      sx={[
        { width: fullWidth ? '100%' : 'auto' },
        ...toSxArray(slotSx?.formControl),
      ]}
    >
      {label && (
        <InputLabel
          id={labelId}
          htmlFor={triggerId}
          shrink
          error={error}
          disabled={disabled}
          sx={[
            {
              position: 'static',
              transform: 'none',
              mb: 0.75,
              fontWeight: 600,
              fontSize: isSmall ? '0.8125rem' : '0.875rem',
              color: error ? 'error.main' : 'text.primary',
            },
            ...toSxArray(slotSx?.inputLabel),
          ]}
        >
          {label}
        </InputLabel>
      )}

      <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
        {...props}
        id={triggerId}
        multiple={multiple}
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        popupIcon={<KeyboardArrowDownIcon sx={{ fontSize: isSmall ? 20 : 22 }} />}
        clearIcon={<CloseIcon sx={{ fontSize: isSmall ? 18 : 20 }} />}
        slotProps={{
          ...slotProps,
          chip: {
            ...userChipSlot,
            size: isSmall ? 'small' : 'medium',
            sx: [
              {
                borderRadius: '8px',
                bgcolor: 'rgba(0, 163, 157, 0.1)',
                color: '#00A39D',
                fontWeight: 600,
                border: '1px solid rgba(0, 163, 157, 0.2)',
                '& .MuiChip-deleteIcon': {
                  color: '#00A39D',
                  fontSize: 16,
                  '&:hover': {
                    color: '#007A76',
                  },
                },
              },
              ...toSxArray(userChipSlot.sx as SxProps<Theme>),
              ...toSxArray(slotSx?.tag),
            ],
          },
          paper: {
            ...userPaperSlot,
            sx: [
              (theme: Theme) => ({
                borderRadius: formattedRadius,
                mt: 1,
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${theme.palette.divider}`,
                maxHeight: 320,
              }),
              ...toSxArray(userPaperSlot.sx as SxProps<Theme>),
              ...toSxArray(slotSx?.paper),
            ],
          },
          listbox: {
            ...userListboxSlot,
            sx: [
              {
                p: 0.75,
                '& .MuiAutocomplete-option': {
                  borderRadius: '8px',
                  my: 0.25,
                  py: isSmall ? 0.75 : 1,
                  px: 1.5,
                  fontSize: isSmall ? '0.8125rem' : '0.875rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  transition: 'background-color 0.15s ease',
                  '&[aria-selected="true"]': {
                    bgcolor: 'rgba(0, 163, 157, 0.08) !important',
                    color: '#00A39D',
                    fontWeight: 600,
                  },
                  '&.Mui-focused': {
                    bgcolor: 'rgba(0, 163, 157, 0.04)',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(0, 163, 157, 0.06)',
                  },
                },
              },
              ...toSxArray(userListboxSlot.sx as SxProps<Theme>),
              ...toSxArray(slotSx?.listbox),
            ],
          },
        }}
        renderOption={
          renderOption ??
          ((optionProps, option, { selected }) => {
            const { key, ...restProps } = optionProps
            const opt = option as unknown as AutocompleteOption

            return (
              <Box
                key={key}
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
                  ...toSxArray(slotSx?.option),
                ]}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0, flex: 1 }}>
                  {opt.avatar ? (
                    typeof opt.avatar === 'string' ? (
                      <Avatar
                        src={opt.avatar.startsWith('http') || opt.avatar.startsWith('/') ? opt.avatar : undefined}
                        sx={{
                          width: isSmall ? 24 : 30,
                          height: isSmall ? 24 : 30,
                          fontSize: isSmall ? '0.75rem' : '0.8125rem',
                          bgcolor: opt.avatarBg || '#00A39D',
                          color: '#FFFFFF',
                          fontWeight: 600,
                        }}
                      >
                        {!opt.avatar.startsWith('http') && !opt.avatar.startsWith('/') ? opt.avatar : undefined}
                      </Avatar>
                    ) : (
                      opt.avatar
                    )
                  ) : opt.icon ? (
                    <Box sx={{ color: selected ? '#00A39D' : 'text.secondary', display: 'flex', alignItems: 'center' }}>
                      {opt.icon}
                    </Box>
                  ) : null}

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        fontWeight: selected ? 600 : 500,
                        color: selected ? '#00A39D' : 'text.primary',
                        fontSize: isSmall ? '0.8125rem' : '0.875rem',
                      }}
                    >
                      {getOptionLabel(option)}
                    </Typography>
                    {opt.subtitle && (
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{
                          color: 'text.secondary',
                          fontSize: isSmall ? '0.6875rem' : '0.75rem',
                          display: 'block',
                        }}
                      >
                        {opt.subtitle}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            )
          })
        }
        {...(renderTags !== undefined ? { renderTags } : {})}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            name={name}
            inputRef={inputRef}
            placeholder={placeholder}
            error={error}
            sx={[
              (theme: Theme) => ({
                '& .MuiOutlinedInput-root': {
                  minHeight,
                  px: paddingX,
                  py: paddingY,
                  borderRadius: formattedRadius,
                  bgcolor: disabled
                    ? theme.palette.action.disabledBackground
                    : theme.palette.background.paper,
                  transition: theme.transitions.create(['border-color', 'box-shadow']),
                  '& fieldset': {
                    borderColor: error ? theme.palette.error.main : theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: disabled
                      ? undefined
                      : error
                        ? theme.palette.error.main
                        : theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                    borderWidth: '1.5px',
                  },
                  '&.Mui-focused': {
                    boxShadow: `0 0 0 3px ${
                      error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 163, 157, 0.15)'
                    }`,
                  },
                  '& .MuiAutocomplete-popupIndicator': {
                    color: 'action.active',
                    transition: 'transform 0.2s ease',
                  },
                  '& .MuiAutocomplete-popupIndicatorOpen': {
                    transform: 'rotate(180deg)',
                  },
                  '& .MuiAutocomplete-clearIndicator': {
                    color: 'action.active',
                  },
                  '& .MuiAutocomplete-input': {
                    py: 0.25,
                    fontSize: isLarge ? '1rem' : isSmall ? '0.8125rem' : '0.875rem',
                  },
                },
              }),
              ...toSxArray(textFieldProps?.sx as SxProps<Theme>),
              ...toSxArray(slotSx?.textField),
            ]}
          />
        )}
        sx={[
          { width: fullWidth ? '100%' : 'auto' },
          ...toSxArray(slotSx?.root),
        ]}
      />

      {helperText && (
        <FormHelperText
          sx={[
            { mx: 0, mt: 0.5 },
            ...toSxArray(slotSx?.helperText),
          ]}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
