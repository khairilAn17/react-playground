import { useState, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react'
import { Box, InputBase, IconButton, Paper, Typography, Fade } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

export interface ExpandableSearchProps {
  /** Input placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Controlled change handler */
  onChange?: (value: string) => void
  /** Called on Enter key press */
  onSearch?: (value: string) => void
  /** Label shown to the left of the expanded input */
  label?: string
  /** Custom icon for the search button */
  searchIcon?: ReactNode
  /** Width when expanded (default: 280) */
  expandedWidth?: number | string
  /** Sx props for the collapsed trigger button */
  iconButtonSx?: SxProps<Theme>
  /** Sx props for the expanded paper container */
  paperSx?: SxProps<Theme>
}

/**
 * ExpandableSearch
 *
 * A standalone, expandable search component that collapses into a search icon
 * button and smoothly expands into a full input field upon interaction.
 *
 * Can be used anywhere: toolbars, page headers, cards, top bars, etc.
 * Supports both controlled and uncontrolled modes.
 */
export function ExpandableSearch({
  placeholder = 'Search…',
  value,
  onChange,
  onSearch,
  label,
  searchIcon = <SearchIcon fontSize="small" />,
  expandedWidth = 280,
  iconButtonSx,
  paperSx,
}: ExpandableSearchProps) {
  const [expanded, setExpanded] = useState(false)
  const [internalValue, setInternalValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleExpand = () => {
    setExpanded(true)
    setTimeout(() => inputRef.current?.focus(), 60)
  }

  const handleCollapse = () => {
    setExpanded(false)
    if (!isControlled) setInternalValue('')
    onChange?.('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') onSearch?.(currentValue)
    if (e.key === 'Escape') handleCollapse()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!expanded ? (
        <IconButton
          size="small"
          onClick={handleExpand}
          aria-label="Open search"
          sx={{
            borderRadius: 1.5,
            transition: 'all 0.15s ease',
            '&:hover': { bgcolor: 'action.hover' },
            ...iconButtonSx,
          }}
        >
          {searchIcon}
        </IconButton>
      ) : (
        <Fade in={expanded} timeout={180}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              minWidth: expandedWidth,
              bgcolor: 'background.paper',
              borderColor: 'divider',
              transition: 'min-width 0.2s ease',
              ...paperSx,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', flexShrink: 0 }}>
              {searchIcon}
            </Box>

            {label && (
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 600, mr: 0.5, flexShrink: 0 }}
              >
                {label}:
              </Typography>
            )}

            <InputBase
              inputRef={inputRef}
              value={currentValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              inputProps={{ 'aria-label': placeholder }}
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                '& input': { py: 0 },
              }}
            />

            {currentValue && (
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', flexShrink: 0, fontFamily: 'monospace' }}
              >
                ↵
              </Typography>
            )}

            <IconButton
              size="small"
              onClick={handleCollapse}
              aria-label="Close search"
              sx={{ flexShrink: 0, ml: 0.5 }}
            >
              <CloseIcon sx={{ fontSize: '0.875rem' }} />
            </IconButton>
          </Paper>
        </Fade>
      )}
    </Box>
  )
}
