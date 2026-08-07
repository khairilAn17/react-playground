import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormSelect } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  role: string
}

const OPTIONS = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

describe('FormSelect', () => {
  it('renders label correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '' }}>
        <FormSelect<TestFormValues> name="role" label="Role" options={OPTIONS} />
      </TestFormWrapper>
    )

    expect(screen.getByLabelText('Role')).toBeInTheDocument()
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '' }}>
        <FormSelect<TestFormValues>
          name="role"
          label="Role"
          options={OPTIONS}
          helperText="Select your job role"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Select your job role')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control', () => {
    expect(() => {
      render(<FormSelect<TestFormValues> name="role" label="Role" options={OPTIONS} />)
    }).toThrow('<FormSelect name="role"> requires either:')
  })
})
