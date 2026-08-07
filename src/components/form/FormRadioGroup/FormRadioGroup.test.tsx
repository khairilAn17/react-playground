import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormRadioGroup } from './FormRadioGroup'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  plan: string
}

const OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
]

describe('FormRadioGroup', () => {
  it('renders section label and radio options correctly', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ plan: 'free' }}>
        <FormRadioGroup<TestFormValues>
          name="plan"
          label="Subscription Plan"
          options={OPTIONS}
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Subscription Plan')).toBeInTheDocument()
    expect(screen.getByLabelText('Free')).toBeInTheDocument()
    expect(screen.getByLabelText('Pro')).toBeInTheDocument()
  })

  it('selects option on click', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ plan: 'free' }}>
        <FormRadioGroup<TestFormValues>
          name="plan"
          label="Subscription Plan"
          options={OPTIONS}
        />
      </TestFormWrapper>
    )

    const proOption = screen.getByLabelText('Pro') as HTMLInputElement
    fireEvent.click(proOption)
    expect(proOption.checked).toBe(true)
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ plan: 'free' }}>
        <FormRadioGroup<TestFormValues>
          name="plan"
          label="Subscription Plan"
          options={OPTIONS}
          helperText="Select a plan to proceed"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Select a plan to proceed')).toBeInTheDocument()
  })
})
