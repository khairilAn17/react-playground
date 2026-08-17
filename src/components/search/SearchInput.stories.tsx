import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo, useEffect } from 'react'
import { Box, Typography, Stack, Chip, CircularProgress } from '@mui/material'
import { debounce } from 'lodash-es'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Search/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInput>

function VisualVariantsStory() {
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('Search Something')
  const [q3, setQ3] = useState('Search Something')
  const [q4, setQ4] = useState('')

  return (
    <Box sx={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* 1. Pill Variant */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.75, display: 'block' }}>
          1. Pill Variant (Rounded 50px, filled #F1F5F9)
        </Typography>
        <SearchInput
          variant="pill"
          placeholder="Search Something"
          disableFocusRing={true}
          value={q1}
          onValueChange={(val) => setQ1(val)}
          borderRadius={10}
          startIcon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L16.65 16.65" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </Box>

      {/* 2. Outlined Variant with Clear Button */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.75, display: 'block' }}>
          2. Outlined Variant with Clear Button (Default)
        </Typography>
        <SearchInput
          variant="outlined"
          placeholder="Search Something"
          value={q2}
          onValueChange={(val) => setQ2(val)}
          clearable
        />
      </Box>

      {/* 3. Filled Variant */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.75, display: 'block' }}>
          3. Filled Variant (Soft background #F8FAFC)
        </Typography>
        <SearchInput
          variant="filled"
          placeholder="Search Something"
          value={q3}
          onValueChange={(val) => setQ3(val)}
          clearable
        />
      </Box>

      {/* 4. Standard / Underline Variant */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.75, display: 'block' }}>
          4. Standard / Flush Variant (Underline only)
        </Typography>
        <SearchInput
          variant="standard"
          placeholder="Search Something"
          value={q4}
          onValueChange={(val) => setQ4(val)}
        />
      </Box>
    </Box>
  )
}
export const VisualVariants: Story = {
  render: () => <VisualVariantsStory />,
}

export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={2.5} sx={{ maxWidth: 440 }}>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
          Small (34px)
        </Typography>
        <SearchInput size="small" variant="outlined" placeholder="Search small..." />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
          Medium (40px - Default)
        </Typography>
        <SearchInput size="medium" variant="outlined" placeholder="Search medium..." />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
          Large (48px)
        </Typography>
        <SearchInput size="large" variant="outlined" placeholder="Search large..." />
      </Box>
    </Stack>
  ),
}

function WithKeyboardShortcutStory() {
  const [text, setText] = useState('')
  return (
    <Box sx={{ maxWidth: 400 }}>
      <SearchInput
        variant="pill"
        placeholder="Type to search..."
        value={text}
        onValueChange={(val) => setText(val)}
        shortcut="⌘K"
        clearable
      />
    </Box>
  )
}
export const WithKeyboardShortcut: Story = {
  render: () => <WithKeyboardShortcutStory />,
}

function LoadingStateDemoStory() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('Fetching real-time data...')

  return (
    <Stack spacing={2} sx={{ maxWidth: 440 }}>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.75, display: 'block' }}>
          Search Input with Active Loading Spinner
        </Typography>
        <SearchInput
          variant="outlined"
          placeholder="Searching..."
          value={query}
          onValueChange={(val) => setQuery(val)}
          loading={loading}
          clearable
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <button
          type="button"
          onClick={() => setLoading((prev) => !prev)}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
          }}
        >
          Toggle Loading: {loading ? 'ON' : 'OFF'}
        </button>
      </Box>
    </Stack>
  )
}
export const LoadingStateDemo: Story = {
  render: () => <LoadingStateDemoStory />,
}

const MOCK_ACCOUNTS = [
  'PT Mega Berkah Utama - Operasional (002-882-991)',
  'PT Mega Berkah Utama - Payroll (002-882-992)',
  'PT Mega Berkah Utama - Pajak (002-882-993)',
  'PT Sinar Abadi Sentosa - Giro IDR (110-334-551)',
  'PT Sinar Abadi Sentosa - Valas USD (110-334-552)',
  'CV Cahaya Nusantara - Escrow (991-002-334)',
  'Bank Syariah Mandiri - Rekening Utama (772-110-441)',
]

function ExternalLodashDebounceDemoStory() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [keystrokeCount, setKeystrokeCount] = useState(0)
  const [searchCallCount, setSearchCallCount] = useState(0)

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedQuery(query)
        setIsSearching(false)
        setSearchCallCount((prev) => prev + 1)
      }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleInputChange = (nextVal: string) => {
    setInputValue(nextVal)
    setKeystrokeCount((prev) => prev + 1)
    setIsSearching(true)
    debouncedSearch(nextVal)
  }

  const handleClear = () => {
    debouncedSearch.cancel()
    setInputValue('')
    setDebouncedQuery('')
    setIsSearching(false)
  }

  const filteredAccounts = MOCK_ACCOUNTS.filter((acc) =>
    acc.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  return (
    <Box sx={{ maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
          External Debounce Pattern (via `lodash-es/debounce`)
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Input typing is 100% instant and responsive. The expensive search operation / API call is debounced by 500ms outside the component.
        </Typography>

        <SearchInput
          variant="outlined"
          placeholder="Type account name or number (e.g. Mega, Payroll, 002)..."
          value={inputValue}
          onValueChange={handleInputChange}
          onClear={handleClear}
          loading={isSearching}
          clearable
          loadingIndicator={
            <CircularProgress size={15} thickness={4.5} color="inherit" />
          }
        />
      </Box>

      {/* ── Debounce Metrics & Telemetry ── */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Real-time Debounce Metrics
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <Chip
            label={`Immediate Keystrokes: ${keystrokeCount}`}
            size="small"
            color="default"
            variant="outlined"
          />
          <Chip
            label={`Debounced API Searches: ${searchCallCount}`}
            size="small"
            sx={{ bgcolor: '#00A39D', color: '#FFFFFF', fontWeight: 600 }}
          />
          <Chip
            label={isSearching ? '⏳ Waiting for user to stop typing (500ms)...' : '✅ Settled / Idle'}
            size="small"
            color={isSearching ? 'warning' : 'success'}
            variant="outlined"
          />
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          <strong>Active Debounced Query:</strong> {debouncedQuery ? `"${debouncedQuery}"` : '<em>(empty)</em>'}
        </Typography>
      </Box>

      {/* ── Search Results List ── */}
      <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: '10px', overflow: 'hidden' }}>
        <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            MATCHING RESULTS ({filteredAccounts.length})
          </Typography>
        </Box>
        <Box sx={{ p: 1, maxHeight: 220, overflowY: 'auto' }}>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((acc) => (
              <Box
                key={acc}
                sx={{
                  p: 1.25,
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'grey.50' },
                }}
              >
                {acc}
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
              No accounts found matching &quot;{debouncedQuery}&quot;
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
export const ExternalLodashDebounceDemo: Story = {
  render: () => <ExternalLodashDebounceDemoStory />,
}
