import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
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
import DownloadIcon from '@mui/icons-material/Download'
import FilterListIcon from '@mui/icons-material/FilterList'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'

import { PageLayout } from '../../components/pageLayout'

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const TEAL_PRIMARY = '#00A39D'
const ORANGE_ACCENT = '#F59E0B'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const payrollBatches = [
  {
    id: 'PRL-001',
    batchName: 'Payroll November 2024',
    totalKaryawan: 24,
    totalNominal: 'Rp45.000.000,00',
    status: 'completed',
    tanggal: '30 Nov 2024',
    rekening: 'Operasional · 7268903700',
  },
  {
    id: 'PRL-002',
    batchName: 'Payroll Oktober 2024',
    totalKaryawan: 24,
    totalNominal: 'Rp43.500.000,00',
    status: 'completed',
    tanggal: '31 Okt 2024',
    rekening: 'Operasional · 7268903700',
  },
  {
    id: 'PRL-003',
    batchName: 'Payroll Desember 2024',
    totalKaryawan: 26,
    totalNominal: 'Rp48.750.000,00',
    status: 'pending',
    tanggal: '31 Des 2024',
    rekening: 'Operasional · 7268903700',
  },
]

const karyawanList = [
  { id: '01', nama: 'Ahmad Fauzi', jabatan: 'Senior Engineer', gaji: 'Rp8.500.000', rekening: 'BSI · 7213456789', status: 'active' },
  { id: '02', nama: 'Siti Rahmawati', jabatan: 'Product Designer', gaji: 'Rp7.200.000', rekening: 'BCA · 1234567890', status: 'active' },
  { id: '03', nama: 'Budi Santoso', jabatan: 'Finance Manager', gaji: 'Rp9.000.000', rekening: 'Mandiri · 9876543210', status: 'active' },
  { id: '04', nama: 'Dewi Kusuma', jabatan: 'HR Specialist', gaji: 'Rp6.500.000', rekening: 'BSI · 7219876543', status: 'inactive' },
]

// ─── Component ────────────────────────────────────────────────────────────────
interface PayrollPageProps {
  onBack?: () => void
}

