import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Button, Typography, Paper } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import NatureIcon from '@mui/icons-material/Nature'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SchoolIcon from '@mui/icons-material/School'
import MosqueIcon from '@mui/icons-material/Mosque'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SearchIcon from '@mui/icons-material/Search'

import { FormAutocomplete } from './FormAutocomplete'
import { TestFormWrapper } from '../../../test/test-utils'
import type { AutocompleteOption } from './types'
import { createTypedForm } from '../createTypedForm'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'

interface StoryFormValues {
  framework: string
  tags?: string[]
  infaqCategory?: string
  currency?: string
  searchQuery?: string
  destinationAccount?: string
}

// ── Mock Datasets ────────────────────────────────────────────────────────────

const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'Component-based UI library', avatar: 'RC', avatarBg: '#00A39D' },
  { label: 'Vue.js', value: 'vue', subtitle: 'Progressive JavaScript framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'The React framework for the Web', avatar: 'NX', avatarBg: '#1E293B' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Enterprise-scale platform', avatar: 'NG', avatarBg: '#DD0031' },
]

const INFAQ_OPTIONS: AutocompleteOption[] = [
  {
    value: 'yatim',
    label: 'Anak Yatim & Dhuafa',
    subtitle: 'Kebutuhan pokok & santunan rutin anak yatim',
    icon: <VolunteerActivismIcon sx={{ color: '#1E6BE6' }} />,
  },
  {
    value: 'lingkungan',
    label: 'Pelestarian Alam & Hutan',
    subtitle: 'Program konservasi dan reboisasi lingkungan',
    icon: <NatureIcon sx={{ color: '#3D8B37' }} />,
  },
  {
    value: 'kemanusiaan',
    label: 'Bantuan Kemanusiaan & Darurat',
    subtitle: 'Tanggap bencana alam dan pemulihan daerah konflik',
    icon: <FavoriteIcon sx={{ color: '#B0245C' }} />,
  },
  {
    value: 'pendidikan',
    label: 'Beasiswa Generasi Penerus',
    subtitle: 'Bantuan pendidikan dan peralatan sekolah dhuafa',
    icon: <SchoolIcon sx={{ color: '#EAA827' }} />,
  },
  {
    value: 'masjid',
    label: 'Renovasi & Pembangunan Masjid',
    subtitle: 'Pemberdayaan dan perbaikan sarana rumah ibadah',
    icon: <MosqueIcon sx={{ color: '#00A39D' }} />,
  },
]

const BANK_ACCOUNT_OPTIONS: AutocompleteOption[] = [
  { value: '883001', label: 'PT Digital Solusindo', subtitle: 'Rekening 8830-0019-2810 • Saldo Rp 1,45 M', icon: <AccountBalanceIcon sx={{ color: '#00A39D' }} /> },
  { value: '883002', label: 'CV Surya Pratama', subtitle: 'Rekening 8830-0028-9912 • Saldo Rp 320 Jt', icon: <AccountBalanceIcon sx={{ color: '#0284C7' }} /> },
  { value: '883003', label: 'PT Maju Bersama', subtitle: 'Rekening 8830-0033-4411 • Saldo Rp 85 Jt', icon: <AccountBalanceIcon sx={{ color: '#EAA827' }} /> },
  { value: '883004', label: 'PT Global Niaga', subtitle: 'Rekening 8830-0045-8822 • Saldo Rp 910 Jt', icon: <AccountBalanceIcon sx={{ color: '#64748B' }} /> },
]

const NOMINAL_OPTIONS: AutocompleteOption[] = [
  { value: '50000', label: '50.000', subtitle: 'Lima Puluh Ribu Rupiah' },
  { value: '100000', label: '100.000', subtitle: 'Seratus Ribu Rupiah' },
  { value: '250000', label: '250.000', subtitle: 'Dua Ratus Lima Puluh Ribu Rupiah' },
  { value: '500000', label: '500.000', subtitle: 'Lima Ratus Ribu Rupiah' },
  { value: '1000000', label: '1.000.000', subtitle: 'Satu Juta Rupiah' },
]

// ── Storybook Metadata ────────────────────────────────────────────────────────

