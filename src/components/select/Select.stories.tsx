import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo, useEffect } from 'react'
import { Box, Typography, Stack, Paper } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import { debounce } from 'lodash-es'
import { Select } from './Select'
import type { SelectOption } from './types'

const SIMPLE_OPTIONS: SelectOption[] = [
  { label: 'Jakarta (JKT)', value: 'jkt' },
  { label: 'Bandung (BDG)', value: 'bdg' },
  { label: 'Surabaya (SBY)', value: 'sby' },
  { label: 'Medan (MDN)', value: 'mdn' },
  { label: 'Makassar (UPG)', value: 'upg' },
]

const RICH_ACCOUNT_OPTIONS: SelectOption[] = [
  {
    value: '7200000001',
    leftTitle: 'Harian Bisnis',
    leftSubtitle: '7200000001',
    rightTitle: 'Rp 450.000.000,00',
    avatar: 'HB',
    avatarBg: '#00A39D',
  },
  {
    value: '7200000002',
    leftTitle: 'Giro Operasional',
    leftSubtitle: '7200000002',
    rightTitle: 'Rp 1.250.000.000,00',
    avatar: 'GO',
    avatarBg: '#F59E0B',
  },
  {
    value: '7200000005',
    leftTitle: 'Dana Cadangan',
    leftSubtitle: '7200000005',
    rightTitle: 'Rp 75.000.000,00',
    rightSubtitle: 'Rekening Terblokir',
    avatar: 'DC',
    avatarBg: '#64748B',
    disabled: true,
  },
]

