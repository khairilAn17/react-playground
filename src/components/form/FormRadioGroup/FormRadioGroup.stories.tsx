import type { Meta, StoryObj } from '@storybook/react'
import { Box, Chip } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PaymentIcon from '@mui/icons-material/Payment'
import SecurityIcon from '@mui/icons-material/Security'

import { FormRadioGroup } from './FormRadioGroup'
import { TestFormWrapper } from '../../../test/test-utils'
import type { RadioOption } from './FormRadioGroup'

const TEAL_PRIMARY = '#00A39D'

interface StoryFormValues {
  frequency: string
  transferMethod: string
  payrollSchedule: string
  plan: string
}

// ── Mock Option Datasets ──────────────────────────────────────────────────────

const FREQUENCY_OPTIONS: RadioOption[] = [
  { label: 'Sekali', value: 'once' },
  { label: 'Rutin', value: 'routine' },
]

const RICH_BANKING_OPTIONS: RadioOption[] = [
  {
    label: 'BI-FAST',
    value: 'bifast',
    description: 'Real-time 24/7, batas transaksi hingga Rp 250.000.000 / hari',
    icon: <FlashOnIcon sx={{ color: TEAL_PRIMARY }} />,
    badge: (
      <Chip
        label="Gratis"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.75rem',
          bgcolor: '#E6FFFA',
          color: TEAL_PRIMARY,
          fontWeight: 700,
        }}
      />
    ),
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 0</Box>,
  },
  {
    label: 'Realtime Online (RTOL)',
    value: 'rtol',
    description: 'Instan antar bank nasional, limit hingga Rp 50.000.000 / transaksi',
    icon: <AccountBalanceIcon sx={{ color: '#64748B' }} />,
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 6.500</Box>,
  },
  {
    label: 'SKNBI / Kliring',
    value: 'skn',
    description: 'Proses kliring pada jam operasional Bank Indonesia',
    icon: <ScheduleIcon sx={{ color: '#64748B' }} />,
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 2.900</Box>,
  },
]

const PAYROLL_SCHEDULE_OPTIONS: RadioOption[] = [
  {
    label: 'Same-day Settlement',
    value: 'sameday',
    description: 'Gaji cair langsung pada hari yang sama',
    icon: <PaymentIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Batch Kliring Terjadwal',
    value: 'batch',
    description: 'Eksekusi batch otomatis setiap tanggal 25',
    icon: <ScheduleIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Multi-Authorizer Release',
    value: 'maker_checker',
    description: 'Memerlukan persetujuan 2 level approval',
    icon: <SecurityIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Split Payroll Disbursal',
    value: 'split',
    description: 'Transfer ke rekening multi-bank karyawan',
    icon: <AccountBalanceIcon sx={{ color: TEAL_PRIMARY }} />,
  },
]

const PLAN_OPTIONS: RadioOption[] = [
  { label: 'Free Plan ($0/mo)', value: 'free' },
  { label: 'Pro Plan ($19/mo)', value: 'pro' },
  { label: 'Enterprise Plan (Custom)', value: 'enterprise', disabled: true },
]

// ── Storybook Metadata ────────────────────────────────────────────────────────

const meta: Meta<typeof FormRadioGroup<StoryFormValues>> = {
  title: 'Components/Form/FormRadioGroup',
  component: FormRadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues>
        defaultValues={{
          frequency: 'routine',
          transferMethod: 'bifast',
          payrollSchedule: 'sameday',
          plan: 'free',
        }}
      >
        <Box sx={{ maxWidth: 700, p: 2 }}>
          <Story />
        </Box>
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormRadioGroup<StoryFormValues>>

/** 1:1 Replica of Reference Design Image: "Sekali" vs. "Rutin" card radio group. */
export const CardReferenceImage: Story = {
  args: {
    name: 'frequency',
    label: 'Frekuensi Transaksi',
    variant: 'card',
    layout: 'row',
    options: FREQUENCY_OPTIONS,
  },
}

/** Rich multi-line card options with leading icons, status tags, descriptions, and fee tags. */
export const RichBankingCards: Story = {
  args: {
    name: 'transferMethod',
    label: 'Metode Pengiriman Dana',
    variant: 'card',
    layout: 'column',
    options: RICH_BANKING_OPTIONS,
  },
}

/** Responsive 2-column card grid (payroll execution mode). */
export const ResponsiveGridCards: Story = {
  args: {
    name: 'payrollSchedule',
    label: 'Jadwal & Skema Pencairan Gaji',
    variant: 'card',
    layout: 'grid',
    gridColumns: { xs: 1, sm: 2 },
    options: PAYROLL_SCHEDULE_OPTIONS,
  },
}

/** Card options with right-aligned radio indicator circle. */
export const RightAlignedIndicator: Story = {
  args: {
    name: 'transferMethod',
    label: 'Pilih Metode Transfer (Right Radio Indicator)',
    variant: 'card',
    layout: 'column',
    radioPlacement: 'right',
    options: RICH_BANKING_OPTIONS,
  },
}

/** Card button style with hidden radio circle (clickable selection tile). */
export const CardWithoutIndicator: Story = {
  args: {
    name: 'frequency',
    label: 'Frekuensi Transaksi (Indicator-less Button Tile)',
    variant: 'card',
    layout: 'row',
    radioPlacement: 'none',
    options: FREQUENCY_OPTIONS,
  },
}

/** Standard vertical radio list. */
export const DefaultVertical: Story = {
  args: {
    name: 'plan',
    label: 'Select Subscription Plan',
    variant: 'default',
    layout: 'column',
    options: PLAN_OPTIONS,
  },
}

/** Standard horizontal radio list using row flag. */
export const DefaultHorizontal: Story = {
  args: {
    name: 'frequency',
    label: 'Select Frequency (Horizontal Row)',
    variant: 'default',
    row: true,
    options: FREQUENCY_OPTIONS,
  },
}

/** Form validation helper text state. */
export const WithHelperText: Story = {
  args: {
    name: 'frequency',
    label: 'Frekuensi Transaksi',
    variant: 'card',
    layout: 'row',
    options: FREQUENCY_OPTIONS,
    helperText: 'Pilih salah satu frekuensi transaksi untuk melanjutkan proses.',
  },
}
