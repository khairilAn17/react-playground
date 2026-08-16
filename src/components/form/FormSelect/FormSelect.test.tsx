import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormSelect } from './FormSelect'
import type { SelectOption } from './types'
import { TestFormWrapper } from '../../../test/test-utils'

interface TestFormValues {
  role: string
  account: string
  transferMethod: string
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

const BULLET_TRANSFER_OPTIONS: SelectOption[] = [
  {
    value: 'bifast',
    leftTitle: 'BI Fast (+Rp2.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp250.000.000',
      'Langsung diproses dan diterima',
    ],
  },
  {
    value: 'rtgs',
    leftTitle: 'RTGS (+Rp25.000)',
    bullets: [
      'Nominal transfer: Rp100.000.001–Rp500.000.000',
      'Operasional: Senin-Jumat jam 06:00 – 14:30 WIB',
    ],
  },
]

describe('FormSelect', () => {
  it('renders label correctly inside FormProvider', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '', transferMethod: '' }}>
        <FormSelect<TestFormValues> name="role" label="Role" options={SIMPLE_OPTIONS} />
      </TestFormWrapper>
    )

    expect(screen.getByLabelText('Role')).toBeInTheDocument()
  })

  it('displays helperText when provided', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '', transferMethod: '' }}>
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
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '7200000001', transferMethod: '' }}>
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

  it('renders bullet list options in dropdown menu for transfer methods', () => {
    render(
      <TestFormWrapper<TestFormValues> defaultValues={{ role: '', account: '', transferMethod: 'bifast' }}>
        <FormSelect<TestFormValues>
          name="transferMethod"
          options={BULLET_TRANSFER_OPTIONS}
          placeholder="Pilih Metode Transfer"
        />
      </TestFormWrapper>
    )

    // Trigger value rendering (compact: shows title)
    expect(screen.getByText('BI Fast (+Rp2.500)')).toBeInTheDocument()

    // Open dropdown menu
    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    // Check menu items with bullets
    expect(screen.getByText('RTGS (+Rp25.000)')).toBeInTheDocument()
    expect(screen.getByText('Nominal transfer: Rp10.000–Rp250.000.000')).toBeInTheDocument()
    expect(screen.getByText('Operasional: Senin-Jumat jam 06:00 – 14:30 WIB')).toBeInTheDocument()
  })

  it('throws error when rendered outside FormProvider without control', () => {
    expect(() => {
      render(<FormSelect<TestFormValues> name="role" label="Role" options={SIMPLE_OPTIONS} />)
    }).toThrow('<FormSelect name="role"> requires either:')
  })
})
