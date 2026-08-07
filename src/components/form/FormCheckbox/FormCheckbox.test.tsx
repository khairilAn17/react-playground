import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormCheckbox } from './FormCheckbox'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  rememberMe: boolean
}

describe('FormCheckbox', () => {
  it('renders label and initial unchecked state', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ rememberMe: false }}>
        <FormCheckbox<TestFormValues>
          name="rememberMe"
          label="Remember Me"
        />
      </TestFormWrapper>
    )

    const checkbox = screen.getByLabelText('Remember Me') as HTMLInputElement
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toBe(false)
  })

  it('toggles checked state on click', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ rememberMe: false }}>
        <FormCheckbox<TestFormValues>
          name="rememberMe"
          label="Remember Me"
        />
      </TestFormWrapper>
    )

    const checkbox = screen.getByLabelText('Remember Me') as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ rememberMe: false }}>
        <FormCheckbox<TestFormValues>
          name="rememberMe"
          label="Remember Me"
          helperText="Saves login session for 30 days"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Saves login session for 30 days')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control', () => {
    expect(() => {
      render(
        <FormCheckbox<TestFormValues> name="rememberMe" label="Remember Me" />
      )
    }).toThrow('<FormCheckbox name="rememberMe"> requires either:')
  })
})
