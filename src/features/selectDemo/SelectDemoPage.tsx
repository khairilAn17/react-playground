import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Stack,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  Paper,
  Button,
  Tabs,
  Tab,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import TuneIcon from '@mui/icons-material/Tune'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import { Select, type SelectOption, type SelectChangeEvent } from '../../components/select'
import { createTypedForm } from '../../components/form'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ── Mock Datasets ────────────────────────────────────────────────────────────

// 1. Transfer Methods with Bullets, Left/Right Titles, and Compact Selected
const TRANSFER_METHOD_OPTIONS: SelectOption[] = [
  {
    value: 'bifast',
    label: 'BI-FAST (Rekomendasi)',
    leftTitle: 'BI-FAST',
    leftSubtitle: 'Real-time 24/7 ke seluruh bank domestik',
    rightTitle: 'Rp 2.500',
    rightSubtitle: 'Maks. Rp 250 Jt/trx',
    avatar: <FlashOnIcon sx={{ color: '#00A39D' }} />,
    bullets: [
      'Proses instan & langsung sampai dalam hitungan detik',
      'Tersedia 24 jam non-stop termasuk hari libur',
      'Dukungan nomor rekening, Proxy Email, atau No. HP',
    ],
  },
  {
    value: 'online',
    label: 'Realtime Online',
    leftTitle: 'Realtime Online',
    leftSubtitle: 'Jaringan ATM Bersama / Prima',
    rightTitle: 'Rp 6.500',
    rightSubtitle: 'Maks. Rp 100 Jt/trx',
    avatar: <SwapHorizIcon sx={{ color: '#0284C7' }} />,
    bullets: [
      'Kompatibel dengan semua bank anggota switching',
      'Limit per transaksi hingga Rp 100.000.000',
      'Biaya standar transaksi antar bank',
    ],
  },
  {
    value: 'llg',
    label: 'Kliring (SKNBI / LLG)',
    leftTitle: 'SKNBI / LLG',
    leftSubtitle: 'Sistem Kliring Nasional Bank Indonesia',
    rightTitle: 'Rp 2.900',
    rightSubtitle: 'Maks. Rp 1 Milyar',
    avatar: <AccountBalanceIcon sx={{ color: '#EAA827' }} />,
    bullets: [
      'Sesuai untuk transfer batch dalam jumlah besar',
      'Diproses pada jam kerja kliring Bank Indonesia',
      'Waktu penerimaan berkala (batch cut-off)',
    ],
  },
  {
    value: 'rtgs',
    label: 'RTGS (Real Time Gross Settlement)',
    leftTitle: 'RTGS',
    leftSubtitle: 'Transfer dana bernilai besar prioritas tinggi',
    rightTitle: 'Rp 30.000',
    rightSubtitle: 'Min. Rp 100 Jt',
    avatar: <ShieldOutlinedIcon sx={{ color: '#7B5EA7' }} />,
    bullets: [
      'Khusus transaksi dengan nominal di atas Rp 100 Juta',
      'Prioritas pemrosesan langsung oleh Bank Indonesia',
      'Diproses pada hari kerja perbankan (08:00 - 15:00)',
    ],
  },
]

// 1.5. Nominal Currency Options (Prefix Block "Rp")
const NOMINAL_OPTIONS: SelectOption[] = [
  { value: '10.000', label: '10.000', leftSubtitle: 'Sepuluh Ribu Rupiah' },
  { value: '25.000', label: '25.000', leftSubtitle: 'Dua Puluh Lima Ribu Rupiah' },
  { value: '50.000', label: '50.000', leftSubtitle: 'Lima Puluh Ribu Rupiah' },
  { value: '100.000', label: '100.000', leftSubtitle: 'Seratus Ribu Rupiah' },
  { value: '250.000', label: '250.000', leftSubtitle: 'Dua Ratus Lima Puluh Ribu Rupiah' },
  { value: '500.000', label: '500.000', leftSubtitle: 'Lima Ratus Ribu Rupiah' },
  { value: '1.000.000', label: '1.000.000', leftSubtitle: 'Satu Juta Rupiah' },
]

