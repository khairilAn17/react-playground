import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import { Breadcrumbs } from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: '#F4F5F7' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Form Workspaces', href: '#' },
      { label: 'Single Page Form' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon sx={{ fontSize: 14 }} /> },
      { label: 'Business Banking', href: '/business-banking' },
      { label: 'Beranda' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
}

export const DeepHierarchy: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Business', href: '/business' },
      { label: 'Banking', href: '/business/banking' },
      { label: 'Accounts', href: '/business/banking/accounts' },
      { label: 'Details' },
    ],
  },
}
