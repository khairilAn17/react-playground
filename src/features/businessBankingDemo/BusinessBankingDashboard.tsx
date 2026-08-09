import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  IconButton,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import MenuIcon from '@mui/icons-material/Menu'

import { PageLayout } from '../../components/pageLayout'
import { ExpandableSearch } from '../../components/search'

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const TEAL_PRIMARY = '#00A39D'
const ORANGE_ACCENT = '#F59E0B'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const pendingTasks = [
  {
    id: '1',
    transaksi: 'Pembayaran',
    tanggal: '20 Des 2024',
    sumberNama: 'Tabungan Bisnis',
    sumberNo: '7212345678',
    tujuanNama: 'Shopee VA',
    tujuanNo: '648223647778',
    nominal: 'Rp2.405.550,00',
  },
  {
    id: '2',
    transaksi: 'Single Transfer',
    tanggal: '20 Des 2024',
    sumberNama: 'Tabungan Bisnis',
    sumberNo: '7987654321',
    tujuanNama: 'Ridhwan Hanif',
    tujuanNo: 'BCA',
    nominal: 'Rp12.700.000,00',
  },
  {
    id: '3',
    transaksi: 'Pembelian',
    tanggal: '20 Des 2024',
    sumberNama: 'Tabungan Bisnis',
    sumberNo: '7212345678',
    tujuanNama: 'Gopay Topup',
    tujuanNo: '6282294085558',
    nominal: 'Rp750.000,00',
  },
]

