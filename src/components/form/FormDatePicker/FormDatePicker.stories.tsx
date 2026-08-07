import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { z } from 'zod'
import dayjs from 'dayjs'
import { FormDatePicker } from './FormDatePicker'
import { TestFormWrapper } from '../../../test/test-utils'

const schema = z.object({
  birthDate: z.any().nullable(),
})
type StoryValues = z.infer<typeof schema>

const meta: Meta<typeof FormDatePicker<StoryValues>> = {
  title: 'Components/Form/FormDatePicker',
  component: FormDatePicker,
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TestFormWrapper<StoryValues>
          schema={schema}
          defaultValues={{ birthDate: null }}
        >
          <Story />
        </TestFormWrapper>
      </LocalizationProvider>
    ),
  ],
  args: {
    name: 'birthDate' as never,
    label: 'Date of Birth',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: {
    helperText: 'Select your date of birth',
  },
}

export const WithDisabledDates: Story = {
  args: {
    label: 'Meeting Date',
    helperText: 'Weekends are disabled',
    shouldDisableDate: (date) => dayjs(date).day() === 0 || dayjs(date).day() === 6,
  },
}

export const WithMinMax: Story = {
  args: {
    label: 'Appointment Date',
    helperText: 'Book within the next 30 days',
    minDate: dayjs(),
    maxDate: dayjs().add(30, 'day'),
  },
}
