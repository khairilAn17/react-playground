import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { z } from 'zod'
import { FormDatePicker } from './FormDatePicker'
import { renderWithForm } from '../../../test/test-utils'

const schema = z.object({
  birthDate: z.any(),
})

type TestValues = z.infer<typeof schema>

const defaultValues: TestValues = { birthDate: null }

describe('FormDatePicker', () => {
  it('renders with a label', () => {
    renderWithForm<TestValues>(
      <FormDatePicker<TestValues> name="birthDate" label="Date of Birth" />,
      { schema, defaultValues }
    )

    // MUI DatePicker renders role="group" with aria-labelledby pointing to the <label>
    expect(screen.getByRole('group', { name: 'Date of Birth' })).toBeInTheDocument()
  })

  it('shows helper text when no error', () => {
    renderWithForm<TestValues>(
      <FormDatePicker<TestValues>
        name="birthDate"
        label="Date of Birth"
        helperText="Enter your birth date"
      />,
      { schema, defaultValues }
    )

    expect(screen.getByText('Enter your birth date')).toBeInTheDocument()
  })

  it('renders date segment spinbuttons (MUI DatePicker uses spinbutton role, not textbox)', () => {
    renderWithForm<TestValues>(
      <FormDatePicker<TestValues> name="birthDate" label="Appointment Date" />,
      { schema, defaultValues }
    )

    // MUI DatePicker renders MM / DD / YYYY as separate spinbutton elements
    const spinbuttons = screen.getAllByRole('spinbutton')
    expect(spinbuttons.length).toBeGreaterThanOrEqual(3)
  })

  it('renders a calendar open button', () => {
    renderWithForm<TestValues>(
      <FormDatePicker<TestValues> name="birthDate" label="Appointment Date" />,
      { schema, defaultValues }
    )

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument()
  })
})
