import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormAutocomplete } from './FormAutocomplete'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  framework: string
  tags?: string[]
}

const OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

describe('FormAutocomplete', () => {
  it('renders label and input correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ framework: '' }}>
        <FormAutocomplete<TestFormValues>
          name="framework"
          label="Framework"
          options={OPTIONS}
        />
      </TestFormWrapper>
    )

    expect(screen.getByLabelText('Framework')).toBeInTheDocument()
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ framework: '' }}>
        <FormAutocomplete<TestFormValues>
          name="framework"
          label="Framework"
          options={OPTIONS}
          helperText="Choose your tech stack"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Choose your tech stack')).toBeInTheDocument()
  })

  it('renders initial value correctly', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ framework: 'react' }}>
        <FormAutocomplete<TestFormValues>
          name="framework"
          label="Framework"
          options={OPTIONS}
        />
      </TestFormWrapper>
    )

    const input = screen.getByRole('combobox') as HTMLInputElement
    expect(input.value).toBe('React')
  })

  it('renders multi-select chips when multiple is true', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ framework: '', tags: ['react', 'vue'] }}>
        <FormAutocomplete<TestFormValues, typeof OPTIONS[0], true>
          multiple
          name="tags"
          label="Tags"
          options={OPTIONS}
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control', () => {
    expect(() => {
      render(
        <FormAutocomplete<TestFormValues>
          name="framework"
          label="Framework"
          options={OPTIONS}
        />
      )
    }).toThrow('<FormAutocomplete name="framework"> requires either:')
  })
})
