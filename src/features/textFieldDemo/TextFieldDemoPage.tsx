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
import SearchIcon from '@mui/icons-material/Search'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import { TextField, type TextFieldSize } from '../../components/textField'
import { createTypedForm } from '../../components/form'
import { z } from 'zod'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'

// ── Interactive Cents Toggle Sub-Component ────────────────────────────────────
function InteractiveCentsToggle() {
  const [showCents, setShowCents] = useState(false)
  const [amount, setAmount] = useState('1500000')

  return (
    <Box>
      <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
        fixedDecimals + allowDecimals dynamic toggle
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
        Toggling ,00 visibility on demand
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Switch
          size="small"
          checked={showCents}
          onChange={(e) => setShowCents(e.target.checked)}
          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: TEAL_PRIMARY } }}
        />
        <Typography variant="caption" sx={{ color: TEXT_MAIN, fontWeight: 500 }}>
          {showCents ? 'Sen ,00 ditampilkan' : 'Sen ,00 disembunyikan'}
        </Typography>
      </Box>
      <TextField
        label="Nominal (Toggle Sen)"
        format="currency"
        prefixBlock="Rp"
        value={amount}
        onValueChange={setAmount}
        allowDecimals={showCents}
        fixedDecimals={showCents}
        decimalScale={2}
        clearable
        helperText={showCents ? 'Format: 1.500.000,00 (sen aktif)' : 'Format: 1.500.000 (tanpa sen)'}
      />
    </Box>
  )
}

// ── Typed Form Schema for RHF Showcase ───────────────────────────────────────
const demoFormSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  idpel: z.string().min(8, 'Nomor IDPEL minimal 8 digit'),
  nominal: z.string().min(1, 'Nominal pembayaran wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  prayer: z.string().max(75, 'Doa maksimal 75 karakter').optional(),
})
type DemoFormValues = z.infer<typeof demoFormSchema>
const { Form, Field } = createTypedForm<DemoFormValues>()

