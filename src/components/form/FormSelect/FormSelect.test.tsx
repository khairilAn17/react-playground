import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormSelect } from './FormSelect'
import type { SelectOption } from './types'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  role: string
  account: string
}

const SIMPLE_OPTIONS: SelectOption[] = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

const RICH_ACCOUNT_OPTIONS: SelectOption[] = [
  {
    value: '7200000001',
    leftTitle: 'Harian Bisnis',
    leftSubtitle: '7200000001',
    rightTitle: 'Rp 450.000.000,00',
    avatar: 'HB',
  },
  {
    value: '7200000005',
    leftTitle: 'Dana Darurat',
    leftSubtitle: '7200000005',
    rightTitle: 'Rp 75.000.000,00',
    rightSubtitle: 'Rekening Terblokir',
    avatar: 'DD',
    disabled: true,
  },
]

describe('FormSelect', () => {
  it('renders label correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '' }}>
        <FormSelect<TestFormValues> name="role" label="Role" options={SIMPLE_OPTIONS} />
      </TestFormWrapper>
    )

    expect(screen.getByLabelText('Role')).toBeInTheDocument()
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '' }}>
        <FormSelect<TestFormValues>
          name="role"
          label="Role"
          options={SIMPLE_OPTIONS}
          helperText="Select your job role"
        />
      </TestFormWrapper>
    )

    expect(screen.getByText('Select your job role')).toBeInTheDocument()
  })

  it('renders rich double-line account options with leftTitle, leftSubtitle, rightTitle, and rightSubtitle status text', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '7200000001' }}>
        <FormSelect<TestFormValues>
          name="account"
          options={RICH_ACCOUNT_OPTIONS}
          placeholder="Pilih Rekening"
        />
      </TestFormWrapper>
    )

    // Trigger value rendering
    expect(screen.getByText('Harian Bisnis')).toBeInTheDocument()
    expect(screen.getByText('7200000001')).toBeInTheDocument()
    expect(screen.getByText('Rp 450.000.000,00')).toBeInTheDocument()

    // Open dropdown menu
    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    // Check menu items including disabled status text item
    expect(screen.getByText('Dana Darurat')).toBeInTheDocument()
    expect(screen.getByText('Rekening Terblokir')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control', () => {
    expect(() => {
      render(<FormSelect<TestFormValues> name="role" label="Role" options={SIMPLE_OPTIONS} />)
    }).toThrow('<FormSelect name="role"> requires either:')
  })
})
