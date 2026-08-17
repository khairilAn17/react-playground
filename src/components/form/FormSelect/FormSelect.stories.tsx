import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Box, MenuItem, Stack, Button, Typography, Paper } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { FormSelect, type SelectOption } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'
import { createTypedForm } from '../createTypedForm'
import { z } from 'zod'

interface StoryFormValues {
  role: string
  accountId: string
  transferMethod: string
  destinationBank: string
  customCity: string
}

const SAMPLE_OPTIONS: SelectOption[] = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

const ACCOUNT_OPTIONS: SelectOption[] = [
  {
    value: '7200000001',
    leftTitle: 'Giro Utama IDR',
    leftSubtitle: '8830-0019-2810 • Operasional',
    rightTitle: 'Rp 1.450.000.000,00',
    avatar: 'ID',
    avatarBg: '#00A39D',
  },
  {
    value: '7200000002',
    leftTitle: 'Giro Payroll IDR',
    leftSubtitle: '8830-0019-9944 • Gaji Karyawan',
    rightTitle: 'Rp 480.000.000,00',
    avatar: 'PY',
    avatarBg: '#0284C7',
  },
  {
    value: '7200000003',
    leftTitle: 'Giro Valas USD',
    leftSubtitle: '8830-0028-1100 • Valuta Asing',
    rightTitle: '$ 85,250.00',
    rightSubtitle: 'Kurs @ Rp 16.200',
    avatar: 'US',
    avatarBg: '#EAA827',
  },
  {
    value: '7200000005',
    leftTitle: 'Dana Cadangan',
    leftSubtitle: '8830-0099-0012 • Terblokir',
    rightTitle: 'Rp 75.000.000,00',
    rightSubtitle: 'Rekening Terkunci',
    avatar: 'DC',
    avatarBg: '#64748B',
    disabled: true,
  },
]

const TRANSFER_METHOD_OPTIONS: SelectOption[] = [
  {
    value: 'bifast',
    label: 'BI-FAST (Rekomendasi)',
    leftTitle: 'BI-FAST',
    leftSubtitle: 'Real-time 24/7 ke seluruh bank domestik',
    rightTitle: 'Rp 2.500',
    rightSubtitle: 'Maks. Rp 250 Jt/trx',
    avatar: <FlashOnIcon sx={{ color: '#00A39D' }} />,
    bullets: [
      'Proses instan & langsung sampai dalam hitungan detik',
      'Tersedia 24 jam non-stop termasuk hari libur',
      'Dukungan nomor rekening, Proxy Email, atau No. HP',
    ],
  },
  {
    value: 'online',
    label: 'Realtime Online',
    leftTitle: 'Realtime Online',
    leftSubtitle: 'Jaringan ATM Bersama / Prima',
    rightTitle: 'Rp 6.500',
    rightSubtitle: 'Maks. Rp 100 Jt/trx',
    avatar: <SwapHorizIcon sx={{ color: '#0284C7' }} />,
    bullets: [
      'Kompatibel dengan semua bank anggota switching',
      'Limit per transaksi hingga Rp 100.000.000',
      'Biaya standar transaksi antar bank',
    ],
  },
  {
    value: 'rtgs',
    label: 'RTGS (Real Time Gross Settlement)',
    leftTitle: 'RTGS',
    leftSubtitle: 'Transfer dana bernilai besar prioritas tinggi',
    rightTitle: 'Rp 30.000',
    rightSubtitle: 'Min. Rp 100 Jt',
    avatar: <ShieldOutlinedIcon sx={{ color: '#7B5EA7' }} />,
    bullets: [
      'Khusus transaksi dengan nominal di atas Rp 100 Juta',
      'Prioritas pemrosesan langsung oleh Bank Indonesia',
      'Diproses pada hari kerja perbankan (08:00 - 15:00)',
    ],
  },
]

