import type { Meta, StoryObj } from '@storybook/react'
import { FormSwitch } from './FormSwitch'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  notifications: boolean
}

const meta: Meta<typeof FormSwitch> = {
  title: 'Components/Form/FormSwitch',
  component: FormSwitch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ notifications: false }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSwitch>

export const Default: Story = {
  args: {
    name: 'notifications',
    label: 'Enable Email Notifications',
  },
}

export const ActiveByDefault: Story = {
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ notifications: true }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
  args: {
    name: 'notifications',
    label: 'Enable Email Notifications',
  },
}

export const WithHelperText: Story = {
  args: {
    name: 'notifications',
    label: 'Push Notifications',
    helperText: 'Receive real-time alerts on your mobile device',
  },
}