const BULLET_TRANSFER_OPTIONS: SelectOption[] = [
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

const GROUPED_BANK_OPTIONS: SelectOption[] = [
  {
    group: 'Proxy',
    value: 'bifast_proxy',
    leftTitle: 'BI Fast Proxy',
    leftSubtitle: 'Transfer via No. Handphone / Email',
    avatar: 'BF',
    avatarBg: '#0284C7',
  },
  {
    group: 'Semua Bank',
    value: 'bsi',
    leftTitle: 'Bank Syariah Indonesia (BSI)',
    leftSubtitle: 'Bank Syariah BUMN Terbesar',
    avatar: <AccountBalanceIcon sx={{ color: '#00A39D' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'bca',
    leftTitle: 'Bank Central Asia (BCA)',
    leftSubtitle: 'Jaringan ATM & EDC Terluas',
    avatar: <AccountBalanceIcon sx={{ color: '#0066AE' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'mandiri',
    leftTitle: 'Bank Mandiri',
    leftSubtitle: 'Bank Komersial Nasional',
    avatar: <AccountBalanceIcon sx={{ color: '#0A3B75' }} />,
  },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

// ── 1. Basic Controlled ──────────────────────────────────────────────────────
function BasicControlledStory() {
  const [city, setCity] = useState('jkt')
  return (
    <Box sx={{ maxWidth: 440 }}>
      <Select
        label="Kota Operasional"
        value={city}
        onChange={(e) => setCity(e.target.value as string)}
        options={SIMPLE_OPTIONS}
        helperText={`Terpilih: ${city}`}
      />
    </Box>
  )
}
export const BasicControlled: Story = {
  render: () => <BasicControlledStory />,
}

// ── 2. Uncontrolled with defaultValue ─────────────────────────────────────────
export const UncontrolledDefaultValue: Story = {
  render: () => (
    <Box sx={{ maxWidth: 440 }}>
      <Select
        label="Pilihan Uncontrolled (defaultValue='bdg')"
        defaultValue="bdg"
        options={SIMPLE_OPTIONS}
        helperText="Komponen mengelola state internal sendiri"
      />
    </Box>
  ),
}

// ── 3. Rich Account Selector Card ────────────────────────────────────────────
function RichAccountSelectorStory() {
  const [account, setAccount] = useState('7200000001')
  return (
    <Box sx={{ maxWidth: 460 }}>
      <Select
        label="Rekening Sumber Dana"
        value={account}
        onChange={(e) => setAccount(e.target.value as string)}
        options={RICH_ACCOUNT_OPTIONS}
      />
    </Box>
  )
}
export const RichAccountSelector: Story = {
  render: () => <RichAccountSelectorStory />,
}

// ── 4. Bullet Transfer Methods (Compact Selected) ────────────────────────────
function BulletTransferMethodsStory() {
  const [method, setMethod] = useState('bifast')
  return (
    <Paper elevation={0} sx={{ maxWidth: 480, p: 3, borderRadius: '16px', border: '1px solid #E2E8F0' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Pilih Metode Transfer
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Trigger compactSelected hanya menampilkan judul & biaya; dropdown menampilkan daftar bullet lengkap
      </Typography>
      <Select
        value={method}
        onChange={(e) => setMethod(e.target.value as string)}
        options={BULLET_TRANSFER_OPTIONS}
        borderRadius={12}
      />
    </Paper>
  )
}
export const BulletTransferMethods: Story = {
  render: () => <BulletTransferMethodsStory />,
}

// ── 5. Grouped Searchable Bank Selector ──────────────────────────────────────
function GroupedSearchableBankStory() {
  const [bank, setBank] = useState('')
  return (
    <Box sx={{ maxWidth: 460 }}>
      <Select
        label="Bank Tujuan Transfer"
        placeholder="Cari atau pilih bank..."
        value={bank}
        onChange={(e) => setBank(e.target.value as string)}
        options={GROUPED_BANK_OPTIONS}
        searchable
        searchPlaceholder="Cari nama bank atau proxy..."
      />
    </Box>
  )
}
export const GroupedSearchableBank: Story = {
  render: () => <GroupedSearchableBankStory />,
}

// ── 6. Search Variants ───────────────────────────────────────────────────────
function SearchVariantsDemoStory() {
  const [b1, setB1] = useState('')
  const [b2, setB2] = useState('')
  const [b3, setB3] = useState('')
  const [b4, setB4] = useState('')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 460 }}>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5, display: 'block' }}>
          1. Pill Search Input (searchVariant="pill")
        </Typography>
        <Select
          placeholder="Pill search box..."
          value={b1}
          onChange={(e) => setB1(e.target.value as string)}
          options={GROUPED_BANK_OPTIONS}
          searchable
          searchVariant="pill"
          searchPlaceholder="Search something..."
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5, display: 'block' }}>
          2. Outlined with Clear Button (searchVariant="outlined" - Default)
        </Typography>
        <Select
          placeholder="Outlined search box..."
          value={b2}
          onChange={(e) => setB2(e.target.value as string)}
          options={GROUPED_BANK_OPTIONS}
          searchable
          searchVariant="outlined"
          searchPlaceholder="Search something..."
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5, display: 'block' }}>
          3. Filled Search Input (searchVariant="filled")
        </Typography>
        <Select
          placeholder="Filled search box..."
          value={b3}
          onChange={(e) => setB3(e.target.value as string)}
          options={GROUPED_BANK_OPTIONS}
          searchable
          searchVariant="filled"
          searchPlaceholder="Search something..."
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5, display: 'block' }}>
          4. Standard / Flush Search (searchVariant="standard")
        </Typography>
        <Select
          placeholder="Standard flush search..."
          value={b4}
          onChange={(e) => setB4(e.target.value as string)}
          options={GROUPED_BANK_OPTIONS}
          searchable
          searchVariant="standard"
          searchPlaceholder="Search something..."
        />
      </Box>
    </Box>
  )
}
export const SearchVariantsDemo: Story = {
  render: () => <SearchVariantsDemoStory />,
}

// ── 7. Sizes Matrix ──────────────────────────────────────────────────────────
export const SizeVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 440 }}>
      <Select size="small" label="Small Select (40px)" defaultValue="jkt" options={SIMPLE_OPTIONS} />
      <Select size="medium" label="Medium Select (48px - Default)" defaultValue="bdg" options={SIMPLE_OPTIONS} />
      <Select size="large" label="Large Select (56px)" defaultValue="sby" options={SIMPLE_OPTIONS} />
    </Box>
  ),
}