const GROUPED_BANK_OPTIONS: SelectOption[] = [
  {
    group: 'Proxy',
    value: 'bifast_proxy',
    leftTitle: 'BI Fast Proxy',
    leftSubtitle: 'Transfer via No. Handphone / Email',
    avatar: 'BF',
    avatarBg: '#0284C7',
  },
  {
    group: 'Semua Bank',
    value: 'bsi',
    leftTitle: 'Bank Syariah Indonesia (BSI)',
    leftSubtitle: 'Bank Syariah BUMN',
    avatar: <AccountBalanceIcon sx={{ color: '#00A39D' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'bca',
    leftTitle: 'Bank Central Asia (BCA)',
    leftSubtitle: 'Jaringan ATM Terluas',
    avatar: <AccountBalanceIcon sx={{ color: '#1D4ED8' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'mandiri',
    leftTitle: 'Bank Mandiri',
    leftSubtitle: 'Bank Komersial Nasional',
    avatar: <AccountBalanceIcon sx={{ color: '#0369A1' }} />,
  },
]

const meta: Meta<typeof FormSelect> = {
  title: 'Components/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues>
        defaultValues={{
          role: '',
          accountId: '7200000001',
          transferMethod: 'bifast',
          destinationBank: 'bsi',
          customCity: 'jkt',
        }}
      >
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSelect>

// ── 1. Default Simple Form Select ────────────────────────────────────────────
export const Default: Story = {
  args: {
    name: 'role',
    label: 'Jabatan Karyawan',
    placeholder: 'Pilih salah satu jabatan...',
    options: SAMPLE_OPTIONS,
  },
}

// ── 2. Account Selector Card with Metadata ───────────────────────────────────
export const AccountSelectorCard: Story = {
  name: 'Account Selector Card (Balances & Avatars)',
  args: {
    name: 'accountId',
    label: 'Rekening Sumber Dana',
    options: ACCOUNT_OPTIONS,
    placeholder: 'Pilih Rekening Sumber...',
    showCheckmark: true,
    borderRadius: 12,
  },
}

// ── 3. Grouped Bank Selector Dropdown ─────────────────────────────────────────
export const GroupedBankSelector: Story = {
  name: 'Grouped Bank Selector with Search',
  args: {
    name: 'destinationBank',
    label: 'Bank Tujuan Transfer',
    options: GROUPED_BANK_OPTIONS,
    placeholder: 'Pilih Bank Tujuan...',
    searchable: true,
    searchPlaceholder: 'Cari nama bank atau proxy...',
    showCheckmark: true,
    borderRadius: 12,
  },
}

// ── 4. Transfer Method with Bullet Lists ─────────────────────────────────────
export const TransferMethodSelector: Story = {
  name: 'Transfer Method with Feature Bullets',
  args: {
    name: 'transferMethod',
    label: 'Metode Transfer Dana',
    options: TRANSFER_METHOD_OPTIONS,
    placeholder: 'Pilih Metode Transfer...',
    showCheckmark: true,
    borderRadius: 12,
  },
}

// ── 5. Searchable Role Selector ──────────────────────────────────────────────
export const Searchable: Story = {
  args: {
    name: 'role',
    label: 'Role (Searchable Filter)',
    options: SAMPLE_OPTIONS,
    searchable: true,
    searchPlaceholder: 'Search roles...',
  },
}

// ── 6. Size Variants Matrix in Form ──────────────────────────────────────────
export const SizeVariants: Story = {
  name: 'Size Variants (Small, Medium, Large)',
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440 }}>
      <FormSelect name="role" size="small" label="Small Select (40px)" options={SAMPLE_OPTIONS} />
      <FormSelect name="role" size="medium" label="Medium Select (48px - Default)" options={SAMPLE_OPTIONS} />
      <FormSelect name="role" size="large" label="Large Select (56px)" options={SAMPLE_OPTIONS} />
    </Stack>
  ),
}

// ── 7. Custom Corner Radii in Form ───────────────────────────────────────────
export const BorderRadii: Story = {
  name: 'Custom Corner Radii Matrix',
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440 }}>
      <FormSelect name="role" size="small" label="Sharp Enterprise (borderRadius={4})" options={SAMPLE_OPTIONS} borderRadius={4} />
      <FormSelect name="role" size="small" label="BYOND Standard (borderRadius={12})" options={SAMPLE_OPTIONS} borderRadius={12} />
      <FormSelect name="role" size="small" label="Soft Curved (borderRadius={20})" options={SAMPLE_OPTIONS} borderRadius={20} />
      <FormSelect name="role" size="small" label={`Full Pill (borderRadius="999px")`} options={SAMPLE_OPTIONS} borderRadius="999px" />
    </Stack>
  ),
}

