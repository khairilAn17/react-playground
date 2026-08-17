import { useState } from 'react'
import {
  Box,
  Typography,
  Chip,
  Paper,
  Divider,
  Switch,
  TextField,
  FormControlLabel,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import TuneIcon from '@mui/icons-material/Tune'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PaymentIcon from '@mui/icons-material/Payment'
import SecurityIcon from '@mui/icons-material/Security'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import { RadioGroup, type RadioOption, type RadioVariant, type RadioLayout as LayoutType, type RadioPlacement, type RadioSize } from '../../components/radio'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ── Sample Options Datasets ──────────────────────────────────────────────────

const FREQUENCY_OPTIONS: RadioOption[] = [
  { label: 'Sekali', value: 'once' },
  { label: 'Rutin', value: 'routine' },
]

const TRANSFER_METHOD_OPTIONS: RadioOption[] = [
  {
    label: 'BI-FAST',
    value: 'bifast',
    description: 'Real-time 24/7, limit transaksi hingga Rp 250.000.000 / hari',
    icon: <FlashOnIcon sx={{ color: TEAL_PRIMARY }} />,
    badge: (
      <Chip
        label="Gratis"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.75rem',
          bgcolor: '#E6FFFA',
          color: TEAL_PRIMARY,
          fontWeight: 700,
        }}
      />
    ),
    endContent: (
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: TEXT_MAIN }}>
          Rp 0
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED }}>
          Bebas Biaya
        </Typography>
      </Box>
    ),
  },
  {
    label: 'Realtime Online (RTOL)',
    value: 'rtol',
    description: 'Instan antar bank nasional, limit hingga Rp 50.000.000 / transaksi',
    icon: <AccountBalanceIcon sx={{ color: TEXT_MUTED }} />,
    endContent: (
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: TEXT_MAIN }}>
          Rp 6.500
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED }}>
          Per transaksi
        </Typography>
      </Box>
    ),
  },
  {
    label: 'SKNBI / Kliring',
    value: 'skn',
    description: 'Proses kliring pada jam operasional Bank Indonesia',
    icon: <ScheduleIcon sx={{ color: TEXT_MUTED }} />,
    endContent: (
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: TEXT_MAIN }}>
          Rp 2.900
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: TEXT_MUTED }}>
          H+0 kerja
        </Typography>
      </Box>
    ),
  },
]

const PAYROLL_SCHEDULE_OPTIONS: RadioOption[] = [
  {
    label: 'Same-day Settlement',
    value: 'sameday',
    description: 'Gaji cair langsung pada hari yang sama',
    icon: <PaymentIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Batch Kliring Terjadwal',
    value: 'batch',
    description: 'Eksekusi batch otomatis setiap tanggal 25',
    icon: <ScheduleIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Multi-Authorizer Release',
    value: 'maker_checker',
    description: 'Memerlukan persetujuan 2 level approval',
    icon: <SecurityIcon sx={{ color: TEAL_PRIMARY }} />,
  },
  {
    label: 'Split Payroll Disbursal',
    value: 'split',
    description: 'Transfer ke rekening multi-bank karyawan',
    icon: <AccountBalanceIcon sx={{ color: TEAL_PRIMARY }} />,
  },
]

