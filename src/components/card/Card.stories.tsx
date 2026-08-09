import type { Meta, StoryObj } from '@storybook/react'
import { Box, Button, Chip, LinearProgress, Typography } from '@mui/material'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 480, p: 3, bgcolor: '#F4F5F7' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Optional subtitle text',
    children: (
      <Typography variant="body2" color="text.secondary">
        This is the card content area. Place any content here — tables, forms, charts, or text.
      </Typography>
    ),
  },
}

export const WithActions: Story = {
  args: {
    title: 'Team Members',
    subtitle: '12 active members',
    actions: (
      <>
        <Button size="small" variant="outlined">Export</Button>
        <Button size="small" variant="contained">+ Add</Button>
      </>
    ),
    divider: true,
    children: (
      <Typography variant="body2" color="text.secondary">
        Team member list would appear here.
      </Typography>
    ),
  },
}

export const LimitWidget: Story = {
  args: {
    title: 'Limit Harian Tersedia',
    subtitle: 'Rekening Utama — 0012 3456 7890',
    actions: <Chip label="Active" color="success" size="small" />,
    divider: true,
    children: (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', mb: 1 }}>
          Rp 180.000.000
        </Typography>
        <LinearProgress
          variant="determinate"
          value={75}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: '#E2E8F0',
            '& .MuiLinearProgress-bar': { bgcolor: '#00A39D', borderRadius: 3 },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
          Rp 45.000.000 telah digunakan (25%)
        </Typography>
      </Box>
    ),
  },
}

export const NoPadding: Story = {
  args: {
    title: 'Full Width Content',
    divider: true,
    noPadding: true,
    children: (
      <Box sx={{ bgcolor: '#F4F5F7', p: 3 }}>
        <Typography variant="body2">Content fills edge-to-edge (noPadding=true)</Typography>
      </Box>
    ),
  },
}

export const NoHeader: Story = {
  args: {
    children: (
      <Typography variant="body2" color="text.secondary">
        A card with no title, subtitle, or actions — just content.
      </Typography>
    ),
  },
}