// ── 8. Corner Radii Matrix ──────────────────────────────────────────────────
export const BorderRadii: Story = {
  name: 'Custom borderRadius Matrix',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 440 }}>
      <Select size="small" label="Sharp Enterprise (borderRadius={4})" defaultValue="jkt" options={SIMPLE_OPTIONS} borderRadius={4} />
      <Select size="small" label="BYOND Standard (borderRadius={12})" defaultValue="bdg" options={SIMPLE_OPTIONS} borderRadius={12} />
      <Select size="small" label="Soft Curved (borderRadius={20})" defaultValue="sby" options={SIMPLE_OPTIONS} borderRadius={20} />
      <Select size="small" label={`Full Pill (borderRadius="999px")`} defaultValue="mdn" options={SIMPLE_OPTIONS} borderRadius="999px" />
    </Box>
  ),
}

// ── 9. States: Error & Disabled ─────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 440 }}>
      <Select
        label="Error State"
        placeholder="Pilih rekening..."
        options={RICH_ACCOUNT_OPTIONS}
        error
        helperText="Wajib memilih rekening sebelum melanjutkan transaksi"
      />
      <Select
        label="Disabled State"
        defaultValue="7200000001"
        options={RICH_ACCOUNT_OPTIONS}
        disabled
        helperText="Pilihan ini dikunci oleh sistem"
      />
    </Box>
  ),
}

