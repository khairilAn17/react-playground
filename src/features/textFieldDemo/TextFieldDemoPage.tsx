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
  const [preset, setPreset] = useState<'label' | 'value' | 'idpel' | 'doa' | 'rp' | 'domain'>('label')
  const [size, setSize] = useState<TextFieldSize>('medium')
  const [borderRadius, setBorderRadius] = useState<number>(12)
  const [prefixBlockVal, setPrefixBlockVal] = useState<'none' | 'Rp' | '$' | '+62'>('none')
  const [suffixBlockVal, setSuffixBlockVal] = useState<'none' | '.com' | '/bln' | 'IDR'>('none')
  const [startAdornmentVal, setStartAdornmentVal] = useState<'none' | 'search' | 'email' | 'lock'>('none')
  const [clearable, setClearable] = useState(false)
  const [showPasswordToggle, setShowPasswordToggle] = useState(false)
  const [showCount, setShowCount] = useState(false)
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined)
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
  const handleSelectPreset = (key: 'label' | 'value' | 'idpel' | 'doa' | 'rp' | 'domain') => {
    setPreset(key)
    switch (key) {
      case 'label':
        setSandboxLabel('')
        setSandboxPlaceholder('Label')
        setSandboxValue('')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'value':
        setSandboxLabel('')
        setSandboxPlaceholder('Label')
        setSandboxValue('Value')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'idpel':
        setSandboxLabel('')
        setSandboxPlaceholder('Nomor IDPEL')
        setSandboxValue('87654321908')
        setPrefixBlockVal('none')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(true)
        break
      case 'doa':
        setSandboxLabel('')
        setSandboxPlaceholder('Tulis Doa')
        setSandboxValue('Semoga berkah ya')
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
        setPrefixBlockVal('Rp')
        setSuffixBlockVal('none')
        setShowCount(false)
        setIsError(false)
        break
      case 'domain':
        setSandboxLabel('')
        setSandboxPlaceholder('perusahaan')
        setSandboxValue('')
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
                            e.target.value as 'label' | 'value' | 'idpel' | 'doa' | 'rp' | 'domain'
                          )
                        }
                      >
                        <FormControlLabel value="label" control={<MuiRadio size="small" />} label="1. Placeholder" />
                        <FormControlLabel value="value" control={<MuiRadio size="small" />} label="2. Active Value" />
                        <FormControlLabel value="idpel" control={<MuiRadio size="small" />} label="3. Error (IDPEL)" />
                        <FormControlLabel value="doa" control={<MuiRadio size="small" />} label="4. Counter (15/75)" />
                        <FormControlLabel value="rp" control={<MuiRadio size="small" />} label="5. Prefix Rp" />
                        <FormControlLabel value="domain" control={<MuiRadio size="small" />} label="6. Suffix .com" />
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
                        type={showPasswordToggle ? 'password' : 'text'}
                        showPasswordToggle={showPasswordToggle}
                        showCount={showCount}
                        maxLength={showCount ? (maxLength ?? 75) : undefined}
                        multiline={isMultiline}
                        rows={isMultiline ? 3 : undefined}
                        error={isError}
                        disabled={isDisabled}
                        fullWidth={fullWidth}
                        helperText={
                          isError
                            ? 'No. Meter/IDPEL tidak terdaftar'
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
        </Stack>
      </PageLayout.Content>
    </PageLayout>
  )
}
