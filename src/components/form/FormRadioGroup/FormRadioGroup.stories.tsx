import type { Meta, StoryObj } from '@storybook/react'
import { FormRadioGroup } from './FormRadioGroup'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  plan: string
}

const SAMPLE_OPTIONS = [
  { label: 'Free Plan ($0/mo)', value: 'free' },
  { label: 'Pro Plan ($19/mo)', value: 'pro' },
  { label: 'Enterprise Plan (Custom)', value: 'enterprise' },
]

const meta: Meta<typeof FormRadioGroup> = {
  title: 'Components/Form/FormRadioGroup',
  component: FormRadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ plan: 'free' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormRadioGroup>

export const Vertical: Story = {
  args: {
    name: 'plan',
    label: 'Select Your Plan',
    options: SAMPLE_OPTIONS,
  },
}

export const Horizontal: Story = {
  args: {
    name: 'plan',
    label: 'Select Your Plan',
    options: SAMPLE_OPTIONS,
    row: true,
  },
}
