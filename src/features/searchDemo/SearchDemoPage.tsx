import { useState, useMemo, useEffect } from 'react'
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
import { debounce } from 'lodash-es'

import TuneIcon from '@mui/icons-material/Tune'
import FilterListIcon from '@mui/icons-material/FilterList'
import SpeedIcon from '@mui/icons-material/Speed'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import { SearchInput, type SearchVariant, type SearchSize } from '../../components/search'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

const MOCK_TRANSACTIONS = [
  { id: 'TXN-8821', title: 'Payroll Batch Agustus 2026', category: 'Payroll', amount: 'Rp 145.200.000', date: '16 Aug 2026' },
  { id: 'TXN-8820', title: 'Pembayaran Vendor PT Mega Surya', category: 'Vendor', amount: 'Rp 32.500.000', date: '15 Aug 2026' },
  { id: 'TXN-8819', title: 'Setoran Pajak PPN Masa Juli', category: 'Tax', amount: 'Rp 18.750.000', date: '14 Aug 2026' },
  { id: 'TXN-8818', title: 'Transfer Antar Rekening Operasional', category: 'Transfer', amount: 'Rp 50.000.000', date: '13 Aug 2026' },
  { id: 'TXN-8817', title: 'Pembelian Perlengkapan Kantor CV Makmur', category: 'Operasional', amount: 'Rp 4.200.000', date: '12 Aug 2026' },
  { id: 'TXN-8816', title: 'Biaya Sewa Cloud Server & Hosting', category: 'IT', amount: 'Rp 8.900.000', date: '10 Aug 2026' },
]