export function RadioDemoPage() {
  // ── Interactive Playground States ──────────────────────────────────────────
  const [variant, setVariant] = useState<RadioVariant>('card')
  const [layout, setLayout] = useState<LayoutType>('row')
  const [size, setSize] = useState<RadioSize>('medium')
  const [radioPlacement, setRadioPlacement] = useState<RadioPlacement>('left')
  const [borderRadius, setBorderRadius] = useState('12px')
  const [hasError, setHasError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>('routine')

  // Showcase section states
  const [transferMethod, setTransferMethod] = useState('bifast')
  const [payrollSchedule, setPayrollSchedule] = useState('sameday')
  const [frequencyValue, setFrequencyValue] = useState('routine')

  return (
    <PageLayout
      title="Radio & RadioCard Primitives"
      breadcrumbs={[
        { label: 'Design System', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Radio & RadioCard' },
      ]}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', pb: 8 }}>
        {/* ── Header Introduction ──────────────────────────────────────── */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: TEXT_MAIN, mb: 1, letterSpacing: '-0.02em' }}
          >
            Radio & RadioCard Component System
          </Typography>
          <Typography variant="body1" sx={{ color: TEXT_MUTED, maxWidth: 800 }}>
            Universal, accessible single-choice selector supporting clean inline radios and
            rich card containers with active teal tint (`#F0FDFA`), customizable indicators,
            icons, subtitles, badges, and responsive layouts.
          </Typography>
        </Box>

        {/* ── 1. Reference Image Showcase (Exact 1:1 Implementation) ─────── */}
        <Card
          sx={{
            mb: 4,
            border: '1.5px solid #00A39D',
            boxShadow: '0 4px 20px rgba(0, 163, 157, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: '#E6FFFA',
                  color: TEAL_PRIMARY,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RadioButtonCheckedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: TEXT_MAIN, fontSize: '1.05rem' }}>
                  Target Reference Image Implementation
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: TEXT_MUTED }}>
                  Exact replication of "Sekali" (unselected) and "Rutin" (selected with teal border & tint)
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Active Component"
              size="small"
              sx={{ bgcolor: '#E6FFFA', color: TEAL_PRIMARY, fontWeight: 700 }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px dashed #CBD5E1' }}>
            <RadioGroup
              variant="card"
              layout="row"
              size="medium"
              borderRadius="12px"
              options={FREQUENCY_OPTIONS}
              value={frequencyValue}
              onValueChange={(val) => setFrequencyValue(String(val))}
            />
          </Box>

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
              Selected value:
            </Typography>
            <Chip label={frequencyValue} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
          </Box>
        </Card>

        {/* ── 2. Interactive Sandbox / Playground ───────────────────────── */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Controls Panel */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TuneIcon sx={{ color: TEAL_PRIMARY }} />
                <Typography sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                  Interactive Prop Controls
                </Typography>
              </Box>
              <Divider sx={{ mb: 2.5 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Variant */}
                <Box>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: TEXT_MAIN, mb: 0.75 }}>
                    Variant
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {(['card', 'default'] as RadioVariant[]).map((v) => (
                      <Chip
                        key={v}
                        label={v}
                        clickable
                        onClick={() => setVariant(v)}
                        sx={{
                          fontWeight: 700,
                          bgcolor: variant === v ? TEAL_PRIMARY : '#F1F5F9',
                          color: variant === v ? '#FFFFFF' : TEXT_MAIN,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Layout */}
                <Box>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: TEXT_MAIN, mb: 0.75 }}>
                    Layout
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {(['row', 'column', 'grid'] as LayoutType[]).map((l) => (
                      <Chip
                        key={l}
                        label={l}
                        clickable
                        onClick={() => setLayout(l)}
                        sx={{
                          fontWeight: 700,
                          bgcolor: layout === l ? TEAL_PRIMARY : '#F1F5F9',
                          color: layout === l ? '#FFFFFF' : TEXT_MAIN,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Size */}
                <Box>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: TEXT_MAIN, mb: 0.75 }}>
                    Size
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {(['small', 'medium', 'large'] as RadioSize[]).map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        clickable
                        onClick={() => setSize(s)}
                        sx={{
                          fontWeight: 700,
                          bgcolor: size === s ? TEAL_PRIMARY : '#F1F5F9',
                          color: size === s ? '#FFFFFF' : TEXT_MAIN,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Radio Indicator Placement */}
                <Box>
                  <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: TEXT_MAIN, mb: 0.75 }}>
                    Radio Indicator Placement
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {(['left', 'right', 'none'] as RadioPlacement[]).map((p) => (
                      <Chip
                        key={p}
                        label={p}
                        clickable
                        onClick={() => setRadioPlacement(p)}
                        sx={{
                          fontWeight: 700,
                          bgcolor: radioPlacement === p ? TEAL_PRIMARY : '#F1F5F9',
                          color: radioPlacement === p ? '#FFFFFF' : TEXT_MAIN,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Border Radius */}
                <TextField
                  size="small"
                  label="Border Radius"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  placeholder="12px or 9999px"
                  fullWidth
                />

                {/* Toggles */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={hasError}
                        onChange={(e) => setHasError(e.target.checked)}
                        color="error"
                      />
                    }
                    label="Error State"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isDisabled}
                        onChange={(e) => setIsDisabled(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Disabled State"
                  />
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Live Preview Panel */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 1 }}>
                Live Component Preview
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: TEXT_MUTED, mb: 3 }}>
                Interactively updates as you toggle the prop controls on the left.
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  bgcolor: '#FFFFFF',
                  borderRadius: 2,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <RadioGroup
                    label="Pilih Opsi Layanan"
                    variant={variant}
                    layout={layout}
                    size={size}
                    radioPlacement={radioPlacement}
                    borderRadius={borderRadius}
                    error={hasError}
                    disabled={isDisabled}
                    helperText={
                      hasError
                        ? 'Harap pilih salah satu opsi di atas.'
                        : 'Pilihan dapat diubah sewaktu-waktu pada menu pengaturan.'
                    }
                    options={[
                      { label: 'Sekali Transaksi', value: 'once', description: 'Eksekusi satu kali segera' },
                      { label: 'Rutin Terjadwal', value: 'routine', description: 'Otomatis berulang setiap periode' },
                    ]}
                    value={selectedValue}
                    onValueChange={(val) => setSelectedValue(String(val))}
                  />
                </Box>
              </Paper>
            </Card>
          </Grid>
        </Grid>

        {/* ── 3. Rich Business Banking Cards ────────────────────────────── */}
        <Card sx={{ mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, color: TEXT_MAIN, fontSize: '1.05rem' }}>
              Rich Business Banking Cards (Multi-Line with Badges & Prices)
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: TEXT_MUTED }}>
              Demonstrating leading icons, descriptive subtitles, status chips, and right-aligned fee info.
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <RadioGroup
            label="Metode Pengiriman Dana"
            variant="card"
            layout="column"
            size="medium"
            options={TRANSFER_METHOD_OPTIONS}
            value={transferMethod}
            onValueChange={(val) => setTransferMethod(String(val))}
          />
        </Card>

        {/* ── 4. Responsive 2-Column Card Grid ──────────────────────────── */}
        <Card>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, color: TEXT_MAIN, fontSize: '1.05rem' }}>
              2-Column Responsive Card Grid (Payroll Execution Mode)
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: TEXT_MUTED }}>
              {"Arranges options in equal responsive grid tiles (gridColumns={{ xs: 1, sm: 2 }})."}
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <RadioGroup
            label="Jadwal & Skema Pencairan Gaji"
            variant="card"
            layout="grid"
            gridColumns={{ xs: 1, sm: 2 }}
            options={PAYROLL_SCHEDULE_OPTIONS}
            value={payrollSchedule}
            onValueChange={(val) => setPayrollSchedule(String(val))}
          />
        </Card>
      </Box>
    </PageLayout>
  )
}
