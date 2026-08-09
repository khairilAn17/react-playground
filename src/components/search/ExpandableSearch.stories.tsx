import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Chip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { ExpandableSearch } from './ExpandableSearch'

const meta: Meta<typeof ExpandableSearch> = {
  title: 'Components/Inputs/ExpandableSearch',
  component: ExpandableSearch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: '#F4F5F7', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ExpandableSearch>

export const Default: Story = {
  args: {
    placeholder: 'Search…',
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search transactions, accounts…',
  },
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Type a query',
    label: 'Filter',
  },
}

export const InToolbar: Story = {
  render: function InToolbarStory() {
    const [query, setQuery] = useState('')
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          bgcolor: 'white',
          borderRadius: 2,
          border: '1px solid #E2E8F0',
          width: '100%',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Sidebar Architecture
        </Typography>
        <Chip label="Live Preview" color="success" size="small" />
        <ExpandableSearch
          placeholder="Search components…"
          value={query}
          onChange={setQuery}
          onSearch={(v) => console.log('search:', v)}
        />
      </Box>
    )
  },
}

export const CustomIcon: Story = {
  args: {
    placeholder: 'Find something…',
    searchIcon: <SearchIcon fontSize="small" sx={{ color: '#00A39D' }} />,
    iconButtonSx: {
      bgcolor: 'white',
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      '&:hover': { bgcolor: '#F8FAFC' },
      p: 1,
    },
    paperSx: {
      bgcolor: 'white',
      borderColor: '#00A39D',
    },
  },
}

export const WideExpanded: Story = {
  args: {
    placeholder: 'Search members, transactions, accounts…',
    expandedWidth: 420,
  },
}
