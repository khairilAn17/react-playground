import type { Meta, StoryObj } from '@storybook/react'
import { Box, Chip } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { RadioGroup } from './RadioGroup'
import type { RadioOption } from './types'

const TRANSFER_FREQUENCY_OPTIONS: RadioOption[] = [
  { label: 'Sekali', value: 'once' },
  { label: 'Rutin', value: 'routine' },
]

const RICH_BANKING_OPTIONS: RadioOption[] = [
  {
    label: 'BI-FAST',
    value: 'bifast',
    description: 'Real-time 24/7, batas hingga Rp 250 jt/hari',
    icon: <FlashOnIcon sx={{ color: '#00A39D' }} />,
    badge: (
      <Chip
        label="Gratis"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.75rem',
          bgcolor: '#E6FFFA',
          color: '#00A39D',
          fontWeight: 700,
        }}
      />
    ),
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 0</Box>,
  },
  {
    label: 'Realtime Online (RTOL)',
    value: 'rtol',
    description: 'Instan ke semua bank anggota jaringan switching',
    icon: <AccountBalanceIcon sx={{ color: '#64748B' }} />,
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 6.500</Box>,
  },
  {
    label: 'SKN / Kliring',
    value: 'skn',
    description: 'Proses kliring pada jam operasional Bank Indonesia',
    icon: <ScheduleIcon sx={{ color: '#64748B' }} />,
    endContent: <Box sx={{ fontWeight: 700, color: '#1E293B' }}>Rp 2.900</Box>,
  },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    label: 'Frekuensi Transfer',
    options: TRANSFER_FREQUENCY_OPTIONS,
    defaultValue: 'routine',
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

/** Exact replica of the reference image: "Sekali" and "Rutin" card radio group. */
export const CardReferenceImage: Story = {
  args: {
    label: 'Frekuensi Transaksi',
    variant: 'card',
    layout: 'row',
    options: TRANSFER_FREQUENCY_OPTIONS,
    defaultValue: 'routine',
  },
}

/** Rich multi-line card options with subtitles, icons, badges, and right-aligned price tags. */
export const RichBankingCards: Story = {
  args: {
    label: 'Metode Pengiriman Dana',
    variant: 'card',
    layout: 'column',
    options: RICH_BANKING_OPTIONS,
    defaultValue: 'bifast',
  },
}

/** 2-Column Responsive Card Grid. */
export const ResponsiveGridCards: Story = {
  args: {
    label: 'Pilih Layanan Payroll',
    variant: 'card',
    layout: 'grid',
    gridColumns: { xs: 1, sm: 2 },
    options: [
      { label: 'Same-day Settlement', value: 'sameday', description: 'Gaji cair hari ini' },
      { label: 'Next-day Batch', value: 'nextday', description: 'Biaya admin lebih hemat' },
      { label: 'Auto Recurring', value: 'recurring', description: 'Setiap tanggal 25' },
      { label: 'Split Transfer', value: 'split', description: 'Transfer multi-rekening' },
    ],
    defaultValue: 'sameday',
  },
}

/** Standard default radio list. */
export const DefaultVariant: Story = {
  args: {
    label: 'Tipe Rekening',
    variant: 'default',
    layout: 'column',
    options: [
      { label: 'Giro Bisnis Utama (IDR)', value: 'giro' },
      { label: 'Tabungan Valas (USD)', value: 'valas' },
      { label: 'Deposito Berjangka', value: 'deposito' },
    ],
    defaultValue: 'giro',
  },
}

/** Error state with helper validation message. */
export const ErrorState: Story = {
  args: {
    label: 'Frekuensi Transaksi',
    variant: 'card',
    layout: 'row',
    options: TRANSFER_FREQUENCY_OPTIONS,
    error: true,
    helperText: 'Silakan tentukan frekuensi transaksi untuk melanjutkan.',
  },
}
