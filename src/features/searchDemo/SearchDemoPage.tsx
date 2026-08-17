import { useState, useMemo, useEffect } from 'react'
import {
  Box,
  Typography,
  Stack,
  Chip,
  Grid,
  Card as MuiCard,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Switch,
  Divider,
} from '@mui/material'
import { debounce } from 'lodash-es'

import TuneIcon from '@mui/icons-material/Tune'
import FilterListIcon from '@mui/icons-material/FilterList'
import SpeedIcon from '@mui/icons-material/Speed'
import PaletteIcon from '@mui/icons-material/Palette'

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
  const [disableFocusRing, setDisableFocusRing] = useState(false)
  const [showShortcut, setShowShortcut] = useState(true)
  const [sandboxQuery, setSandboxQuery] = useState('')

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

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="SearchInput Component"
      subtitle="Universal Layer 1 Search UI Primitive"
      subtitleDescription="High-performance, unopinionated search input with 4 design variants, theme tokens, and external debounce integration."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'SearchInput' },
      ]}
      status={<Chip label="Layer 1 Primitive" sx={{ bgcolor: '#E0F2F1', color: TEAL_PRIMARY, fontWeight: 700 }} size="small" />}
    >
      <Stack spacing={3}>
        {/* ── Section 1: External Debounce Showcase ── */}
        <Card
          title="1. Real-Time External Debounce (lodash-es)"
          subtitle="Input keystrokes respond instantaneously. The search query / API trigger is debounced with 500ms delay."
          actions={
            <Chip
              icon={<SpeedIcon sx={{ fontSize: 16 }} />}
              label="500ms Debounce Delay"
              size="small"
              color="primary"
              variant="outlined"
            />
          }
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MUTED, mb: 1, display: 'block' }}>
                SEARCH TRANSACTIONS
              </Typography>
              <SearchInput
                variant="outlined"
                placeholder="Search by ID, title, or category (e.g. Payroll, Tax, TXN)..."
                value={inputValue}
                onValueChange={handleDebouncedInput}
                onClear={handleDebouncedClear}
                loading={isSearching}
                clearable
                shortcut="⌘K"
              />

              {/* Telemetry Chips */}
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MUTED, display: 'block', mb: 1 }}>
                  DEBOUNCE TELEMETRY
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  <Chip label={`Immediate Keystrokes: ${keystrokeCount}`} size="small" variant="outlined" />
                  <Chip label={`Debounced API Searches: ${apiCallCount}`} size="small" sx={{ bgcolor: TEAL_PRIMARY, color: '#FFF', fontWeight: 700 }} />
                  <Chip
                    label={isSearching ? '⏳ Typing (Debouncing 500ms)...' : '✅ Settled / Idle'}
                    size="small"
                    color={isSearching ? 'warning' : 'success'}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="caption" sx={{ color: TEXT_MUTED, mt: 1.5, display: 'block' }}>
                  <strong>Active Debounced Filter:</strong> {debouncedQuery ? `"${debouncedQuery}"` : '<em>(none — showing all)</em>'}
                </Typography>
              </Box>
            </Grid>

            {/* Filtered Results */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'grey.200', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                    FILTERED TRANSACTIONS ({filteredTransactions.length})
                  </Typography>
                  <FilterListIcon sx={{ fontSize: 16, color: TEXT_MUTED }} />
                </Box>
                <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn, idx) => (
                      <Box
                        key={txn.id}
                        sx={{
                          p: 1.5,
                          borderBottom: idx < filteredTransactions.length - 1 ? '1px solid #F1F5F9' : 'none',
                          '&:hover': { bgcolor: 'grey.50' },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            {txn.title}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY }}>
                            {txn.amount}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip label={txn.id} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
                          <Chip label={txn.category} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ p: 3, textAlign: 'center', color: TEXT_MUTED }}>
                      Tidak ada transaksi yang cocok dengan "{debouncedQuery}"
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* ── Section 2: Interactive Sandbox ── */}
        <Card
          title="2. Interactive Sandbox & Customization"
          subtitle="Test all visual variants, sizes, focus ring toggles, and slot styling."
          actions={
            <Chip icon={<TuneIcon sx={{ fontSize: 16 }} />} label="Live Sandbox" size="small" variant="outlined" />
          }
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={2}>
                <FormControl component="fieldset">
                  <FormLabel sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Visual Variant</FormLabel>
                  <RadioGroup row value={variant} onChange={(e) => setVariant(e.target.value as SearchVariant)}>
                    <FormControlLabel value="outlined" control={<Radio size="small" />} label="Outlined" />
                    <FormControlLabel value="pill" control={<Radio size="small" />} label="Pill" />
                    <FormControlLabel value="filled" control={<Radio size="small" />} label="Filled" />
                    <FormControlLabel value="standard" control={<Radio size="small" />} label="Standard" />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel sx={{ fontSize: '0.8rem', fontWeight: 700 }}>Size</FormLabel>
                  <RadioGroup row value={size} onChange={(e) => setSize(e.target.value as SearchSize)}>
                    <FormControlLabel value="small" control={<Radio size="small" />} label="Small (34px)" />
                    <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium (40px)" />
                    <FormControlLabel value="large" control={<Radio size="small" />} label="Large (48px)" />
                  </RadioGroup>
                </FormControl>

                <Divider />

                <Stack direction="row" spacing={3}>
                  <FormControlLabel
                    control={<Switch checked={disableFocusRing} onChange={(e) => setDisableFocusRing(e.target.checked)} />}
                    label={<Typography variant="body2">disableFocusRing</Typography>}
                  />
                  <FormControlLabel
                    control={<Switch checked={showShortcut} onChange={(e) => setShowShortcut(e.target.checked)} />}
                    label={<Typography variant="body2">Shortcut Badge (⌘K)</Typography>}
                  />
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  border: '1px dashed',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  justifyContent: 'center',
                  minHeight: 200,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: TEXT_MUTED }}>
                  LIVE PREVIEW:
                </Typography>
                <SearchInput
                  variant={variant}
                  size={size}
                  disableFocusRing={disableFocusRing}
                  shortcut={showShortcut ? '⌘K' : undefined}
                  placeholder={`Search in ${variant} variant (${size} size)...`}
                  value={sandboxQuery}
                  onValueChange={setSandboxQuery}
                  clearable
                />
                <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                  Value: {sandboxQuery ? `"${sandboxQuery}"` : '<em>(empty)</em>'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* ── Section 3: All 4 Variants Side-by-Side ── */}
        <Card
          title="3. Design Variants Overview"
          subtitle="Pre-styled variants aligned with BYOND BIZNIS Design Tokens"
          actions={<PaletteIcon sx={{ color: TEXT_MUTED }} />}
        >
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <MuiCard variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  1. Outlined (Default)
                </Typography>
                <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                  Clean border on paper background. Standard for form dialogs & filter bars.
                </Typography>
                <SearchInput variant="outlined" placeholder="Search accounts..." defaultValue="PT Berkah" clearable />
              </MuiCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <MuiCard variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  2. Pill Variant (50px Rounded)
                </Typography>
                <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                  Rounded pill shape with filled grey background. Modern global search header.
                </Typography>
                <SearchInput variant="pill" placeholder="Search anything..." defaultValue="Shafa Riani" clearable />
              </MuiCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <MuiCard variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  3. Filled Variant
                </Typography>
                <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                  Subtle soft background fill with subtle 1px border.
                </Typography>
                <SearchInput variant="filled" placeholder="Filter team members..." defaultValue="Budi" clearable />
              </MuiCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <MuiCard variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  4. Standard Variant (Flush Underline)
                </Typography>
                <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                  Minimal underline border. Ideal for inline dropdown menus and select subheaders.
                </Typography>
                <SearchInput variant="standard" placeholder="Quick search..." defaultValue="Giro IDR" clearable />
              </MuiCard>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </PageLayout>
  )
}
