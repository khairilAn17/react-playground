import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash-es'
import {
  Box,
  Chip,
  InputAdornment,
  Button,
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import { createTypedForm } from '../../components/form'
import { demoSchema, type DemoFormValues } from './demoSchema'
import type { AutocompleteOption } from '../../components/form/FormAutocomplete'
import type { RadioOption } from '../../components/form/FormRadioGroup'
import type { SelectOption } from '../../components/form/FormSelect'
import { Card } from '../../components/card'
import { PageLayout } from '../../widgets/pageLayout'

const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'Component-based UI library', avatar: 'RC', avatarBg: '#00A39D' },
  { label: 'Vue.js', value: 'vue', subtitle: 'Progressive JavaScript framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'The React framework for the Web', avatar: 'NX', avatarBg: '#1E293B' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Enterprise-scale platform', avatar: 'NG', avatarBg: '#DD0031' },
  { label: 'SolidJS', value: 'solid', subtitle: 'Simple and performant reactivity', avatar: 'SO', avatarBg: '#2C4F7C' },
]

const PLAN_OPTIONS: RadioOption[] = [
  { label: 'Free Plan ($0/mo)', value: 'free' },
  { label: 'Pro Plan ($19/mo)', value: 'pro' },
  { label: 'Enterprise Plan (Custom)', value: 'enterprise' },
]

const GROUPED_BANK_OPTIONS: SelectOption[] = [
  // Group 1: Proxy
  {
    group: 'Proxy',
    value: 'bifast_proxy',
    leftTitle: 'BI Fast Proxy',
    avatar: 'BF',
    avatarBg: '#0284C7',
  },
  // Group 2: Semua Bank
  {
    group: 'Semua Bank',
    value: 'bsi',
    leftTitle: 'Bank Syariah Indonesia (BSI)',
    avatar: 'BSI',
    avatarBg: '#00A39D',
  },
  {
    group: 'Semua Bank',
    value: 'bca',
    leftTitle: 'Bank Central Asia (BCA)',
    avatar: 'BCA',
    avatarBg: '#1D4ED8',
  },
  {
    group: 'Semua Bank',
    value: 'mandiri',
    leftTitle: 'Bank Mandiri',
    avatar: 'BM',
    avatarBg: '#0369A1',
  },
  {
    group: 'Semua Bank',
    value: 'bri',
    leftTitle: 'Bank Rakyat Indonesia (BRI)',
    avatar: 'BRI',
    avatarBg: '#1E40AF',
  },
  {
    group: 'Semua Bank',
    value: 'bni',
    leftTitle: 'Bank Negara Indonesia (BNI)',
    avatar: 'BNI',
    avatarBg: '#EA580C',
  },
]

const TRANSFER_METHOD_OPTIONS: SelectOption[] = [
  {
    value: 'bifast',
    leftTitle: 'BI Fast (+Rp2.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp250.000.000',
      'Langsung diproses dan diterima',
    ],
  },
  {
    value: 'online',
    leftTitle: 'Online (+Rp6.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp50.000.000',
      'Langsung diproses dan diterima',
    ],
  },
  {
    value: 'rtgs',
    leftTitle: 'RTGS (+Rp25.000)',
    bullets: [
      'Nominal transfer: Rp100.000.001–Rp500.000.000',
      'Operasional: Senin–Jumat jam 06:00 – 14:30 WIB\nTransaksi di luar waktu tersebut akan diproses di hari kerja berikutnya',
    ],
  },
  {
    value: 'skn',
    leftTitle: 'SKN (+Rp2.900)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp500.000.000',
      'Operasional: Senin–Jumat jam 06:00 – 14:30 WIB\nTransaksi di luar waktu tersebut akan diproses di hari kerja berikutnya',
    ],
  },
]

const { Form, Field } = createTypedForm<DemoFormValues>()

const DEFAULT_VALUES: DemoFormValues = {
  fullName: '',
  email: '',
  password: '',
  birthDate: null,
  role: '7200000001',
  role2: '',
  destinationBank: 'bca',
  transferMethod: 'bifast',
  framework: '',
  experienceYears: 3,
  plan: 'free',
  subscribeNewsletter: false,
  agreeTerms: false,
  bio: '',
}