// 2. Grouped Corporate & Source Accounts
const GROUPED_BANK_OPTIONS: SelectOption[] = [
  // Group 1: Rekening Utama
  {
    group: 'Rekening Utama (Operational)',
    value: 'acc-72001',
    label: 'PT Digital Solusindo — Giro IDR',
    leftTitle: 'Giro Bisnis Utama IDR',
    leftSubtitle: '8830-0019-2810 • Rekening Operasional',
    rightTitle: 'Rp 1.450.000.000',
    rightSubtitle: 'Saldo Efektif',
    avatar: 'ID',
    avatarBg: '#00A39D',
  },
  {
    group: 'Rekening Utama (Operational)',
    value: 'acc-72002',
    label: 'PT Digital Solusindo — Giro Payroll',
    leftTitle: 'Giro Khusus Payroll IDR',
    leftSubtitle: '8830-0019-9944 • Gaji Karyawan',
    rightTitle: 'Rp 480.000.000',
    rightSubtitle: 'Saldo Efektif',
    avatar: 'PY',
    avatarBg: '#0284C7',
  },
  // Group 2: Rekening Valas & Tabungan
  {
    group: 'Rekening Valas & Simpanan',
    value: 'acc-72003',
    label: 'PT Digital Solusindo — Giro USD',
    leftTitle: 'Giro Valas USD',
    leftSubtitle: '8830-0028-1100 • Valuta Asing',
    rightTitle: '$ 85,250.00',
    rightSubtitle: 'Kurs @ Rp 16.200',
    avatar: 'US',
    avatarBg: '#EAA827',
  },
  {
    group: 'Rekening Valas & Simpanan',
    value: 'acc-72004',
    label: 'PT Digital Solusindo — Deposito Berjangka',
    leftTitle: 'Deposito Flexi 3 Bulan',
    leftSubtitle: '9920-0001-4412 • Jatuh Tempo 28 Ags',
    rightTitle: 'Rp 2.000.000.000',
    rightSubtitle: 'Bunga 4.25% p.a.',
    avatar: 'DP',
    avatarBg: '#7B5EA7',
  },
]

// 3. Simple Country / Currency Dataset
const COUNTRY_OPTIONS: SelectOption[] = [
  { value: 'IDR', label: 'IDR — Indonesian Rupiah', leftTitle: 'IDR', leftSubtitle: 'Indonesian Rupiah (Rp)', avatar: '🇮🇩' },
  { value: 'USD', label: 'USD — US Dollar', leftTitle: 'USD', leftSubtitle: 'United States Dollar ($)', avatar: '🇺🇸' },
  { value: 'SGD', label: 'SGD — Singapore Dollar', leftTitle: 'SGD', leftSubtitle: 'Singapore Dollar (S$)', avatar: '🇸🇬' },
  { value: 'EUR', label: 'EUR — Euro', leftTitle: 'EUR', leftSubtitle: 'European Union (€)', avatar: '🇪🇺' },
  { value: 'MYR', label: 'MYR — Malaysian Ringgit', leftTitle: 'MYR', leftSubtitle: 'Malaysian Ringgit (RM)', avatar: '🇲🇾' },
  { value: 'JPY', label: 'JPY — Japanese Yen', leftTitle: 'JPY', leftSubtitle: 'Japanese Yen (¥)', avatar: '🇯🇵' },
]

// ── Typed Form Schema for RHF Demo ───────────────────────────────────────────
const selectFormSchema = z.object({
  transferMethod: z.string().min(1, 'Metode transfer wajib dipilih'),
  sourceAccount: z.string().min(1, 'Rekening sumber dana wajib dipilih'),
})
type SelectFormValues = z.infer<typeof selectFormSchema>
const { Form, Field } = createTypedForm<SelectFormValues>()

