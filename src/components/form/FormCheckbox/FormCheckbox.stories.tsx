import type { Meta, StoryObj } from '@storybook/react'
import { FormCheckbox } from './FormCheckbox'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  agreeTerms: boolean
}

const meta: Meta<typeof FormCheckbox> = {
  title: 'Components/Form/FormCheckbox',
  component: FormCheckbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ agreeTerms: false }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormCheckbox>

export const Default: Story = {
  args: {
    name: 'agreeTerms',
    label: 'I agree to the Terms of Service',
  },
}

export const CheckedByDefault: Story = {
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ agreeTerms: true }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
  args: {
    name: 'agreeTerms',
    label: 'I agree to the Terms of Service',
  },
}

export const WithHelperText: Story = {
  args: {
    name: 'agreeTerms',
    label: 'Subscribe to marketing emails',
    helperText: 'You can unsubscribe at any time.',
  },
}
