import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormSlider } from './FormSlider'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  experienceYears: number
}

describe('FormSlider', () => {
  it('renders section label correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ experienceYears: 5 }}>
        <FormSlider<TestFormValues>
          name="experienceYears"
          label="Years of Experience"
          min={0}
          max={20}
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })

  it('renders formatted value when formatValue is provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ experienceYears: 5 }}>
        <FormSlider<TestFormValues>
          name="experienceYears"
          label="Years of Experience"
          min={0}
          max={20}
          formatValue={(val) => `${val} years`}
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('5 years')).toBeInTheDocument()
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ experienceYears: 5 }}>
        <FormSlider<TestFormValues>
          name="experienceYears"
          label="Years of Experience"
          helperText="Slide to select total years"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Slide to select total years')).toBeInTheDocument()
  })
})
