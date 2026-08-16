import type { Meta, StoryObj } from '@storybook/react'
import { MenuItem } from '@mui/material'
import { FormSelect, type SelectOption } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  role: string
  accountId: string
  paymentMethod: string
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

const meta: Meta<typeof FormSelect> = {
  title: 'Components/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ role: '', accountId: '7200000001', paymentMethod: '' }}>
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
    borderRadius: 3,
    slotSx: {
      optionRow: {
        rightTitle: {
          fontWeight: 500,
        },
        rightSubtitle: {
          color: '#64748B',
        },
      },
    },
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