export function SelectDemoPage() {
  // ── Interactive Sandbox State ──────────────────────────────────────────────
  const [datasetKey, setDatasetKey] = useState<'transfer' | 'bank' | 'currency' | 'nominal'>('transfer')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [searchable, setSearchable] = useState(true)
  const [showCheckmark, setShowCheckmark] = useState(true)
  const [prefixBlockVal, setPrefixBlockVal] = useState<'none' | 'Rp' | '$' | 'IDR'>('none')
  const [suffixBlockVal, setSuffixBlockVal] = useState<'none' | 'IDR' | '.com' | '/bln'>('none')
  const [borderRadius, setBorderRadius] = useState<number>(12)
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeTab, setActiveTab] = useState<'values' | 'json' | 'code'>('values')

  // ── Selected Value in Sandbox ──────────────────────────────────────────────
  const [sandboxValue, setSandboxValue] = useState<string | number>('bifast')

  // ── Infinite Scroll Simulation State ──────────────────────────────────────
  const [infiniteOptions, setInfiniteOptions] = useState<SelectOption[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      value: `item-${i + 1}`,
      label: `Mitra Merchant #${i + 1}`,
      leftTitle: `Mitra Merchant #${i + 1}`,
      leftSubtitle: `ID: 882000${100 + i} • Verified Merchant`,
      rightTitle: `Rp ${(i + 1) * 15}.000.000`,
      avatar: 'MC',
      avatarBg: TEAL_PRIMARY,
    }))
  )
  const [infiniteValue, setInfiniteValue] = useState<string | number>('item-1')
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    setTimeout(() => {
      setInfiniteOptions((prev) => {
        const nextStart = prev.length + 1
        const newItems: SelectOption[] = Array.from({ length: 6 }, (_, i) => ({
          value: `item-${nextStart + i}`,
          label: `Mitra Merchant #${nextStart + i}`,
          leftTitle: `Mitra Merchant #${nextStart + i}`,
          leftSubtitle: `ID: 882000${100 + nextStart + i} • Auto-loaded`,
          rightTitle: `Rp ${(nextStart + i) * 12}.500.000`,
          avatar: 'MC',
          avatarBg: '#0284C7',
        }))
        if (prev.length + newItems.length >= 26) {
          setHasMore(false)
        }
        return [...prev, ...newItems]
      })
      setLoadingMore(false)
    }, 1000)
  }

  // ── Current Dataset Resolver ───────────────────────────────────────────────
  const currentOptions = useMemo(() => {
    switch (datasetKey) {
      case 'bank':
        return GROUPED_BANK_OPTIONS
      case 'currency':
        return COUNTRY_OPTIONS
      case 'nominal':
        return NOMINAL_OPTIONS
      default:
        return TRANSFER_METHOD_OPTIONS
    }
  }, [datasetKey])

  const selectedOptionObj = useMemo(() => {
    return currentOptions.find((opt) => opt.value === sandboxValue) || null
  }, [currentOptions, sandboxValue])

  // ── Generated JSX Code Snippet ─────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<Select']
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (borderRadius !== 12) lines.push(`  borderRadius={${borderRadius}}`)
    if (prefixBlockVal !== 'none') lines.push(`  prefixBlock="${prefixBlockVal}"`)
    if (suffixBlockVal !== 'none') lines.push(`  suffixBlock="${suffixBlockVal}"`)
    if (searchable) lines.push('  searchable')
    if (!showCheckmark) lines.push('  showCheckmark={false}')
    if (isError) lines.push('  error')
    if (isDisabled) lines.push('  disabled')
    lines.push('  options={OPTIONS}')
    lines.push(`  value={selectedValue}`)
    lines.push('  onChange={(e) => setSelectedValue(e.target.value)}')
    lines.push('/>')
    return lines.join('\n')
  }, [size, borderRadius, prefixBlockVal, suffixBlockVal, searchable, showCheckmark, isError, isDisabled])

  // ── RHF Form State ────────────────────────────────────────────────────────
  const [formSubmitted, setFormSubmitted] = useState<SelectFormValues | null>(null)

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="Select Component"
      subtitle="Universal Layer 1 Single-Select & Combobox Primitive"
      subtitleDescription="Type-safe, accessible select component supporting search filtering, multi-line bullet descriptions, group headers, infinite scroll, and granular slotSx theming."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'Select Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Configurator Sandbox ── */}
          <Card
            title="Interactive Prop Configurator"
            subtitle="Customize props, switch datasets, and inspect live selected values in real-time"
          >
            <Grid container spacing={3}>
              {/* Controls Column */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Stack spacing={2.5}>
                    {/* Dataset Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Dataset Source
                      </FormLabel>
                      <RadioGroup
                        row
                        value={datasetKey}
                        onChange={(e) => {
                          const key = e.target.value as 'transfer' | 'bank' | 'currency'
                          setDatasetKey(key)
                          const opts =
                            key === 'bank'
                              ? GROUPED_BANK_OPTIONS
                              : key === 'currency'
                                ? COUNTRY_OPTIONS
                                : TRANSFER_METHOD_OPTIONS
                          setSandboxValue(opts[0].value)
                        }}
                      >
                        <FormControlLabel value="transfer" control={<Radio size="small" />} label="Transfer (Bullets)" />
                        <FormControlLabel value="bank" control={<Radio size="small" />} label="Bank (Grouped)" />
                        <FormControlLabel value="currency" control={<Radio size="small" />} label="Currency" />
                        <FormControlLabel value="nominal" control={<Radio size="small" />} label="Nominal (Rp)" />
                      </RadioGroup>
                    </FormControl>

                    {/* Size Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Size (`size`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={size}
                        onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
                      >
                        <FormControlLabel value="small" control={<Radio size="small" />} label="Small (40px)" />
                        <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium (48px)" />
                        <FormControlLabel value="large" control={<Radio size="small" />} label="Large (56px)" />
                      </RadioGroup>
                    </FormControl>

                    {/* Prefix Block Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Prefix Block (`prefixBlock`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={prefixBlockVal}
                        onChange={(e) => setPrefixBlockVal(e.target.value as 'none' | 'Rp' | '$' | 'IDR')}
                      >
                        <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                        <FormControlLabel value="Rp" control={<Radio size="small" />} label="Rp (Shaded)" />
                        <FormControlLabel value="$" control={<Radio size="small" />} label="$" />
                        <FormControlLabel value="IDR" control={<Radio size="small" />} label="IDR" />
                      </RadioGroup>
                    </FormControl>

                    {/* Suffix Block Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Suffix Block (`suffixBlock`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={suffixBlockVal}
                        onChange={(e) => setSuffixBlockVal(e.target.value as 'none' | 'IDR' | '.com' | '/bln')}
                      >
                        <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                        <FormControlLabel value="IDR" control={<Radio size="small" />} label="IDR" />
                        <FormControlLabel value=".com" control={<Radio size="small" />} label=".com" />
                        <FormControlLabel value="/bln" control={<Radio size="small" />} label="/ bln" />
                      </RadioGroup>
                    </FormControl>

                    {/* Searchable Toggle */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          Searchable (`searchable`)
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                          Search filter input inside dropdown header
                        </Typography>
                      </Box>
                      <Switch
                        checked={searchable}
                        onChange={(e) => setSearchable(e.target.checked)}
                        color="primary"
                      />
                    </Box>

                    {/* Show Checkmark Toggle */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          Checkmark (`showCheckmark`)
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                          Display checkmark icon on selected item
                        </Typography>
                      </Box>
                      <Switch
                        checked={showCheckmark}
                        onChange={(e) => setShowCheckmark(e.target.checked)}
                        color="primary"
                      />
                    </Box>

                    {/* Border Radius Slider */}
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          Border Radius (`{borderRadius}px`)
                        </Typography>
                      </Box>
                      <Slider
                        value={borderRadius}
                        onChange={(_, v) => setBorderRadius(v as number)}
                        min={4}
                        max={24}
                        step={2}
                        valueLabelDisplay="auto"
                        sx={{ color: TEAL_PRIMARY }}
                      />
                    </Box>

                    {/* States (Error & Disabled) */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FormControlLabel
                        control={<Switch checked={isError} onChange={(e) => setIsError(e.target.checked)} />}
                        label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Error</Typography>}
                      />
                      <FormControlLabel
                        control={<Switch checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} />}
                        label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Disabled</Typography>}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Preview Column */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <TuneIcon sx={{ color: TEAL_PRIMARY, fontSize: 20 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                        Live Interactive Preview
                      </Typography>
                    </Box>

                    <Select
                      size={size}
                      label="Pilihan Opsi Terkonfigurasi"
                      placeholder="Pilih salah satu opsi..."
                      options={currentOptions}
                      value={sandboxValue}
                      onChange={(e: SelectChangeEvent) => setSandboxValue(e.target.value)}
                      prefixBlock={prefixBlockVal === 'none' ? undefined : prefixBlockVal}
                      suffixBlock={suffixBlockVal === 'none' ? undefined : suffixBlockVal}
                      searchable={searchable}
                      searchPlaceholder="Cari opsi atau ketik kata kunci..."
                      showCheckmark={showCheckmark}
                      borderRadius={borderRadius}
                      error={isError}
                      disabled={isDisabled}
                      helperText={
                        isError
                          ? 'Terjadi kesalahan validasi pada pilihan ini'
                          : selectedOptionObj
                            ? `✓ Terpilih: ${selectedOptionObj.leftTitle || selectedOptionObj.label}`
                            : 'Klik untuk membuka dropdown'
                      }
                    />
                  </Box>

                  {/* ── Tabs for Value Inspection & Code Generator ── */}
                  <Box sx={{ mt: 3 }}>
                    <Tabs
                      value={activeTab}
                      onChange={(_, tab) => setActiveTab(tab)}
                      sx={{
                        minHeight: 36,
                        mb: 1.5,
                        '& .MuiTab-root': {
                          minHeight: 36,
                          py: 0.5,
                          px: 1.5,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'none',
                        },
                      }}
                    >
                      <Tab icon={<CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="values" label="Active Value Summary" />
                      <Tab icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="json" label="Raw State JSON" />
                      <Tab icon={<CodeOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="code" label="Generated JSX Code" />
                    </Tabs>

                    {/* Tab 1: Formatted Custom Values Breakdown */}
                    {activeTab === 'values' && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          maxHeight: 180,
                          overflowY: 'auto',
                        }}
                      >
                        {selectedOptionObj ? (
                          <Stack spacing={1}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 1.5,
                                bgcolor: '#FFFFFF',
                                borderRadius: '6px',
                                border: '1px solid #E2E8F0',
                              }}
                            >
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                                  {String(selectedOptionObj.leftTitle || selectedOptionObj.label)}
                                </Typography>
                                {selectedOptionObj.leftSubtitle && (
                                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block' }}>
                                    {String(selectedOptionObj.leftSubtitle)}
                                  </Typography>
                                )}
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                {selectedOptionObj.rightTitle && (
                                  <Typography variant="body2" sx={{ fontWeight: 700, color: TEAL_PRIMARY }}>
                                    {String(selectedOptionObj.rightTitle)}
                                  </Typography>
                                )}
                                <Chip
                                  label={`value: "${selectedOptionObj.value}"`}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.6875rem',
                                    fontFamily: 'monospace',
                                    bgcolor: 'rgba(0, 163, 157, 0.08)',
                                    color: TEAL_PRIMARY,
                                    fontWeight: 700,
                                    mt: 0.5,
                                  }}
                                />
                              </Box>
                            </Box>
                            {selectedOptionObj.bullets && (
                              <Box sx={{ pl: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MUTED }}>
                                  Fitur & Ketentuan ({selectedOptionObj.bullets.length} poin):
                                </Typography>
                                {selectedOptionObj.bullets.map((b, i) => (
                                  <Typography key={i} variant="caption" sx={{ display: 'block', color: TEXT_MAIN }}>
                                    • {String(b)}
                                  </Typography>
                                ))}
                              </Box>
                            )}
                          </Stack>
                        ) : (
                          <Typography variant="caption" sx={{ color: TEXT_MUTED, fontStyle: 'italic' }}>
                            Belum ada opsi terpilih (null / undefined)
                          </Typography>
                        )}
                      </Paper>
                    )}

                    {/* Tab 2: Raw JSON Inspection */}
                    {activeTab === 'json' && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          bgcolor: '#0F172A',
                          color: '#38BDF8',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          maxHeight: 180,
                        }}
                      >
                        {JSON.stringify({ value: sandboxValue, selectedOption: selectedOptionObj }, null, 2)}
                      </Paper>
                    )}

                    {/* Tab 3: Generated JSX Code */}
                    {activeTab === 'code' && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          bgcolor: '#0F172A',
                          color: '#4ADE80',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          overflowX: 'auto',
                          maxHeight: 180,
                          whiteSpace: 'pre',
                        }}
                      >
                        {generatedCode}
                      </Paper>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 2: Real-World Use Cases & Presets ── */}
          <Grid container spacing={3}>
            {/* Real-World Use Case 1: Transfer Methods with Bullets */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Transfer Method Selector (Rich Bullets)"
                subtitle="Header and multi-point description list for banking transfer schemes"
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      1. Compact Selected Trigger (`compactSelected: true`)
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                      Trigger only displays the header title & fee; the dropdown reveals the full 3-point feature checklist.
                    </Typography>
                    <Select
                      label="Metode Transfer Dana"
                      placeholder="Pilih metode transfer..."
                      options={TRANSFER_METHOD_OPTIONS}
                      defaultValue="bifast"
                      searchable
                      borderRadius={12}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      2. Realtime Online Switching
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                      Preset selection with instant switching network icons and limits.
                    </Typography>
                    <Select
                      placeholder="Pilih metode transfer..."
                      options={TRANSFER_METHOD_OPTIONS}
                      defaultValue="online"
                      borderRadius={12}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Real-World Use Case 2: Grouped Corporate Bank Accounts */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Grouped Corporate Account Picker"
                subtitle="Options organized by category headers with formatted balances and avatars"
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      1. Grouped by Operational vs Valas / Deposit
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                      Uses `option.group` to render distinct subheadings with avatar initial badges.
                    </Typography>
                    <Select
                      label="Rekening Sumber Dana"
                      placeholder="Pilih rekening operasional..."
                      options={GROUPED_BANK_OPTIONS}
                      defaultValue="acc-72001"
                      searchable
                      searchPlaceholder="Cari nama rekening atau nomor..."
                      borderRadius={12}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      2. Valas / USD Account Selection
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                      Displays currency exchange rates and effective foreign exchange balances.
                    </Typography>
                    <Select
                      placeholder="Pilih rekening valas..."
                      options={GROUPED_BANK_OPTIONS}
                      defaultValue="acc-72003"
                      borderRadius={12}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Real-World Use Case 3: Nominal Currency with Prefix Block (Rp) */}
            <Grid size={{ xs: 12 }}>
              <Card
                title="Nominal Donasi & Currency Selector (Prefix Block 'Rp')"
                subtitle="Full-height shaded prefix addon block with preset nominal options and custom right suffix"
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                        1. Nominal Currency with Prefix Block (`prefixBlock=&quot;Rp&quot;`)
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                        Displays a solid shaded left block with &quot;Rp&quot; and nominal currency options (e.g. 50.000).
                      </Typography>
                      <Select
                        prefixBlock="Rp"
                        placeholder="50.000"
                        options={NOMINAL_OPTIONS}
                        defaultValue="50.000"
                        borderRadius={12}
                        helperText="Pilih nominal donasi dari daftar preset"
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                        2. Suffix Domain / Currency Block (`suffixBlock=&quot;IDR&quot;`)
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                        Right-side shaded block attached flush to the dropdown border.
                      </Typography>
                      <Select
                        suffixBlock="IDR"
                        placeholder="1.000.000"
                        options={NOMINAL_OPTIONS}
                        defaultValue="1.000.000"
                        borderRadius={12}
                        helperText="Suffix block attaches flush against the right edge"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* ── SECTION 3: Custom Tokens, Corner Radii & Infinite Scroll Matrix ── */}
          <Card
            title="Custom Sizing, Corner Radii & Infinite Scroll Matrix"
            subtitle="Explore how borderRadius, size, searchable mode, and onLoadMore customize Select behavior"
          >
            <Grid container spacing={3}>
              {/* Row 1: Corner Radii */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    1. Custom Corner Radii (`borderRadius`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Accepts numbers (`4`, `12`, `20`) or CSS strings (`&quot;999px&quot;`). Applies to both trigger & dropdown popover.
                  </Typography>

                  <Stack spacing={2.5}>
                    <Select
                      placeholder="Sharp / Enterprise (borderRadius={4})"
                      options={COUNTRY_OPTIONS}
                      borderRadius={4}
                      size="small"
                      defaultValue="IDR"
                    />

                    <Select
                      placeholder="BYOND Standard (borderRadius={12})"
                      options={COUNTRY_OPTIONS}
                      borderRadius={12}
                      size="small"
                      defaultValue="USD"
                    />

                    <Select
                      placeholder="Soft Curved (borderRadius={20})"
                      options={COUNTRY_OPTIONS}
                      borderRadius={20}
                      size="small"
                      defaultValue="SGD"
                    />

                    <Select
                      placeholder="Full Organic Pill (borderRadius=&quot;999px&quot;)"
                      options={COUNTRY_OPTIONS}
                      borderRadius="999px"
                      size="small"
                      defaultValue="EUR"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* Row 2: Infinite Scroll Simulation */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    2. Infinite Scroll & Pagination (`onLoadMore`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Scroll to the bottom of the dropdown menu to trigger asynchronous page loads with bottom loader.
                  </Typography>

                  <Stack spacing={2.5}>
                    <Select
                      label={`Mitra Merchant (${infiniteOptions.length} dimuat${hasMore ? ' • Scroll untuk muat lagi' : ' • Semua dimuat'})`}
                      placeholder="Pilih mitra merchant..."
                      options={infiniteOptions}
                      value={infiniteValue}
                      onChange={(e) => setInfiniteValue(e.target.value)}
                      searchable
                      searchPlaceholder="Cari merchant..."
                      hasMore={hasMore}
                      loadingMore={loadingMore}
                      loadingMoreText="Memuat mitra berikutnya dari server..."
                      onLoadMore={handleLoadMore}
                      borderRadius={12}
                      size="small"
                      helperText="Buka dropdown dan scroll ke bawah untuk memuat data tambahan otomatis"
                    />

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                          Status Pagination: {hasMore ? '🟢 Ada Data Tambahan' : '🔴 Seluruh Data Dimuat'}
                        </Typography>
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => {
                            setInfiniteOptions((prev) => prev.slice(0, 8))
                            setHasMore(true)
                          }}
                          sx={{ fontSize: '0.75rem', p: 0, textTransform: 'none', color: TEAL_PRIMARY }}
                        >
                          Reset Data
                        </Button>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 4: Granular slotSx Sub-Slots Showcase ── */}
          <Card
            title="Granular slotSx Sub-Slots"
            subtitle="Style individual sub-elements independently — titles, subtitles, checkmarks, bullets, and search inputs"
          >
            <Grid container spacing={3}>
              {/* 4a: Option Row Sub-Slots */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    1. Option Row Sub-Slots (`slotSx.optionRow.*`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                    Target leftTitle, leftSubtitle, rightTitle, checkmark, and bullets.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {['leftTitle', 'leftSubtitle', 'rightTitle', 'rightSubtitle', 'checkmark', 'bulletList'].map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 18, bgcolor: 'rgba(0,163,157,0.08)', color: TEAL_PRIMARY }} />
                    ))}
                  </Box>

                  <Stack spacing={2.5}>
                    <Select
                      label="Custom Font & Checkmark Colors"
                      placeholder="Open dropdown to inspect..."
                      options={TRANSFER_METHOD_OPTIONS}
                      defaultValue="bifast"
                      borderRadius={12}
                      size="small"
                      slotSx={{
                        optionRow: {
                          leftTitle: { fontWeight: 800, fontSize: '0.9rem', color: TEXT_MAIN },
                          leftSubtitle: { color: '#0284C7', fontStyle: 'italic' },
                          rightTitle: { color: '#B45309', fontWeight: 800 },
                          checkmark: { color: '#EAA827' },
                        },
                      }}
                      helperText="leftTitle: bold 800 · leftSubtitle: italic blue · rightTitle: amber"
                    />

                    <Select
                      label="Monospace Balance & Subtitle"
                      placeholder="Open dropdown to inspect..."
                      options={GROUPED_BANK_OPTIONS}
                      defaultValue="acc-72001"
                      borderRadius={12}
                      size="small"
                      slotSx={{
                        optionRow: {
                          leftSubtitle: { fontFamily: 'monospace', fontSize: '0.75rem' },
                          rightTitle: { fontFamily: 'monospace', fontWeight: 700, color: TEAL_PRIMARY },
                        },
                      }}
                      helperText="Monospace formatting for account numbers and financial balances"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* 4b: Popover Paper & Search Sub-Slots */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    2. Popover & Search Sub-Slots (`slotSx.menuPaper`, `slotSx.searchField`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                    Customize popover shadows, borders, search field focus rings, and group headers.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {['select', 'menuPaper', 'menuItem', 'groupHeader', 'searchField', 'listSubheader'].map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 18, bgcolor: 'rgba(234,168,39,0.1)', color: '#B45309' }} />
                    ))}
                  </Box>

                  <Stack spacing={2.5}>
                    <Select
                      label="Elevated Teal Popover Shadow"
                      placeholder="Open dropdown to see popover shadow..."
                      options={GROUPED_BANK_OPTIONS}
                      defaultValue="acc-72001"
                      searchable
                      borderRadius={12}
                      size="small"
                      slotSx={{
                        menuPaper: {
                          boxShadow: '0 20px 48px rgba(0, 163, 157, 0.22)',
                          borderColor: TEAL_PRIMARY,
                          borderWidth: '1.5px',
                        },
                        groupHeader: {
                          color: TEAL_PRIMARY,
                          fontWeight: 800,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        },
                      }}
                      helperText="menuPaper: elevated teal shadow · groupHeader: uppercase bold"
                    />

                    <Select
                      label="Rounded Menu Items with Accent Hover"
                      placeholder="Open dropdown..."
                      options={COUNTRY_OPTIONS}
                      defaultValue="IDR"
                      borderRadius={12}
                      size="small"
                      slotSx={{
                        menuItem: {
                          borderRadius: '8px',
                          mx: 0.5,
                          '&.Mui-selected': {
                            bgcolor: 'rgba(234, 168, 39, 0.12)',
                            '&:hover': { bgcolor: 'rgba(234, 168, 39, 0.18)' },
                          },
                        },
                      }}
                      helperText="menuItem: rounded 8px with amber selection background"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* 4c: Placeholder & Trigger Sub-Slots */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    3. Placeholder & Trigger Styling (`placeholderSx`, `slotSx.placeholder`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                    Pass custom styling to placeholder typography directly via <code>placeholderSx</code> or granularly via <code>slotSx.placeholder</code>.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {['placeholderSx', 'slotSx.placeholder', 'slotSx.select'].map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 18, bgcolor: 'rgba(14,165,233,0.1)', color: '#0284C7' }} />
                    ))}
                  </Box>

                  <Grid container spacing={2.5}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Select
                        label="Direct placeholderSx (Italic Slate)"
                        placeholder="Pilih rekening tujuan transfer..."
                        options={GROUPED_BANK_OPTIONS}
                        value=""
                        borderRadius={12}
                        size="small"
                        placeholderSx={{
                          fontStyle: 'italic',
                          color: '#0284C7',
                          fontWeight: 500,
                        }}
                        helperText="placeholderSx: italic ocean blue with 500 weight"
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Select
                        label="slotSx.placeholder (Warm Amber)"
                        placeholder="Pilih metode transfer pembayaran..."
                        options={TRANSFER_METHOD_OPTIONS}
                        value=""
                        borderRadius={12}
                        size="small"
                        slotSx={{
                          placeholder: {
                            color: '#D97706',
                            fontWeight: 600,
                            letterSpacing: '0.01em',
                          },
                        }}
                        helperText="slotSx.placeholder: amber color & 600 weight"
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Select
                        label="Muted Teal Styled Placeholder"
                        placeholder="Cari atau pilih mata uang..."
                        options={COUNTRY_OPTIONS}
                        value=""
                        borderRadius={12}
                        size="small"
                        placeholderSx={{
                          color: TEAL_PRIMARY,
                          opacity: 0.8,
                          fontWeight: 600,
                        }}
                        helperText="placeholderSx: themed teal primary with 80% opacity"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 5: React Hook Form (RHF) + Zod Integration ── */}
          <Card
            title="React Hook Form + Zod Integration"
            subtitle="Type-safe form connector using Field.Select via createTypedForm"
          >
            <Form
              schema={selectFormSchema}
              defaultValues={{ transferMethod: '', sourceAccount: '' }}
              onSubmit={(data) => setFormSubmitted(data)}
            >
              <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack spacing={2.5}>
                    <Field.Select
                      name="transferMethod"
                      label="Metode Transfer (RHF Validated)"
                      placeholder="Pilih metode transfer..."
                      options={TRANSFER_METHOD_OPTIONS}
                      searchable
                      helperText="Wajib memilih metode sebelum submit"
                    />

                    <Field.Select
                      name="sourceAccount"
                      label="Rekening Sumber Dana (RHF Validated)"
                      placeholder="Pilih rekening sumber..."
                      options={GROUPED_BANK_OPTIONS}
                      searchable
                      helperText="Wajib memilih rekening sumber dana"
                    />

                    <Box sx={{ display: 'flex', gap: 1.5, pt: 1 }}>
                      <Button type="submit" variant="contained" sx={{ minWidth: 140, bgcolor: TEAL_PRIMARY }}>
                        Submit Transfer
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="inherit"
                        onClick={() => setFormSubmitted(null)}
                      >
                        Reset Result
                      </Button>
                    </Box>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: formSubmitted ? 'rgba(0, 163, 157, 0.06)' : '#F8FAFC',
                      border: `1px dashed ${formSubmitted ? TEAL_PRIMARY : '#CBD5E1'}`,
                      borderRadius: '12px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CheckCircleOutlinedIcon sx={{ color: formSubmitted ? TEAL_PRIMARY : TEXT_MUTED }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                        Form Submission Output
                      </Typography>
                    </Box>

                    {formSubmitted ? (
                      <Box
                        component="pre"
                        sx={{
                          m: 0,
                          fontSize: '0.8125rem',
                          fontFamily: 'monospace',
                          color: TEAL_PRIMARY,
                          fontWeight: 600,
                        }}
                      >
                        {JSON.stringify(formSubmitted, null, 2)}
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                        Pilih metode transfer dan rekening, lalu klik &quot;Submit Transfer&quot; untuk melihat payload form yang tervalidasi.
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Form>
          </Card>

          {/* ── SECTION 6: Primitive API Reference Matrix ── */}
          <Card
            title="Layer 1 Primitive API Reference"
            subtitle="Full breakdown of props supported by the Select component"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'options',
                  type: 'SelectOption[]',
                  def: '[]',
                  desc: 'Array of option items supporting leftTitle, leftSubtitle, rightTitle, rightSubtitle, bullets, avatars, group headers, and disabled states.',
                },
                {
                  prop: 'value',
                  type: 'string | number',
                  def: 'undefined',
                  desc: 'Controlled selected value matching an option.value key.',
                },
                {
                  prop: 'onChange',
                  type: '(event: SelectChangeEvent) => void',
                  def: 'undefined',
                  desc: 'Standard change handler emitting { target: { name, value } } compatible with React Hook Form and standard HTML form patterns.',
                },
                {
                  prop: 'searchable',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Enables real-time filtering search bar embedded in the dropdown header.',
                },
                {
                  prop: 'searchMode',
                  type: "'client' | 'server'",
                  def: "'client'",
                  desc: "When 'client', filters in-memory options array. When 'server', emits onSearchChange for async API queries.",
                },
                {
                  prop: 'onLoadMore',
                  type: '() => void',
                  def: 'undefined',
                  desc: 'Infinite scroll callback triggered when the user scrolls near the bottom of the dropdown list.',
                },
                {
                  prop: 'hasMore',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Indicates whether more paginated items are available to fetch.',
                },
                {
                  prop: 'loadingMore',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays a circular progress spinner and loading text at the bottom of the listbox.',
                },
                {
                  prop: 'showCheckmark',
                  type: 'boolean',
                  def: 'true',
                  desc: 'Controls whether a checkmark icon is displayed beside the active selected option.',
                },
                {
                  prop: 'borderRadius',
                  type: 'number | string',
                  def: "'12px'",
                  desc: 'Controls corner radius for both the select trigger field and the floating popover paper menu.',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Controls component height: small (40px), medium (48px), or large (56px).',
                },
                {
                  prop: 'placeholderSx',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Directly styles the trigger placeholder Typography text (color, fontStyle, fontWeight, opacity).',
                },
                {
                  prop: 'slotSx.placeholder',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the trigger placeholder Typography component via the slotSx prop dictionary.',
                },
                {
                  prop: 'slotSx.select',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the combobox trigger button (padding, outline, border, background).',
                },
                {
                  prop: 'slotSx.menuPaper',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the floating dropdown Popover Paper container (boxShadow, border, maxHeight).',
                },
                {
                  prop: 'slotSx.menuItem',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles each option MenuItem wrapper (padding, hover, selected background).',
                },
                {
                  prop: 'slotSx.groupHeader',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the ListSubheader element separating option groups.',
                },
                {
                  prop: 'slotSx.searchField',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the SearchInput container in the dropdown header.',
                },
                {
                  prop: 'slotSx.optionRow.leftTitle',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the primary left title text in each option row.',
                },
                {
                  prop: 'slotSx.optionRow.leftSubtitle',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the left subtitle caption text in each option row.',
                },
                {
                  prop: 'slotSx.optionRow.rightTitle',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the right header text (e.g. fees, prices, balance values).',
                },
                {
                  prop: 'slotSx.optionRow.bulletList',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the multi-line feature bullet list container inside options.',
                },
              ].map((item) => (
                <Grid key={item.prop} size={{ xs: 12, sm: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: '100%',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      bgcolor: '#FAFAFA',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', color: TEAL_PRIMARY, fontWeight: 700 }}>
                        {item.prop}
                      </Typography>
                      <Chip label={`default: ${item.def}`} size="small" sx={{ fontSize: '0.6875rem', height: 20 }} />
                    </Box>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: TEXT_MUTED, display: 'block', mb: 1 }}>
                      {item.type}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: TEXT_MAIN }}>
                      {item.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      </PageLayout.Content>
    </PageLayout>
  )
}
