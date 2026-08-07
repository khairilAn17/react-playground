import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormSwitch } from './FormSwitch'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  notifications: boolean
}

describe('FormSwitch', () => {
  it('renders label and initial off state', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ notifications: false }}>
        <FormSwitch<TestFormValues>
          name="notifications"
          label="Enable Email Notifications"
        />
      </TestFormWrapper>
    )

    const switchEl = screen.getByLabelText('Enable Email Notifications') as HTMLInputElement
    expect(switchEl).toBeInTheDocument()
    expect(switchEl.checked).toBe(false)
  })

  it('toggles switch state on click', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ notifications: false }}>
        <FormSwitch<TestFormValues>
          name="notifications"
          label="Enable Email Notifications"
        />
      </TestFormWrapper>
    )

    const switchEl = screen.getByLabelText('Enable Email Notifications') as HTMLInputElement
    fireEvent.click(switchEl)
    expect(switchEl.checked).toBe(true)
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ notifications: false }}>
        <FormSwitch<TestFormValues>
          name="notifications"
          label="Enable Email Notifications"
          helperText="Receive weekly digest"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Receive weekly digest')).toBeInTheDocument()
  })
})