export function SearchDemoPage() {
  // ── Playground Sandbox State ──
  const [variant, setVariant] = useState<SearchVariant>('outlined')
  const [size, setSize] = useState<SearchSize>('medium')
  const [borderRadius, setBorderRadius] = useState<number>(10)
  const [disableFocusRing, setDisableFocusRing] = useState(false)
  const [showShortcut, setShowShortcut] = useState(true)
  const [clearable, setClearable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [sandboxQuery, setSandboxQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'code'>('preview')

  // ── Debounced Search Demo State (lodash-es) ──
  const [inputValue, setInputValue] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [keystrokeCount, setKeystrokeCount] = useState(0)
  const [apiCallCount, setApiCallCount] = useState(0)

  const debouncedSearch = useMemo(
    () =>
      debounce((q: string) => {
        setDebouncedQuery(q)
        setIsSearching(false)
        setApiCallCount((prev) => prev + 1)
      }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleDebouncedInput = (val: string) => {
    setInputValue(val)
    setKeystrokeCount((prev) => prev + 1)
    setIsSearching(true)
    debouncedSearch(val)
  }

  const handleDebouncedClear = () => {
    debouncedSearch.cancel()
    setInputValue('')
    setDebouncedQuery('')
    setIsSearching(false)
  }

  const filteredTransactions = MOCK_TRANSACTIONS.filter(
    (txn) =>
      txn.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      txn.category.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  // ── Generated JSX Code Snippet ─────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<SearchInput']
    if (variant !== 'outlined') lines.push(`  variant="${variant}"`)
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (borderRadius !== 10) lines.push(`  borderRadius={${borderRadius}}`)
    if (showShortcut) lines.push('  shortcut="⌘K"')
    if (!clearable) lines.push('  clearable={false}')
    if (loading) lines.push('  loading')
    if (disableFocusRing) lines.push('  disableFocusRing')
    lines.push('  placeholder="Search transactions, accounts..."')
    lines.push('  value={searchQuery}')
    lines.push('  onValueChange={setSearchQuery}')
    lines.push('/>')
    return lines.join('\n')
  }, [variant, size, borderRadius, showShortcut, clearable, loading, disableFocusRing])

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="SearchInput Component"
      subtitle="Universal Layer 1 Search UI Primitive"
      subtitleDescription="High-performance, unopinionated search input with 4 design variants, shortcut badges, loading spinner, and external debounce integration."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'SearchInput Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Configurator Sandbox ── */}
          <Card
            title="Interactive Prop Configurator"
            subtitle="Customize and preview all SearchInput design variants and states in real-time"
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
                    {/* Variant Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Variant (`variant`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={variant}
                        onChange={(e) => setVariant(e.target.value as SearchVariant)}
                      >
                        <FormControlLabel value="outlined" control={<Radio size="small" />} label="Outlined" />
                        <FormControlLabel value="pill" control={<Radio size="small" />} label="Pill (50px)" />
                        <FormControlLabel value="filled" control={<Radio size="small" />} label="Filled" />
                        <FormControlLabel value="standard" control={<Radio size="small" />} label="Standard" />
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
                        onChange={(e) => setSize(e.target.value as SearchSize)}
                      >
                        <FormControlLabel value="small" control={<Radio size="small" />} label="Small (34px)" />
                        <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium (40px)" />
                        <FormControlLabel value="large" control={<Radio size="small" />} label="Large (48px)" />
                      </RadioGroup>
                    </FormControl>

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
                        min={0}
                        max={50}
                        step={2}
                        valueLabelDisplay="auto"
                        sx={{ color: TEAL_PRIMARY }}
                      />
                    </Box>

                    {/* Feature Toggles */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Keyboard Shortcut (`shortcut=&quot;⌘K&quot;`)
                        </Typography>
                        <Switch checked={showShortcut} onChange={(e) => setShowShortcut(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Clear Button (`clearable`)
                        </Typography>
                        <Switch checked={clearable} onChange={(e) => setClearable(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Active Loading Spinner (`loading`)
                        </Typography>
                        <Switch checked={loading} onChange={(e) => setLoading(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Disable Teal Focus Ring
                        </Typography>
                        <Switch checked={disableFocusRing} onChange={(e) => setDisableFocusRing(e.target.checked)} color="primary" />
                      </Box>
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

                    <SearchInput
                      variant={variant}
                      size={size}
                      borderRadius={borderRadius}
                      disableFocusRing={disableFocusRing}
                      placeholder="Cari transaksi, rekening, atau nomor referensi..."
                      value={sandboxQuery}
                      onValueChange={(val) => setSandboxQuery(val)}
                      shortcut={showShortcut ? '⌘K' : undefined}
                      clearable={clearable}
                      loading={loading}
                      fullWidth
                    />
                  </Box>

                  {/* ── Tabs for Inspection & Code Generator ── */}
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
                      <Tab icon={<CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="preview" label="Active State Summary" />
                      <Tab icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="json" label="Raw State JSON" />
                      <Tab icon={<CodeOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="code" label="Generated JSX Code" />
                    </Tabs>

                    {activeTab === 'preview' && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          fontSize: '0.8125rem',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, display: 'block', mb: 0.5 }}>
                          Current Input Value: {sandboxQuery ? `"${sandboxQuery}"` : '<em>(empty)</em>'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block' }}>
                          • Active Variant: <strong>{variant}</strong> • Size: <strong>{size}</strong> • Radius: <strong>{borderRadius}px</strong>
                        </Typography>
                      </Paper>
                    )}

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
                          maxHeight: 160,
                        }}
                      >
                        {JSON.stringify(
                          { value: sandboxQuery, variant, size, borderRadius, showShortcut, clearable, loading, disableFocusRing },
                          null,
                          2
                        )}
                      </Paper>
                    )}

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
                          maxHeight: 160,
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

          {/* ── SECTION 2: Real-World Presets (Debounce & Table Filter) ── */}
          <Card
            title="External Debounce Integration (lodash-es)"
            subtitle="Immediate keystroke reactivity on typing while debouncing API queries by 500ms"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                      Filter Transaksi Rekening Operasional
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                      Ketik kata kunci untuk memicu simulasi pencarian API server secara debounced.
                    </Typography>

                    <SearchInput
                      variant="outlined"
                      placeholder="Cari ID transaksi, vendor, atau kategori..."
                      value={inputValue}
                      onValueChange={handleDebouncedInput}
                      onClear={handleDebouncedClear}
                      loading={isSearching}
                      clearable
                      fullWidth
                    />
                  </Box>

                  {/* Debounce Telemetry Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <SpeedIcon sx={{ color: TEAL_PRIMARY, fontSize: 18 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                        Debounce Telemetry & Metrics
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1.5 }}>
                      <Chip
                        label={`Keystrokes Instan: ${keystrokeCount}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label={`Panggilan API Debounced: ${apiCallCount}`}
                        size="small"
                        sx={{ bgcolor: TEAL_PRIMARY, color: '#FFFFFF', fontWeight: 700 }}
                      />
                      <Chip
                        label={isSearching ? '⏳ Menunggu user jeda (500ms)...' : '✅ Idle / Settled'}
                        size="small"
                        color={isSearching ? 'warning' : 'success'}
                        variant="outlined"
                      />
                    </Stack>

                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block' }}>
                      Query aktif yang dikirim ke server: <strong>{debouncedQuery ? `"${debouncedQuery}"` : '(kosong)'}</strong>
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>

              {/* Filtered Results Table Preview */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    bgcolor: '#FFFFFF',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: '#F8FAFC',
                      borderBottom: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FilterListIcon sx={{ fontSize: 16, color: TEXT_MUTED }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                        HASIL PENYARINGAN ({filteredTransactions.length})
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="text"
                      onClick={handleDebouncedClear}
                      sx={{ fontSize: '0.75rem', p: 0, minWidth: 'auto', textTransform: 'none', color: TEAL_PRIMARY }}
                    >
                      Reset Filter
                    </Button>
                  </Box>

                  <Box sx={{ p: 1.5, maxHeight: 220, overflowY: 'auto' }}>
                    {filteredTransactions.length > 0 ? (
                      <Stack spacing={1}>
                        {filteredTransactions.map((txn) => (
                          <Box
                            key={txn.id}
                            sx={{
                              p: 1.25,
                              borderRadius: '6px',
                              border: '1px solid #F1F5F9',
                              bgcolor: '#FAFAFA',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                                {txn.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                                {txn.id} • {txn.date}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: TEAL_PRIMARY }}>
                                {txn.amount}
                              </Typography>
                              <Chip label={txn.category} size="small" sx={{ height: 18, fontSize: '0.6875rem' }} />
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: TEXT_MUTED }}>
                          Tidak ada transaksi yang cocok dengan &quot;{debouncedQuery}&quot;
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 3: Sizing & Corner Radii Matrix ── */}
          <Card
            title="Design Variants & Sizing Matrix"
            subtitle="Compare outlined, pill, filled, and standard search variants across all sizes"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 1.5 }}>
                    1. Visual Variants Showcase
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Outlined Variant (Default)
                      </Typography>
                      <SearchInput variant="outlined" placeholder="Outlined search..." clearable shortcut="⌘K" fullWidth />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Pill Variant (50px rounded)
                      </Typography>
                      <SearchInput variant="pill" placeholder="Pill search..." clearable fullWidth />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Filled Variant (#F8FAFC soft background)
                      </Typography>
                      <SearchInput variant="filled" placeholder="Filled search..." clearable fullWidth />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Standard / Flush Variant (Underline only)
                      </Typography>
                      <SearchInput variant="standard" placeholder="Standard search..." fullWidth />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 1.5 }}>
                    2. Size Variants Matrix
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Small Size (34px height)
                      </Typography>
                      <SearchInput size="small" variant="outlined" placeholder="Small search..." fullWidth />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Medium Size (40px height - Default)
                      </Typography>
                      <SearchInput size="medium" variant="outlined" placeholder="Medium search..." fullWidth />
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                        Large Size (48px height)
                      </Typography>
                      <SearchInput size="large" variant="outlined" placeholder="Large search..." fullWidth />
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 4: Granular slotSx Sub-Slots ── */}
          <Card
            title="Granular slotSx Sub-Slots"
            subtitle="Style container, input, startIcon, endIcon, clearButton, and shortcut badge independently"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    Custom Amber Shortcut Badge & Start Icon
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Override `slotSx.shortcut` colors and `slotSx.startIcon` sizing.
                  </Typography>

                  <SearchInput
                    placeholder="Search with amber badge..."
                    shortcut="Ctrl+K"
                    fullWidth
                    slotSx={{
                      startIcon: { color: TEAL_PRIMARY },
                      shortcut: {
                        bgcolor: 'rgba(245, 158, 11, 0.12)',
                        color: '#B45309',
                        borderColor: 'rgba(245, 158, 11, 0.4)',
                        fontWeight: 700,
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    Elevated Teal Popover Dropdown Styling
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Custom container background, focus rings, and input font weights.
                  </Typography>

                  <SearchInput
                    variant="filled"
                    placeholder="Search accounts..."
                    clearable
                    fullWidth
                    slotSx={{
                      container: {
                        bgcolor: 'rgba(0, 163, 157, 0.04)',
                        border: '1.5px solid #00A39D',
                      },
                      input: {
                        fontWeight: 600,
                        color: '#0F172A',
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 5: Primitive API Reference Matrix ── */}
          <Card
            title="Layer 1 Primitive API Reference"
            subtitle="Full breakdown of props supported by the SearchInput component"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'value',
                  type: 'string',
                  def: 'undefined',
                  desc: 'Controlled text value for the search input.',
                },
                {
                  prop: 'onValueChange',
                  type: '(value: string) => void',
                  def: 'undefined',
                  desc: 'Modern value-first change handler emitting the raw text string directly.',
                },
                {
                  prop: 'onClear',
                  type: '() => void',
                  def: 'undefined',
                  desc: 'Callback fired when the user clicks the clear button.',
                },
                {
                  prop: 'variant',
                  type: "'outlined' | 'pill' | 'filled' | 'standard'",
                  def: "'outlined'",
                  desc: 'Visual styling variant of the search container.',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Component height: small (34px), medium (40px), or large (48px).',
                },
                {
                  prop: 'borderRadius',
                  type: 'number | string',
                  def: 'undefined',
                  desc: 'Corner radius override for the search container.',
                },
                {
                  prop: 'clearable',
                  type: 'boolean',
                  def: 'true',
                  desc: 'Displays a quick clear (x) button when input has text.',
                },
                {
                  prop: 'loading',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays an animated circular loading spinner.',
                },
                {
                  prop: 'shortcut',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Displays a keyboard shortcut hint badge (e.g. ⌘K, Ctrl+K).',
                },
                {
                  prop: 'disableFocusRing',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Disables the signature BYOND teal focus shadow ring.',
                },
                {
                  prop: 'slotSx',
                  type: 'SearchInputSlotSx',
                  def: '{}',
                  desc: 'Granular sub-element overrides for container, input, startIcon, endIcon, clearButton, and shortcut.',
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
