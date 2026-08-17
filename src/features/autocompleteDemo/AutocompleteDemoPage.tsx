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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import NatureIcon from '@mui/icons-material/Nature'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SchoolIcon from '@mui/icons-material/School'
import MosqueIcon from '@mui/icons-material/Mosque'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SearchIcon from '@mui/icons-material/Search'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import {
  Autocomplete,
  type AutocompleteOption,
  createCurrencyOptions,
  filterNumericOptions,
} from '../../components/autocomplete'
import { createTypedForm } from '../../components/form'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ── Mock Datasets ────────────────────────────────────────────────────────────
const INFAQ_OPTIONS: AutocompleteOption[] = [
  {
    value: 'yatim',
    label: 'Anak Yatim',
    subtitle: 'Kebutuhan pokok & santunan rutin anak yatim',
    icon: <VolunteerActivismIcon sx={{ color: '#1E6BE6' }} />,
  },
  {
    value: 'lingkungan',
    label: 'Lingkungan',
    subtitle: 'Pelestarian alam dan lingkungan hidup',
    icon: <NatureIcon sx={{ color: '#3D8B37' }} />,
  },
  {
    value: 'kemanusiaan',
    label: 'Kemanusiaan',
    subtitle: 'Bantuan darurat korban bencana alam',
    icon: <FavoriteIcon sx={{ color: '#B0245C' }} />,
  },
  {
    value: 'pendidikan',
    label: 'Pendidikan',
    subtitle: 'Bantuan pendidikan anak yatim dan dhuafa',
    icon: <SchoolIcon sx={{ color: '#EAA827' }} />,
  },
  {
    value: 'masjid',
    label: 'Rumah Ibadah',
    subtitle: 'Renovasi dan pembangunan masjid pelosok',
    icon: <MosqueIcon sx={{ color: '#00A39D' }} />,
  },
  {
    value: 'ekonomi',
    label: 'Pemberdayaan Umat',
    subtitle: 'Program kemandirian ekonomi masyarakat',
    icon: <SelfImprovementIcon sx={{ color: '#7B5EA7' }} />,
  },
]

const TECH_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'Component-based UI library', avatar: 'RC', avatarBg: '#00A39D' },
  { label: 'Vue.js', value: 'vue', subtitle: 'Progressive JavaScript framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'The React framework for the Web', avatar: 'NX', avatarBg: '#1E293B' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Enterprise-scale platform', avatar: 'NG', avatarBg: '#DD0031' },
  { label: 'SolidJS', value: 'solid', subtitle: 'Simple and performant reactivity', avatar: 'SO', avatarBg: '#2C4F7C' },
]

const BANK_OPTIONS: AutocompleteOption[] = [
  { value: '7200000001', label: 'PT Digital Commerce', subtitle: 'Rekening 8830000001 • Rp 850.000.000', icon: <AccountBalanceIcon sx={{ color: '#00A39D' }} /> },
  { value: '7200000002', label: 'CV Surya Technology', subtitle: 'Rekening 8830000002 • Rp 120.000.000', icon: <AccountBalanceIcon sx={{ color: '#0284C7' }} /> },
  { value: '7200000003', label: 'PT Maju Bersama', subtitle: 'Rekening 8830000003 • Rp 45.000.000', icon: <AccountBalanceIcon sx={{ color: '#EAA827' }} /> },
  { value: '7200000004', label: 'PT Global Solusindo', subtitle: 'Rekening 8830000004 • Rp 920.000.000', icon: <AccountBalanceIcon sx={{ color: '#64748B' }} /> },
]

const NOMINAL_OPTIONS: AutocompleteOption[] = createCurrencyOptions(
  [10000, 25000, 50000, 100000, 250000, 500000, 1000000],
  {
    thousandSeparator: '.',
    getSubtitle: (raw) => {
      const words: Record<number, string> = {
        10000: 'Sepuluh Ribu Rupiah',
        25000: 'Dua Puluh Lima Ribu Rupiah',
        50000: 'Lima Puluh Ribu Rupiah',
        100000: 'Seratus Ribu Rupiah',
        250000: 'Dua Ratus Lima Puluh Ribu Rupiah',
        500000: 'Lima Ratus Ribu Rupiah',
        1000000: 'Satu Juta Rupiah',
      }
      return words[raw] ?? `Nominal Rp ${raw}`
    },
  }
)