export function DemoForm() {
  const [submittedData, setSubmittedData] = useState<DemoFormValues | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Server-side Search + Debounce State for Demo ──
  const [serverOptions, setServerOptions] = useState<SelectOption[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [serverPage, setServerPage] = useState(1)
  const [hasMoreServer, setHasMoreServer] = useState(false)
  const [serverQuery, setServerQuery] = useState('')

  const fetchServerApi = async (query: string, pageNum: number) => {
    const pageSize = 3
    const allMocks: SelectOption[] = [
      { value: 'srv-1', leftTitle: 'PT Indofood Sukses Makmur', leftSubtitle: '1020000001', rightTitle: 'Rp 1.500.000.000,00', avatar: 'IF', avatarBg: '#00A39D' },
      { value: 'srv-2', leftTitle: 'PT Telkom Indonesia', leftSubtitle: '1020000002', rightTitle: 'Rp 3.200.000.000,00', avatar: 'TL', avatarBg: '#0284C7' },
      { value: 'srv-3', leftTitle: 'PT Astra International', leftSubtitle: '1020000003', rightTitle: 'Rp 890.000.000,00', avatar: 'AI', avatarBg: '#EAA827' },
      { value: 'srv-4', leftTitle: 'PT Unilever Indonesia', leftSubtitle: '1020000004', rightTitle: 'Rp 450.000.000,00', avatar: 'UL', avatarBg: '#64748B' },
      { value: 'srv-5', leftTitle: 'PT Bank Central Asia', leftSubtitle: '1020000005', rightTitle: 'Rp 12.500.000.000,00', avatar: 'CA', avatarBg: '#00A39D' },
      { value: 'srv-6', leftTitle: 'PT GoTo Gojek Tokopedia', leftSubtitle: '1020000006', rightTitle: 'Rp 2.100.000.000,00', avatar: 'GT', avatarBg: '#0284C7' },
    ]

    await new Promise((resolve) => setTimeout(resolve, 400))
    const lower = query.toLowerCase()
    const filtered = allMocks.filter(
      (o) =>
        !query ||
        String(o.leftTitle).toLowerCase().includes(lower) ||
        String(o.leftSubtitle).toLowerCase().includes(lower)
    )
    const start = (pageNum - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    const moreExist = start + pageSize < filtered.length
    return { items, moreExist }
  }

  const debouncedServerSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        setSearchLoading(true)
        setServerQuery(query)
        setServerPage(1)
        const { items, moreExist } = await fetchServerApi(query, 1)
        setServerOptions(items)
        setHasMoreServer(moreExist)
        setSearchLoading(false)
      }, 300),
    []
  )

  useEffect(() => {
    debouncedServerSearch('')
    return () => {
      debouncedServerSearch.cancel()
    }
  }, [debouncedServerSearch])

  const handleServerLoadMore = async () => {
    if (loadingMore || !hasMoreServer) return
    setLoadingMore(true)
    const nextPage = serverPage + 1
    const { items, moreExist } = await fetchServerApi(serverQuery, nextPage)
    setServerOptions((prev) => [...prev, ...items])
    setServerPage(nextPage)
    setHasMoreServer(moreExist)
    setLoadingMore(false)
  }

  const handleSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmittedData(data)
    setIsSubmitting(false)
  }

  return (
    <PageLayout maxWidth="sm">
      <PageLayout.Header
        title="RHF + MUI Form Component Kit"
        subtitle={
          <>
            Gold Standard DX: <code>createTypedForm</code> static module factory pattern.
          </>
        }
        breadcrumbs={[{ label: 'Form Workspaces', href: '#' }, { label: 'Single Page Form' }]}
        status={<Chip label="Type-Safe" color="primary" size="small" />}
      />

      <Form
        schema={demoSchema}
        defaultValues={DEFAULT_VALUES}
        onSubmit={handleSubmit}
        mode="onTouched"
      >
        <PageLayout.Content>
          <Card
            title="User Registration"
            subtitle="Fill in the details below to test every form field component"
          >
            <Stack spacing={2.5}>
              <Grid container spacing={2.5}>

                {/* 1. Field.Text */}
                <Field.Text
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          kg
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* 2. Field.Text (Email) */}
                <Field.Text
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />

                {/* 3. Field.Text (Password) */}
                <Field.Text
                  name="password"
                  label="Password"
                  type="password"
                  helperText="Min 8 chars, 1 uppercase, 1 number"
                />

                {/* 4. Field.DatePicker */}
                <Field.DatePicker
                  name="birthDate"
                  label="Birth Date"
                  disableFuture
                />

                {/* 5. Field.Autocomplete */}
                <Field.Autocomplete
                  name="framework"
                  label="Favorite Framework"
                  options={FRAMEWORK_OPTIONS}
                />

                {/* 6. Field.Slider */}
                <Field.Slider
                  name="experienceYears"
                  label="Years of Experience"
                  min={1}
                  max={20}
                  step={1}
                  valueLabelDisplay="auto"
                  formatValue={(val) => `${val} year${val === 1 ? '' : 's'}`}
                />

                {/* 7.1 Field.Select with Bank Account Card */}
                <Field.Select
                  name="role"
                  placeholder="Pilih Rekening Sumber..."
                  selectSx={{
                    height: '64px',
                  }}
                  options={[
                    {
                      avatar: 'HB',
                      leftTitle: 'Harian Bisnis',
                      leftSubtitle: '7200000001',
                      rightTitle: 'Rp 450.000.000,00',
                      value: '7200000001',
                    },
                    {
                      avatar: {
                        src: 'https://i.pravatar.cc/150?img=47',
                        variant: 'rounded',
                        alt: 'Sarah',
                      },
                      leftTitle: 'Gaji Karyawan (Sarah Jenkins)',
                      leftSubtitle: '7200000002',
                      rightTitle: 'Rp 120.500.000,00',
                      rightSubtitle: 'BCA',
                      value: '7200000002',
                    },
                    {
                      avatar: 'https://i.pravatar.cc/150?img=12',
                      avatarProps: { variant: 'square' },
                      leftTitle: 'Operasional Kantor (David Chen)',
                      leftSubtitle: '7200000003',
                      rightTitle: 'Rp 15.000.000,00',
                      value: '7200000003',
                    },
                  ]}
                  searchable
                  searchPlaceholder="Filter roles..."
                  borderRadius={12}
                  rightTitleSx={{ fontWeight: 500 }}
                  rightSubtitleSx={{ color: '#64748B' }}
                  searchInputProps={{
                    disableFocusRing: true
                  }}
                />

                {/* 7.2 Field.Select with Grouped Bank Options */}
                <Field.Select
                  name="destinationBank"
                  placeholder="Pilih Bank Tujuan..."
                  options={GROUPED_BANK_OPTIONS}
                  searchable
                  searchPlaceholder="Cari bank atau proxy..."
                  borderRadius={12}
                  selectSx={{
                    height: '64px',
                  }}
                />

                {/* 7.3 Field.Select with Bullet Lists (Transfer Method Selector) */}
                <Field.Select
                  name="transferMethod"
                  placeholder="Pilih Metode Transfer..."
                  options={TRANSFER_METHOD_OPTIONS}
                  searchable
                  onSearchChange={(search) => console.log({ search })}
                  searchPlaceholder="Filter metode transfer..."
                  borderRadius={12}
                />

                {/* 7.4 Field.Select with Server-Side Search (300ms Debounce + Infinite Scroll) */}
                <Field.Select
                  name="role2"
                  label="Server-Side Async Search (Debounced 300ms)"
                  placeholder="Pilih Perusahaan via Server API..."
                  options={serverOptions}
                  searchable
                  searchMode="server"
                  searchLoading={searchLoading}
                  searchPlaceholder="Ketik nama perusahaan (Debounced 300ms)..."
                  onSearchChange={debouncedServerSearch}
                  hasMore={hasMoreServer}
                  loadingMore={loadingMore}
                  onLoadMore={handleServerLoadMore}
                  borderRadius={12}
                  selectSx={{
                    height: '64px',
                  }}
                />

                {/* 8. Field.Radio */}
                <Field.Radio
                  name="plan"
                  label="Subscription Plan"
                  options={PLAN_OPTIONS}
                />

                {/* 9. Multiline Field.Text */}
                <Field.Text
                  name="bio"
                  label="Bio / Notes"
                  placeholder="Tell us a bit about yourself..."
                  multiline
                  rows={3}
                />

                {/* 10. Field.Switch */}
                <Field.Switch
                  name="subscribeNewsletter"
                  label="Subscribe to weekly product newsletter"
                />

                {/* 11. Field.Checkbox */}
                <Field.Checkbox
                  name="agreeTerms"
                  label="I accept the Terms & Conditions and Privacy Policy *"
                />

              </Grid>
            </Stack>
          </Card>

          {/* Submission Result */}
          {submittedData && (
            <Card
              title="Form Submitted Successfully!"
            >
              <Box
                component="pre"
                sx={{
                  bgcolor: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  overflowX: 'auto',
                  fontSize: '0.8125rem',
                  fontFamily: 'monospace',
                  m: 0,
                }}
              >
                {JSON.stringify(submittedData, null, 2)}
              </Box>
            </Card>
          )}
        </PageLayout.Content>

        <PageLayout.StickyFooter>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            disabled={isSubmitting}
            onClick={() => setSubmittedData(null)}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ minWidth: 140 }}
          >
            {isSubmitting ? 'Submitting...' : 'Create Account'}
          </Button>
        </PageLayout.StickyFooter>
      </Form>
    </PageLayout>
  )
}
