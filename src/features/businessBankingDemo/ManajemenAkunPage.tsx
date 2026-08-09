import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  IconButton,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'

import { PageLayout } from '../../components/pageLayout'

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const TEAL_PRIMARY = '#00A39D'
const ORANGE_ACCENT = '#F59E0B'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const makerList = [
  {
    id: '01',
    nama: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@byondbiznis.id',
    jabatan: 'Treasury Manager',
    status: 'active',
    lastLogin: '09 Agt 2026 · 14:22',
  },
  {
    id: '02',
    nama: 'Siti Rahmawati',
    email: 'siti.r@byondbiznis.id',
    jabatan: 'Finance Staff',
    status: 'active',
    lastLogin: '09 Agt 2026 · 11:05',
  },
  {
    id: '03',
    nama: 'Budi Santoso',
    email: 'budi.s@byondbiznis.id',
    jabatan: 'Accounting Lead',
    status: 'inactive',
    lastLogin: '01 Agt 2026 · 09:30',
  },
  {
    id: '04',
    nama: 'Dewi Kusuma',
    email: 'dewi.k@byondbiznis.id',
    jabatan: 'Ops Coordinator',
    status: 'active',
    lastLogin: '08 Agt 2026 · 16:47',
  },
  {
    id: '05',
    nama: 'Rizky Pratama',
    email: 'rizky.p@byondbiznis.id',
    jabatan: 'Finance Staff',
    status: 'pending',
    lastLogin: '—',
  },
]

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  active: { label: 'Aktif', bg: '#E0F2F1', color: TEAL_PRIMARY },
  inactive: { label: 'Nonaktif', bg: '#F1F5F9', color: TEXT_MUTED },
  pending: { label: 'Pending', bg: '#FEF9C3', color: '#92400E' },
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ManajemenAkunPageProps {
  onBack?: () => void
}

export function ManajemenAkunPage({ onBack }: ManajemenAkunPageProps) {
  return (
    // ── Shorthand API: title/subtitle/subtitleDescription/actions on root ──
    <Box sx={{ flexGrow: 1, minHeight: '100%', bgcolor: '#F4F5F7', p: 1 }}>
      <PageLayout
        maxWidth="full"
        bgVariant="transparent"
        title="Manajemen Akun"
        subtitle="Daftar Akun Maker"
        subtitleDescription="Tambah Maker dan kelola hingga 10 akun di halaman ini"
        // onBack={onBack}
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: TEAL_PRIMARY,
              borderRadius: 50,
              fontWeight: 700,
              '&:hover': { bgcolor: '#008F85' },
            }}
          >
            Tambah Maker
          </Button>
        }
      >
        <PageLayout.Content>
          {/* ── Quota Info ── */}
          <Stack direction="row" spacing={1.5}>
            <Chip
              label={`${makerList.length} / 10 akun digunakan`}
              size="small"
              sx={{ bgcolor: '#E0F2F1', color: TEAL_PRIMARY, fontWeight: 700 }}
            />
            <Chip
              label={`${makerList.filter((m) => m.status === 'active').length} aktif`}
              size="small"
              sx={{ bgcolor: '#DCFCE7', color: '#16A34A', fontWeight: 700 }}
            />
            <Chip
              label={`${makerList.filter((m) => m.status === 'pending').length} pending`}
              size="small"
              sx={{ bgcolor: '#FEF9C3', color: '#92400E', fontWeight: 700 }}
            />
          </Stack>

          {/* ── Maker Table ── */}
          <PageLayout.Section
            variant="card"
            title="Daftar Maker"
            description="Maker dapat membuat transaksi yang akan disetujui oleh Approver."
          >
            <Table>
              <TableHead>
                <TableRow>
                  {['Nama', 'Email', 'Jabatan', 'Status', 'Terakhir Login', 'Aksi'].map((h) => (
                    <TableCell
                      key={h}
                      sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {makerList.map((row) => {
                  const st = statusConfig[row.status]
                  return (
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: row.status === 'active' ? TEAL_PRIMARY : '#94A3B8',
                              fontSize: '0.85rem',
                              fontWeight: 800,
                            }}
                          >
                            {row.nama.charAt(0)}
                          </Avatar>
                          <Box>
                            <Box sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN }}>
                              {row.nama}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>
                        {row.email}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.85rem', color: TEXT_MAIN }}>
                        {row.jabatan}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={st.label}
                          size="small"
                          sx={{ bgcolor: st.bg, color: st.color, fontWeight: 700, fontSize: '0.72rem' }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: TEXT_MUTED }}>
                        {row.lastLogin}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            sx={{
                              color: TEAL_PRIMARY,
                              '&:hover': { bgcolor: '#E0F2F1' },
                              borderRadius: 1.5,
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: '#E11D48',
                              '&:hover': { bgcolor: '#FFE4E6' },
                              borderRadius: 1.5,
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: TEXT_MUTED, borderRadius: 1.5 }}>
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </PageLayout.Section>
        </PageLayout.Content>

        {/* ── Sticky Footer with limit indicator ── */}
        <PageLayout.StickyFooter align="between">
          <Box sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>
            Sisa kuota:{' '}
            <Box component="span" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
              {10 - makerList.length} akun
            </Box>{' '}
            dari 10 maksimum
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: ORANGE_ACCENT,
              borderRadius: 50,
              fontWeight: 700,
              '&:hover': { bgcolor: '#D97706' },
            }}
          >
            Tambah Maker
          </Button>
        </PageLayout.StickyFooter>
      </PageLayout>
    </Box>
  )
}
