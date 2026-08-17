import { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Stack,
  Chip,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio as MuiRadio,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  Paper,
  Tabs,
  Tab,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PaymentIcon from '@mui/icons-material/Payment'
import SecurityIcon from '@mui/icons-material/Security'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import {
  RadioGroup,
  type RadioOption,
  type RadioVariant,
  type RadioLayout as LayoutType,
  type RadioPlacement,
  type RadioSize,
} from '../../components/radio'
import { createTypedForm } from '../../components/form'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

// ── Mock Datasets ────────────────────────────────────────────────────────────

// 1. Reference Image Frequency Dataset
const FREQUENCY_OPTIONS: RadioOption[] = [
  { label: 'Sekali', value: 'once' },
  { label: 'Rutin', value: 'routine' },
]

// 2. Rich Banking Methods with Icons, Badges, and Right-Aligned Price
const TRANSFER_METHOD_OPTIONS: RadioOption[] = [
  {
    label: 'BI-FAST',
    value: 'bifast',
    description: 'Real-time 24/7, batas transaksi hingga Rp 250.000.000 / hari',
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

// 3. Grid Payroll Execution Options
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

// ── Typed Form Schema for RHF Demo ───────────────────────────────────────────
const radioFormSchema = z.object({
  transferFrequency: z.string().min(1, 'Frekuensi transfer wajib dipilih'),
  paymentMethod: z.string().min(1, 'Metode pembayaran wajib dipilih'),
})
type RadioFormValues = z.infer<typeof radioFormSchema>
const { Form, Field } = createTypedForm<RadioFormValues>()

export function RadioDemoPage() {
  // ── Interactive Configurator State ─────────────────────────────────────────
  const [datasetKey, setDatasetKey] = useState<'frequency' | 'banking' | 'payroll'>('frequency')
  const [variant, setVariant] = useState<RadioVariant>('card')
  const [layout, setLayout] = useState<LayoutType>('row')
  const [size, setSize] = useState<RadioSize>('medium')
  const [radioPlacement, setRadioPlacement] = useState<RadioPlacement>('left')
  const [borderRadius, setBorderRadius] = useState<number>(12)
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [fullWidth, setFullWidth] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'code'>('preview')

  // Live selected value in sandbox
  const [sandboxValue, setSandboxValue] = useState<string>('routine')

  // ── Current Dataset Resolver ───────────────────────────────────────────────
  const currentOptions = useMemo(() => {
    switch (datasetKey) {
      case 'banking':
        return TRANSFER_METHOD_OPTIONS
      case 'payroll':
        return PAYROLL_SCHEDULE_OPTIONS
      default:
        return FREQUENCY_OPTIONS
    }
  }, [datasetKey])

  const selectedOptionObj = useMemo(() => {
    return currentOptions.find((opt) => String(opt.value) === sandboxValue) || null
  }, [currentOptions, sandboxValue])

  // ── Generated JSX Code Snippet ─────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<RadioGroup']
    lines.push('  label="Pilih Opsi"')
    if (variant !== 'default') lines.push(`  variant="${variant}"`)
    if (layout !== 'column') lines.push(`  layout="${layout}"`)
    if (layout === 'grid') lines.push('  gridColumns={{ xs: 1, sm: 2 }}')
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (variant === 'card' && radioPlacement !== 'left') lines.push(`  radioPlacement="${radioPlacement}"`)
    if (variant === 'card' && borderRadius !== 12) lines.push(`  borderRadius="${borderRadius}px"`)
    if (!fullWidth) lines.push('  fullWidth={false}')
    if (isError) lines.push('  error\n  helperText="Pilihan ini wajib diisi"')
    if (isDisabled) lines.push('  disabled')
    lines.push('  options={OPTIONS}')
    lines.push(`  value={selectedValue}`)
    lines.push('  onValueChange={(val) => setSelectedValue(val)}')
    lines.push('/>')
    return lines.join('\n')
  }, [variant, layout, size, radioPlacement, borderRadius, fullWidth, isError, isDisabled])

  // ── RHF Demo State ────────────────────────────────────────────────────────
  const [formSubmitted, setFormSubmitted] = useState<RadioFormValues | null>(null)
  const [showcaseFrequency, setShowcaseFrequency] = useState('routine')
  const [showcaseMethod, setShowcaseMethod] = useState('bifast')
  const [showcasePayroll, setShowcasePayroll] = useState('sameday')

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="Radio & RadioCard Component"
      subtitle="Universal Layer 1 Single-Choice & Card Selection Primitive"
      subtitleDescription="Type-safe, accessible radio component system supporting classic inline radios, interactive pill/card selections, rich multi-line options, and responsive grid layouts."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'Radio & RadioCard Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Prop Configurator Sandbox ── */}
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
                      <MuiRadioGroup
                        row
                        value={datasetKey}
                        onChange={(e) => {
                          const key = e.target.value as 'frequency' | 'banking' | 'payroll'
                          setDatasetKey(key)
                          const opts =
                            key === 'banking'
                              ? TRANSFER_METHOD_OPTIONS
                              : key === 'payroll'
                                ? PAYROLL_SCHEDULE_OPTIONS
                                : FREQUENCY_OPTIONS
                          setSandboxValue(String(opts[0].value))
                        }}
                      >
                        <FormControlLabel value="frequency" control={<MuiRadio size="small" />} label="Sekali / Rutin" />
                        <FormControlLabel value="banking" control={<MuiRadio size="small" />} label="Banking (Rich)" />
                        <FormControlLabel value="payroll" control={<MuiRadio size="small" />} label="Payroll (Grid)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Variant Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Variant (`variant`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={variant}
                        onChange={(e) => setVariant(e.target.value as RadioVariant)}
                      >
                        <FormControlLabel value="card" control={<MuiRadio size="small" />} label="Card (Pill Container)" />
                        <FormControlLabel value="default" control={<MuiRadio size="small" />} label="Default (Inline)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Layout Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Layout (`layout`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={layout}
                        onChange={(e) => setLayout(e.target.value as LayoutType)}
                      >
                        <FormControlLabel value="row" control={<MuiRadio size="small" />} label="Row (Horizontal)" />
                        <FormControlLabel value="column" control={<MuiRadio size="small" />} label="Column (Stack)" />
                        <FormControlLabel value="grid" control={<MuiRadio size="small" />} label="Grid (2 Columns)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Size Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Size (`size`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={size}
                        onChange={(e) => setSize(e.target.value as RadioSize)}
                      >
                        <FormControlLabel value="small" control={<MuiRadio size="small" />} label="Small (44px)" />
                        <FormControlLabel value="medium" control={<MuiRadio size="small" />} label="Medium (52px)" />
                        <FormControlLabel value="large" control={<MuiRadio size="small" />} label="Large (64px)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Radio Indicator Placement */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Radio Indicator Placement (`radioPlacement`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={radioPlacement}
                        onChange={(e) => setRadioPlacement(e.target.value as RadioPlacement)}
                      >
                        <FormControlLabel value="left" control={<MuiRadio size="small" />} label="Left" />
                        <FormControlLabel value="right" control={<MuiRadio size="small" />} label="Right" />
                        <FormControlLabel value="none" control={<MuiRadio size="small" />} label="None (Card Button)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Border Radius Slider */}
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Border Radius: {borderRadius}px
                      </Typography>
                      <Slider
                        value={borderRadius}
                        min={0}
                        max={30}
                        step={2}
                        onChange={(_, val) => setBorderRadius(val as number)}
                        sx={{ color: TEAL_PRIMARY }}
                      />
                    </Box>

                    {/* State Toggles */}
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        State Toggles
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={isError}
                              onChange={(e) => setIsError(e.target.checked)}
                              color="error"
                            />
                          }
                          label={<Typography variant="body2">Error</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={isDisabled}
                              onChange={(e) => setIsDisabled(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Disabled</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={fullWidth}
                              onChange={(e) => setFullWidth(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Full Width</Typography>}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Preview & Inspection Column */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Tabs
                    value={activeTab}
                    onChange={(_, val) => setActiveTab(val)}
                    sx={{
                      minHeight: 38,
                      mb: 2.5,
                      '& .MuiTab-root': {
                        minHeight: 38,
                        py: 0.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                      },
                    }}
                  >
                    <Tab value="preview" icon={<CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="Live Preview" />
                    <Tab value="json" icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="Selected State (JSON)" />
                    <Tab value="code" icon={<CodeOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="React Code" />
                  </Tabs>

                  {/* Tab 1: Live Interactive Component Preview */}
                  {activeTab === 'preview' && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        bgcolor: '#FFFFFF',
                        borderRadius: '12px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <RadioGroup
                        label="Pilih Frekuensi / Layanan Transaksi"
                        options={currentOptions}
                        value={sandboxValue}
                        onValueChange={(val) => setSandboxValue(String(val))}
                        variant={variant}
                        layout={layout}
                        gridColumns={{ xs: 1, sm: 2 }}
                        size={size}
                        radioPlacement={radioPlacement}
                        borderRadius={`${borderRadius}px`}
                        fullWidth={fullWidth}
                        error={isError}
                        disabled={isDisabled}
                        helperText={
                          isError
                            ? 'Pilihan ini wajib ditentukan untuk melanjutkan transaksi.'
                            : 'Opsi dapat diubah kembali sewaktu-waktu sesuai kebutuhan transaksi.'
                        }
                      />
                    </Paper>
                  )}

                  {/* Tab 2: JSON State Inspection */}
                  {activeTab === 'json' && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: '#0F172A',
                        color: '#F8FAFC',
                        borderRadius: '12px',
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        overflowX: 'auto',
                        flex: 1,
                      }}
                    >
                      <pre style={{ margin: 0 }}>
                        {JSON.stringify(
                          {
                            selectedValue: sandboxValue,
                            selectedOption: selectedOptionObj,
                            config: {
                              variant,
                              layout,
                              size,
                              radioPlacement,
                              borderRadius: `${borderRadius}px`,
                              isError,
                              isDisabled,
                              fullWidth,
                            },
                          },
                          null,
                          2
                        )}
                      </pre>
                    </Paper>
                  )}

                  {/* Tab 3: Generated Code */}
                  {activeTab === 'code' && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: '#0F172A',
                        color: '#38BDF8',
                        borderRadius: '12px',
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        overflowX: 'auto',
                        flex: 1,
                      }}
                    >
                      <pre style={{ margin: 0, color: '#E2E8F0' }}>{generatedCode}</pre>
                    </Paper>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 2: Reference Image Replica Showcase ── */}
          <Card
            title="Target Reference Image Replica (1:1)"
            subtitle='Exact visual implementation of the unselected "Sekali" vs. selected "Rutin" card radio group'
            actions={<Chip label="Design Target" size="small" sx={{ bgcolor: '#E6FFFA', color: TEAL_PRIMARY, fontWeight: 700 }} />}
          >
            <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
              <RadioGroup
                variant="card"
                layout="row"
                size="medium"
                borderRadius="12px"
                options={FREQUENCY_OPTIONS}
                value={showcaseFrequency}
                onValueChange={(val) => setShowcaseFrequency(String(val))}
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
                Selected value:
              </Typography>
              <Chip label={showcaseFrequency} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
            </Box>
          </Card>

          {/* ── SECTION 3: Rich Business Banking Cards ── */}
          <Card
            title="Rich Business Banking Options (Multi-Line Cards)"
            subtitle="Demonstrating leading icons, status tags, descriptive subtitles, and right-aligned fee information"
          >
            <RadioGroup
              label="Metode Pengiriman Dana"
              variant="card"
              layout="column"
              size="medium"
              options={TRANSFER_METHOD_OPTIONS}
              value={showcaseMethod}
              onValueChange={(val) => setShowcaseMethod(String(val))}
            />
          </Card>

          {/* ── SECTION 4: 2-Column Responsive Card Grid ── */}
          <Card
            title="2-Column Responsive Card Grid (Payroll Disbursal Scheme)"
            subtitle="Arranges options in equal responsive grid tiles using standard MUI Grid integration"
          >
            <RadioGroup
              label="Jadwal & Skema Pencairan Gaji Karyawan"
              variant="card"
              layout="grid"
              gridColumns={{ xs: 1, sm: 2 }}
              options={PAYROLL_SCHEDULE_OPTIONS}
              value={showcasePayroll}
              onValueChange={(val) => setShowcasePayroll(String(val))}
            />
          </Card>

          {/* ── SECTION 5: React Hook Form & Type-Safe Validation ── */}
          <Card
            title="React Hook Form Integration (createTypedForm)"
            subtitle="Type-safe Zod schema validation using Field.Radio with both card and default variants"
          >
            <Form
              schema={radioFormSchema}
              defaultValues={{
                transferFrequency: 'routine',
                paymentMethod: 'bifast',
              }}
              onSubmit={(values) => setFormSubmitted(values)}
            >
              <Stack spacing={3}>
                <Field.Radio
                  name="transferFrequency"
                  label="1. Frekuensi Pengiriman Dana"
                  variant="card"
                  layout="row"
                  options={FREQUENCY_OPTIONS}
                />

                <Field.Radio
                  name="paymentMethod"
                  label="2. Pilihan Layanan Transfer"
                  variant="card"
                  layout="column"
                  options={TRANSFER_METHOD_OPTIONS}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained" sx={{ bgcolor: TEAL_PRIMARY, px: 3, fontWeight: 700 }}>
                    Kirim Transaksi (Submit)
                  </Button>
                </Box>
              </Stack>
            </Form>

            {formSubmitted && (
              <Paper
                variant="outlined"
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: '#F0FDFA',
                  borderColor: TEAL_PRIMARY,
                  borderRadius: '12px',
                }}
              >
                <Typography sx={{ fontWeight: 700, color: TEAL_PRIMARY, mb: 0.5 }}>
                  ✓ Form Berhasil Disubmit!
                </Typography>
                <pre style={{ margin: 0, fontSize: '0.8125rem', fontFamily: 'monospace', color: TEXT_MAIN }}>
                  {JSON.stringify(formSubmitted, null, 2)}
                </pre>
              </Paper>
            )}
          </Card>

          {/* ── SECTION 5: Primitive API Reference ── */}
          <Card
            title="Primitive API Reference (RadioGroup & RadioCard)"
            subtitle="Complete TypeScript properties and slotSx tokens for the Layer 1 Radio primitive"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'options',
                  type: 'RadioOption[]',
                  def: '[]',
                  desc: 'Array of option objects containing label, value, description, icon, badge, endContent, and disabled.',
                },
                {
                  prop: 'value',
                  type: 'string | number | boolean',
                  def: 'undefined',
                  desc: 'Controlled selected value matching one of the options value.',
                },
                {
                  prop: 'defaultValue',
                  type: 'string | number | boolean',
                  def: 'undefined',
                  desc: 'Initial selected value for uncontrolled usage.',
                },
                {
                  prop: 'onValueChange',
                  type: '(value: string | number | boolean) => void',
                  def: 'undefined',
                  desc: 'Simplified change callback emitting the newly selected option value directly.',
                },
                {
                  prop: 'variant',
                  type: "'default' | 'card'",
                  def: "'card'",
                  desc: 'Switches between the modern BYOND selectable Card variant and standard inline Radio buttons.',
                },
                {
                  prop: 'layout',
                  type: "'row' | 'column' | 'grid'",
                  def: "'row'",
                  desc: 'Defines how options are positioned: horizontal row, vertical column stack, or responsive grid.',
                },
                {
                  prop: 'gridColumns',
                  type: 'number | { xs?: number; sm?: number; md?: number }',
                  def: '2',
                  desc: 'Number of columns when layout="grid" is active. Supports responsive breakpoint objects.',
                },
                {
                  prop: 'radioPlacement',
                  type: "'left' | 'right' | 'none'",
                  def: "'left'",
                  desc: 'Position of the circular indicator inside card tiles. "none" hides the circle for button tiles.',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Controls typography size and card padding density.',
                },
                {
                  prop: 'borderRadius',
                  type: 'number | string',
                  def: "'12px'",
                  desc: 'Border radius for selectable card containers.',
                },
                {
                  prop: 'label',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Optional group header label displayed above the radio group.',
                },
                {
                  prop: 'helperText',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Optional helper text or validation error message displayed below the group.',
                },
                {
                  prop: 'error',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Applies error color styling to the label, cards, and helper text.',
                },
                {
                  prop: 'disabled',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Disables all radio options in the group.',
                },
                {
                  prop: 'slotSx.root',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the outer FormControl container wrapper.',
                },
                {
                  prop: 'slotSx.card',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the individual RadioCard containers (border, background, hover, active).',
                },
                {
                  prop: 'slotSx.radio',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the custom SVG radio indicator circle element.',
                },
                {
                  prop: 'slotSx.label',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the FormLabel header text above the group.',
                },
                {
                  prop: 'slotSx.helperText',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the FormHelperText container below the group.',
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
