import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import PeopleIcon from '@mui/icons-material/People'
import SecurityIcon from '@mui/icons-material/Security'
import EditIcon from '@mui/icons-material/Edit'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LayersIcon from '@mui/icons-material/Layers'
import ArticleIcon from '@mui/icons-material/Article'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'

import { PageLayout } from '../../components/pageLayout'
import type { PageMaxWidth } from '../../components/pageLayout'

// ─── Prop Reference Table ───────────────────────────────────────────────────
const propRows = [
  { prop: 'maxWidth', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", desc: 'Responsive container width preset' },
  { prop: 'compact', type: 'boolean', default: 'false', desc: 'Reduces vertical padding density' },
  { prop: 'loading', type: 'boolean', default: 'false', desc: 'Renders PageSkeleton instead of children' },
  { prop: 'bgVariant', type: "'default' | 'paper' | 'transparent'", default: "'default'", desc: 'Background color token preset' },
  { prop: 'children', type: 'ReactNode', default: '—', desc: 'Content via compound components' },
]

const subComponents = [
  { name: 'PageLayout.TopBar', desc: 'Injects arbitrary children into the AppShell AppBar slot via context — renders nothing in-place' },
  { name: 'PageLayout.Header', desc: 'Page title, breadcrumbs, subtitle, status chip, actions, back button, extra widget slot' },
  { name: 'PageLayout.Breadcrumbs', desc: 'Standalone breadcrumb navigation hierarchy' },
  { name: 'PageLayout.Content', desc: 'Vertical flex container for spacing children' },
  { name: 'PageLayout.Section', desc: "Card/plain block with header, description, divider, action slot. variant='card' | 'plain'" },
  { name: 'PageLayout.StickyFooter', desc: "Sticky bottom action bar. align='left' | 'center' | 'right' | 'between'" },
  { name: 'PageLayout.Skeleton', desc: 'Loading placeholder skeleton (auto-rendered when loading=true)' },
]

// ─── Section label chip ──────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          borderRadius: 1,
        }}
      />
      <Divider sx={{ flex: 1 }} />
    </Box>
  )
}