const historyTasks = [
  {
    id: 'h1',
    transaksi: 'Payroll Batch',
    tanggal: '18 Des 2024',
    sumberNama: 'Operasional',
    sumberNo: '7268903700',
    tujuanNama: '24 Karyawan',
    tujuanNo: 'BSI Multi',
    nominal: 'Rp45.000.000,00',
  },
  {
    id: 'h2',
    transaksi: 'Transfer Valas',
    tanggal: '15 Des 2024',
    sumberNama: 'Tabungan Bisnis',
    sumberNo: '7212345678',
    tujuanNama: 'Supplier Co. Ltd',
    tujuanNo: 'Citi Swift',
    nominal: 'Rp120.000.000,00',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export function BusinessBankingDashboard() {
  const [showBalance, setShowBalance] = useState(false)
  const [activeTaskTab, setActiveTaskTab] = useState<'pending' | 'history'>('pending')
  const [timeframe, setTimeframe] = useState('30')
  const [accountFilter, setAccountFilter] = useState('all')

  const toggleBalance = () => setShowBalance((prev) => !prev)

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100%', bgcolor: '#F4F5F7', p: 1 }}>
      <PageLayout maxWidth="full" bgVariant="transparent">
        {/* ── Top Header Section (Title + User Quick Actions & Prayer Card) ── */}
        <PageLayout.Header
          title={
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: TEXT_MAIN, letterSpacing: '-0.02em' }}>
                Assalamualaikum, Shafa
              </Typography>
              <PageLayout.Breadcrumbs
                items={[
                  {
                    label: 'Home',
                    href: '/',
                  },
                  {
                    label: 'Business Banking',
                    href: '/business-banking',
                  },
                ]}
              />
            </Box>
          }

          actions={
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <ExpandableSearch
                placeholder="Cari transaksi, rekening, atau fitur"
                iconButtonSx={{
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #E2E8F0',
                  '&:hover': { bgcolor: '#F8FAFC' },
                  p: 1,
                }}
              />

              {/* Notification circular button with badge dot */}
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  sx={{
                    bgcolor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid #E2E8F0',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <NotificationsNoneIcon sx={{ color: TEXT_MAIN, fontSize: 20 }} />
                </IconButton>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 10,
                    height: 10,
                    bgcolor: ORANGE_ACCENT,
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </Box>

              {/* User Profile Pill */}
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 50,
                  border: '1px solid #E2E8F0',
                  bgcolor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  sx={{ width: 32, height: 32 }}
                />
                <Box sx={{ pr: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2 }}>
                    Shafa Riani
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, fontSize: '0.72rem', display: 'block' }}>
                    Maker
                  </Typography>
                </Box>
                <MenuIcon sx={{ color: TEXT_MAIN, fontSize: 20, ml: 1 }} />
              </Paper>
            </Stack>
          }
        />

        <PageLayout.Content gap={3}>
          {/* ── SECTION 1: Tabungan (Savings Overview + Account Cards) ── */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              borderColor: '#E2E8F0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
              p: 3,
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT_MAIN, mb: 2 }}>
              Tabungan
            </Typography>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ pr: { md: 2 } }}>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, fontWeight: 600 }}>
                    Total Saldo 5 Rekening
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: TEXT_MAIN, letterSpacing: '-0.03em' }}>
                      {showBalance ? 'Rp 1.450.800.000,00' : 'Rp ••••••••'}
                    </Typography>
                    <IconButton onClick={toggleBalance} size="small" sx={{ color: TEXT_MUTED }}>
                      {showBalance ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </Box>

                  <Button
                    onClick={toggleBalance}
                    sx={{
                      color: ORANGE_ACCENT,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      p: 0,
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                    }}
                  >
                    Lihat Semua
                  </Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 8 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {/* Account Card 1: Harian Bisnis */}
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 3.5,
                      bgcolor: '#FAF9F6',
                      border: '1px solid #F1F5F9',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          Harian Bisnis
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mt: 0.2 }}>
                          7268907364
                        </Typography>
                      </Box>

                      {/* Decorative BSI Bank Card Preview Graphic */}
                      <Box
                        sx={{
                          width: 58,
                          height: 40,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7C59F 50%, #EAA827 100%)',
                          boxShadow: '0 4px 10px rgba(234, 168, 39, 0.3)',
                          position: 'relative',
                          overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.4)',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            right: -10,
                            bottom: -10,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                        {showBalance ? 'Rp 842.150.000,00' : 'Rp ••••••••'}
                      </Typography>
                      <IconButton size="small" onClick={toggleBalance} sx={{ color: TEXT_MUTED, p: 0.5 }}>
                        {showBalance ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                      </IconButton>
                    </Box>
                  </Paper>

                  {/* Account Card 2: Operasional */}
                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 3.5,
                      bgcolor: '#FAF9F6',
                      border: '1px solid #F1F5F9',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          Operasional
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mt: 0.2 }}>
                          7268903700
                        </Typography>
                      </Box>

                      {/* Decorative BSI Bank Card Preview Graphic */}
                      <Box
                        sx={{
                          width: 58,
                          height: 40,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #FF6B35 0%, #F7C59F 50%, #EAA827 100%)',
                          boxShadow: '0 4px 10px rgba(234, 168, 39, 0.3)',
                          position: 'relative',
                          overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.4)',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            right: -10,
                            bottom: -10,
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          {showBalance ? 'Rp 608.650.000,00' : 'Rp ••••••••'}
                        </Typography>
                        <IconButton size="small" onClick={toggleBalance} sx={{ color: TEXT_MUTED, p: 0.5 }}>
                          {showBalance ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                        </IconButton>
                      </Box>

                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: TEAL_PRIMARY,
                          color: 'white',
                          '&:hover': { bgcolor: '#008F85' },
                          width: 28,
                          height: 28,
                        }}
                      >
                        <ChevronRightIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 2: My Task (Interactive Task List) ── */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              borderColor: '#E2E8F0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
              p: 3,
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT_MAIN, mb: 2 }}>
              My Task
            </Typography>

            {/* Filter Tabs */}
            <Stack direction="row" spacing={2} sx={{ mb: 2, borderBottom: '1px solid #F1F5F9', pb: 1 }}>
              <Box
                onClick={() => setActiveTaskTab('pending')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  pb: 1,
                  borderBottom: activeTaskTab === 'pending' ? `3px solid ${ORANGE_ACCENT}` : '3px solid transparent',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: activeTaskTab === 'pending' ? 800 : 600,
                    color: activeTaskTab === 'pending' ? TEXT_MAIN : TEXT_MUTED,
                  }}
                >
                  Perlu Disetujui
                </Typography>
                <Chip
                  label="10"
                  size="small"
                  sx={{
                    bgcolor: ORANGE_ACCENT,
                    color: 'white',
                    fontWeight: 800,
                    height: 20,
                    fontSize: '0.72rem',
                  }}
                />
              </Box>

              <Box
                onClick={() => setActiveTaskTab('history')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  pb: 1,
                  borderBottom: activeTaskTab === 'history' ? `3px solid ${ORANGE_ACCENT}` : '3px solid transparent',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: activeTaskTab === 'history' ? 800 : 600,
                    color: activeTaskTab === 'history' ? TEXT_MAIN : TEXT_MUTED,
                  }}
                >
                  Riwayat Tugas
                </Typography>
                <Chip
                  label="8"
                  size="small"
                  sx={{
                    bgcolor: '#F59E0B22',
                    color: ORANGE_ACCENT,
                    fontWeight: 800,
                    height: 20,
                    fontSize: '0.72rem',
                  }}
                />
              </Box>
            </Stack>

            {/* Data Table */}
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}>
                    Transaksi
                  </TableCell>
                  <TableCell sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}>
                    Sumber
                  </TableCell>
                  <TableCell sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}>
                    Tujuan
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: TEXT_MUTED, fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none' }}
                  >
                    Nominal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(activeTaskTab === 'pending' ? pendingTasks : historyTasks).map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                        {row.transaksi}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                        {row.tanggal}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                        {row.sumberNama}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                        {row.sumberNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                        {row.tujuanNama}
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                        {row.tujuanNo}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                          {row.nominal}
                        </Typography>
                        <ChevronRightIcon fontSize="small" sx={{ color: TEAL_PRIMARY }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ mt: 2 }}>
              <Button
                sx={{
                  color: ORANGE_ACCENT,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  p: 0,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
              >
                Lihat Semua
              </Button>
            </Box>
          </Card>

          {/* ── SECTION 3: Lihat Arus Kas (Cash Flow Graph & Summary) ── */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              borderColor: '#E2E8F0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
              p: 3,
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
                Lihat Arus Kas
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <FormControl size="small">
                  <Select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    sx={{
                      borderRadius: 50,
                      fontSize: '0.8rem',
                      bgcolor: 'white',
                      minWidth: 95,
                      border: '1px solid #E2E8F0',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="7">7 Hari</MenuItem>
                    <MenuItem value="30">30 Hari</MenuItem>
                    <MenuItem value="90">90 Hari</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small">
                  <Select
                    value={accountFilter}
                    onChange={(e) => setAccountFilter(e.target.value)}
                    sx={{
                      borderRadius: 50,
                      fontSize: '0.8rem',
                      bgcolor: 'white',
                      minWidth: 145,
                      border: '1px solid #E2E8F0',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="all">Semua Rekening</MenuItem>
                    <MenuItem value="harian">Harian Bisnis</MenuItem>
                    <MenuItem value="operasional">Operasional</MenuItem>
                  </Select>
                </FormControl>

                <IconButton size="small" sx={{ border: '1px solid #E2E8F0', p: 0.75, bgcolor: 'white' }}>
                  <RefreshIcon fontSize="small" sx={{ color: TEXT_MUTED }} />
                </IconButton>
              </Stack>
            </Box>

            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={2.5}>
                  {/* Uang Masuk indicator */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: TEAL_PRIMARY }} />
                      <Typography variant="body2" sx={{ color: TEXT_MUTED, fontWeight: 600 }}>
                        Uang Masuk
                      </Typography>
                      <Chip
                        icon={<ArrowDownwardIcon sx={{ fontSize: '0.75rem !important', color: '#E11D48 !important' }} />}
                        label="-12%"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: '#FFE4E6',
                          color: '#E11D48',
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: TEXT_MAIN, mt: 0.5 }}>
                      Rp250.000.000,00
                    </Typography>
                  </Box>

                  {/* Uang Keluar indicator */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: ORANGE_ACCENT }} />
                      <Typography variant="body2" sx={{ color: TEXT_MUTED, fontWeight: 600 }}>
                        Uang Keluar
                      </Typography>
                      <Chip
                        icon={<ArrowUpwardIcon sx={{ fontSize: '0.75rem !important', color: '#16A34A !important' }} />}
                        label="+17%"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          bgcolor: '#DCFCE7',
                          color: '#16A34A',
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: TEXT_MAIN, mt: 0.5 }}>
                      Rp150.000.000,00
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Smooth SVG Trend Line Chart */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ width: '100%', height: 140, position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 500 140" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={TEAL_PRIMARY} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={TEAL_PRIMARY} stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ORANGE_ACCENT} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={ORANGE_ACCENT} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Uang Masuk Line (Teal) */}
                    <path
                      d="M 0 100 Q 100 20 200 70 T 400 30 T 500 60 L 500 140 L 0 140 Z"
                      fill="url(#tealGrad)"
                    />
                    <path
                      d="M 0 100 Q 100 20 200 70 T 400 30 T 500 60"
                      fill="none"
                      stroke={TEAL_PRIMARY}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Uang Keluar Line (Orange) */}
                    <path
                      d="M 0 110 Q 120 90 220 110 T 380 90 T 500 80 L 500 140 L 0 140 Z"
                      fill="url(#orangeGrad)"
                    />
                    <path
                      d="M 0 110 Q 120 90 220 110 T 380 90 T 500 80"
                      fill="none"
                      stroke={ORANGE_ACCENT}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </PageLayout.Content>
      </PageLayout>
    </Box>
  )
}