// ── 10. Image Avatars Demo ───────────────────────────────────────────────────
function ImageAvatarsDemoStory() {
  const [user, setUser] = useState('user1')

  const IMAGE_AVATAR_OPTIONS: SelectOption[] = [
    {
      value: 'user1',
      leftTitle: 'Alex Morgan',
      leftSubtitle: 'Senior Software Engineer',
      rightTitle: 'Full-time',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    {
      value: 'user2',
      leftTitle: 'Sarah Jenkins',
      leftSubtitle: 'Lead UX Designer',
      rightTitle: 'Full-time',
      avatar: {
        src: 'https://i.pravatar.cc/150?img=47',
        variant: 'rounded',
        alt: 'Sarah Jenkins',
      },
    },
    {
      value: 'user3',
      leftTitle: 'David Chen',
      leftSubtitle: 'Product Manager',
      rightTitle: 'Contract',
      avatar: 'https://i.pravatar.cc/150?img=12',
      avatarProps: {
        variant: 'square',
      },
    },
  ]

  return (
    <Box sx={{ maxWidth: 460 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
        Select Option with Image Avatars (Image URL, Rounded AvatarProps, Square Variant)
      </Typography>
      <Select
        label="Assignee"
        value={user}
        onChange={(e) => setUser(e.target.value as string)}
        options={IMAGE_AVATAR_OPTIONS}
        searchable
        searchPlaceholder="Search team member..."
      />
    </Box>
  )
}
export const ImageAvatarsDemo: Story = {
  render: () => <ImageAvatarsDemoStory />,
}

// ── 11. Infinite Scroll & Pagination ─────────────────────────────────────────
function generateMockAccounts(page: number, pageSize = 12): SelectOption[] {
  const startIndex = (page - 1) * pageSize
  return Array.from({ length: pageSize }, (_, i) => {
    const idx = startIndex + i + 1
    const accNum = `8800${String(idx).padStart(6, '0')}`
    const balance = (idx * 14_500_000).toLocaleString('id-ID')
    return {
      value: accNum,
      leftTitle: `Rekening Operasional Cabang #${idx}`,
      leftSubtitle: `No. ${accNum} • PT Berkah Jaya`,
      rightTitle: `Rp ${balance},00`,
      rightSubtitle: idx % 3 === 0 ? 'Giro IDR' : 'Tabungan Bisnis',
      avatar: `C${idx}`,
      avatarBg: idx % 2 === 0 ? '#00A39D' : '#0284C7',
    }
  })
}

function InfiniteScrollApiDemoStory() {
  const [selectedAccount, setSelectedAccount] = useState('')
  const [page, setPage] = useState(1)
  const [accounts, setAccounts] = useState<SelectOption[]>(() => generateMockAccounts(1))
  const [loadingMore, setLoadingMore] = useState(false)
  const MAX_PAGES = 5 // Total 60 items

  const hasMore = page < MAX_PAGES

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    setTimeout(() => {
      const nextPage = page + 1
      const newBatch = generateMockAccounts(nextPage)
      setAccounts((prev) => [...prev, ...newBatch])
      setPage(nextPage)
      setLoadingMore(false)
    }, 600)
  }

  return (
    <Box sx={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Infinite Scroll with Simulated API (Paginated Batches)
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
          Scroll down the dropdown list. When nearing the bottom, it triggers <code>onLoadMore</code> and fetches the next 12 items (loaded {accounts.length} of 60).
        </Typography>
      </Box>

      <Select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value as string)}
        options={accounts}
        placeholder="Pilih rekening dari daftar..."
        searchable
        searchPlaceholder="Cari rekening..."
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        loadMoreThreshold={80}
      />
    </Box>
  )
}
export const InfiniteScrollApiDemo: Story = {
  render: () => <InfiniteScrollApiDemoStory />,
}

// ── 12. Server-Side Debounced Search ─────────────────────────────────────────
function ServerSearchDebouncedDemoComponent() {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<SelectOption[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const fetchApi = async (query: string, pageNum: number) => {
    const pageSize = 4
    const allMocks: SelectOption[] = [
      { value: 'acc-1', leftTitle: 'PT Digital Commerce', leftSubtitle: '8830000001', rightTitle: 'Rp 850.000.000,00', avatar: 'DC', avatarBg: '#00A39D' },
      { value: 'acc-2', leftTitle: 'CV Surya Technology', leftSubtitle: '8830000002', rightTitle: 'Rp 120.000.000,00', avatar: 'ST', avatarBg: '#0284C7' },
      { value: 'acc-3', leftTitle: 'PT Maju Bersama', leftSubtitle: '8830000003', rightTitle: 'Rp 45.000.000,00', avatar: 'MB', avatarBg: '#EAA827' },
      { value: 'acc-4', leftTitle: 'PT Global Solusindo', leftSubtitle: '8830000004', rightTitle: 'Rp 920.000.000,00', avatar: 'GS', avatarBg: '#64748B' },
      { value: 'acc-5', leftTitle: 'CV Prima Utama', leftSubtitle: '8830000005', rightTitle: 'Rp 210.000.000,00', avatar: 'PU', avatarBg: '#00A39D' },
      { value: 'acc-6', leftTitle: 'PT Indah Karya', leftSubtitle: '8830000006', rightTitle: 'Rp 75.000.000,00', avatar: 'IK', avatarBg: '#0284C7' },
      { value: 'acc-7', leftTitle: 'PT Delta Logistics', leftSubtitle: '8830000007', rightTitle: 'Rp 340.000.000,00', avatar: 'DL', avatarBg: '#EAA827' },
      { value: 'acc-8', leftTitle: 'PT Nusantara Agro', leftSubtitle: '8830000008', rightTitle: 'Rp 530.000.000,00', avatar: 'NA', avatarBg: '#64748B' },
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

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        setSearchLoading(true)
        setCurrentQuery(query)
        setPage(1)
        const { items, moreExist } = await fetchApi(query, 1)
        setOptions(items)
        setHasMore(moreExist)
        setSearchLoading(false)
      }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch('')
  }, [debouncedSearch])

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    const nextPage = page + 1
    const { items, moreExist } = await fetchApi(currentQuery, nextPage)
    setOptions((prev) => [...prev, ...items])
    setPage(nextPage)
    setHasMore(moreExist)
    setLoadingMore(false)
  }

  return (
    <Box sx={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Server-Side Search with Debounce (300ms) & Infinite Scroll
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
          Keystrokes are debounced before querying the server API. In-memory filter is bypassed via <code>searchMode="server"</code>.
        </Typography>
      </Box>

      <Select
        label="Server-Side Account Search"
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        options={options}
        placeholder="Cari rekening dari server..."
        searchable
        searchMode="server"
        searchLoading={searchLoading}
        searchPlaceholder="Ketik nama perusahaan (debounced 300ms)..."
        onSearchChange={debouncedSearch}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
      />
    </Box>
  )
}
export const ServerSearchDebouncedDemo: Story = {
  render: () => <ServerSearchDebouncedDemoComponent />,
}

// ── 13. Granular slotSx Sub-Slots ────────────────────────────────────────────
export const SlotSxOptionRowSubSlots: Story = {
  name: 'slotSx — Option Row & Popover Customization',
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <Select
        label="Custom Option Row Sub-Slots"
        defaultValue="bifast"
        options={BULLET_TRANSFER_OPTIONS}
        borderRadius={12}
        slotSx={{
          optionRow: {
            leftTitle: { fontWeight: 800, color: '#1E293B' },
            leftSubtitle: { color: '#0284C7', fontStyle: 'italic' },
            rightTitle: { color: '#B45309', fontWeight: 800 },
            checkmark: { color: '#EAA827' },
          },
        }}
        helperText="leftTitle: bold 800 · leftSubtitle: italic blue · checkmark: amber"
      />

      <Select
        label="Custom Popover Shadow & Group Headers"
        defaultValue="bsi"
        options={GROUPED_BANK_OPTIONS}
        searchable
        borderRadius={12}
        slotSx={{
          menuPaper: {
            boxShadow: '0 20px 48px rgba(0, 163, 157, 0.22)',
            borderColor: '#00A39D',
            borderWidth: '1.5px',
          },
          groupHeader: {
            color: '#00A39D',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          },
        }}
        helperText="menuPaper: elevated teal drop shadow · groupHeader: bold uppercase"
      />
    </Stack>
  ),
}

