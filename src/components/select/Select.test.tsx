import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useState } from 'react'
import { Select } from './Select'
import type { SelectOption } from './types'

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

const GROUPED_BANK_OPTIONS: SelectOption[] = [
  {
    group: 'Proxy',
    value: 'bifast_proxy',
    leftTitle: 'BI Fast Proxy',
  },
  {
    group: 'Semua Bank',
    value: 'bsi',
    leftTitle: 'Bank Syariah Indonesia (BSI)',
  },
  {
    group: 'Semua Bank',
    value: 'bca',
    leftTitle: 'Bank Central Asia (BCA)',
  },
]

function ControlledSelectTest() {
  const [val, setVal] = useState('developer')
  return (
    <Select
      label="Role"
      value={val}
      onChange={(e) => setVal(e.target.value as string)}
      options={SIMPLE_OPTIONS}
    />
  )
}

describe('Select (Standalone UI Primitive)', () => {
  it('renders standalone without any FormProvider or form context', () => {
    render(<Select label="Role" value="developer" options={SIMPLE_OPTIONS} />)
    expect(screen.getByLabelText('Role')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('updates controlled value via onChange', () => {
    render(<ControlledSelectTest />)
    expect(screen.getByText('Developer')).toBeInTheDocument()

    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    const designerOption = screen.getByText('Designer')
    fireEvent.click(designerOption)

    expect(screen.getAllByText('Designer')[0]).toBeInTheDocument()
  })

  it('renders helperText and error states', () => {
    render(
      <Select
        label="Role"
        value=""
        options={SIMPLE_OPTIONS}
        helperText="Please pick one"
        error
      />
    )
    expect(screen.getByText('Please pick one')).toBeInTheDocument()
  })

  it('renders rich double-line options and avatars', () => {
    render(
      <Select
        value="7200000001"
        options={RICH_ACCOUNT_OPTIONS}
        placeholder="Pilih Rekening"
      />
    )

    expect(screen.getByText('Harian Bisnis')).toBeInTheDocument()
    expect(screen.getByText('7200000001')).toBeInTheDocument()
    expect(screen.getByText('Rp 450.000.000,00')).toBeInTheDocument()

    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    expect(screen.getByText('Dana Darurat')).toBeInTheDocument()
    expect(screen.getByText('Rekening Terblokir')).toBeInTheDocument()
  })

  it('renders bullet list options in dropdown menu', () => {
    render(
      <Select
        value="bifast"
        options={BULLET_TRANSFER_OPTIONS}
        placeholder="Pilih Metode Transfer"
      />
    )

    expect(screen.getByText('BI Fast (+Rp2.500)')).toBeInTheDocument()

    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    expect(screen.getByText('RTGS (+Rp25.000)')).toBeInTheDocument()
    expect(screen.getByText('Nominal transfer: Rp10.000–Rp250.000.000')).toBeInTheDocument()
  })

  it('renders grouped options with headers', () => {
    render(
      <Select
        value="bca"
        options={GROUPED_BANK_OPTIONS}
        placeholder="Pilih Bank"
      />
    )

    expect(screen.getByText('Bank Central Asia (BCA)')).toBeInTheDocument()

    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    expect(screen.getByText('Proxy')).toBeInTheDocument()
    expect(screen.getByText('Semua Bank')).toBeInTheDocument()
    expect(screen.getByText('Bank Syariah Indonesia (BSI)')).toBeInTheDocument()
  })

  it('filters options with search input when searchable=true', () => {
    render(
      <Select
        value=""
        options={GROUPED_BANK_OPTIONS}
        placeholder="Cari Bank"
        searchable
      />
    )

    const combobox = screen.getByRole('combobox')
    fireEvent.mouseDown(combobox)

    const searchInput = screen.getByPlaceholderText('Search...')
    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'Syariah' } })

    expect(screen.getByText('Bank Syariah Indonesia (BSI)')).toBeInTheDocument()
    expect(screen.queryByText('Bank Central Asia (BCA)')).not.toBeInTheDocument()
  })
})
