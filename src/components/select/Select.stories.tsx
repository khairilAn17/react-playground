import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
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
    leftTitle: 'BI Fast (+Rp2.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp250.000.000',
      'Langsung diproses dan diterima secara real-time',
    ],
  },
  {
    value: 'online',
    leftTitle: 'Online Transfer (+Rp6.500)',
    bullets: [
      'Nominal transfer: Rp10.000–Rp100.000.000',
      'Diproses seketika melalui jaringan ATM Bersama / Prima',
    ],
  },
  {
    value: 'rtgs',
    leftTitle: 'RTGS (+Rp25.000)',
    bullets: [
      'Nominal transfer: Rp100.000.001–Rp500.000.000',
      'Operasional: Senin-Jumat jam 06:00 – 14:30 WIB',
    ],
  },
]

const GROUPED_BANK_OPTIONS: SelectOption[] = [
  {
    group: 'Proxy',
    value: 'bifast_proxy',
    leftTitle: 'BI Fast Proxy',
    leftSubtitle: 'Transfer via No. Handphone / Email',
  },
  {
    group: 'Semua Bank',
    value: 'bsi',
    leftTitle: 'Bank Syariah Indonesia (BSI)',
    avatar: <AccountBalanceIcon sx={{ color: '#00A39D' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'bca',
    leftTitle: 'Bank Central Asia (BCA)',
    avatar: <AccountBalanceIcon sx={{ color: '#0066AE' }} />,
  },
  {
    group: 'Semua Bank',
    value: 'mandiri',
    leftTitle: 'Bank Mandiri',
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

export const BasicControlled: Story = {
  render: () => {
    const [city, setCity] = useState('jkt')
    return (
      <Box sx={{ maxWidth: 400 }}>
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value as string)}
          options={SIMPLE_OPTIONS}
        />
        <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
          Selected value: {city}
        </Typography>
      </Box>
    )
  },
}

export const RichAccountSelector: Story = {
  render: () => {
    const [account, setAccount] = useState('7200000001')
    return (
      <Box sx={{ maxWidth: 460 }}>
        <Select
          value={account}
          onChange={(e) => setAccount(e.target.value as string)}
          options={RICH_ACCOUNT_OPTIONS}
        />
      </Box>
    )
  },
}

export const BulletTransferMethods: Story = {
  render: () => {
    const [method, setMethod] = useState('bifast')
    return (
      <Box sx={{ maxWidth: 460 }}>
        <Select
          value={method}
          onChange={(e) => setMethod(e.target.value as string)}
          options={BULLET_TRANSFER_OPTIONS}
        />
      </Box>
    )
  },
}

export const GroupedSearchableBank: Story = {
  render: () => {
    const [bank, setBank] = useState('')
    return (
      <Box sx={{ maxWidth: 460 }}>
        <Select
          placeholder="Cari atau pilih bank"
          value={bank}
          onChange={(e) => setBank(e.target.value as string)}
          options={GROUPED_BANK_OPTIONS}
          searchable
          searchPlaceholder="Cari nama bank..."
        />
      </Box>
    )
  },
}

export const SearchVariantsDemo: Story = {
  render: () => {
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
  },
}

export const SizeVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400 }}>
      <Select size="small" label="Small Select" value="jkt" options={SIMPLE_OPTIONS} />
      <Select size="medium" label="Medium Select" value="bdg" options={SIMPLE_OPTIONS} />
      <Select size="large" label="Large Select" value="sby" options={SIMPLE_OPTIONS} />
    </Box>
  ),
}

export const ImageAvatarsDemo: Story = {
  render: () => {
    const [user, setUser] = useState('user1')

    const IMAGE_AVATAR_OPTIONS: SelectOption[] = [
      {
        value: 'user1',
        leftTitle: 'Alex Morgan',
        leftSubtitle: 'Senior Software Engineer',
        rightTitle: 'Full-time',
        // 1. Direct Image URL string (circular default)
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
      {
        value: 'user2',
        leftTitle: 'Sarah Jenkins',
        leftSubtitle: 'Lead UX Designer',
        rightTitle: 'Full-time',
        // 2. AvatarProps object with rounded variant & alt text
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
        // 3. Image URL + avatarProps for square variant styling
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
  },
}

// ─── Mock Generator for Massive API Datasets ─────────────────────────────────
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

export const InfiniteScrollApiDemo: Story = {
  render: () => {
    const [selectedAccount, setSelectedAccount] = useState('')
    const [page, setPage] = useState(1)
    const [accounts, setAccounts] = useState<SelectOption[]>(() => generateMockAccounts(1))
    const [loadingMore, setLoadingMore] = useState(false)
    const MAX_PAGES = 5 // Total 60 items

    const hasMore = page < MAX_PAGES

    const handleLoadMore = () => {
      if (loadingMore || !hasMore) return
      setLoadingMore(true)
      // Simulate API network latency (600ms)
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
          // loadingMoreText="Mengambil data rekening berikutnya..."
          loadMoreThreshold={80}
        />
      </Box>
    )
  },
}

export const ServerSearchDebouncedDemo: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState<SelectOption[]>([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [currentQuery, setCurrentQuery] = useState('')

    // Simulated backend API with 400ms latency
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

    // Debounced search handler (300ms delay)
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

    // Load initial options
    useState(() => {
      debouncedSearch('')
    })

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
  },
}


