import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { SearchInput } from './SearchInput'
import { CheckCircle } from '@mui/icons-material'

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

export const VisualVariants: Story = {
  render: () => {
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
  },
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

export const WithKeyboardShortcut: Story = {
  render: () => {
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
  },
}

export const LoadingStateDemo: Story = {
  render: () => {
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
  },
}
