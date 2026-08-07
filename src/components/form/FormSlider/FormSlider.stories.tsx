import type { Meta, StoryObj } from '@storybook/react'
import { FormSlider } from './FormSlider'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  experienceYears: number
}

const meta: Meta<typeof FormSlider> = {
  title: 'Components/Form/FormSlider',
  component: FormSlider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ experienceYears: 3 }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSlider>

export const Default: Story = {
  args: {
    name: 'experienceYears',
    label: 'Years of Experience',
    min: 0,
    max: 20,
    step: 1,
    valueLabelDisplay: 'auto',
    formatValue: (val) => `${val} year${val === 1 ? '' : 's'}`,
  },
}

export const Percentage: Story = {
  args: {
    name: 'experienceYears',
    label: 'Completion Percentage',
    min: 0,
    max: 100,
    step: 5,
    valueLabelDisplay: 'auto',
    formatValue: (val) => `${val}%`,
  },
}