// ─── Main Demo Component ──────────────────────────────────────────────────────
export function PageLayoutDemo() {
  const [maxWidth, setMaxWidth] = useState<PageMaxWidth>('lg')
  const [loading, setLoading] = useState(false)
  const [compact, setCompact] = useState(false)
  const [bgVariant, setBgVariant] = useState<'default' | 'paper' | 'transparent'>('default')
  const [sectionVariant, setSectionVariant] = useState<'card' | 'plain'>('card')
  const [footerAlign, setFooterAlign] = useState<'left' | 'center' | 'right' | 'between'>('right')
  const [activeTab, setActiveTab] = useState(0)

  return (
    <PageLayout maxWidth="lg">
      <PageLayout.TopBar>
        <Chip
          label="Navigation & Layout"
          size="small"
          variant="outlined"
          sx={{ mr: 0.5, fontSize: '0.72rem' }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
          /
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
          PageLayout Specification
        </Typography>
        <Chip label="Architecture" color="primary" size="small" sx={{ ml: 1, mr: 1 }} />
        <PageLayout.TopBar.Search placeholder="Search specification…" />
      </PageLayout.TopBar>

      <PageLayout.Header
        title="PageLayout — Living Specification"
        subtitle="A compound component system built on 5 principles: Reusable · Customizable · Scalable · Readable · Maintainable"
        breadcrumbs={[
          { label: 'Navigation & Layout', href: '#' },
          { label: 'PageLayout Specification' },
        ]}
        status={<Chip label="Component Architecture" color="primary" size="small" icon={<LayersIcon sx={{ fontSize: '0.9rem !important' }} />} />}
      />

      {/* ── Navigation Tabs ── */}
      <Paper variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ px: 1 }}
          slotProps={{ indicator: { style: { height: 3, borderRadius: 2 } } }}
        >
          <Tab icon={<DashboardIcon fontSize="small" />} iconPosition="start" label="Interactive Playground" />
          <Tab icon={<ArticleIcon fontSize="small" />} iconPosition="start" label="Sub-Component Reference" />
          <Tab icon={<SettingsIcon fontSize="small" />} iconPosition="start" label="Prop API" />
        </Tabs>
      </Paper>

      {/* ══════════════════════════════════════════════════════
          TAB 0 — Interactive Playground
      ══════════════════════════════════════════════════════ */}
      {activeTab === 0 && (
        <Box>
          {/* Controls */}
          <Paper variant="outlined" sx={{ p: 2.5, mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Controls — Modify props to see live changes below ↓
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 2 }}
            >
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>maxWidth</InputLabel>
                <Select
                  value={maxWidth}
                  label="maxWidth"
                  onChange={(e) => setMaxWidth(e.target.value as PageMaxWidth)}
                >
                  <MenuItem value="xs">xs — 440px</MenuItem>
                  <MenuItem value="sm">sm — 640px</MenuItem>
                  <MenuItem value="md">md — 900px</MenuItem>
                  <MenuItem value="lg">lg — 1200px</MenuItem>
                  <MenuItem value="xl">xl — 1536px</MenuItem>
                  <MenuItem value="full">full — 100%</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>bgVariant</InputLabel>
                <Select
                  value={bgVariant}
                  label="bgVariant"
                  onChange={(e) =>
                    setBgVariant(e.target.value as 'default' | 'paper' | 'transparent')
                  }
                >
                  <MenuItem value="default">default</MenuItem>
                  <MenuItem value="paper">paper</MenuItem>
                  <MenuItem value="transparent">transparent</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Section variant</InputLabel>
                <Select
                  value={sectionVariant}
                  label="Section variant"
                  onChange={(e) => setSectionVariant(e.target.value as 'card' | 'plain')}
                >
                  <MenuItem value="card">card (outlined Card)</MenuItem>
                  <MenuItem value="plain">plain (borderless Box)</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Footer align</InputLabel>
                <Select
                  value={footerAlign}
                  label="Footer align"
                  onChange={(e) =>
                    setFooterAlign(e.target.value as 'left' | 'center' | 'right' | 'between')
                  }
                >
                  <MenuItem value="left">left</MenuItem>
                  <MenuItem value="center">center</MenuItem>
                  <MenuItem value="right">right</MenuItem>
                  <MenuItem value="between">between</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={loading}
                    onChange={(e) => setLoading(e.target.checked)}
                  />
                }
                label="loading"
              />

              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={compact}
                    onChange={(e) => setCompact(e.target.checked)}
                  />
                }
                label="compact"
              />
            </Stack>
          </Paper>

          {/* Live Rendered PageLayout */}
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'grey.50' }}>
            <Box sx={{ p: 1.5, bgcolor: 'grey.100', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c840' }} />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  PageLayout Preview — maxWidth: {maxWidth} · bgVariant: {bgVariant} · compact: {String(compact)} · loading: {String(loading)}
                </Typography>
              </Stack>
            </Box>

            <PageLayout
              maxWidth={maxWidth}
              loading={loading}
              compact={compact}
              bgVariant={bgVariant}
            >
              <PageLayout.Header
                title="Team & Member Directory"
                subtitle="Manage workspace users, access controls, and security policies."
                breadcrumbs={[
                  { label: 'Workspace', href: '#' },
                  { label: 'Settings', href: '#' },
                  { label: 'Members' },
                ]}
                status={<Chip label="42 Active" color="primary" size="small" />}
                actions={
                  <>
                    <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
                      Export
                    </Button>
                    <Button variant="contained" size="small" startIcon={<AddIcon />}>
                      Invite
                    </Button>
                  </>
                }
              />

              <PageLayout.Content>
                <Grid container spacing={2.5}>
                  {[
                    { label: 'Engineering', count: 24, note: '+3 this month', color: 'success.main' },
                    { label: 'Design', count: 10, note: 'Full capacity', color: 'text.secondary' },
                    { label: 'Product', count: 8, note: '2 pending invites', color: 'warning.main' },
                  ].map(({ label, count, note, color }) => (
                    <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {label}
                            </Typography>
                            <PeopleIcon fontSize="small" color="action" />
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            {count}
                          </Typography>
                          <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
                            {note}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <PageLayout.Section
                  variant={sectionVariant}
                  title="Organization Access Policy"
                  description="Configure default role permissions assigned to newly invited members."
                  actions={
                    <Button size="small" variant="text" startIcon={<SecurityIcon />}>
                      Manage Roles
                    </Button>
                  }
                >
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Newly added members receive <strong>Developer</strong> level access automatically.
                    Admin elevation requires 2-Factor Authentication.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="Default Role: Developer" variant="outlined" size="small" />
                    <Chip label="SSO: Enabled" variant="outlined" color="success" size="small" />
                    <Chip label="Session Timeout: 24h" variant="outlined" size="small" />
                  </Box>
                </PageLayout.Section>

                <PageLayout.Section
                  variant={sectionVariant}
                  title="Recent Activity"
                  description="Last 5 member events across all teams."
                  divider
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Member</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell align="right">Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        { member: 'Alice Chen', event: 'Joined Engineering', time: '2m ago', color: 'primary' },
                        { member: 'Bob Kumar', event: 'Promoted to Admin', time: '1h ago', color: 'warning' },
                        { member: 'Carol Davis', event: 'Invited to Design', time: '3h ago', color: 'secondary' },
                        { member: 'Dan Park', event: 'Deactivated account', time: '1d ago', color: 'error' },
                        { member: 'Eva Sato', event: 'Password reset', time: '2d ago', color: 'default' },
                      ].map(({ member, event, time, color }) => (
                        <TableRow key={member} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: `${color}.main` }}>
                                {member[0]}
                              </Avatar>
                              <Typography variant="body2">{member}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {event}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="caption" color="text.disabled">
                              {time}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </PageLayout.Section>
              </PageLayout.Content>

              <PageLayout.StickyFooter align={footerAlign}>
                <Button variant="outlined">Discard Changes</Button>
                <Button variant="contained" startIcon={<EditIcon />}>
                  Save Configuration
                </Button>
              </PageLayout.StickyFooter>
            </PageLayout>
          </Paper>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB 1 — Sub-Component Reference
      ══════════════════════════════════════════════════════ */}
      {activeTab === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* ── PageLayout.Header ── */}
          <Box>
            <SectionLabel label="PageLayout.Header" />
            <PageLayout maxWidth="lg" bgVariant="paper">
              <PageLayout.Header
                title="PageLayout.Header"
                subtitle="Page title with breadcrumb trail, status chip, and action buttons. Supports an onBack handler for nested navigation."
                breadcrumbs={[
                  { label: 'Root', href: '#' },
                  { label: 'Section', href: '#' },
                  { label: 'Current Page' },
                ]}
                status={<Chip label="Published" color="success" size="small" />}
                actions={
                  <>
                    <Button variant="outlined" size="small">Secondary</Button>
                    <Button variant="contained" size="small">Primary Action</Button>
                  </>
                }
              />
            </PageLayout>
          </Box>

          {/* ── PageLayout.Section variants ── */}
          <Box>
            <SectionLabel label="PageLayout.Section — card vs plain" />
            <Stack spacing={2}>
              <PageLayout maxWidth="lg" bgVariant="paper">
                <PageLayout.Content>
                  <PageLayout.Section
                    variant="card"
                    title="variant='card' (default)"
                    description="Renders as an outlined MUI Card with CardHeader, Divider, and CardContent."
                    actions={<Button size="small">Action</Button>}
                  >
                    <Alert severity="info" variant="outlined">
                      Section content rendered inside CardContent. Ideal for grouping related fields or settings.
                    </Alert>
                  </PageLayout.Section>

                  <PageLayout.Section
                    variant="plain"
                    title="variant='plain'"
                    description="Renders as a borderless Box with a bottom Divider — useful for in-page hierarchy."
                    actions={<Button size="small">Action</Button>}
                  >
                    <Alert severity="success" variant="outlined">
                      Flat section content with no card shadow. Great for form sections or data groupings.
                    </Alert>
                  </PageLayout.Section>
                </PageLayout.Content>
              </PageLayout>
            </Stack>
          </Box>

          {/* ── Standard MUI Grid Composition ── */}
          <Box>
            <SectionLabel label="Responsive Multi-Column Cards (MUI Grid)" />
            <PageLayout maxWidth="lg" bgVariant="paper">
              <PageLayout.Content>
                <Grid container spacing={2.5}>
                  {[1, 2, 3, 4].map((n) => (
                    <Grid key={n} size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Metric {n}
                            </Typography>
                            <TrendingUpIcon fontSize="small" color="primary" />
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {n * 1234}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={n * 20}
                            sx={{ mt: 1.5, borderRadius: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </PageLayout.Content>
            </PageLayout>
          </Box>

          {/* ── PageLayout.StickyFooter alignment ── */}
          <Box>
            <SectionLabel label="PageLayout.StickyFooter — align prop" />
            <Stack spacing={2}>
              {(['left', 'center', 'right', 'between'] as const).map((align) => (
                <Paper variant="outlined" key={align} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ px: 2, py: 1, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      align="{align}"
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <PageLayout maxWidth="full" compact>
                      <PageLayout.StickyFooter align={align}>
                        <Button variant="outlined" size="small">Cancel</Button>
                        <Button variant="contained" size="small">Save</Button>
                      </PageLayout.StickyFooter>
                    </PageLayout>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* ── PageLayout.Skeleton ── */}
          <Box>
            <SectionLabel label="PageLayout.Skeleton — loading state" />
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <PageLayout maxWidth="lg" loading={true} bgVariant="paper">
                <></>
              </PageLayout>
            </Paper>
          </Box>
        </Box>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB 2 — Prop API Reference
      ══════════════════════════════════════════════════════ */}
      {activeTab === 2 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* PageLayout root props */}
          <Box>
            <SectionLabel label="PageLayout — Root Props" />
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Prop</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Default</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {propRows.map(({ prop, type, default: def, desc }) => (
                    <TableRow key={prop} hover>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}
                        >
                          {prop}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: 'monospace', color: 'secondary.main' }}
                        >
                          {type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={def}
                          size="small"
                          variant="outlined"
                          sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {desc}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          {/* Sub-component reference */}
          <Box>
            <SectionLabel label="Sub-Components (Compound API)" />
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Component</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subComponents.map(({ name, desc }) => (
                    <TableRow key={name} hover>
                      <TableCell>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap' }}
                        >
                          {'<'}{name} {'>'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {desc}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          {/* Usage code snippet */}
          <Box>
            <SectionLabel label="Usage — Compound Component API" />
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                p: 2.5,
                bgcolor: 'grey.900',
                color: 'grey.100',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: 1.8,
                overflowX: 'auto',
              }}
            >
              <Box component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap' }}>
{`<PageLayout maxWidth="lg" bgVariant="default">
  <PageLayout.Header
    title="Page Title"
    subtitle="Optional subtitle line"
    breadcrumbs={[{ label: 'Root', href: '/' }, { label: 'Current' }]}
    status={<Chip label="Active" color="primary" size="small" />}
    actions={<Button variant="contained">Primary Action</Button>}
  />

  <PageLayout.Content>
    <Grid container spacing={2}>
      <Grid size={6}><Card>...</Card></Grid>
      <Grid size={6}><Card>...</Card></Grid>
    </Grid>

    <PageLayout.Section
      title="Section Title"
      description="Section description"
      variant="card"
    >
      {/* Section body */}
    </PageLayout.Section>
  </PageLayout.Content>

  <PageLayout.StickyFooter align="right">
    <Button variant="outlined">Cancel</Button>
    <Button variant="contained">Save</Button>
  </PageLayout.StickyFooter>
</PageLayout>`}
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </PageLayout>
  )
}
