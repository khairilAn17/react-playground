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
  TextField,
  Paper,
  Tabs,
  Tab,
  Link,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import TuneIcon from '@mui/icons-material/Tune'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'

import { PageLayout } from '../../widgets/pageLayout'
import { Card } from '../../components/card'
import { Label } from '../../components/label'

const TEAL_PRIMARY = '#00A39D'
const TEXT_MAIN = '#1E293B'
const TEXT_MUTED = '#64748B'

export function LabelDemoPage() {
  // ── Interactive Sandbox State ──────────────────────────────────────────────
  const [labelText, setLabelText] = useState('Nomor Pokok Wajib Pajak (NPWP)')
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [isRequired, setIsRequired] = useState(true)
  const [isOptional, setIsOptional] = useState(false)
  const [hasTooltip, setHasTooltip] = useState(true)
  const [hasAction, setHasAction] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'code'>('preview')

  // ── Generated Code ─────────────────────────────────────────────────────────
  const generatedCode = useMemo(() => {
    const lines: string[] = ['<Label']
    if (isRequired) lines.push('  required')
    if (isOptional) lines.push('  optional')
    if (hasTooltip) lines.push('  tooltip="Format 16 digit sesuai identitas resmi perpajakan"')
    if (hasAction) lines.push('  action={<Link href="#help">Bantuan?</Link>}')
    if (size !== 'medium') lines.push(`  size="${size}"`)
    if (isError) lines.push('  error')
    if (isDisabled) lines.push('  disabled')
    lines.push(`  htmlFor="field-id"`)
    lines.push('>')
    lines.push(`  ${labelText}`)
    lines.push('</Label>')
    return lines.join('\n')
  }, [isRequired, isOptional, hasTooltip, hasAction, size, isError, isDisabled, labelText])

  return (
    <PageLayout
      maxWidth="lg"
      bgVariant="transparent"
      title="Label Component"
      subtitle="Universal Layer 1 Accessible Form Label Primitive"
      subtitleDescription="Accessible, high-utility label component supporting required asterisks, optional tags, interactive context tooltips, trailing actions, and granular slotSx theming."
      breadcrumbs={[
        { label: 'Component Docs', href: '#' },
        { label: 'Label Primitive' },
      ]}
      status={<Chip label="Layer 1 UI Primitive" color="primary" size="small" />}
    >
      <PageLayout.Content>
        <Stack spacing={4}>
          {/* ── SECTION 1: Interactive Configurator Sandbox ── */}
          <Card
            title="Interactive Prop Configurator"
            subtitle="Customize props and inspect live rendered label elements in real-time"
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
                    {/* Label Text Input */}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.75 }}>
                        Label Text (`children` / `text`)
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        value={labelText}
                        onChange={(e) => setLabelText(e.target.value)}
                        placeholder="Ketik teks label..."
                      />
                    </Box>

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
                        <FormControlLabel value="small" control={<Radio size="small" />} label="Small (13px)" />
                        <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium (14px)" />
                        <FormControlLabel value="large" control={<Radio size="small" />} label="Large (16px)" />
                      </RadioGroup>
                    </FormControl>

                    {/* Feature Toggles */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Required Asterisk (`required`)
                        </Typography>
                        <Switch checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Optional Tag (`optional`)
                        </Typography>
                        <Switch checked={isOptional} onChange={(e) => setIsOptional(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Context Tooltip (`tooltip`)
                        </Typography>
                        <Switch checked={hasTooltip} onChange={(e) => setHasTooltip(e.target.checked)} color="primary" />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MAIN }}>
                          Trailing Action (`action`)
                        </Typography>
                        <Switch checked={hasAction} onChange={(e) => setHasAction(e.target.checked)} color="primary" />
                      </Box>
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

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: '#F8FAFC',
                        borderRadius: '10px',
                        border: '1px dashed #CBD5E1',
                      }}
                    >
                      <Label
                        htmlFor="sandbox-input"
                        size={size}
                        required={isRequired}
                        optional={isOptional}
                        tooltip={hasTooltip ? 'Format 16 digit sesuai identitas resmi perpajakan B2B' : undefined}
                        action={
                          hasAction ? (
                            <Link href="#help" underline="hover" sx={{ color: TEAL_PRIMARY, fontWeight: 600, fontSize: '0.8125rem' }}>
                              Panduan Format
                            </Link>
                          ) : undefined
                        }
                        error={isError}
                        disabled={isDisabled}
                      >
                        {labelText}
                      </Label>

                      <TextField
                        id="sandbox-input"
                        fullWidth
                        size={size === 'large' ? 'medium' : size}
                        placeholder="Klik label di atas untuk auto-focus input ini..."
                        error={isError}
                        disabled={isDisabled}
                        helperText={isError ? 'Terjadi kesalahan format pada input ini' : undefined}
                      />
                    </Paper>
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
                      <Tab icon={<CheckCircleOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="preview" label="Accessibility Summary" />
                      <Tab icon={<DataObjectOutlinedIcon sx={{ fontSize: 16 }} />} iconPosition="start" value="json" label="Active Props JSON" />
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
                          ✓ Accessibility & Semantics:
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MAIN, display: 'block' }}>
                          • <code>component=&quot;label&quot;</code> with <code>htmlFor=&quot;sandbox-input&quot;</code> ensures screen readers and clicks focus the associated input.
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_MAIN, display: 'block' }}>
                          • Required asterisk uses <code>aria-hidden=&quot;true&quot;</code> to prevent double-reading &quot;star&quot; by assistive devices.
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
                          { text: labelText, size, required: isRequired, optional: isOptional, hasTooltip, hasAction, error: isError, disabled: isDisabled },
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

          {/* ── SECTION 2: Real-World Presets ── */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Financial & Security Form Labels"
                subtitle="Examples for corporate banking authentication and transactions"
              >
                <Stack spacing={3}>
                  <Box>
                    <Label
                      htmlFor="pwd-field"
                      required
                      action={
                        <Link href="#forgot" underline="hover" sx={{ color: TEAL_PRIMARY, fontSize: '0.8125rem', fontWeight: 600 }}>
                          Lupa Kata Sandi?
                        </Link>
                      }
                    >
                      Kata Sandi Transaksi
                    </Label>
                    <TextField id="pwd-field" type="password" fullWidth placeholder="Masukkan kata sandi..." size="small" />
                  </Box>

                  <Box>
                    <Label
                      htmlFor="token-field"
                      required
                      tooltip="Masukkan 6-digit kode OTP yang dikirimkan ke aplikasi BYOND Mobile"
                    >
                      Kode Otorisasi Hard Token
                    </Label>
                    <TextField id="token-field" fullWidth placeholder="6-digit token..." size="small" />
                  </Box>
                </Stack>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                title="Tax & Corporate Identity Labels"
                subtitle="Examples with contextual help tooltips and optional tags"
              >
                <Stack spacing={3}>
                  <Box>
                    <Label
                      htmlFor="npwp-field"
                      required
                      tooltip="NPWP 16 digit format baru sesuai NIK Direktur atau Badan Usaha"
                    >
                      Nomor Pokok Wajib Pajak (NPWP)
                    </Label>
                    <TextField id="npwp-field" fullWidth placeholder="01.234.567.8-901.000" size="small" />
                  </Box>

                  <Box>
                    <Label
                      htmlFor="ext-field"
                      optional
                      tooltip="Nomor ekstensi telepon cabang jika tersedia"
                    >
                      Nomor Ekstensi Telepon
                    </Label>
                    <TextField id="ext-field" fullWidth placeholder="Ext. 4021" size="small" />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>

          {/* ── SECTION 3: Sizing & States Matrix ── */}
          <Card
            title="Label Size Variants & State Modifiers"
            subtitle="Explore small (13px), medium (14px), large (16px), error, and disabled states"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 1.5 }}>
                    1. Size Variants (13px, 14px, 16px)
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box>
                      <Label size="small" required optional tooltip="Font size 13px">
                        Small Label (size=&quot;small&quot;)
                      </Label>
                      <TextField size="small" fullWidth placeholder="Small field..." />
                    </Box>

                    <Box>
                      <Label size="medium" required optional tooltip="Font size 14px (Default)">
                        Medium Label (size=&quot;medium&quot;)
                      </Label>
                      <TextField size="medium" fullWidth placeholder="Medium field..." />
                    </Box>

                    <Box>
                      <Label size="large" required optional tooltip="Font size 16px">
                        Large Label (size=&quot;large&quot;)
                      </Label>
                      <TextField fullWidth placeholder="Large field..." />
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 1.5 }}>
                    2. State Modifiers (Error & Disabled)
                  </Typography>

                  <Stack spacing={2.5}>
                    <Box>
                      <Label error required text="Alamat Email Terdaftar (Error State)" tooltip="Format email tidak sesuai standar" />
                      <TextField fullWidth size="small" error placeholder="email@invalid" helperText="Wajib menggunakan domain perusahaan resmi" />
                    </Box>

                    <Box>
                      <Label disabled text="Nomor Rekening Terkunci (Disabled State)" tooltip="Rekening telah diverifikasi dan tidak dapat diubah" />
                      <TextField fullWidth size="small" disabled value="8830-0019-2810" />
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 4: Granular slotSx Sub-Slots ── */}
          <Card
            title="Granular slotSx Sub-Slots"
            subtitle="Style individual sub-elements — label text, asterisk color, optional badge, tooltip icon, and trailing action"
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    Custom Asterisk & Muted Optional Badge
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Override `slotSx.asterisk` color and `slotSx.optional` font style.
                  </Typography>

                  <Label
                    required
                    optional="(Opsional)"
                    tooltip="Kustomisasi slot asterisk merah tua dan tag italic"
                    slotSx={{
                      asterisk: { color: '#B91C1C', fontSize: '1.1rem' },
                      optional: { color: '#64748B', fontStyle: 'italic' },
                    }}
                  >
                    Nomor Rekening Payroll
                  </Label>
                  <TextField fullWidth size="small" placeholder="8830-xxxx-xxxx" />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT_MAIN, mb: 0.5 }}>
                    Custom Tooltip Icon & Bold Label Text
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, display: 'block', mb: 2 }}>
                    Override `slotSx.tooltipIcon` color and `slotSx.text` letter spacing.
                  </Typography>

                  <Label
                    required
                    tooltip="Tooltip icon styled in teal with bold headline text"
                    slotSx={{
                      text: { color: '#1E293B', fontWeight: 800, letterSpacing: '0.02em' },
                      tooltipIcon: { color: TEAL_PRIMARY },
                    }}
                  >
                    ID Merchant B2B
                  </Label>
                  <TextField fullWidth size="small" placeholder="MCH-88201" />
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ── SECTION 5: Primitive API Reference Matrix ── */}
          <Card
            title="Layer 1 Primitive API Reference"
            subtitle="Full breakdown of props supported by the Label component"
          >
            <Grid container spacing={2}>
              {[
                {
                  prop: 'children / text',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Primary label text or JSX content.',
                },
                {
                  prop: 'htmlFor',
                  type: 'string',
                  def: 'undefined',
                  desc: 'ID of the associated form input element for accessibility binding.',
                },
                {
                  prop: 'required',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Renders an accessible red asterisk (*) indicating a required field.',
                },
                {
                  prop: 'optional',
                  type: 'boolean | ReactNode',
                  def: 'false',
                  desc: 'Renders an (Opsional) badge or custom optional node.',
                },
                {
                  prop: 'tooltip',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Displays an interactive info icon with a hover/focus tooltip popover.',
                },
                {
                  prop: 'action',
                  type: 'ReactNode',
                  def: 'undefined',
                  desc: 'Trailing action element aligned to the right (e.g. "Lupa Password?", "Bantuan?").',
                },
                {
                  prop: 'size',
                  type: "'small' | 'medium' | 'large'",
                  def: "'medium'",
                  desc: 'Controls typography size: small (13px), medium (14px), or large (16px).',
                },
                {
                  prop: 'error',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Applies error color palette to the label text.',
                },
                {
                  prop: 'disabled',
                  type: 'boolean',
                  def: 'false',
                  desc: 'Fades label color and sets cursor to not-allowed.',
                },
                {
                  prop: 'slotSx',
                  type: 'LabelSlotSx',
                  def: '{}',
                  desc: 'Granular slot overrides for root, text, asterisk, optional, tooltipIcon, and action.',
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
