import type { Meta, StoryObj } from '@storybook/react'
import { FormAutocomplete } from './FormAutocomplete'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  framework: string
}

const SAMPLE_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
]

const meta: Meta<typeof FormAutocomplete> = {
  title: 'Components/Form/FormAutocomplete',
  component: FormAutocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ framework: '' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormAutocomplete>

export const Default: Story = {
  args: {
    name: 'framework',
    label: 'Primary Framework',
    options: SAMPLE_OPTIONS,
  },
}

export const WithHelperText: Story = {
  args: {
    name: 'framework',
    label: 'Primary Framework',
    options: SAMPLE_OPTIONS,
    helperText: 'Select your main frontend technology',
  },
}
