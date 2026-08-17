import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Link, Button, TextField } from '@mui/material'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

// ── 1. Default Label ─────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    text: 'Nama Lengkap Perusahaan',
    htmlFor: 'company-name',
  },
}

// ── 2. Required Field with Asterisk ──────────────────────────────────────────
export const RequiredField: Story = {
  args: {
    text: 'Email Administrator',
    required: true,
    htmlFor: 'admin-email',
  },
}

// ── 3. Optional Field ────────────────────────────────────────────────────────
export const OptionalField: Story = {
  args: {
    text: 'Nomor Ekstensi Kantor',
    optional: true,
    htmlFor: 'office-ext',
  },
}

// ── 4. With Contextual Tooltip ───────────────────────────────────────────────
export const WithTooltip: Story = {
  args: {
    text: 'Nomor Pokok Wajib Pajak (NPWP 16 Digit)',
    required: true,
    tooltip: 'Format NPWP 16 digit sesuai NIK atau nomor identitas perpustakaan B2B resmi.',
    tooltipPlacement: 'right',
  },
}

// ── 5. With Trailing Action Link ─────────────────────────────────────────────
export const WithActionLink: Story = {
  args: {
    text: 'Kata Sandi Transaksi',
    required: true,
    action: (
      <Link href="#forgot" underline="hover" sx={{ color: '#00A39D', fontSize: '0.8125rem', fontWeight: 600 }}>
        Lupa Kata Sandi?
      </Link>
    ),
  },
}

// ── 6. Size Variants ─────────────────────────────────────────────────────────
export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440 }}>
      <Box>
        <Label size="small" required optional tooltip="Ukuran font 13px">
          Small Label (13px)
        </Label>
        <TextField size="small" fullWidth placeholder="Small field..." />
      </Box>
      <Box>
        <Label size="medium" required optional tooltip="Ukuran font 14px (Default)">
          Medium Label (14px - Default)
        </Label>
        <TextField size="medium" fullWidth placeholder="Medium field..." />
      </Box>
      <Box>
        <Label size="large" required optional tooltip="Ukuran font 16px">
          Large Label (16px)
        </Label>
        <TextField fullWidth placeholder="Large field..." />
      </Box>
    </Stack>
  ),
}

// ── 7. States: Error & Disabled ─────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 440 }}>
      <Box>
        <Label error required text="Alamat Email Terdaftar (Error State)" tooltip="Format email tidak valid" />
        <TextField fullWidth error placeholder="email@invalid" helperText="Alamat email tidak ditemukan" />
      </Box>
      <Box>
        <Label disabled text="Nomor Rekening Terkunci (Disabled State)" tooltip="Akun telah diverifikasi dan tidak dapat diubah" />
        <TextField fullWidth disabled value="8830-0019-2810" />
      </Box>
    </Stack>
  ),
}

// ── 8. Granular slotSx Styling ───────────────────────────────────────────────
export const SlotSxTheming: Story = {
  render: () => (
    <Box sx={{ maxWidth: 460 }}>
      <Label
        required
        optional="(Custom Muted Tag)"
        tooltip="Custom styling applied to every slot"
        action={
          <Button size="small" variant="text" sx={{ p: 0, minWidth: 'auto', fontSize: '0.75rem', color: '#B45309', fontWeight: 700 }}>
            Format Baru
          </Button>
        }
        slotSx={{
          text: {
            color: '#1E293B',
            fontWeight: 800,
            letterSpacing: '0.02em',
          },
          asterisk: {
            color: '#DC2626',
            fontSize: '1.1rem',
          },
          optional: {
            color: '#64748B',
            fontStyle: 'italic',
          },
          tooltipIcon: {
            color: '#00A39D',
          },
        }}
      >
        ID Pengguna B2B Portal
      </Label>
      <TextField fullWidth placeholder="Masukkan ID Pengguna..." />
    </Box>
  ),
}
