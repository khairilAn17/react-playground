import { useState } from 'react'
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
  Typography,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { SearchInput } from '../../components/search'

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const TEAL_PRIMARY = '#00A39D'
const ORANGE_ACCENT = '#F59E0B'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const makerList = [
  {
    id: 'm1',
    name: 'Shafa Riani',
    username: 'shafa.maker',
    email: 'shafa@byondbiznis.co.id',
    accounts: '3 Rekening',
    status: 'active',
    createdAt: '12 Jan 2026',
  },
  {
    id: 'm2',
    name: 'Budi Santoso',
    username: 'budi.maker',
    email: 'budi@byondbiznis.co.id',
    accounts: '5 Rekening',
    status: 'active',
    createdAt: '05 Feb 2026',
  },
  {
    id: 'm3',
    name: 'Citra Dewi',
    username: 'citra.maker',
    email: 'citra@byondbiznis.co.id',
    accounts: '1 Rekening',
    status: 'pending',
    createdAt: '08 Aug 2026',
  },
]

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  active: { label: 'Aktif', bg: '#E0F2F1', color: TEAL_PRIMARY },
  inactive: { label: 'Nonaktif', bg: '#F1F5F9', color: TEXT_MUTED },
  pending: { label: 'Pending', bg: '#FEF9C3', color: '#92400E' },
}

export interface ManajemenAkunPageProps {
  onBack?: () => void
}

export function ManajemenAkunPage({ onBack }: ManajemenAkunPageProps = {}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMakers = makerList.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <PageLayout
      maxWidth="full"
      bgVariant="transparent"
      title="Manajemen Akun"
      subtitle="Daftar Akun Maker"
      subtitleDescription="Tambah Maker dan kelola hingga 10 akun di halaman ini"
      footerAlign="between"
      breadcrumbs={[
        {
          label: 'Home',
          href: '#',
          onClick: onBack,
        },
        {
          label: 'Business Banking',
          href: '#',
          onClick: onBack,
        },
      ]}
      footerActions={
        <>
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
        </>
      }
    >
      {/* ── Quota Info ── */}
      <Stack direction="row" spacing={1.5}>
        <Chip
          label={`${makerList.length} / 10 akun digunakan`}
          size="small"
          sx={{ bgcolor: '#E0F2F1', color: TEAL_PRIMARY, fontWeight: 700 }}
        />
        <Chip label="Batas Maksimum 10 Akun" size="small" variant="outlined" />
      </Stack>

      {/* ── Maker List Table Section ── */}
      <PageLayout.Section
        title="Daftar Akun Maker Aktif"
        description="Pengguna dengan hak akses pembuat transaksi (Maker)"
        actions={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <SearchInput
              size="small"
              placeholder="Cari maker, username, email..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              clearable
              slotSx={{ container: { minWidth: 260 } }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: TEAL_PRIMARY,
                borderRadius: 50,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: '#008F85' },
              }}
            >
              Tambah Maker
            </Button>
          </Stack>
        }
        divider
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 800, color: TEXT_MUTED, fontSize: '0.78rem' } }}>
              <TableCell>NAMA MAKER</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>REKENING DIIZINKAN</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell align="right">AKSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMakers.map((row) => {
              const status = statusConfig[row.status] || statusConfig.inactive
              return (
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', fontWeight: 700, bgcolor: TEAL_PRIMARY }}>
                        {row.name.substring(0, 2).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Dibuat {row.createdAt}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {row.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {row.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.accounts} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{ bgcolor: status.bg, color: status.color, fontWeight: 700 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <IconButton size="small" color="primary">
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
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
    </PageLayout>
  )
}
