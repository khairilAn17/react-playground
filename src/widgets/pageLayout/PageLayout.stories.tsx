import type { Meta, StoryObj } from '@storybook/react'
import { Button, Typography, Paper, Box } from '@mui/material'
import { PageLayout } from './PageLayout'

const meta: Meta<typeof PageLayout> = {
  title: 'Widgets/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: '#F4F5F7', minHeight: '100vh' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageLayout>

export const Default: Story = {
  args: {
    title: 'Manajemen Akun',
    subtitle: 'Daftar Akun Maker',
    subtitleDescription: 'Tambah Maker dan kelola hingga 10 akun di halaman ini',
    breadcrumbs: [
      { label: 'Beranda', href: '/' },
      { label: 'Manajemen Akun' },
    ],
    children: (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="body1">
          Ini adalah konten utama halaman yang otomatis terbungkus PageShell.Content.
        </Typography>
      </Paper>
    ),
  },
}

export const WithStickyFooter: Story = {
  args: {
    title: 'Payroll Wizard',
    subtitle: 'Form Pengajuan Gaji',
    steps: ['Detail Payroll', 'Pilih Rekening', 'Konfirmasi'],
    currentStep: 1,
    footerActions: (
      <>
        <Button variant="outlined">Batal</Button>
        <Button variant="contained">Lanjutkan</Button>
      </>
    ),
    footerAlign: 'between',
    children: (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="body1">Formulir langkah ke-2.</Typography>
      </Paper>
    ),
  },
}
