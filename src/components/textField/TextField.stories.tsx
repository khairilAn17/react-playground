import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 460, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TextField>

/** 1. Image 1: Default outlined rounded input with clean placeholder. */
export const DefaultPlaceholder: Story = {
  args: {
    placeholder: 'Label',
  },
}

/** 2. Image 2: Active input with value and teal focus styling. */
export const ActiveValueFocus: Story = {
  args: {
    defaultValue: 'Value',
    placeholder: 'Type value...',
  },
}

/** 3. Image 3: Error state with IDPEL validation helper text. */
export const ErrorStateIDPEL: Story = {
  args: {
    defaultValue: '87654321908',
    error: true,
    helperText: 'No. Meter/IDPEL tidak terdaftar',
  },
}

/** 4. Image 4: Character counter (e.g. "Tulis Doa" 15/75). */
export const CharacterCounter: Story = {
  args: {
    placeholder: 'Tulis Doa',
    defaultValue: 'Semoga berkah ya',
    showCount: true,
    maxLength: 75,
  },
}

/** 5. Image 5: Left shaded prefix block ("Rp" Dari). */
export const ShadedPrefixBlock: Story = {
  args: {
    prefixBlock: 'Rp',
    placeholder: 'Dari',
  },
}

/** 6. Right shaded suffix block (e.g. ".com", "/bln"). */
export const ShadedSuffixBlock: Story = {
  args: {
    placeholder: 'company-domain',
    suffixBlock: '.com',
  },
}

/** 7. Password input with built-in show/hide eye toggle button. */
export const PasswordToggle: Story = {
  args: {
    label: 'Kata Sandi / PIN Transaksi',
    type: 'password',
    defaultValue: 'Rahasia123',
    showPasswordToggle: true,
    startAdornment: <LockOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />,
  },
}

/** 8. Clearable input with quick 'X' clear button. */
export const ClearableInput: Story = {
  args: {
    label: 'Cari Nama Rekening',
    placeholder: 'Ketik untuk mencari...',
    defaultValue: 'PT Digital Commerce',
    clearable: true,
    startAdornment: <SearchIcon sx={{ fontSize: 20, color: '#64748B' }} />,
  },
}

/** 9. Start Adornments with Contact & Phone Icons. */
export const WithAdornments: Story = {
  render: () => (
    <Stack spacing={2.5}>
      <TextField
        label="Alamat Email Korporat"
        placeholder="nama@perusahaan.com"
        startAdornment={<EmailOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />}
      />
      <TextField
        label="Nomor Telepon Seluler"
        placeholder="0812-xxxx-xxxx"
        prefixBlock="+62"
        startAdornment={<PhoneIphoneIcon sx={{ fontSize: 20, color: '#64748B' }} />}
      />
    </Stack>
  ),
}

/** 10. Multiline Textarea with custom rows. */
export const MultilineTextarea: Story = {
  args: {
    label: 'Catatan Transaksi / Berita Transfer',
    placeholder: 'Tuliskan instruksi atau pesan tambahan...',
    multiline: true,
    rows: 4,
    showCount: true,
    maxLength: 250,
  },
}

/** 11. Small, Medium, Large size comparison. */
export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={2.5}>
      <TextField label="Small (40px)" size="small" placeholder="Small input..." />
      <TextField label="Medium (48px)" size="medium" placeholder="Medium input..." />
      <TextField label="Large (56px)" size="large" placeholder="Large input..." />
    </Stack>
  ),
}
