import type { Meta, StoryObj } from '@storybook/react'
import { MenuItem } from '@mui/material'
import { FormSelect, type SelectOption } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  role: string
  accountId: string
  transferMethod: string
}

const SAMPLE_OPTIONS: SelectOption[] = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

const ACCOUNT_OPTIONS: SelectOption[] = [
  {
    value: 'shopee',
    leftTitle: 'Shopeepay',
    avatar: 'SP',
  },
  {
    value: '7200000001',
    leftTitle: 'Harian Bisnis',
    leftSubtitle: '7200000001',
    rightTitle: 'Rp 450.000.000,00',
    avatar: 'HB',
  },
  {
    value: '7200000002',
    leftTitle: 'Operasional',
    leftSubtitle: '7200000002',
    rightTitle: 'Rp 112.000.000,00',
    avatar: 'O',
  },
  {
    value: '7200000003',
    leftTitle: 'Payroll',
    leftSubtitle: '7200000003',
    rightTitle: 'Rp 150.000.000,00',
    avatar: 'GK',
  },
  {
    value: '7200000005',
    leftTitle: 'Pembayaran',
    leftSubtitle: '7200000005',
    rightTitle: 'Rp 7.500.000,00',
    avatar: 'P',
  },
  {
    value: '7200000006',
    leftTitle: 'Dana Darurat',
    leftSubtitle: '7200000005',
    rightTitle: 'Rp 75.000.000,00',
    rightSubtitle: 'Rekening Terblokir',
    avatar: 'DD',
    disabled: true,
  },
]

const TRANSFER_METHOD_OPTIONS: SelectOption[] = [
  {
    value: 'bifast',
    leftTitle: 'BI Fast (+Rp2.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp250.000.000',
      'Langsung diproses dan diterima',
    ],
  },
  {
    value: 'online',
    leftTitle: 'Online (+Rp6.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp50.000.000',
      'Langsung diproses dan diterima',
    ],
  },
  {
    value: 'rtgs',
    leftTitle: 'RTGS (+Rp25.000)',
    bullets: [
      'Nominal transfer: Rp100.000.001–Rp500.000.000',
      'Operasional: Senin–Jumat jam 06:00 – 14:30 WIB\nTransaksi di luar waktu tersebut akan diproses di hari kerja berikutnya',
    ],
  },
  {
    value: 'skn',
    leftTitle: 'SKN (+Rp2.900)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp500.000.000',
      'Operasional: Senin–Jumat jam 06:00 – 14:30 WIB\nTransaksi di luar waktu tersebut akan diproses di hari kerja berikutnya',
    ],
  },
]

const meta: Meta<typeof FormSelect> = {
  title: 'Components/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ role: '', accountId: '7200000001', transferMethod: 'bifast' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSelect>

export const Default: Story = {
  args: {
    name: 'role',
    label: 'Role',
    options: SAMPLE_OPTIONS,
  },
}

/** Rich Bank Account Selector Card Dropdown (Using leftTitle, leftSubtitle, rightTitle, rightSubtitle) */
export const AccountSelectorCard: Story = {
  args: {
    name: 'accountId',
    options: ACCOUNT_OPTIONS,
    placeholder: 'Pilih Rekening Sumber...',
    showCheckmark: true,
    borderRadius: 12,
    rightTitleSx: { fontWeight: 500 },
    rightSubtitleSx: { color: '#64748B' },
  },
}

/** Rich Transfer Method Selector Dropdown with Bullet Lists */
export const TransferMethodSelector: Story = {
  args: {
    name: 'transferMethod',
    options: TRANSFER_METHOD_OPTIONS,
    placeholder: 'Pilih Metode Transfer...',
    showCheckmark: true,
    borderRadius: 12,
    size: 'large',
  },
}

export const Searchable: Story = {
  args: {
    name: 'role',
    label: 'Role',
    options: SAMPLE_OPTIONS,
    searchable: true,
    searchPlaceholder: 'Search roles...',
  },
}

export const ComposableChildren: Story = {
  args: {
    name: 'role',
    label: 'Custom Option Items',
    children: [
      <MenuItem key="fe" value="fe">⚡ Frontend Engineer</MenuItem>,
      <MenuItem key="be" value="be">🛠️ Backend Engineer</MenuItem>,
      <MenuItem key="ux" value="ux">🎨 UI/UX Designer</MenuItem>,
    ],
  },
}
