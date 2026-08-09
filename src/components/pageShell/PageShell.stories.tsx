import type { Meta, StoryObj } from '@storybook/react'
import { Button, Chip, Typography, Card, CardContent, Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'

import { PageShell } from './PageShell'
import { ConnectedUserHeader } from '../../widgets/userHeader'

const meta: Meta<typeof PageShell> = {
  title: 'Components/Layout/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: '#F4F5F7', minHeight: '100vh', p: 1 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageShell>

/**
 * Zero-Boilerplate Shorthand Mode
 * Pass title, subtitle, breadcrumbs, status, actions directly as props on <PageShell>.
 */
export const ShorthandApi: Story = {
  args: {
    maxWidth: 'lg',
    title: 'Manajemen Akun',
    subtitle: 'Daftar Akun Maker',
    subtitleDescription: 'Kelola akun maker dan hak akses transaksi.',
    breadcrumbs: [{ label: 'Beranda', href: '/' }, { label: 'Manajemen Akun' }],
    status: <Chip label="3 Akun Aktif" size="small" sx={{ bgcolor: '#E0F2F1', color: '#00A39D', fontWeight: 700 }} />,
    headerRight: <ConnectedUserHeader />,
    actions: (
      <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#00A39D', borderRadius: 50 }}>
        Tambah Maker
      </Button>
    ),
    children: (
      <PageShell.Content>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Active Makers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  3 of 10 slots used
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageShell.Content>
    ),
  },
}

/**
 * Split Slots: `headerRight` vs `actions`
 * Shows headerRight (global UserHeader in title row) alongside actions (page CTA button in subtitle row).
 */
export const DualHeaderSlots: Story = {
  render: () => (
    <PageShell
      maxWidth="lg"
      title="Bank Transfer"
      subtitle="Pengiriman Dana Realtime"
      subtitleDescription="Transfer ke rekening bank mitra bisnis."
      breadcrumbs={[{ label: 'Home' }, { label: 'Transfer' }]}
      headerRight={<ConnectedUserHeader />}
      actions={
        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#00A39D', borderRadius: 50 }}>
          Transfer Baru
        </Button>
      }
    >
      <PageShell.Content>
        <PageShell.Section title="Riwayat Transfer Terakhir" divider>
          <Typography variant="body2" color="text.secondary">
            Daftar transaksi transfer bulan ini.
          </Typography>
        </PageShell.Section>
      </PageShell.Content>
    </PageShell>
  ),
}

/**
 * Multi-Step Flow with Steps
 * Shows horizontal wizard progress steps indicator inside PageHeader.
 */
export const MultiStepWizard: Story = {
  render: () => (
    <PageShell
      maxWidth="lg"
      title="Pengajuan Rekening Baru"
      subtitle="Langkah 2: Detail Perusahaan"
      steps={['Informasi Dasar', 'Detail Perusahaan', 'Dokumen Legal', 'Konfirmasi']}
      currentStep={1}
      headerRight={<ConnectedUserHeader />}
    >
      <PageShell.Content>
        <PageShell.Section title="Data Legalitas">
          <Typography variant="body2" color="text.secondary">
            Formulir kelengkapan dokumen legal perusahaan.
          </Typography>
        </PageShell.Section>

        <PageShell.StickyFooter align="between">
          <Button variant="outlined">Kembali</Button>
          <Button variant="contained" sx={{ bgcolor: '#00A39D' }}>
            Lanjutkan
          </Button>
        </PageShell.StickyFooter>
      </PageShell.Content>
    </PageShell>
  ),
}

/**
 * Granular Slot Customization via `headerSlotSx`
 * Customize spacing, typography, and colors per slot without losing default behavior.
 */
export const CustomSlotStyling: Story = {
  render: () => (
    <PageShell
      maxWidth="lg"
      title="Custom Typography & Spacing"
      subtitle="Header with custom slotSx rules"
      headerSlotSx={{
        root: { mb: 4 },
        title: { fontSize: '2rem', color: '#00A39D' },
        subtitle: { color: '#F59E0B' },
        subtitleRow: { mt: 1 },
      }}
      headerRight={<ConnectedUserHeader />}
    >
      <PageShell.Content>
        <Typography variant="body1">Content with custom header spacing styling.</Typography>
      </PageShell.Content>
    </PageShell>
  ),
}

/**
 * Full Page Loading Skeleton State
 */
export const LoadingState: Story = {
  render: () => <PageShell loading maxWidth="lg">{null}</PageShell>,
}
