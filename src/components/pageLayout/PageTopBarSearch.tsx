import { useState, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { Box, InputBase, IconButton, Paper, Typography, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

export interface PageTopBarSearchProps {
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
}

/**
 * PageTopBarSearch
 *
 * An expandable search input designed to live inside <PageLayout.TopBar>.
 * Collapses to a magnifier icon; expands to a full input on click.
 * Supports both controlled and uncontrolled modes.
 *
 * Usage inside PageLayout.TopBar:
 * ```tsx
 * <PageLayout.TopBar>
 *   <Typography variant="subtitle2" fontWeight={700}>Page Title</Typography>
 *   <PageTopBarSearch
 *     placeholder="Search members..."
 *     onSearch={(query) => console.log(query)}
 *   />
 * </PageLayout.TopBar>
 * ```
 */
export function PageTopBarSearch({
  placeholder = 'Search…',
  value,
  onChange,
  onSearch,
  label,
}: PageTopBarSearchProps) {
  const [expanded, setExpanded] = useState(false)
  const [internalValue, setInternalValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleExpand = () => {
    setExpanded(true)
    // Wait for animation then focus
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {!expanded ? (
        <IconButton
          size="small"
          onClick={handleExpand}
          aria-label="Open search"
          sx={{
            borderRadius: 1.5,
            transition: 'background 0.15s',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <SearchIcon fontSize="small" />
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
              minWidth: 260,
              bgcolor: 'background.default',
              transition: 'min-width 0.2s ease',
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: 'text.secondary', flexShrink: 0 }} />

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
