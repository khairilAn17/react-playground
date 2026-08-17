import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
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
