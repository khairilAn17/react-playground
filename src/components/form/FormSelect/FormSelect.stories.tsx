import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Button, Typography, Paper } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import { FormSelect, type SelectOption } from './FormSelect'
import { TestFormWrapper } from '../../../test/test-utils'
import { createTypedForm } from '../createTypedForm'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'

interface StoryFormValues {
  role: string
  accountId: string
  transferMethod: string
  destinationBank: string
  nominal: string
  domain: string
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

const BULLET_TRANSFER_OPTIONS: SelectOption[] = [
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
    group: 'Rekening Utama (Operational)',
    value: 'acc-72001',
    label: 'PT Digital Solusindo — Giro IDR',
    leftTitle: 'Giro Bisnis Utama IDR',
    leftSubtitle: '8830-0019-2810 • Rekening Operasional',
    rightTitle: 'Rp 1.450.000.000',
    avatar: 'ID',
    avatarBg: '#00A39D',
  },
  {
    group: 'Rekening Utama (Operational)',
    value: 'acc-72002',
    label: 'PT Digital Solusindo — Giro Payroll',
    leftTitle: 'Giro Khusus Payroll IDR',
    leftSubtitle: '8830-0019-9944 • Gaji Karyawan',
    rightTitle: 'Rp 480.000.000',
    avatar: 'PY',
    avatarBg: '#0284C7',
  },
  {
    group: 'Rekening Valas & Simpanan',
    value: 'acc-72003',
    label: 'PT Digital Solusindo — Giro USD',
    leftTitle: 'Giro Valas USD',
    leftSubtitle: '8830-0028-1100 • Valuta Asing',
    rightTitle: '$ 85,250.00',
    avatar: 'US',
    avatarBg: '#EAA827',
  },
  {
    group: 'Rekening Valas & Simpanan',
    value: 'acc-72004',
    label: 'PT Digital Solusindo — Deposito Berjangka',
    leftTitle: 'Deposito Flexi 3 Bulan',
    leftSubtitle: '9920-0001-4412 • Jatuh Tempo 28 Ags',
    rightTitle: 'Rp 2.000.000.000',
    avatar: 'DP',
    avatarBg: '#7B5EA7',
  },
]

const NOMINAL_OPTIONS: SelectOption[] = [
  { value: '50000', label: '50.000', leftSubtitle: 'Lima Puluh Ribu Rupiah' },
  { value: '100000', label: '100.000', leftSubtitle: 'Seratus Ribu Rupiah' },
  { value: '250000', label: '250.000', leftSubtitle: 'Dua Ratus Lima Puluh Ribu Rupiah' },
  { value: '500000', label: '500.000', leftSubtitle: 'Lima Ratus Ribu Rupiah' },
  { value: '1000000', label: '1.000.000', leftSubtitle: 'Satu Juta Rupiah' },
]