export function TextFieldDemoPage() {
  // ── Sandbox Controls State ─────────────────────────────────────────────────
  const [preset, setPreset] = useState<
    'label' | 'value' | 'idpel' | 'doa' | 'rp' | 'number' | 'currency_id' | 'currency_usd' | 'domain'
  >('label')
  const [size, setSize] = useState<TextFieldSize>('medium')
  const [borderRadius, setBorderRadius] = useState<number>(12)
  const [prefixBlockVal, setPrefixBlockVal] = useState<'none' | 'Rp' | '$' | '+62'>('none')
  const [suffixBlockVal, setSuffixBlockVal] = useState<'none' | '.com' | '/bln' | 'IDR'>('none')
  const [startAdornmentVal, setStartAdornmentVal] = useState<'none' | 'search' | 'email' | 'lock'>('none')
  const [inputType, setInputType] = useState<'text' | 'password' | 'number'>('text')
  const [formatMode, setFormatMode] = useState<'none' | 'currency' | 'number'>('none')
  const [thousandSep, setThousandSep] = useState<string>('.')
  const [decimalSep, setDecimalSep] = useState<string>(',')
  const [decimalScale, setDecimalScale] = useState<number>(2)
  const [fixedDecimals, setFixedDecimals] = useState(false)
  const [clearable, setClearable] = useState(false)
  const [showPasswordToggle, setShowPasswordToggle] = useState(false)
  const [showCount, setShowCount] = useState(false)
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined)
  const [minVal, setMinVal] = useState<number | undefined>(undefined)
  const [maxVal, setMaxVal] = useState<number | undefined>(undefined)
  const [stepVal, setStepVal] = useState<number | undefined>(undefined)
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isMultiline, setIsMultiline] = useState(false)
  const [fullWidth, setFullWidth] = useState(true)
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'code'>('preview')

  // Live sandbox text value
  const [sandboxValue, setSandboxValue] = useState('')
  const [sandboxLabel, setSandboxLabel] = useState('Label Input')
  const [sandboxPlaceholder, setSandboxPlaceholder] = useState('Label')

  // Apply preset configuration
  const handleSelectPreset = (
    key: 'label' | 'value' | 'idpel' | 'doa' | 'rp' | 'number' | 'currency_id' | 'currency_usd' | 'domain'
  ) => {
    setPreset(key)
    switch (key) {
      case 'label':
        setSandboxLabel('')
        setSandboxPlaceholder('Label')
        setSandboxValue('')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'value':
        setSandboxLabel('')
        setSandboxPlaceholder('Label')
        setSandboxValue('Value')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'idpel':
        setSandboxLabel('')
        setSandboxPlaceholder('Nomor IDPEL')
        setSandboxValue('87654321908')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(true)
        break
      case 'doa':
        setSandboxLabel('')
        setSandboxPlaceholder('Tulis Doa')
        setSandboxValue('Semoga berkah ya')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(true)
        setMaxLength(75)
        setIsError(false)
        break
      case 'rp':
        setSandboxLabel('')
        setSandboxPlaceholder('Dari')
        setSandboxValue('')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('Rp')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'number':
        setSandboxLabel('Nominal Transfer (type="number")')
        setSandboxPlaceholder('0')
        setSandboxValue('250000')
        setInputType('number')
        setFormatMode('none')
        setPrefixBlockVal('Rp')
        setSuffixBlockVal('none')
        setMinVal(10000)
        setMaxVal(50000000)
        setStepVal(10000)
        setClearable(true)
        setShowCount(false)
        setIsError(false)
        break
      case 'currency_id':
        setSandboxLabel('Nominal Transfer Rupiah (Rp 1.000.000,00)')
        setSandboxPlaceholder('0,00')
        setSandboxValue('1000000')
        setInputType('text')
        setFormatMode('currency')
        setPrefixBlockVal('Rp')
        setSuffixBlockVal('none')
        setThousandSep('.')
        setDecimalSep(',')
        setDecimalScale(2)
        setFixedDecimals(true)
        setClearable(true)
        setShowCount(false)
        setIsError(false)
        break
      case 'currency_usd':
        setSandboxLabel('Foreign Exchange Transfer (USD $1,250,000.50)')
        setSandboxPlaceholder('0.00')
        setSandboxValue('1250000.50')
        setInputType('text')
        setFormatMode('currency')
        setPrefixBlockVal('$')
        setSuffixBlockVal('none')
        setThousandSep(',')
        setDecimalSep('.')
        setDecimalScale(2)
        setFixedDecimals(false)
        setClearable(true)
        setShowCount(false)
        setIsError(false)
        break
      case 'domain':
        setSandboxLabel('')
        setSandboxPlaceholder('perusahaan')
        setSandboxValue('')
        setInputType('text')
        setFormatMode('none')
        setPrefixBlockVal('none')
        setSuffixBlockVal('.com')
        setShowCount(false)
        setIsError(false)
        break
    }
  }

  // ── Generated JSX Code ─────────────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<TextField']
    if (sandboxLabel) lines.push(`  label="${sandboxLabel}"`)
    if (sandboxPlaceholder) lines.push(`  placeholder="${sandboxPlaceholder}"`)
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (borderRadius !== 12) lines.push(`  borderRadius="${borderRadius}px"`)
    if (prefixBlockVal !== 'none') lines.push(`  prefixBlock="${prefixBlockVal}"`)
    if (suffixBlockVal !== 'none') lines.push(`  suffixBlock="${suffixBlockVal}"`)
    if (startAdornmentVal === 'search') lines.push('  startAdornment={<SearchIcon />}')
    if (startAdornmentVal === 'email') lines.push('  startAdornment={<EmailIcon />}')
    if (startAdornmentVal === 'lock') lines.push('  startAdornment={<LockIcon />}')
    if (clearable) lines.push('  clearable')
    if (showPasswordToggle) lines.push('  type="password"\n  showPasswordToggle')
    if (showCount) lines.push(`  showCount\n  maxLength={${maxLength ?? 75}}`)
    if (isMultiline) lines.push('  multiline\n  rows={3}')
    if (isError) lines.push('  error\n  helperText="No. Meter/IDPEL tidak terdaftar"')
    if (isDisabled) lines.push('  disabled')
    if (!fullWidth) lines.push('  fullWidth={false}')
    lines.push(`  value={value}`)
    lines.push('  onValueChange={(val) => setValue(val)}')
    lines.push('/>')
    return lines.join('\n')
  }, [
    sandboxLabel,
    sandboxPlaceholder,
    size,
    borderRadius,
    prefixBlockVal,
    suffixBlockVal,
    startAdornmentVal,
    clearable,
    showPasswordToggle,
    showCount,
    maxLength,
    isMultiline,
    isError,
    isDisabled,
    fullWidth,
  ])

  // RHF submission state
  const [formSubmitted, setFormSubmitted] = useState<DemoFormValues | null>(null)

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="TextField Component"
      subtitle="Universal Layer 1 Text Input & Textarea Primitive"
      subtitleDescription="Type-safe, accessible text field supporting placeholder states, active teal focus, error messages, character counter (e.g. 15/75), shaded prefix/suffix blocks, and form integration."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'TextField Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Prop Configurator Sandbox ── */}
          <Card
            title="Interactive Prop Configurator"
            subtitle="Test all states, customize prefix/suffix blocks, character counters, and inspect code in real-time"
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
                    {/* Reference Preset Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Reference Preset
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={preset}
                        onChange={(e) =>
                          handleSelectPreset(
                            e.target.value as
                              | 'label'
                              | 'value'
                              | 'idpel'
                              | 'doa'
                              | 'rp'
                              | 'number'
                              | 'currency_id'
                              | 'currency_usd'
                              | 'domain'
                          )
                        }
                      >
                        <FormControlLabel value="label" control={<MuiRadio size="small" />} label="1. Placeholder" />
                        <FormControlLabel value="value" control={<MuiRadio size="small" />} label="2. Active Value" />
                        <FormControlLabel value="idpel" control={<MuiRadio size="small" />} label="3. Error (IDPEL)" />
                        <FormControlLabel value="doa" control={<MuiRadio size="small" />} label="4. Counter (15/75)" />
                        <FormControlLabel value="rp" control={<MuiRadio size="small" />} label="5. Prefix Rp" />
                        <FormControlLabel value="number" control={<MuiRadio size="small" />} label="6. Number (Rp)" />
                        <FormControlLabel value="currency_id" control={<MuiRadio size="small" />} label="7. Rp 1.000.000,00" />
                        <FormControlLabel value="currency_usd" control={<MuiRadio size="small" />} label="8. $ 1,250,000.50" />
                        <FormControlLabel value="domain" control={<MuiRadio size="small" />} label="9. Suffix .com" />
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
                        onChange={(e) => setSize(e.target.value as TextFieldSize)}
                      >
                        <FormControlLabel value="small" control={<MuiRadio size="small" />} label="Small (40px)" />
                        <FormControlLabel value="medium" control={<MuiRadio size="small" />} label="Medium (48px)" />
                        <FormControlLabel value="large" control={<MuiRadio size="small" />} label="Large (56px)" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Prefix Block Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Prefix Block (`prefixBlock`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={prefixBlockVal}
                        onChange={(e) =>
                          setPrefixBlockVal(e.target.value as 'none' | 'Rp' | '$' | '+62')
                        }
                      >
                        <FormControlLabel value="none" control={<MuiRadio size="small" />} label="None" />
                        <FormControlLabel value="Rp" control={<MuiRadio size="small" />} label="Rp (Shaded)" />
                        <FormControlLabel value="$" control={<MuiRadio size="small" />} label="$" />
                        <FormControlLabel value="+62" control={<MuiRadio size="small" />} label="+62" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Suffix Block Selector */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Suffix Block (`suffixBlock`)
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={suffixBlockVal}
                        onChange={(e) =>
                          setSuffixBlockVal(e.target.value as 'none' | '.com' | '/bln' | 'IDR')
                        }
                      >
                        <FormControlLabel value="none" control={<MuiRadio size="small" />} label="None" />
                        <FormControlLabel value=".com" control={<MuiRadio size="small" />} label=".com" />
                        <FormControlLabel value="/bln" control={<MuiRadio size="small" />} label="/bln" />
                        <FormControlLabel value="IDR" control={<MuiRadio size="small" />} label="IDR" />
                      </MuiRadioGroup>
                    </FormControl>

                    {/* Start Adornment */}
                    <FormControl component="fieldset" size="small">
                      <FormLabel sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Start Adornment Icon
                      </FormLabel>
                      <MuiRadioGroup
                        row
                        value={startAdornmentVal}
                        onChange={(e) =>
                          setStartAdornmentVal(
                            e.target.value as 'none' | 'search' | 'email' | 'lock'
                          )
                        }
                      >
                        <FormControlLabel value="none" control={<MuiRadio size="small" />} label="None" />
                        <FormControlLabel value="search" control={<MuiRadio size="small" />} label="Search" />
                        <FormControlLabel value="email" control={<MuiRadio size="small" />} label="Email" />
                        <FormControlLabel value="lock" control={<MuiRadio size="small" />} label="Lock" />
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

                    {/* Feature Toggles */}
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.8125rem', color: TEXT_MAIN, mb: 0.5 }}>
                        Feature Toggles
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={clearable}
                              onChange={(e) => setClearable(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Clearable (X)</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={showPasswordToggle}
                              onChange={(e) => setShowPasswordToggle(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Password Eye</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={showCount}
                              onChange={(e) => {
                                setShowCount(e.target.checked)
                                if (e.target.checked && !maxLength) setMaxLength(75)
                              }}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Counter (15/75)</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={isMultiline}
                              onChange={(e) => setIsMultiline(e.target.checked)}
                              color="primary"
                            />
                          }
                          label={<Typography variant="body2">Multiline</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={isError}
                              onChange={(e) => setIsError(e.target.checked)}
                              color="error"
                            />
                          }
                          label={<Typography variant="body2">Error State</Typography>}
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
                    <Tab value="json" icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="State (JSON)" />
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
                      <TextField
                        label={sandboxLabel || undefined}
                        placeholder={sandboxPlaceholder}
                        value={sandboxValue}
                        onValueChange={setSandboxValue}
                        size={size}
                        borderRadius={`${borderRadius}px`}
                        prefixBlock={prefixBlockVal !== 'none' ? prefixBlockVal : undefined}
                        suffixBlock={suffixBlockVal !== 'none' ? suffixBlockVal : undefined}
                        startAdornment={
                          startAdornmentVal === 'search' ? (
                            <SearchIcon sx={{ fontSize: 20 }} />
                          ) : startAdornmentVal === 'email' ? (
                            <EmailOutlinedIcon sx={{ fontSize: 20 }} />
                          ) : startAdornmentVal === 'lock' ? (
                            <LockOutlinedIcon sx={{ fontSize: 20 }} />
                          ) : undefined
                        }
                        clearable={clearable}
                        type={showPasswordToggle ? 'password' : inputType}
                        showPasswordToggle={showPasswordToggle}
                        showCount={showCount}
                        maxLength={showCount ? (maxLength ?? 75) : undefined}
                        min={minVal}
                        max={maxVal}
                        step={stepVal}
                        format={formatMode !== 'none' ? formatMode : undefined}
                        thousandSeparator={thousandSep}
                        decimalSeparator={decimalSep}
                        decimalScale={decimalScale}
                        fixedDecimals={fixedDecimals}
                        multiline={isMultiline}
                        rows={isMultiline ? 3 : undefined}
                        error={isError}
                        disabled={isDisabled}
                        fullWidth={fullWidth}
                        helperText={
                          isError
                            ? 'No. Meter/IDPEL tidak terdaftar'
                            : formatMode === 'currency'
                              ? 'Format aktif: pemisah ribuan otomatis & koma desimal'
                              : inputType === 'number'
                                ? 'Batas minimal transfer Rp 10.000, maksimal Rp 50.000.000'
                                : 'Silakan isi kolom ini sesuai identitas yang valid'
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
                            value: sandboxValue,
                            characterLength: sandboxValue.length,
                            config: {
                              size,
                              borderRadius: `${borderRadius}px`,
                              prefixBlock: prefixBlockVal,
                              suffixBlock: suffixBlockVal,
                              startAdornment: startAdornmentVal,
                              clearable,
                              showPasswordToggle,
                              showCount,
                              maxLength,
                              isMultiline,
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

          {/* ── SECTION 2: 5-Case Reference Image Showcase (1:1 Gallery) ── */}
          <Card
            title="5-Case Reference Image Gallery (1:1 Visual Target)"
            subtitle="Direct implementation of all five target visual states specified in the reference screenshots"
            actions={<Chip label="Design Target" size="small" sx={{ bgcolor: '#E6FFFA', color: TEAL_PRIMARY, fontWeight: 700 }} />}
          >
            <Grid container spacing={3}>
              {/* Case 1: Placeholder State ("Label") */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN, mb: 1 }}>
                    1. Placeholder State (Image 1)
                  </Typography>
                  <TextField placeholder="Label" defaultValue="" />
                </Paper>
              </Grid>

              {/* Case 2: Active Focus / Value State ("Value|") */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN, mb: 1 }}>
                    2. Active Value & Focus Styling (Image 2)
                  </Typography>
                  <TextField defaultValue="Value" />
                </Paper>
              </Grid>

              {/* Case 3: Error State ("87654321908" + Helper Message) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN, mb: 1 }}>
                    3. Error State with Message (Image 3)
                  </Typography>
                  <TextField
                    defaultValue="87654321908"
                    error
                    helperText="No. Meter/IDPEL tidak terdaftar"
                  />
                </Paper>
              </Grid>

              {/* Case 4: Character Counter ("Tulis Doa" 15/75) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN, mb: 1 }}>
                    4. Character Counter Indicator (Image 4)
                  </Typography>
                  <TextField
                    placeholder="Tulis Doa"
                    defaultValue="Semoga berkah"
                    showCount
                    maxLength={75}
                  />
                </Paper>
              </Grid>

              {/* Case 5: Left Shaded Prefix Block ("Rp" + "Dari") */}
              <Grid size={{ xs: 12 }}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.875rem', color: TEXT_MAIN, mb: 1 }}>
                    5. Left Shaded Prefix Block (Image 5: "Rp" Dari)
                  </Typography>
                  <TextField prefixBlock="Rp" placeholder="Dari" />
                </Paper>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 3: React Hook Form & Zod Validation ── */}
          <Card
            title="React Hook Form Integration (createTypedForm)"
            subtitle="Type-safe Zod schema validation using Field.Text with prefix blocks, character counters, and error states"
          >
            <Form
              schema={demoFormSchema}
              defaultValues={{
                fullName: 'PT Solusindo Digital',
                idpel: '87654321908',
                nominal: '750000',
                password: '',
                prayer: 'Semoga lancar dan berkah',
              }}
              onSubmit={(values) => setFormSubmitted(values)}
            >
              <Stack spacing={2.5}>
                <Field.Text
                  name="fullName"
                  label="1. Nama Perusahaan / Merchant"
                  placeholder="Ketik nama lengkap..."
                  clearable
                />

                <Field.Text
                  name="idpel"
                  label="2. ID Pelanggan / Nomor Meter PLN"
                  placeholder="Contoh: 87654321908"
                />

                <Field.Text
                  name="nominal"
                  label="3. Nominal Pembayaran Tagihan"
                  prefixBlock="Rp"
                  placeholder="0"
                  clearable
                />

                <Field.Text
                  name="password"
                  label="4. Password Otorisasi Transaksi"
                  type="password"
                  showPasswordToggle
                  placeholder="Masukkan kata sandi..."
                  startAdornment={<LockOutlinedIcon sx={{ fontSize: 20, color: '#64748B' }} />}
                />

                <Field.Text
                  name="prayer"
                  label="5. Berita Acara / Pesan Transaksi"
                  placeholder="Tulis Doa"
                  showCount
                  maxLength={75}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained" sx={{ bgcolor: TEAL_PRIMARY, px: 3, fontWeight: 700 }}>
                    Kirim Data (Submit Form)
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
                  ✓ Data Form Berhasil Disubmit:
                </Typography>
                <pre style={{ margin: 0, fontSize: '0.8125rem', fontFamily: 'monospace', color: TEXT_MAIN }}>
                  {JSON.stringify(formSubmitted, null, 2)}
                </pre>
              </Paper>
            )}
          </Card>

          {/* ── SECTION 4: Currency & Number Format Showcase ── */}
          <Card
            title="Currency & Number Format Showcase"
            subtitle="Live demos of format='currency' with customizable separators, decimal scale, and fixed/optional cents"
          >
            <Grid container spacing={3}>
              {/* Indonesian Rupiah — No Cents */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
                    format="currency" · allowDecimals=false
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                    Whole Rupiah only (no cents)
                  </Typography>
                </Box>
                <TextField
                  label="Nominal Transfer (Tanpa Sen)"
                  format="currency"
                  prefixBlock="Rp"
                  allowDecimals={false}
                  defaultValue="1000000"
                  clearable
                  helperText="Hanya angka bulat, tanpa desimal sen"
                />
              </Grid>

              {/* Indonesian Rupiah — Optional Cents */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
                    format="currency" · allowDecimals=true
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                    Optional cents (shown only when typed)
                  </Typography>
                </Box>
                <TextField
                  label="Nominal Transfer Fleksibel"
                  format="currency"
                  prefixBlock="Rp"
                  allowDecimals
                  fixedDecimals={false}
                  defaultValue="1000000"
                  clearable
                  helperText="Ketik koma (,) untuk tambah desimal sen"
                />
              </Grid>

              {/* Indonesian Rupiah — Fixed ,00 on blur */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
                    format="currency" · fixedDecimals=true
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                    Always shows ,00 on blur (formal invoices)
                  </Typography>
                </Box>
                <TextField
                  label="Nominal Faktur Pajak (Fixed ,00)"
                  format="currency"
                  prefixBlock="Rp"
                  fixedDecimals
                  defaultValue="2500000"
                  clearable
                  helperText="Tampilkan ,00 secara otomatis saat field kehilangan fokus"
                />
              </Grid>

              {/* US Dollar */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
                    thousandSeparator="," · decimalSeparator="."
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                    US Dollar format: $ 1,250,000.50
                  </Typography>
                </Box>
                <TextField
                  label="Nominal Valas (USD)"
                  format="currency"
                  prefixBlock="$"
                  thousandSeparator=","
                  decimalSeparator="."
                  defaultValue="1250000.50"
                  clearable
                  helperText="Format internasional (koma ribuan, titik desimal)"
                />
              </Grid>

              {/* Euro — space as thousand separator */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: TEAL_PRIMARY, fontFamily: 'monospace' }}>
                    thousandSeparator=" " · decimalSeparator=","
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
                    European format: € 1 250 000,50
                  </Typography>
                </Box>
                <TextField
                  label="Nominal Valas (EUR)"
                  format="currency"
                  prefixBlock="€"
                  thousandSeparator=" "
                  decimalSeparator=","
                  defaultValue="1250000.50"
                  clearable
                  helperText="Format Eropa dengan spasi sebagai pemisah ribuan"
                />
              </Grid>

              {/* Interactive toggle: show/hide cents */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InteractiveCentsToggle />
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 5: Primitive API Reference ── */}
          <Card
            title="Primitive API Reference (TextField)"
            subtitle="Complete TypeScript properties and slotSx tokens for the Layer 1 TextField primitive"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'value',
                  type: 'string | number',
                  def: 'undefined',
                  desc: 'Controlled text value.',
                },
                {
                  prop: 'defaultValue',
                  type: 'string | number',
                  def: 'undefined',
                  desc: 'Initial text value for uncontrolled usage.',
                },
                {
                  prop: 'onValueChange',
                  type: '(value: string) => void',
                  def: 'undefined',
                  desc: 'Simplified change callback emitting the updated text string directly.',
                },
                {
                  prop: 'onChange',
                  type: '(event: ChangeEvent) => void',
                  def: 'undefined',
                  desc: 'Standard React SyntheticEvent change handler.',
                },
                {
                  prop: 'label',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Floating or static label displayed above the field.',
                },
                {
                  prop: 'placeholder',
                  type: 'string',
                  def: 'undefined',
                  desc: 'Placeholder text displayed when the input is empty.',
                },
                {
                  prop: 'prefixBlock',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Left shaded block (e.g. "Rp", "$", "+62") integrated flush with outer container.',
                },
                {
                  prop: 'suffixBlock',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Right shaded block (e.g. ".com", "/bln", "IDR") integrated flush with outer container.',
                },
                {
                  prop: 'startAdornment',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Inline leading icon or element (e.g. search icon, lock icon).',
                },
                {
                  prop: 'endAdornment',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Inline trailing icon or element.',
                },
                {
                  prop: 'clearable',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays a quick clear "X" icon button when text is present.',
                },
                {
                  prop: 'format',
                  type: "'currency' | 'number' | 'custom'",
                  def: 'undefined',
                  desc: 'Enables live number/currency formatting with thousand separators and decimal scale.',
                },
                {
                  prop: 'thousandSeparator',
                  type: 'string',
                  def: "'.'",
                  desc: 'Character used for grouping thousands (e.g. "." in Indonesia, "," in US).',
                },
                {
                  prop: 'decimalSeparator',
                  type: 'string',
                  def: "','",
                  desc: 'Character used for decimal fraction point (e.g. "," in Indonesia, "." in US).',
                },
                {
                  prop: 'decimalScale',
                  type: 'number',
                  def: '2',
                  desc: 'Maximum allowed decimal digits when format is enabled.',
                },
                {
                  prop: 'allowDecimals',
                  type: 'boolean',
                  def: 'true',
                  desc: 'Controls whether fractional decimals are allowed in format mode.',
                },
                {
                  prop: 'fixedDecimals',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Forces trailing decimal zeros (e.g. ",00") on blur.',
                },
                {
                  prop: 'formatter',
                  type: '(value: string) => string',
                  def: 'undefined',
                  desc: 'Custom formatter function for bespoke mask/account formatting.',
                },
                {
                  prop: 'parser',
                  type: '(displayValue: string) => string',
                  def: 'undefined',
                  desc: 'Custom parser function converting display value back to clean form value.',
                },
                {
                  prop: 'type',
                  type: "'text' | 'password' | 'number' | 'email' | 'tel' | 'url'",
                  def: "'text'",
                  desc: 'Input HTML type. type="number" removes browser spin buttons and prevents accidental scroll modification by default.',
                },
                {
                  prop: 'min',
                  type: 'number',
                  def: 'undefined',
                  desc: 'Minimum numerical value allowed when type="number".',
                },
                {
                  prop: 'max',
                  type: 'number',
                  def: 'undefined',
                  desc: 'Maximum numerical value allowed when type="number".',
                },
                {
                  prop: 'step',
                  type: "number | 'any'",
                  def: 'undefined',
                  desc: 'Stepper interval increment for numerical fields (e.g. 1000 or 0.01).',
                },
                {
                  prop: 'hideSpinButtons',
                  type: 'boolean',
                  def: 'true',
                  desc: 'Hides native browser up/down stepper arrows for a clean fintech input.',
                },
                {
                  prop: 'allowScrollWheel',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Controls whether mouse wheel scrolling increments/decrements number inputs when focused.',
                },
                {
                  prop: 'showPasswordToggle',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays an eye icon button to toggle password visibility when type="password".',
                },
                {
                  prop: 'showCount',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays an inline character count indicator (e.g. "15/75").',
                },
                {
                  prop: 'maxLength',
                  type: 'number',
                  def: 'undefined',
                  desc: 'Maximum allowed character limit; prevents additional typing when exceeded.',
                },
                {
                  prop: 'multiline',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Renders a multi-line <textarea> input instead of a single-line input.',
                },
                {
                  prop: 'rows',
                  type: 'number | string',
                  def: 'undefined',
                  desc: 'Number of visible text lines when multiline=true.',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Controls component height: small (40px), medium (48px), or large (56px).',
                },
                {
                  prop: 'borderRadius',
                  type: 'number | string',
                  def: "'12px'",
                  desc: 'Controls corner border radius for the input container.',
                },
                {
                  prop: 'error',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Applies red error border (#EF4444) and helper text styling.',
                },
                {
                  prop: 'disabled',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Disables user interaction and applies muted background styling.',
                },
                {
                  prop: 'readOnly',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Prevents editing while maintaining normal active background styling.',
                },
                {
                  prop: 'required',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Displays a red asterisk on the field label.',
                },
                {
                  prop: 'fullWidth',
                  type: 'boolean',
                  def: 'true',
                  desc: 'Expands the field width to 100% of its parent container.',
                },
                {
                  prop: 'helperText',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Helper caption or error message displayed below the field.',
                },
                {
                  prop: 'slotSx.root',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the outer FormControl container wrapper.',
                },
                {
                  prop: 'slotSx.input',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the inner OutlinedInput / InputBase element.',
                },
                {
                  prop: 'slotSx.inputLabel',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the InputLabel text above the field.',
                },
                {
                  prop: 'slotSx.prefixBlock',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the left shaded prefix container.',
                },
                {
                  prop: 'slotSx.suffixBlock',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the right shaded suffix container.',
                },
                {
                  prop: 'slotSx.characterCount',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the character counter typography element.',
                },
                {
                  prop: 'slotSx.clearButton',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the clear "X" icon button.',
                },
                {
                  prop: 'slotSx.passwordToggleButton',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the eye visibility toggle icon button.',
                },
                {
                  prop: 'slotSx.helperText',
                  type: 'SxProps<Theme>',
                  def: 'undefined',
                  desc: 'Styles the FormHelperText below the input.',
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
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748B', display: 'block', mb: 1 }}>
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