// ── 14. Real-World Nominal Currency with Prefix Block ('Rp') ────────────────
const NOMINAL_SELECT_OPTIONS: SelectOption[] = [
  { value: '10.000', label: '10.000', leftSubtitle: 'Sepuluh Ribu Rupiah' },
  { value: '25.000', label: '25.000', leftSubtitle: 'Dua Puluh Lima Ribu Rupiah' },
  { value: '50.000', label: '50.000', leftSubtitle: 'Lima Puluh Ribu Rupiah' },
  { value: '100.000', label: '100.000', leftSubtitle: 'Seratus Ribu Rupiah' },
  { value: '250.000', label: '250.000', leftSubtitle: 'Dua Ratus Lima Puluh Ribu Rupiah' },
  { value: '500.000', label: '500.000', leftSubtitle: 'Lima Ratus Ribu Rupiah' },
  { value: '1.000.000', label: '1.000.000', leftSubtitle: 'Satu Juta Rupiah' },
]

function PrefixBlockNominalCurrencyStory() {
  const [nominal, setNominal] = useState<string | number>('50.000')

  return (
    <Box sx={{ maxWidth: 440, p: 3, bgcolor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Nominal Donasi / Infaq
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Pilih nominal transfer / donasi dari daftar preset
      </Typography>

      <Select
        prefixBlock="Rp"
        value={nominal}
        onChange={(e) => setNominal(e.target.value)}
        options={NOMINAL_SELECT_OPTIONS}
        borderRadius={12}
        helperText="Pilih dari daftar nominal yang tersedia"
      />
    </Box>
  )
}

export const PrefixBlockNominalCurrency: Story = {
  name: 'Real-World — Nominal Currency with Prefix Block (Rp)',
  render: () => <PrefixBlockNominalCurrencyStory />,
}