const meta: Meta<typeof FormSelect<StoryFormValues>> = {
  title: 'Components/Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues>
        defaultValues={{
          role: 'frontend',
          accountId: '7200000001',
          transferMethod: 'bifast',
          destinationBank: 'acc-72001',
          nominal: '100000',
          domain: 'byond',
        }}
      >
        <Box sx={{ maxWidth: 520, p: 2 }}>
          <Story />
        </Box>
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormSelect<StoryFormValues>>

/** 1. Default Standard Select with placeholder. */
export const Default: Story = {
  args: {
    name: 'role',
    label: 'Jabatan Karyawan',
    placeholder: 'Pilih role...',
    options: SAMPLE_OPTIONS,
  },
}

/** 2. Rich Account Option rows with left/right titles, balances, and avatars. */
export const RichAccountOptions: Story = {
  args: {
    name: 'accountId',
    label: 'Rekening Sumber Dana',
    placeholder: 'Pilih rekening operasional...',
    options: ACCOUNT_OPTIONS,
  },
}

/** 3. Bullet Point Method Selector with expanded feature points. */
export const BulletMethodOptions: Story = {
  args: {
    name: 'transferMethod',
    label: 'Metode Pengiriman Dana',
    placeholder: 'Pilih jalur kliring...',
    options: BULLET_TRANSFER_OPTIONS,
  },
}

/** 4. Grouped Source Accounts with category section headers. */
export const GroupedOptions: Story = {
  args: {
    name: 'destinationBank',
    label: 'Rekening Korporat Terdaftar',
    placeholder: 'Cari rekening bisnis...',
    options: GROUPED_BANK_OPTIONS,
    searchable: true,
  },
}

/** 5. Shaded Prefix Block (e.g. "Rp") integrated seamlessly into the input container. */
export const WithPrefixBlock: Story = {
  args: {
    name: 'nominal',
    label: 'Nominal Transaksi Cepat',
    prefixBlock: 'Rp',
    options: NOMINAL_OPTIONS,
    borderRadius: '12px',
  },
}

/** 6. Shaded Suffix Block (e.g. ".com"). */
export const WithSuffixBlock: Story = {
  args: {
    name: 'domain',
    label: 'Ekstensi Domain Perusahaan',
    suffixBlock: '.com',
    options: [
      { label: 'biznis.byond', value: 'byond' },
      { label: 'portal.company', value: 'company' },
      { label: 'api.enterprise', value: 'enterprise' },
    ],
    borderRadius: '12px',
  },
}

/** 7. Searchable Combobox with inline filtering. */
export const SearchableCombobox: Story = {
  args: {
    name: 'destinationBank',
    label: 'Cari Bank Tujuan',
    placeholder: 'Ketik nama bank...',
    searchable: true,
    options: GROUPED_BANK_OPTIONS,
  },
}

/** 8. Size variants (Small, Medium, Large). */
export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <FormSelect<StoryFormValues>
        name="role"
        label="Small Select (40px)"
        size="small"
        options={SAMPLE_OPTIONS}
      />
      <FormSelect<StoryFormValues>
        name="role"
        label="Medium Select (48px)"
        size="medium"
        options={SAMPLE_OPTIONS}
      />
      <FormSelect<StoryFormValues>
        name="role"
        label="Large Select (56px)"
        size="large"
        options={SAMPLE_OPTIONS}
      />
    </Stack>
  ),
}

const selectValidationSchema = z.object({
  accountId: z.string().min(1, 'Rekening wajib dipilih'),
  transferMethod: z.string().min(1, 'Metode transfer wajib dipilih'),
  nominal: z.string().min(1, 'Nominal wajib ditentukan'),
})
type SelectValidationFormValues = z.infer<typeof selectValidationSchema>
const { Form: SelectForm, Field: SelectField } = createTypedForm<SelectValidationFormValues>()

function CompleteFormSelectDemo() {
  const [result, setResult] = useState<SelectValidationFormValues | null>(null)

  return (
    <Box>
      <SelectForm
        schema={selectValidationSchema}
        defaultValues={{ accountId: '', transferMethod: '', nominal: '' }}
        onSubmit={(data) => setResult(data)}
      >
        <Stack spacing={2.5}>
          <SelectField.Select
            name="accountId"
            label="1. Rekening Sumber Dana"
            placeholder="Pilih rekening debet..."
            options={ACCOUNT_OPTIONS}
          />

          <SelectField.Select
            name="transferMethod"
            label="2. Jalur Kliring"
            placeholder="Pilih metode..."
            options={BULLET_TRANSFER_OPTIONS}
          />

          <SelectField.Select
            name="nominal"
            label="3. Nominal Transfer"
            prefixBlock="Rp"
            options={NOMINAL_OPTIONS}
          />

          <Button type="submit" variant="contained" sx={{ bgcolor: TEAL_PRIMARY, fontWeight: 700 }}>
            Konfirmasi Transfer (Submit)
          </Button>
        </Stack>
      </SelectForm>

      {result && (
        <Paper
          variant="outlined"
          sx={{
            mt: 3,
            p: 2,
            bgcolor: '#F0FDFA',
            borderColor: TEAL_PRIMARY,
            borderRadius: '12px',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: TEAL_PRIMARY, mb: 0.5 }}>
            ✓ Data Form Terkirim:
          </Typography>
          <pre style={{ margin: 0, fontSize: '0.8125rem', fontFamily: 'monospace' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  )
}

/** 9. Full RHF Form with Zod schema validation and live submission. */
export const CompleteFormValidation: Story = {
  render: () => <CompleteFormSelectDemo />,
}