export function PayrollPage({ onBack }: PayrollPageProps) {
  const [activeTab, setActiveTab] = useState<'batch' | 'karyawan'>('batch')

  const summaryCards = [
    { label: 'Total Karyawan Aktif', value: '26', note: '+2 bulan ini', color: TEAL_PRIMARY },
    { label: 'Payroll Bulan Ini', value: 'Rp48.750.000', note: 'Menunggu Persetujuan', color: ORANGE_ACCENT },
    { label: 'Berhasil Diproses', value: '2 Batch', note: 'Nov & Okt 2024', color: '#16A34A' },
  ]

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100%', bgcolor: '#F4F5F7', p: 1 }}>
      <PageLayout maxWidth="full" bgVariant="transparent">
        <PageLayout.Header
          title={
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: TEXT_MAIN, letterSpacing: '-0.02em' }}>
                Penggajian (Payroll)
              </Typography>
              <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mt: 0.2 }}>
                Manajemen gaji dan batch payroll karyawan
              </Typography>
            </Box>
          }
          onBack={onBack}
          actions={
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{
                  borderColor: '#E2E8F0',
                  color: TEXT_MAIN,
                  '&:hover': { borderColor: TEAL_PRIMARY, color: TEAL_PRIMARY },
                  borderRadius: 50,
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: TEAL_PRIMARY,
                  borderRadius: 50,
                  '&:hover': { bgcolor: '#008F85' },
                  fontWeight: 700,
                }}
              >
                Buat Batch Baru
              </Button>
            </Stack>
          }
        />

        <PageLayout.Content>
          {/* ── Summary Cards ── */}
          <PageLayout.Grid columns={{ xs: 12, sm: 4, md: 4 }}>
            {summaryCards.map((card) => (
              <Card
                key={card.label}
                variant="outlined"
                sx={{ p: 2.5, borderRadius: 4, borderColor: '#E2E8F0', bgcolor: 'white' }}
              >
                <Typography variant="caption" sx={{ color: TEXT_MUTED, fontWeight: 600 }}>
                  {card.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: TEXT_MAIN, mt: 0.5, mb: 0.5, letterSpacing: '-0.02em' }}
                >
                  {card.value}
                </Typography>
                <Typography variant="caption" sx={{ color: card.color, fontWeight: 700 }}>
                  {card.note}
                </Typography>
              </Card>
            ))}
          </PageLayout.Grid>

          {/* ── Tabs + Table Section ── */}
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, borderColor: '#E2E8F0', p: 3, bgcolor: 'white' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
              <Stack direction="row" spacing={3}>
                {[
                  { key: 'batch', label: 'Batch Payroll' },
                  { key: 'karyawan', label: 'Daftar Karyawan' },
                ].map(({ key, label }) => (
                  <Box
                    key={key}
                    onClick={() => setActiveTab(key as 'batch' | 'karyawan')}
                    sx={{
                      pb: 1.5,
                      cursor: 'pointer',
                      borderBottom: activeTab === key ? `3px solid ${ORANGE_ACCENT}` : '3px solid transparent',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: activeTab === key ? 800 : 600,
                        color: activeTab === key ? TEXT_MAIN : TEXT_MUTED,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <IconButton size="small" sx={{ border: '1px solid #E2E8F0', p: 0.75, mb: 1 }}>
                <FilterListIcon fontSize="small" sx={{ color: TEXT_MUTED }} />
              </IconButton>
            </Box>

            {/* Batch Table */}
            {activeTab === 'batch' && (
              <Table>
                <TableHead>
                  <TableRow>
                    {['Batch ID', 'Nama Batch', 'Karyawan', 'Total Nominal', 'Status', 'Tanggal'].map((h) => (
                      <TableCell key={h} sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollBatches.map((row) => (
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: TEXT_MUTED }}>
                          {row.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          {row.batchName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                          {row.rekening}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          {row.totalKaryawan} orang
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          {row.totalNominal}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={
                            row.status === 'completed'
                              ? <CheckCircleIcon sx={{ fontSize: '0.85rem !important' }} />
                              : <PendingIcon sx={{ fontSize: '0.85rem !important' }} />
                          }
                          label={row.status === 'completed' ? 'Selesai' : 'Menunggu'}
                          size="small"
                          sx={{
                            bgcolor: row.status === 'completed' ? '#DCFCE7' : '#FEF9C3',
                            color: row.status === 'completed' ? '#16A34A' : '#92400E',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                          {row.tanggal}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Karyawan Table */}
            {activeTab === 'karyawan' && (
              <Table>
                <TableHead>
                  <TableRow>
                    {['Karyawan', 'Jabatan', 'Gaji Pokok', 'Rekening Tujuan', 'Status'].map((h) => (
                      <TableCell key={h} sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {karyawanList.map((row) => (
                    <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: TEAL_PRIMARY, fontSize: '0.85rem', fontWeight: 800 }}>
                            {row.nama.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            {row.nama}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                          {row.jabatan}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          {row.gaji}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                          {row.rekening}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          size="small"
                          sx={{
                            bgcolor: row.status === 'active' ? '#E0F2F1' : '#F1F5F9',
                            color: row.status === 'active' ? TEAL_PRIMARY : TEXT_MUTED,
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                sx={{
                  color: ORANGE_ACCENT,
                  fontWeight: 700,
                  p: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
              >
                Lihat Semua
              </Button>
            </Box>
          </Card>

          {/* ── Approval Banner ── */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 4,
              border: `1px solid ${TEAL_PRIMARY}44`,
              bgcolor: '#E0F2F1',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: TEAL_PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckCircleIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                Batch Desember 2024 Siap Diproses
              </Typography>
              <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                26 karyawan · Total Rp48.750.000 · Menunggu persetujuan Approver
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                ml: 'auto',
                bgcolor: TEAL_PRIMARY,
                borderRadius: 50,
                fontWeight: 700,
                '&:hover': { bgcolor: '#008F85' },
                flexShrink: 0,
              }}
            >
              Setujui Sekarang
            </Button>
          </Paper>
        </PageLayout.Content>
      </PageLayout>
    </Box>
  )
}
