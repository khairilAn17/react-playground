import type { Meta, StoryObj } from '@storybook/react'
import { FormTextField } from './FormTextField'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  username: string
  password: string
  bio?: string
}

const meta: Meta<typeof FormTextField> = {
  title: 'Components/Form/FormTextField',
  component: FormTextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ username: '', password: '', bio: '' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormTextField>

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'e.g. john_doe',
  },
}

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}

export const Multiline: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
    multiline: true,
    rows: 4,
    placeholder: 'Tell us about yourself...',
  },
}

export const Disabled: Story = {
  args: {
    name: 'username',
    label: 'Username',
    disabled: true,
    value: 'read_only_user',
  },
}
