import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Button, Typography, Paper } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormTextField } from './FormTextField'
import { TestFormWrapper } from '../../../test/test-utils'
import { createTypedForm } from '../createTypedForm'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'

interface StoryFormValues {
  email: string
  idpel: string
  nominal: string
  domain: string
  password: string
  doa: string
  notes: string
}

const meta: Meta<typeof FormTextField<StoryFormValues>> = {
  title: 'Components/Form/FormTextField',
  component: FormTextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues>
        defaultValues={{
          email: 'admin@byondbiznis.id',
          idpel: '87654321908',
          nominal: '500000',
          domain: 'company-portal',
          password: 'Password123!',
          doa: 'Semoga berkah dan lancar selalu usahanya',
          notes: 'Instruksi pembayaran tagihan operasional bulanan',
        }}
      >
        <Box sx={{ maxWidth: 480, p: 2 }}>
          <Story />
        </Box>
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormTextField<StoryFormValues>>

/** 1. Default text field with placeholder and helper text. */
export const Default: Story = {
  args: {
    name: 'email',
    label: 'Alamat Email',
    placeholder: 'nama@perusahaan.com',
    startAdornment: <EmailOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />,
    helperText: 'Email terdaftar pada akun korporat',
  },
}

/** 2. IDPEL input with error helper text (Image 3). */
export const WithErrorState: Story = {
  args: {
    name: 'idpel',
    label: 'Nomor Pelanggan / IDPEL',
    placeholder: 'Contoh: 87654321908',
    helperText: 'No. Meter/IDPEL tidak terdaftar',
  },
}

/** 3. Shaded prefix block for currency input (Image 5: "Rp" Dari). */
export const WithPrefixBlock: Story = {
  args: {
    name: 'nominal',
    label: 'Nominal Transfer',
    prefixBlock: 'Rp',
    placeholder: 'Dari',
    clearable: true,
  },
}

/** 4. Shaded suffix block (e.g. ".com"). */
export const WithSuffixBlock: Story = {
  args: {
    name: 'domain',
    label: 'Alamat Web Domain',
    suffixBlock: '.com',
    placeholder: 'nama-bisnis',
  },
}

/** 5. Character counter input (Image 4: "Tulis Doa" 15/75). */
export const WithCharacterCounter: Story = {
  args: {
    name: 'doa',
    label: 'Tuliskan Pesan / Doa',
    placeholder: 'Tulis Doa',
    showCount: true,
    maxLength: 75,
  },
}

/** 6. Password field with show/hide eye toggle button. */
export const PasswordField: Story = {
  args: {
    name: 'password',
    label: 'Kata Sandi Akun',
    type: 'password',
    showPasswordToggle: true,
    startAdornment: <LockOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />,
  },
}

/** 7. Multiline Textarea field. */
export const MultilineField: Story = {
  args: {
    name: 'notes',
    label: 'Berita / Catatan Transaksi',
    placeholder: 'Tuliskan catatan...',
    multiline: true,
    rows: 4,
    showCount: true,
    maxLength: 200,
  },
}

// ── Complete RHF Demo Component ──────────────────────────────────────────────

const formValidationSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  idpel: z.string().min(8, 'Nomor IDPEL minimal 8 digit'),
  nominal: z.string().min(1, 'Nominal transaksi wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  notes: z.string().optional(),
})
type FormValidationValues = z.infer<typeof formValidationSchema>
const { Form: ValidatedForm, Field: FormField } = createTypedForm<FormValidationValues>()

function CompleteFormTextFieldDemo() {
  const [result, setResult] = useState<FormValidationValues | null>(null)

  return (
    <Box>
      <ValidatedForm
        schema={formValidationSchema}
        defaultValues={{
          email: '',
          idpel: '',
          nominal: '',
          password: '',
          notes: '',
        }}
        onSubmit={(data) => setResult(data)}
      >
        <Stack spacing={2.5}>
          <FormField.Text
            name="email"
            label="1. Email Bisnis"
            placeholder="nama@perusahaan.com"
            startAdornment={<EmailOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />}
          />

          <FormField.Text
            name="idpel"
            label="2. ID Pelanggan PLN"
            placeholder="87654321908"
            showCount
            maxLength={16}
          />

          <FormField.Text
            name="nominal"
            label="3. Nominal Pembayaran"
            prefixBlock="Rp"
            placeholder="0"
            clearable
          />

          <FormField.Text
            name="password"
            label="4. PIN / Password Otorisasi"
            type="password"
            showPasswordToggle
            startAdornment={<LockOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />}
          />

          <FormField.Text
            name="notes"
            label="5. Berita Acara"
            placeholder="Catatan tambahan..."
            multiline
            rows={3}
            showCount
            maxLength={150}
          />

          <Button type="submit" variant="contained" sx={{ bgcolor: TEAL_PRIMARY, fontWeight: 700 }}>
            Kirim Formulir (Submit)
          </Button>
        </Stack>
      </ValidatedForm>

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
            ✓ Data Form Berhasil Dikirim:
          </Typography>
          <pre style={{ margin: 0, fontSize: '0.8125rem', fontFamily: 'monospace' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </Paper>
      )}
    </Box>
  )
}

/** 8. Full React Hook Form with Zod validation. */
export const CompleteFormValidation: Story = {
  render: () => <CompleteFormTextFieldDemo />,
}