// ── Sub-component: Numeric & Currency Best Practice Showcase ────────────────
function NumericFormatShowcase() {
  const [singleNominal, setSingleNominal] = useState<AutocompleteOption | null>(NOMINAL_OPTIONS[2]) // 50.000
  const [multiNominal, setMultiNominal] = useState<AutocompleteOption[]>([NOMINAL_OPTIONS[1], NOMINAL_OPTIONS[3]]) // 25.000 + 100.000
  const [freeSoloNominal, setFreeSoloNominal] = useState<AutocompleteOption | string | null>('75.000')

  const totalSum = useMemo(() => {
    return multiNominal.reduce((acc, opt) => acc + (typeof opt.value === 'number' ? opt.value : 0), 0)
  }, [multiNominal])

  return (
    <Grid container spacing={3}>
      {/* 1. Pre-defined Amount Picker */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
            1. Amount Preset Picker (`createCurrencyOptions`)
          </Typography>
          <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
            Data menyimpan angka mentah (`number`), label terformat rapi (`string`).
          </Typography>

          <Autocomplete
            label="Nominal Top-Up"
            prefixBlock="Rp"
            placeholder="Pilih nominal..."
            options={NOMINAL_OPTIONS}
            value={singleNominal}
            onValueChange={setSingleNominal}
            filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
            size="small"
            helperText="Ketik '50' atau '50.000' untuk mencari"
          />

          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: '#F8FAFC',
              border: '1px dashed #CBD5E1',
              borderRadius: '8px',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, display: 'block' }}>
              State Output:
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: TEXT_MAIN }}>
              value: {singleNominal ? JSON.stringify(singleNominal.value) : 'null'} (type: {typeof singleNominal?.value})
            </Typography>
          </Paper>
        </Box>
      </Grid>

      {/* 2. Multi-Select Preset with Live Sum Calculation */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
            2. Multi-Nominal Batch (`totalSum`)
          </Typography>
          <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
            Kalkulasi instan dari `option.value` yang berupa numeric amount mentah.
          </Typography>

          <Autocomplete
            multiple
            label="Batch Donasi / Infaq"
            prefixBlock="Rp"
            placeholder="Pilih paket..."
            options={NOMINAL_OPTIONS}
            value={multiNominal}
            onValueChange={setMultiNominal}
            filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
            checkboxPlacement="right"
            maxVisibleTags={2}
            size="small"
          />

          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: 'rgba(0, 163, 157, 0.06)',
              border: `1px solid ${TEAL_PRIMARY}`,
              borderRadius: '8px',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, display: 'block' }}>
              Total Donasi Terkalkulasi:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: TEXT_MAIN }}>
              Rp {totalSum.toLocaleString('id-ID')}
            </Typography>
          </Paper>
        </Box>
      </Grid>

      {/* 3. FreeSolo with Numeric Suggestions */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
            3. FreeSolo Preset + Custom Nominal
          </Typography>
          <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
            Pilih dari opsi preset atau input nominal kustom bebas (`freeSolo`).
          </Typography>

          <Autocomplete
            freeSolo
            label="Nominal Bebas"
            prefixBlock="Rp"
            placeholder="Pilih atau ketik bebas..."
            options={NOMINAL_OPTIONS}
            value={freeSoloNominal}
            onValueChange={setFreeSoloNominal}
            filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
            size="small"
            helperText="Mendukung pilihan preset maupun teks kustom"
          />

          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: '#F8FAFC',
              border: '1px dashed #CBD5E1',
              borderRadius: '8px',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, display: 'block' }}>
              Selected / Typed Value:
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', color: TEXT_MAIN }}>
              {typeof freeSoloNominal === 'object' && freeSoloNominal !== null
                ? `Preset ${JSON.stringify(freeSoloNominal.label)} (raw: ${freeSoloNominal.value})`
                : `Custom: "${freeSoloNominal}"`}
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}

// ── Typed Form Schema for RHF Demo ───────────────────────────────────────────
const miniFormSchema = z.object({
  category: z.string().min(1, 'Kategori wajib dipilih'),
})
type MiniFormValues = z.infer<typeof miniFormSchema>
const { Form, Field } = createTypedForm<MiniFormValues>()