const meta: Meta<typeof FormAutocomplete<StoryFormValues>> = {
  title: 'Components/Form/FormAutocomplete',
  component: FormAutocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues>
        defaultValues={{
          framework: 'react',
          tags: ['react', 'nextjs'],
          infaqCategory: 'yatim',
          currency: '100000',
          searchQuery: '',
          destinationAccount: '883001',
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
type Story = StoryObj<typeof FormAutocomplete<StoryFormValues>>

/** 1. Default Single-Select with search filtering and custom avatar rows. */
export const DefaultSingleSelect: Story = {
  args: {
    name: 'framework',
    label: 'Primary Framework',
    placeholder: 'Cari atau pilih framework...',
    options: FRAMEWORK_OPTIONS,
    helperText: 'Pilih teknologi frontend utama proyek',
  },
}

/** 2. Multi-Select Tags with checkable option rows. */
export const MultiSelectTags: Story = {
  args: {
    multiple: true,
    name: 'tags',
    label: 'Tech Stack (Multi-Select)',
    placeholder: 'Tambah teknologi...',
    options: FRAMEWORK_OPTIONS,
    helperText: 'Pilih beberapa opsi yang digunakan bersamaan',
  },
}

/** 3. Shaded Prefix Block (e.g. "Rp") integrated flush with border & focus ring. */
export const WithPrefixBlock: Story = {
  args: {
    name: 'currency',
    label: 'Nominal Transfer Cepat',
    placeholder: 'Pilih nominal...',
    prefixBlock: 'Rp',
    options: NOMINAL_OPTIONS,
    borderRadius: '12px',
  },
}

/** 4. Shaded Suffix Block (e.g. "/bln"). */
export const WithSuffixBlock: Story = {
  args: {
    name: 'currency',
    label: 'Paket Langganan API',
    placeholder: 'Pilih kuota...',
    suffixBlock: '/bln',
    options: [
      { label: 'Starter (10.000 req)', value: 'starter' },
      { label: 'Pro (100.000 req)', value: 'pro' },
      { label: 'Enterprise Unlimited', value: 'enterprise' },
    ],
    borderRadius: '12px',
  },
}

/** 5. Start and End Adornments (e.g. Search Icon). */
export const WithStartAdornment: Story = {
  args: {
    name: 'destinationAccount',
    label: 'Cari Rekening Penerima',
    placeholder: 'Ketik nama PT atau nomor rekening...',
    startAdornment: <SearchIcon sx={{ color: '#64748B', fontSize: 20 }} />,
    options: BANK_ACCOUNT_OPTIONS,
  },
}

/** 6. Multi-Select with Max Visible Tags and +N Overflow Chip. */
export const MaxVisibleTagsOverflow: Story = {
  args: {
    multiple: true,
    name: 'tags',
    label: 'Daftar Kategori Terpilih (+N Overflow)',
    placeholder: 'Pilih kategori infaq...',
    maxVisibleTags: 2,
    options: INFAQ_OPTIONS,
    helperText: 'Maksimal 2 tag ditampilkan; sisanya dirangkum dalam chip +N',
  },
}

/** 7. Left-Aligned Checkbox in dropdown rows. */
export const LeftCheckboxPlacement: Story = {
  args: {
    multiple: true,
    name: 'tags',
    label: 'Kategori Infaq (Left Checkbox)',
    placeholder: 'Pilih program kebaikan...',
    checkboxPlacement: 'left',
    options: INFAQ_OPTIONS,
  },
}

/** 8. Size variants (Small, Medium, Large). */
export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <FormAutocomplete<StoryFormValues>
        name="framework"
        label="Small Autocomplete (40px)"
        size="small"
        options={FRAMEWORK_OPTIONS}
      />
      <FormAutocomplete<StoryFormValues>
        name="framework"
        label="Medium Autocomplete (48px)"
        size="medium"
        options={FRAMEWORK_OPTIONS}
      />
      <FormAutocomplete<StoryFormValues>
        name="framework"
        label="Large Autocomplete (56px)"
        size="large"
        options={FRAMEWORK_OPTIONS}
      />
    </Stack>
  ),
}

const autocompleteValidationSchema = z.object({
  framework: z.string().min(1, 'Framework wajib dipilih'),
  infaqCategory: z.string().min(1, 'Kategori infaq wajib ditentukan'),
  tags: z.array(z.string()).min(1, 'Minimal pilih 1 tag teknologi'),
})
type AutocompleteValidationFormValues = z.infer<typeof autocompleteValidationSchema>
const { Form: AutoForm, Field: AutoField } = createTypedForm<AutocompleteValidationFormValues>()

function CompleteFormAutocompleteDemo() {
  const [result, setResult] = useState<AutocompleteValidationFormValues | null>(null)

  return (
    <Box>
      <AutoForm
        schema={autocompleteValidationSchema}
        defaultValues={{ framework: '', infaqCategory: '', tags: [] }}
        onSubmit={(data) => setResult(data)}
      >
        <Stack spacing={2.5}>
          <AutoField.Autocomplete
            name="framework"
            label="1. Framework Utama"
            placeholder="Pilih framework..."
            options={FRAMEWORK_OPTIONS}
          />

          <AutoField.Autocomplete
            name="infaqCategory"
            label="2. Program Infaq Prioritas"
            placeholder="Pilih kategori..."
            options={INFAQ_OPTIONS}
          />

          <AutoField.Autocomplete
            multiple
            name="tags"
            label="3. Tech Stack Pendukung (Multi-Select)"
            placeholder="Pilih beberapa teknologi..."
            options={FRAMEWORK_OPTIONS}
            maxVisibleTags={2}
          />

          <Button type="submit" variant="contained" sx={{ bgcolor: TEAL_PRIMARY, fontWeight: 700 }}>
            Simpan Data (Submit)
          </Button>
        </Stack>
      </AutoForm>

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

/** 9. Full RHF Form with Zod validation & Submission Result. */
export const CompleteFormValidation: Story = {
  render: () => <CompleteFormAutocompleteDemo />,
}