// ── 8. Granular slotSx Styling in Form ───────────────────────────────────────
export const SlotSxTheming: Story = {
  name: 'Granular slotSx Sub-Slots',
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <FormSelect
        name="transferMethod"
        label="Custom Option Row Sub-Slots"
        options={TRANSFER_METHOD_OPTIONS}
        borderRadius={12}
        slotSx={{
          optionRow: {
            leftTitle: { fontWeight: 800, color: '#1E293B' },
            leftSubtitle: { color: '#0284C7', fontStyle: 'italic' },
            rightTitle: { color: '#B45309', fontWeight: 800 },
            checkmark: { color: '#EAA827' },
          },
        }}
        helperText="leftTitle: bold 800 · leftSubtitle: italic blue · checkmark: amber"
      />

      <FormSelect
        name="destinationBank"
        label="Custom Popover Shadow & Group Headers"
        options={GROUPED_BANK_OPTIONS}
        searchable
        borderRadius={12}
        slotSx={{
          menuPaper: {
            boxShadow: '0 20px 48px rgba(0, 163, 157, 0.22)',
            borderColor: '#00A39D',
            borderWidth: '1.5px',
          },
          groupHeader: {
            color: '#00A39D',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          },
        }}
        helperText="menuPaper: elevated teal drop shadow · groupHeader: bold uppercase"
      />
    </Stack>
  ),
}

// ── 9. Type-Safe Zod Form Validation Story ───────────────────────────────────
const validationSchema = z.object({
  paymentSource: z.string().min(1, 'Rekening sumber dana wajib dipilih'),
  transferType: z.string().min(1, 'Metode transfer wajib ditentukan'),
})
type ValidationFormValues = z.infer<typeof validationSchema>
const { Form, Field } = createTypedForm<ValidationFormValues>()

function ZodValidationFormStory() {
  const [result, setResult] = useState<ValidationFormValues | null>(null)

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Form
        schema={validationSchema}
        defaultValues={{ paymentSource: '', transferType: '' }}
        onSubmit={(data) => setResult(data)}
      >
        <Stack spacing={2.5}>
          <Field.Select
            name="paymentSource"
            label="Rekening Sumber (Wajib)"
            placeholder="Pilih rekening operasional..."
            options={ACCOUNT_OPTIONS}
          />

          <Field.Select
            name="transferType"
            label="Metode Transfer (Wajib)"
            placeholder="Pilih metode transfer..."
            options={TRANSFER_METHOD_OPTIONS}
          />

          <Box sx={{ display: 'flex', gap: 1.5, pt: 1 }}>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#00A39D', color: '#fff' }}>
              Submit Form
            </Button>
            <Button type="button" variant="outlined" onClick={() => setResult(null)}>
              Reset
            </Button>
          </Box>

          {result && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#F8FAFC', border: '1px solid #00A39D', borderRadius: '8px' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#00A39D', display: 'block', mb: 0.5 }}>
                ✓ Form Payload Valid:
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block' }}>
                {JSON.stringify(result, null, 2)}
              </Typography>
            </Paper>
          )}
        </Stack>
      </Form>
    </Box>
  )
}

export const WithZodValidation: Story = {
  name: 'React Hook Form + Zod Validation',
  render: () => <ZodValidationFormStory />,
}

// ── 10. Composable Children ──────────────────────────────────────────────────
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