export function AutocompleteDemoPage() {
  // ── Interactive Sandbox State ──────────────────────────────────────────────
  const [datasetKey, setDatasetKey] = useState<'infaq' | 'tech' | 'bank' | 'nominal'>('infaq')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [isMultiple, setIsMultiple] = useState(true)
  const [isFreeSolo, setIsFreeSolo] = useState(false)
  const [isDisableClearable, setIsDisableClearable] = useState(false)
  const [checkboxPlacement, setCheckboxPlacement] = useState<'right' | 'left' | 'none'>('right')
  const [maxVisibleTags, setMaxVisibleTags] = useState<number>(2)
  const [tagDisplay, setTagDisplay] = useState<'avatar+label' | 'label'>('avatar+label')
  const [tagTheme, setTagTheme] = useState<'default' | 'amber' | 'indigo'>('default')
  const [prefixBlockVal, setPrefixBlockVal] = useState<'none' | 'Rp' | '$' | 'https://'>('none')
  const [suffixBlockVal, setSuffixBlockVal] = useState<'none' | 'IDR' | '.com' | '/bln'>('none')
  const [startAdornmentVal, setStartAdornmentVal] = useState<'none' | 'search' | 'money'>('none')
  const [borderRadius, setBorderRadius] = useState<number>(12)
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeTab, setActiveTab] = useState<'values' | 'json' | 'code'>('values')

  // ── Active Options ─────────────────────────────────────────────────────────
  const currentOptions = useMemo(() => {
    switch (datasetKey) {
      case 'tech':
        return TECH_OPTIONS
      case 'bank':
        return BANK_OPTIONS
      case 'nominal':
        return NOMINAL_OPTIONS
      default:
        return INFAQ_OPTIONS
    }
  }, [datasetKey])

  // ── Sandbox Live Values ────────────────────────────────────────────────────
  const [sandboxSingle, setSandboxSingle] = useState<AutocompleteOption | string | null>(INFAQ_OPTIONS[0])
  const [sandboxMulti, setSandboxMulti] = useState<(AutocompleteOption | string)[]>([
    INFAQ_OPTIONS[0],
    INFAQ_OPTIONS[1],
    INFAQ_OPTIONS[3],
  ])

  // ── Custom Slot Theme ──────────────────────────────────────────────────────
  const customTagSx = useMemo(() => {
    if (tagTheme === 'amber') {
      return {
        bgcolor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgba(245, 158, 11, 0.45)',
        color: '#B45309',
        fontWeight: 700,
        '& .MuiChip-deleteIcon': {
          color: '#B45309',
          '&:hover': { color: '#78350F' },
        },
      }
    }
    if (tagTheme === 'indigo') {
      return {
        bgcolor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgba(99, 102, 241, 0.45)',
        color: '#4338CA',
        fontWeight: 700,
        '& .MuiChip-deleteIcon': {
          color: '#4338CA',
          '&:hover': { color: '#312E81' },
        },
      }
    }
    return undefined
  }, [tagTheme])

  // ── Generated JSX Code Snippet ─────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<Autocomplete']
    if (isMultiple) lines.push('  multiple')
    if (isFreeSolo) lines.push('  freeSolo')
    if (isDisableClearable) lines.push('  disableClearable')
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (borderRadius !== 12) lines.push(`  borderRadius={${borderRadius}}`)
    if (prefixBlockVal !== 'none') lines.push(`  prefixBlock="${prefixBlockVal}"`)
    if (suffixBlockVal !== 'none') lines.push(`  suffixBlock="${suffixBlockVal}"`)
    if (startAdornmentVal !== 'none') lines.push(`  startAdornment={<${startAdornmentVal === 'search' ? 'SearchIcon' : 'PaidOutlinedIcon'} />}`)
    if (isMultiple && checkboxPlacement !== 'right') {
      lines.push(`  checkboxPlacement=${checkboxPlacement === 'none' ? '{false}' : `"${checkboxPlacement}"`}`)
    }
    if (isMultiple && maxVisibleTags !== undefined) lines.push(`  maxVisibleTags={${maxVisibleTags}}`)
    if (isMultiple && tagDisplay !== 'avatar+label') lines.push(`  tagDisplay="${tagDisplay}"`)
    if (isError) lines.push('  error')
    if (isDisabled) lines.push('  disabled')
    if (tagTheme !== 'default') {
      lines.push(`  slotSx={{ tag: { /* ${tagTheme} theme styles */ } }}`)
    }
    lines.push('  options={OPTIONS}')
    lines.push(`  value={${isMultiple ? 'selectedItems' : 'selectedItem'}}`)
    lines.push(`  onValueChange={${isMultiple ? 'setSelectedItems' : 'setSelectedItem'}}`)
    lines.push('/>')
    return lines.join('\n')
  }, [
    isMultiple,
    isFreeSolo,
    isDisableClearable,
    size,
    borderRadius,
    prefixBlockVal,
    suffixBlockVal,
    startAdornmentVal,
    checkboxPlacement,
    maxVisibleTags,
    tagDisplay,
    isError,
    isDisabled,
    tagTheme,
  ])

  // ── RHF Mini Form State ───────────────────────────────────────────────────
  const [formSubmitted, setFormSubmitted] = useState<MiniFormValues | null>(null)

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="Autocomplete Component"
      subtitle="Universal Layer 1 Autocomplete & Multi-Select Primitive"
      subtitleDescription="Type-safe, customizable autocomplete component supporting checkable rows, custom pill chips (+N overflow tags), and the modern onValueChange pattern."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'Autocomplete Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Configurator Sandbox ── */}
          <Card
            title="Interactive Prop Configurator"
            subtitle="Customize props, switch datasets, and inspect live rendered values in real-time"
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
                          const key = e.target.value as 'infaq' | 'tech' | 'bank' | 'nominal'
                          setDatasetKey(key)
                          const opts =
                            key === 'tech'
                              ? TECH_OPTIONS
                              : key === 'bank'
                              ? BANK_OPTIONS
                              : key === 'nominal'
                              ? NOMINAL_OPTIONS
                              : INFAQ_OPTIONS
                          setSandboxSingle(opts[0])
                          setSandboxMulti([opts[0], opts[1]])
                          if (key === 'nominal') {
                            setPrefixBlockVal('Rp')
                            setIsFreeSolo(true)
                          }
                        }}
                      >
                        <FormControlLabel value="infaq" control={<Radio size="small" />} label="Infaq (Icons)" />
                        <FormControlLabel value="tech" control={<Radio size="small" />} label="Tech (Avatars)" />
                        <FormControlLabel value="bank" control={<Radio size="small" />} label="Bank Accounts" />
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

                    {/* Mode Toggles */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            Multi-Select (`multiple`)
                          </Typography>
                          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                            Toggle between single and multiple chips
                          </Typography>
                        </Box>
                        <Switch
                          checked={isMultiple}
                          onChange={(e) => setIsMultiple(e.target.checked)}
                          color="primary"
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            FreeSolo (`freeSolo`)
                          </Typography>
                          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                            Allow custom arbitrary user input
                          </Typography>
                        </Box>
                        <Switch
                          checked={isFreeSolo}
                          onChange={(e) => setIsFreeSolo(e.target.checked)}
                          color="primary"
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            Disable Clearable (`disableClearable`)
                          </Typography>
                          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                            Hides the clear button indicator
                          </Typography>
                        </Box>
                        <Switch
                          checked={isDisableClearable}
                          onChange={(e) => setIsDisableClearable(e.target.checked)}
                          color="primary"
                        />
                      </Box>
                    </Box>

                    {/* Prefix Block Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Prefix Block (`prefixBlock`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={prefixBlockVal}
                        onChange={(e) => setPrefixBlockVal(e.target.value as 'none' | 'Rp' | '$' | 'https://')}
                      >
                        <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                        <FormControlLabel value="Rp" control={<Radio size="small" />} label="Rp (Shaded)" />
                        <FormControlLabel value="$" control={<Radio size="small" />} label="$" />
                        <FormControlLabel value="https://" control={<Radio size="small" />} label="https://" />
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

                    {/* Start Adornment Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Inline Start Adornment (`startAdornment`)
                      </FormLabel>
                      <RadioGroup
                        row
                        value={startAdornmentVal}
                        onChange={(e) => setStartAdornmentVal(e.target.value as 'none' | 'search' | 'money')}
                      >
                        <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                        <FormControlLabel value="search" control={<Radio size="small" />} label="Search Icon" />
                        <FormControlLabel value="money" control={<Radio size="small" />} label="Paid Icon" />
                      </RadioGroup>
                    </FormControl>

                    {/* Checkbox Placement */}
                    {isMultiple && (
                      <FormControl component="fieldset" size="small">
                        <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                          Checkbox Placement (`checkboxPlacement`)
                        </FormLabel>
                        <RadioGroup
                          row
                          value={checkboxPlacement}
                          onChange={(e) => setCheckboxPlacement(e.target.value as 'right' | 'left' | 'none')}
                        >
                          <FormControlLabel value="right" control={<Radio size="small" />} label="Right" />
                          <FormControlLabel value="left" control={<Radio size="small" />} label="Left" />
                          <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                        </RadioGroup>
                      </FormControl>
                    )}

                    {/* Max Visible Tags Overflow */}
                    {isMultiple && (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                            Max Visible Tags (`maxVisibleTags: {maxVisibleTags}`)
                          </Typography>
                          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                            Overflow renders +N chip
                          </Typography>
                        </Box>
                        <Slider
                          value={maxVisibleTags}
                          onChange={(_, v) => setMaxVisibleTags(v as number)}
                          min={1}
                          max={5}
                          step={1}
                          marks
                          valueLabelDisplay="auto"
                          sx={{ color: TEAL_PRIMARY }}
                        />
                      </Box>
                    )}

                    {/* Tag Display Mode */}
                    {isMultiple && (
                      <FormControl component="fieldset" size="small">
                        <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                          Tag Display Mode (`tagDisplay`)
                        </FormLabel>
                        <RadioGroup
                          row
                          value={tagDisplay}
                          onChange={(e) => setTagDisplay(e.target.value as 'avatar+label' | 'label')}
                        >
                          <FormControlLabel value="avatar+label" control={<Radio size="small" />} label="Avatar + Label" />
                          <FormControlLabel value="label" control={<Radio size="small" />} label="Label Only" />
                        </RadioGroup>
                      </FormControl>
                    )}

                    {/* Tag Custom Color Theme */}
                    {isMultiple && (
                      <FormControl component="fieldset" size="small">
                        <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                          Custom Tag Theme (`slotSx.tag`)
                        </FormLabel>
                        <RadioGroup
                          row
                          value={tagTheme}
                          onChange={(e) => setTagTheme(e.target.value as 'default' | 'amber' | 'indigo')}
                        >
                          <FormControlLabel value="default" control={<Radio size="small" />} label="Teal Default" />
                          <FormControlLabel value="amber" control={<Radio size="small" />} label="Amber Accent" />
                          <FormControlLabel value="indigo" control={<Radio size="small" />} label="Indigo Slate" />
                        </RadioGroup>
                      </FormControl>
                    )}

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

                    {isMultiple ? (
                      <Autocomplete
                        multiple
                        freeSolo={isFreeSolo}
                        disableClearable={isDisableClearable}
                        size={size}
                        label="Selected Items (Multi-Select)"
                        placeholder={sandboxMulti.length === 0 ? 'Pilih satu atau lebih opsi...' : ''}
                        options={currentOptions}
                        value={sandboxMulti}
                        onValueChange={setSandboxMulti}
                        checkboxPlacement={checkboxPlacement === 'none' ? false : checkboxPlacement}
                        maxVisibleTags={maxVisibleTags}
                        tagDisplay={tagDisplay}
                        borderRadius={borderRadius}
                        prefixBlock={prefixBlockVal === 'none' ? undefined : prefixBlockVal}
                        suffixBlock={suffixBlockVal === 'none' ? undefined : suffixBlockVal}
                        startAdornment={
                          startAdornmentVal === 'none' ? undefined : startAdornmentVal === 'search' ? (
                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                          ) : (
                            <PaidOutlinedIcon sx={{ color: TEAL_PRIMARY, fontSize: 20 }} />
                          )
                        }
                        error={isError}
                        disabled={isDisabled}
                        slotSx={{
                          tag: customTagSx,
                        }}
                        helperText={
                          isError
                            ? 'Terjadi kesalahan validasi pada pilihan ini'
                            : `${sandboxMulti.length} opsi terpilih • onValueChange synced`
                        }
                      />
                    ) : (
                      <Autocomplete
                        freeSolo={isFreeSolo}
                        disableClearable={isDisableClearable}
                        size={size}
                        label="Selected Item (Single Select)"
                        placeholder="Pilih salah satu opsi..."
                        options={currentOptions}
                        value={sandboxSingle}
                        onValueChange={setSandboxSingle}
                        borderRadius={borderRadius}
                        prefixBlock={prefixBlockVal === 'none' ? undefined : prefixBlockVal}
                        suffixBlock={suffixBlockVal === 'none' ? undefined : suffixBlockVal}
                        startAdornment={
                          startAdornmentVal === 'none' ? undefined : startAdornmentVal === 'search' ? (
                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                          ) : (
                            <PaidOutlinedIcon sx={{ color: TEAL_PRIMARY, fontSize: 20 }} />
                          )
                        }
                        error={isError}
                        disabled={isDisabled}
                        helperText={
                          isError
                            ? 'Wajib memilih minimal satu opsi'
                            : sandboxSingle
                              ? `✓ Terpilih: ${typeof sandboxSingle === 'string' ? sandboxSingle : sandboxSingle.label}`
                              : 'Ketik atau klik untuk memilih'
                        }
                      />
                    )}
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
                      <Tab icon={<CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="values" label="Active Values Summary" />
                      <Tab icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="json" label="Raw JSON State" />
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
                        {isMultiple ? (
                          sandboxMulti.length > 0 ? (
                            <Stack spacing={1}>
                              {sandboxMulti.map((item, idx) => {
                                const itemLabel = typeof item === 'string' ? item : item.label
                                const itemValue = typeof item === 'string' ? item : item.value
                                const itemSubtitle = typeof item === 'string' ? undefined : item.subtitle

                                return (
                                  <Box
                                    key={String(itemValue)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      p: 1,
                                      bgcolor: '#FFFFFF',
                                      borderRadius: '6px',
                                      border: '1px solid #E2E8F0',
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Chip label={`#${idx + 1}`} size="small" sx={{ height: 20, fontSize: '0.6875rem', fontWeight: 700 }} />
                                      <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN }}>
                                        {itemLabel}
                                      </Typography>
                                      {itemSubtitle && (
                                        <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                                          ({String(itemSubtitle)})
                                        </Typography>
                                      )}
                                    </Box>
                                    <Chip
                                      label={`value: "${itemValue}"`}
                                      size="small"
                                      sx={{
                                        height: 20,
                                        fontSize: '0.6875rem',
                                        fontFamily: 'monospace',
                                        bgcolor: 'rgba(0, 163, 157, 0.08)',
                                        color: TEAL_PRIMARY,
                                      }}
                                    />
                                  </Box>
                                )
                              })}
                            </Stack>
                          ) : (
                            <Typography variant="caption" sx={{ color: TEXT_MUTED, fontStyle: 'italic' }}>
                              Belum ada nilai terpilih (empty array: [])
                            </Typography>
                          )
                        ) : sandboxSingle ? (
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
                                {typeof sandboxSingle === 'string' ? sandboxSingle : sandboxSingle.label}
                              </Typography>
                              {typeof sandboxSingle !== 'string' && sandboxSingle.subtitle && (
                                <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block' }}>
                                  {String(sandboxSingle.subtitle)}
                                </Typography>
                              )}
                            </Box>
                            <Chip
                              label={`value: "${typeof sandboxSingle === 'string' ? sandboxSingle : sandboxSingle.value}"`}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                bgcolor: 'rgba(0, 163, 157, 0.08)',
                                color: TEAL_PRIMARY,
                                fontWeight: 700,
                              }}
                            />
                          </Box>
                        ) : (
                          <Typography variant="caption" sx={{ color: TEXT_MUTED, fontStyle: 'italic' }}>
                            Belum ada nilai terpilih (null)
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
                        {JSON.stringify(isMultiple ? sandboxMulti : sandboxSingle, null, 2)}
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
            {/* Real-World Use Case 1: Infaq Filter Drawer Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Infaq & Shadaqah Filter Card"
                subtitle="Custom card with rich icon metadata & checkbox options"
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      1. Single Select with Icons & Subtitle Metadata
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                      Uses custom icon JSX, muted subtitles, and teal focus ring.
                    </Typography>
                    <Autocomplete
                      placeholder="Filter Berdasarkan Kategori..."
                      options={INFAQ_OPTIONS}
                      defaultValue={INFAQ_OPTIONS[0]}
                      borderRadius={12}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      2. Multi-Select with Tag Overflow (+N)
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                      Shows 2 tags maximum; extra selections collapse to `+N`.
                    </Typography>
                    <Autocomplete
                      multiple
                      placeholder="Pilih Kategori..."
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[1], INFAQ_OPTIONS[2], INFAQ_OPTIONS[4]]}
                      maxVisibleTags={2}
                      borderRadius={12}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Real-World Use Case 2: Tech Stack Tagger (Avatars) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Developer Tech Stack Tagger"
                subtitle="Rich avatar badges, initial letters, and custom colors"
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      1. Avatar Initials Badges (`tagDisplay="avatar+label"`)
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                      Each chip displays the framework logo initial badge with brand background color.
                    </Typography>
                    <Autocomplete
                      multiple
                      placeholder="Select tech stack..."
                      options={TECH_OPTIONS}
                      defaultValue={[TECH_OPTIONS[0], TECH_OPTIONS[1], TECH_OPTIONS[2]]}
                      tagDisplay="avatar+label"
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                      2. Clean Text Chips (`tagDisplay="label"`)
                    </Typography>
                    <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1 }}>
                      Compact chips showing only the option text label.
                    </Typography>
                    <Autocomplete
                      multiple
                      placeholder="Select tech stack..."
                      options={TECH_OPTIONS}
                      defaultValue={[TECH_OPTIONS[0], TECH_OPTIONS[3]]}
                      tagDisplay="label"
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Real-World Use Case 3: Nominal Currency with Prefix Block (Rp) */}
            <Grid size={{ xs: 12 }}>
              <Card
                title="Nominal Donasi & Currency Picker (Prefix Block 'Rp')"
                subtitle="Full-height shaded prefix addon block with freeSolo typing and preset nominal options"
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN, mb: 0.5 }}>
                        1. Nominal Currency with Prefix Block (`prefixBlock=&quot;Rp&quot;` &amp; `freeSolo`)
                      </Typography>
                      <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 1.5 }}>
                        Displays a solid shaded left block with &quot;Rp&quot;. Supports selecting preset nominal options or typing a custom amount.
                      </Typography>
                      <Autocomplete
                        freeSolo
                        prefixBlock="Rp"
                        placeholder="50.000"
                        options={NOMINAL_OPTIONS}
                        defaultValue={NOMINAL_OPTIONS[2]}
                        borderRadius={12}
                        helperText="Pilih nominal preset (50.000, 100.000, 250.000) atau ketik bebas"
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
                      <Autocomplete
                        freeSolo
                        suffixBlock="IDR"
                        placeholder="1.000.000"
                        options={NOMINAL_OPTIONS}
                        defaultValue={NOMINAL_OPTIONS[6]}
                        borderRadius={12}
                        helperText="Suffix block attaches flush against the right edge"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* ── SECTION 3: Custom Tokens & Prop Showcase (BorderRadius, MaxVisibleTags, Sizes) ── */}
          <Card
            title="Custom Sizing, Corner Radii & Tag Overflow Matrix"
            subtitle="Explore how borderRadius, maxVisibleTags, size, and slotSx customize the component appearance"
          >
            <Grid container spacing={3}>
              {/* Row 1: Custom Corner Radii */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    1. Custom Corner Radii (`borderRadius`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Accepts any number (`4`, `12`, `20`) or CSS string (`&quot;999px&quot;`, `&quot;1rem&quot;`). Applies to both field and menu.
                  </Typography>

                  <Stack spacing={2.5}>
                    <Autocomplete
                      placeholder="Sharp / Enterprise (borderRadius={4})"
                      options={TECH_OPTIONS}
                      borderRadius={4}
                      size="small"
                    />

                    <Autocomplete
                      placeholder="BYOND Standard (borderRadius={12})"
                      options={TECH_OPTIONS}
                      borderRadius={12}
                      size="small"
                    />

                    <Autocomplete
                      placeholder="Soft Curved (borderRadius={20})"
                      options={TECH_OPTIONS}
                      borderRadius={20}
                      size="small"
                    />

                    <Autocomplete
                      placeholder="Full Organic Pill (borderRadius=&quot;999px&quot;)"
                      options={TECH_OPTIONS}
                      borderRadius="999px"
                      size="small"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* Row 2: Custom Tag Overflow (maxVisibleTags) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    2. Tag Overflow Progression (`maxVisibleTags`)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Controls the maximum number of tags displayed before collapsing extra items into a `+N` badge.
                  </Typography>

                  <Stack spacing={2.5}>
                    <Autocomplete
                      multiple
                      label="maxVisibleTags={1}"
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[1], INFAQ_OPTIONS[2], INFAQ_OPTIONS[3], INFAQ_OPTIONS[4]]}
                      maxVisibleTags={1}
                      size="small"
                      helperText="Shows 1 tag, remaining 4 collapsed into '+4'"
                    />

                    <Autocomplete
                      multiple
                      label="maxVisibleTags={2}"
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[1], INFAQ_OPTIONS[2], INFAQ_OPTIONS[3], INFAQ_OPTIONS[4]]}
                      maxVisibleTags={2}
                      size="small"
                      helperText="Shows 2 tags, remaining 3 collapsed into '+3'"
                    />

                    <Autocomplete
                      multiple
                      label="maxVisibleTags={3}"
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[1], INFAQ_OPTIONS[2], INFAQ_OPTIONS[3], INFAQ_OPTIONS[4]]}
                      maxVisibleTags={3}
                      size="small"
                      helperText="Shows 3 tags, remaining 2 collapsed into '+2'"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* Row 3: Custom Theme Overrides via slotSx */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    3. Deep Theming via `slotSx` (Custom Accent Colors & Popover Shadows)
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Override individual slots (`slotSx.tag`, `slotSx.paper`, `slotSx.listbox`, `slotSx.option`) without modifying base component code.
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Autocomplete
                        multiple
                        label="Gold / Orange Accent Theme (slotSx.tag)"
                        options={TECH_OPTIONS}
                        defaultValue={[TECH_OPTIONS[0], TECH_OPTIONS[1]]}
                        slotSx={{
                          tag: {
                            bgcolor: 'rgba(245, 158, 11, 0.1)',
                            borderColor: 'rgba(245, 158, 11, 0.4)',
                            color: '#B45309',
                            fontWeight: 700,
                            '& .MuiChip-deleteIcon': {
                              color: '#B45309',
                              '&:hover': { color: '#78350F' },
                            },
                          },
                        }}
                        helperText="Customized chip border, background, and delete icon"
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Autocomplete
                        label="Custom Paper & Listbox Shadow (slotSx.paper)"
                        options={INFAQ_OPTIONS}
                        defaultValue={INFAQ_OPTIONS[0]}
                        slotSx={{
                          paper: {
                            boxShadow: '0 20px 40px rgba(0, 163, 157, 0.18)',
                            borderColor: '#00A39D',
                            borderWidth: '1.5px',
                          },
                        }}
                        helperText="Elevated teal popover border and diffused drop shadow"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 4: Granular slotSx Sub-Slots Showcase ── */}
          <Card
            title="Granular slotSx Sub-Slots"
            subtitle="Style every internal sub-element independently — option rows, chips, avatars, icons, overflow badges"
          >
            <Grid container spacing={3}>
              {/* 4a: Option Row Sub-Slots */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    1. Option Row Sub-Slots
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                    Open the dropdown to see custom rows.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {['optionLabel', 'optionSubtitle', 'optionIcon', 'optionCheckbox', 'optionAvatar'].map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 18, bgcolor: 'rgba(0,163,157,0.08)', color: TEAL_PRIMARY }} />
                    ))}
                  </Box>

                  <Stack spacing={2.5}>
                    <Autocomplete
                      multiple
                      label="Bold label, italic subtitle, amber checkbox"
                      placeholder="Open to inspect rows..."
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[2]]}
                      checkboxPlacement="right"
                      size="small"
                      slotSx={{
                        option: { px: 2.5, py: 1.25, mx: 0.5, borderRadius: '8px' },
                        optionLabel: { fontWeight: 700, fontSize: '0.875rem' },
                        optionSubtitle: { color: '#64748B', fontStyle: 'italic' },
                        optionIcon: { fontSize: 20 },
                        optionCheckbox: { '&.Mui-checked': { color: '#EAA827' } },
                      }}
                      helperText="optionLabel: bold · optionSubtitle: italic · optionCheckbox: amber"
                    />

                    <Autocomplete
                      label="Monospace subtitle for bank accounts"
                      placeholder="Open to inspect rows..."
                      options={BANK_OPTIONS}
                      defaultValue={BANK_OPTIONS[0]}
                      size="small"
                      slotSx={{
                        optionLabel: { fontWeight: 700, color: TEXT_MAIN },
                        optionSubtitle: { fontFamily: 'monospace', fontSize: '0.6875rem', color: '#0284C7' },
                      }}
                      helperText="optionSubtitle: monospace blue for account numbers"
                    />
                  </Stack>
                </Box>
              </Grid>

              {/* 4b: Tag Chip Sub-Slots */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    2. Tag Chip Sub-Slots
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                    Each chip slot applies independently.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {['tagChip', 'tagAvatar', 'tagIcon', 'tagLabel', 'tagOverflow'].map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 18, bgcolor: 'rgba(234,168,39,0.1)', color: '#B45309' }} />
                    ))}
                  </Box>

                  <Stack spacing={2.5}>
                    <Autocomplete
                      multiple
                      label="Gradient teal–blue chip (tagChip)"
                      options={TECH_OPTIONS}
                      defaultValue={[TECH_OPTIONS[0], TECH_OPTIONS[1], TECH_OPTIONS[2]]}
                      maxVisibleTags={2}
                      size="small"
                      slotSx={{
                        tagChip: {
                          background: 'linear-gradient(135deg, #00A39D 0%, #0284C7 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          border: 'none',
                          '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.75)', '&:hover': { color: '#fff' } },
                        },
                        tagOverflow: { bgcolor: '#0F172A', color: '#fff', fontWeight: 800, border: 'none' },
                      }}
                      helperText="tagChip: gradient · tagOverflow: dark badge"
                    />

                    <Autocomplete
                      multiple
                      label="Square avatars, wider gap (tagAvatar + tagLabel)"
                      options={TECH_OPTIONS}
                      defaultValue={[TECH_OPTIONS[0], TECH_OPTIONS[2], TECH_OPTIONS[3]]}
                      size="small"
                      tagDisplay="avatar+label"
                      slotSx={{
                        tagAvatar: { borderRadius: '3px', width: 18, height: 18 },
                        tagLabel: { gap: 1 },
                      }}
                      helperText="tagAvatar: 3px square · tagLabel: wider gap"
                    />

                    <Autocomplete
                      multiple
                      label="Amber accent with solid +N overflow (tagChip + tagOverflow)"
                      options={INFAQ_OPTIONS}
                      defaultValue={[INFAQ_OPTIONS[0], INFAQ_OPTIONS[1], INFAQ_OPTIONS[2], INFAQ_OPTIONS[3]]}
                      maxVisibleTags={2}
                      size="small"
                      slotSx={{
                        tagChip: {
                          bgcolor: 'rgba(245,158,11,0.1)',
                          borderColor: 'rgba(245,158,11,0.45)',
                          color: '#B45309',
                          fontWeight: 700,
                          '& .MuiChip-deleteIcon': { color: '#B45309', '&:hover': { color: '#78350F' } },
                        },
                        tagOverflow: { bgcolor: '#F59E0B', color: '#fff', fontWeight: 800, border: 'none' },
                      }}
                      helperText="tagChip: amber border · tagOverflow: solid amber"
                    />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 5: Currency & Number Format Best Practice ── */}
          <Card
            title="Currency & Number Format Best Practice"
            subtitle="Pre-defined amount presets, dual-mode search filter (raw digits & formatted string), and multi-selection sum"
          >
            <NumericFormatShowcase />
          </Card>

          {/* ── SECTION 6: React Hook Form (RHF) + Zod Integration ── */}
          <Card
            title="React Hook Form + Zod Integration"
            subtitle="Type-safe form connector using Field.Autocomplete via createTypedForm"
          >
            <Form
              schema={miniFormSchema}
              defaultValues={{ category: '' }}
              onSubmit={(data) => setFormSubmitted(data)}
            >
              <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack spacing={2}>
                    <Field.Autocomplete
                      name="category"
                      label="Program Penyaluran Dana (RHF Validated)"
                      placeholder="Cari dan pilih kategori program..."
                      options={INFAQ_OPTIONS}
                      helperText="Validasi otomatis: input wajib dipilih sebelum submit"
                    />

                    <Box sx={{ display: 'flex', gap: 1.5, pt: 1 }}>
                      <Button type="submit" variant="contained" sx={{ minWidth: 140, bgcolor: TEAL_PRIMARY }}>
                        Submit Form
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
                        Pilih opsi dan klik &quot;Submit Form&quot; untuk melihat payload form yang tervalidasi.
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Form>
          </Card>

          {/* ── SECTION 7: Architecture & Prop Reference Matrix ── */}
          <Card
            title="Layer 1 Primitive API Reference"
            subtitle="Full breakdown of custom props supported by the Autocomplete component"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'onValueChange',
                  type: '(value: T | T[] | null) => void',
                  def: 'undefined',
                  desc: 'Modern value-first change handler (Radix/Mantine/Shadcn pattern). Receives updated value without throwaway event param.',
                },
                {
                  prop: 'multiple',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Enables multi-selection mode with pill chip rendering and checkable dropdown options.',
                },
                {
                  prop: 'checkboxPlacement',
                  type: "'right' | 'left' | false",
                  def: "'right'",
                  desc: 'Positions the selection checkbox in each option row. Set to false to disable checkboxes.',
                },
                {
                  prop: 'maxVisibleTags',
                  type: 'number',
                  def: 'undefined',
                  desc: 'Caps visible chip tags inside the input, grouping excess selections into a +N overflow badge.',
                },
                {
                  prop: 'tagDisplay',
                  type: "'avatar+label' | 'label'",
                  def: "'avatar+label'",
                  desc: 'Controls whether selected chips include the avatar/icon decoration or only text labels.',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Controls field height: small (40px), medium (48px), or large (56px).',
                },
                {
                  prop: 'borderRadius',
                  type: 'number | string',
                  def: "'12px'",
                  desc: 'Controls corner radius for both the input field and dropdown paper popover.',
                },
                {
                  prop: 'slotSx.option',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the outer <li> row container for each dropdown option.',
                },
                {
                  prop: 'slotSx.optionLabel',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the primary label <Typography> inside each option row. Overrides selection-state color and fontWeight defaults.',
                },
                {
                  prop: 'slotSx.optionSubtitle',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the subtitle caption <Typography> inside each option row (e.g. monospace for IDs, italic for descriptions).',
                },
                {
                  prop: 'slotSx.optionCheckbox',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the <Checkbox> element inside each option row. Only rendered when multiple is true.',
                },
                {
                  prop: 'slotSx.optionAvatar',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the <Avatar> element inside each option row (string avatar variant). Customize size, borderRadius, bgcolor.',
                },
                {
                  prop: 'slotSx.optionIcon',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the icon wrapper <Box> inside each option row (JSX icon variant). Controls color, fontSize.',
                },
                {
                  prop: 'slotSx.tagChip',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the outer <Chip> element for each selected value tag. Overrides chip background, border, color, fontWeight.',
                },
                {
                  prop: 'slotSx.tagAvatar',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the <Avatar> inside each selected chip (string avatar variant). Customize borderRadius, size, bgcolor.',
                },
                {
                  prop: 'slotSx.tagIcon',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the icon wrapper <Box> inside each selected chip (JSX icon variant). Controls fontSize, color.',
                },
                {
                  prop: 'slotSx.tagLabel',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the label container <Box> inside each chip that wraps avatar/icon + text. Controls gap, padding.',
                },
                {
                  prop: 'slotSx.tagOverflow',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the +N overflow <Chip> badge independently. Apply different colors, fontWeight, or border from regular chips.',
                },
                {
                  prop: 'prefixBlock',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Full-height shaded prefix block rendered flush against the left edge (e.g. "Rp", "$").',
                },
                {
                  prop: 'suffixBlock',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Full-height shaded suffix block rendered flush against the right edge (e.g. "IDR", ".com").',
                },
                {
                  prop: 'slotSx.paper',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the dropdown <Paper> popover container. Customize boxShadow, border, borderRadius.',
                },
                {
                  prop: 'slotSx.listbox',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the <ul> listbox inside the popover. Customize padding, maxHeight, scrollbar.',
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
