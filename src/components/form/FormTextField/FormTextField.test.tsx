import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormTextField } from './FormTextField'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  email: string
  bio?: string
}

describe('FormTextField', () => {
  it('renders label and placeholder correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ email: '' }}>
        <FormTextField<TestFormValues>
          name="email"
          label="Email Address"
          placeholder="user@example.com"
        />
      </TestFormWrapper>
    )

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('user@example.com')).toBeInTheDocument()
  })

  it('updates value on user typing', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ email: '' }}>
        <FormTextField<TestFormValues> name="email" label="Email Address" />
      </TestFormWrapper>
    )

    const input = screen.getByLabelText('Email Address')
    fireEvent.change(input, { target: { value: 'john@doe.com' } })

    expect(input).toHaveValue('john@doe.com')
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ email: '' }}>
        <FormTextField<TestFormValues>
          name="email"
          label="Email Address"
          helperText="We never share your email"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('We never share your email')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control prop', () => {
    expect(() => {
      render(
        <FormTextField<TestFormValues> name="email" label="Email Address" />
      )
    }).toThrow('<FormTextField name="email"> requires either:')
  })
})
