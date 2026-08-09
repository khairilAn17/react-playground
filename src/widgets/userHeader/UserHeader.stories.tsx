import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import { UserHeader } from './UserHeader'

const meta: Meta<typeof UserHeader> = {
  title: 'Widgets/UserHeader',
  component: UserHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: '#F4F5F7', display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UserHeader>

export const Default: Story = {
  args: {
    user: {
      name: 'Shafa Riani',
      role: 'Maker',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    unreadCount: 2,
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
  },
}

export const ApproverUser: Story = {
  args: {
    user: {
      name: 'Ahmad Dahlan',
      role: 'Approver',
      email: 'ahmad@byondbiznis.co.id',
    },
    unreadCount: 5,
  },
}
