import type { Meta, StoryObj } from '@storybook/react'
import { MenuItem } from '@mui/material'
import { FormSelect } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  role: string
}

const SAMPLE_OPTIONS = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

const meta: Meta<typeof FormSelect> = {
  title: 'Components/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ role: '' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSelect>

export const Default: Story = {
  args: {
    name: 'role',
    label: 'Role',
    options: SAMPLE_OPTIONS,
  },
}

export const Searchable: Story = {
  args: {
    name: 'role',
    label: 'Role',
    options: SAMPLE_OPTIONS,
    searchable: true,
    searchPlaceholder: 'Search roles...',
  },
}

export const ComposableChildren: Story = {
  args: {
    name: 'role',
    label: 'Custom Option Items',
    children: [
      <MenuItem key="fe" value="fe">⚡ Frontend Engineer</MenuItem>,
      <MenuItem key="be" value="be">🛠️ Backend Engineer</MenuItem>,
      <MenuItem key="ux" value="ux">🎨 UI/UX Designer</MenuItem>,
    ],
  },
}
