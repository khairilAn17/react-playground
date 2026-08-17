import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Typography, Paper, Stack, Chip } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import NatureIcon from '@mui/icons-material/Nature'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SchoolIcon from '@mui/icons-material/School'
import MosqueIcon from '@mui/icons-material/Mosque'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'
import { createCurrencyOptions, filterNumericOptions } from './utils'

// ── Shared Datasets ──────────────────────────────────────────────────────────
const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'Component-based UI library', avatar: 'RC', avatarBg: '#00A39D' },
  { label: 'Vue.js', value: 'vue', subtitle: 'Progressive JavaScript framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'The React framework for the Web', avatar: 'NX', avatarBg: '#1E293B' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Enterprise-scale platform', avatar: 'NG', avatarBg: '#DD0031' },
]

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

const BANK_OPTIONS: AutocompleteOption[] = [
  { value: 'acc-1', label: 'PT Digital Commerce', subtitle: 'Rekening 8830000001 • Rp 850.000.000', icon: <AccountBalanceIcon sx={{ color: '#00A39D' }} /> },
  { value: 'acc-2', label: 'CV Surya Technology', subtitle: 'Rekening 8830000002 • Rp 120.000.000', icon: <AccountBalanceIcon sx={{ color: '#0284C7' }} /> },
  { value: 'acc-3', label: 'PT Maju Bersama', subtitle: 'Rekening 8830000003 • Rp 45.000.000', icon: <AccountBalanceIcon sx={{ color: '#EAA827' }} /> },
  { value: 'acc-4', label: 'PT Global Solusindo', subtitle: 'Rekening 8830000004 • Rp 920.000.000', icon: <AccountBalanceIcon sx={{ color: '#64748B' }} /> },
]

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'BYOND BIZNIS Autocomplete component supporting single/multi-selection, checkable option rows, customizable pill chips (+N overflow tags), granular `slotSx` sub-slots, and the modern `onValueChange` pattern.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

// ── 1. Default Single Select ────────────────────────────────────────────────
function DefaultStoryComponent() {
  const [value, setValue] = useState<AutocompleteOption | null>(null)
  return (
    <Box sx={{ maxWidth: 440 }}>
      <Autocomplete
        label="Framework"
        placeholder="Filter or choose framework..."
        options={FRAMEWORK_OPTIONS}
        value={value}
        onValueChange={setValue}
        helperText={value ? `Selected: ${value.label}` : 'Type directly to search options'}
      />
    </Box>
  )
}
export const Default: Story = { render: () => <DefaultStoryComponent /> }

// ── 2. Multi-Select with Checkboxes & +N Overflow Tags ─────────────────────
function MultiSelectWithCheckboxesComponent() {
  const [values, setValues] = useState<AutocompleteOption[]>([
    INFAQ_OPTIONS[0],
    INFAQ_OPTIONS[1],
    INFAQ_OPTIONS[2],
  ])
  return (
    <Box sx={{ maxWidth: 480 }}>
      <Autocomplete
        multiple
        label="Kategori Infaq (maxVisibleTags: 2, checkboxPlacement: 'right')"
        placeholder={values.length === 0 ? 'Pilih Kategori...' : ''}
        options={INFAQ_OPTIONS}
        value={values}
        onValueChange={setValues}
        checkboxPlacement="right"
        maxVisibleTags={2}
        tagDisplay="avatar+label"
        helperText={`${values.length} kategori dipilih. Chip ke-3+ disembunyikan sebagai +N tag.`}
      />
    </Box>
  )
}
export const MultiSelectWithCheckboxes: Story = { render: () => <MultiSelectWithCheckboxesComponent /> }

// ── 3. Checkbox Placement: Left vs Right ───────────────────────────────────
function CheckboxPlacementsComponent() {
  const [leftVals, setLeftVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0]])
  const [rightVals, setRightVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[1]])
  return (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <Autocomplete
        multiple
        label="checkboxPlacement='left'"
        placeholder="Select framework..."
        options={FRAMEWORK_OPTIONS}
        value={leftVals}
        onValueChange={setLeftVals}
        checkboxPlacement="left"
        helperText="Checkbox appears before the avatar/icon"
      />
      <Autocomplete
        multiple
        label="checkboxPlacement='right' (Default)"
        placeholder="Select framework..."
        options={FRAMEWORK_OPTIONS}
        value={rightVals}
        onValueChange={setRightVals}
        checkboxPlacement="right"
        helperText="Checkbox aligns to the trailing end of each option row"
      />
    </Stack>
  )
}
export const CheckboxPlacements: Story = { render: () => <CheckboxPlacementsComponent /> }

// ── 4. Tag Display: Avatar vs Label-only ───────────────────────────────────
function TagDisplayModesComponent() {
  const [richTags, setRichTags] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0], FRAMEWORK_OPTIONS[1]])
  const [plainTags, setPlainTags] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0], FRAMEWORK_OPTIONS[1]])
  return (
    <Stack spacing={4} sx={{ maxWidth: 480 }}>
      <Autocomplete
        multiple
        label="tagDisplay='avatar+label' (Default)"
        options={FRAMEWORK_OPTIONS}
        value={richTags}
        onValueChange={setRichTags}
        tagDisplay="avatar+label"
        helperText="Chips include avatar initials or icon decoration"
      />
      <Autocomplete
        multiple
        label="tagDisplay='label'"
        options={FRAMEWORK_OPTIONS}
        value={plainTags}
        onValueChange={setPlainTags}
        tagDisplay="label"
        helperText="Chips show text label only"
      />
    </Stack>
  )
}
export const TagDisplayModes: Story = { render: () => <TagDisplayModesComponent /> }

// ── 5. Sizes ────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <Box sx={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete size="small" label="Small (40px)" placeholder="Search items..." options={FRAMEWORK_OPTIONS} />
      <Autocomplete size="medium" label="Medium (48px — Default)" placeholder="Search items..." options={FRAMEWORK_OPTIONS} />
      <Autocomplete size="large" label="Large (56px)" placeholder="Search items..." options={FRAMEWORK_OPTIONS} />
    </Box>
  ),
}

// ── 6. Custom Border Radii ──────────────────────────────────────────────────
export const BorderRadii: Story = {
  name: 'Custom borderRadius',
  render: () => (
    <Box sx={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete size="small" label="Sharp Enterprise (borderRadius={4})" placeholder="Search..." options={FRAMEWORK_OPTIONS} borderRadius={4} />
      <Autocomplete size="small" label="BYOND Standard (borderRadius={12})" placeholder="Search..." options={FRAMEWORK_OPTIONS} borderRadius={12} />
      <Autocomplete size="small" label="Soft Curved (borderRadius={20})" placeholder="Search..." options={FRAMEWORK_OPTIONS} borderRadius={20} />
      <Autocomplete size="small" label={`Full Pill (borderRadius="999px")`} placeholder="Search..." options={FRAMEWORK_OPTIONS} borderRadius="999px" />
    </Box>
  ),
}

// ── 7. MaxVisibleTags Overflow ──────────────────────────────────────────────
function MaxVisibleTagsComponent() {
  const [vals, setVals] = useState<AutocompleteOption[]>(INFAQ_OPTIONS.slice(0, 5))
  return (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <Autocomplete multiple label="maxVisibleTags={1}" options={INFAQ_OPTIONS} value={vals} onValueChange={setVals} maxVisibleTags={1} size="small" helperText="Shows 1 tag, remaining collapsed into '+N'" />
      <Autocomplete multiple label="maxVisibleTags={2}" options={INFAQ_OPTIONS} value={vals} onValueChange={setVals} maxVisibleTags={2} size="small" helperText="Shows 2 tags" />
      <Autocomplete multiple label="maxVisibleTags={3}" options={INFAQ_OPTIONS} value={vals} onValueChange={setVals} maxVisibleTags={3} size="small" helperText="Shows 3 tags" />
      <Autocomplete multiple label="maxVisibleTags={undefined} — show all" options={INFAQ_OPTIONS} value={vals} onValueChange={setVals} size="small" helperText="All chips visible" />
    </Stack>
  )
}
export const MaxVisibleTagsOverflow: Story = { render: () => <MaxVisibleTagsComponent /> }

// ── 8. States: Error & Disabled ────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <Box sx={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete label="Error State" placeholder="Choose framework..." options={FRAMEWORK_OPTIONS} error helperText="This field is required. Please select a valid option." />
      <Autocomplete label="Disabled State" placeholder="Cannot interact..." options={FRAMEWORK_OPTIONS} disabled value={FRAMEWORK_OPTIONS[0]} helperText="This control has been disabled by form logic." />
    </Box>
  ),
}

// ── 9. Infaq Filter Card (Real-World) ──────────────────────────────────────
function InfaqFilterCardDemoComponent() {
  const [selectedCategory, setSelectedCategory] = useState<AutocompleteOption | null>(null)
  return (
    <Paper elevation={0} sx={{ maxWidth: 440, p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Filter Berdasarkan Kategori</Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Pilih salah satu program penyaluran infaq & shadaqah
      </Typography>
      <Autocomplete
        placeholder="Pilih Kategori..."
        options={INFAQ_OPTIONS}
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        borderRadius={12}
        helperText={selectedCategory ? `✓ Kategori terpilih: ${selectedCategory.label}` : undefined}
      />
    </Paper>
  )
}
export const InfaqFilterCardDemo: Story = { render: () => <InfaqFilterCardDemoComponent /> }

// ── 10. slotSx.option — Custom Option Row Styles ───────────────────────────
function SlotSxOptionComponent() {
  const [vals, setVals] = useState<AutocompleteOption[]>([INFAQ_OPTIONS[0]])
  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, fontFamily: 'monospace' }}>
        slotSx.option · slotSx.optionLabel · slotSx.optionSubtitle · slotSx.optionIcon
      </Typography>
      <Autocomplete
        multiple
        label="Custom Option Row Styling"
        placeholder="Open dropdown to see custom rows..."
        options={INFAQ_OPTIONS}
        value={vals}
        onValueChange={setVals}
        checkboxPlacement="right"
        slotSx={{
          option: {
            px: 3,
            py: 1.25,
            borderRadius: '8px',
            mx: 0.5,
            '&[aria-selected="true"]': {
              bgcolor: 'rgba(0, 163, 157, 0.08)',
            },
          },
          optionLabel: {
            fontWeight: 700,
            fontSize: '0.875rem',
          },
          optionSubtitle: {
            color: '#64748B',
            fontStyle: 'italic',
          },
          optionIcon: {
            fontSize: 20,
          },
          optionCheckbox: {
            '&.Mui-checked': { color: '#EAA827' },
          },
        }}
        helperText="Open dropdown to see custom padding, label weight, italic subtitle, amber checkboxes"
      />
    </Box>
  )
}
export const SlotSxOptionRows: Story = {
  name: 'slotSx — Option Row Sub-Slots',
  render: () => <SlotSxOptionComponent />,
}

// ── 11. slotSx.tagChip — Custom Chip Styles ───────────────────────────────
function SlotSxTagsComponent() {
  const [gradientVals, setGradientVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0], FRAMEWORK_OPTIONS[1]])
  const [amberVals, setAmberVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0], FRAMEWORK_OPTIONS[2]])
  const [indigoVals, setIndigoVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[1], FRAMEWORK_OPTIONS[3]])
  const [squareVals, setSquareVals] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0], FRAMEWORK_OPTIONS[2], FRAMEWORK_OPTIONS[3], FRAMEWORK_OPTIONS[4]])

  return (
    <Stack spacing={4} sx={{ maxWidth: 520 }}>
      <Box>
        <Chip label="slotSx.tagChip" size="small" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.7rem', height: 20 }} />
        <Autocomplete
          multiple
          label="Gradient Teal–Blue theme (tagChip)"
          options={FRAMEWORK_OPTIONS}
          value={gradientVals}
          onValueChange={setGradientVals}
          slotSx={{
            tagChip: {
              background: 'linear-gradient(135deg, #00A39D 0%, #0284C7 100%)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.75)', '&:hover': { color: '#fff' } },
            },
          }}
          helperText="tagChip: gradient background, white text & delete icon"
        />
      </Box>

      <Box>
        <Chip label="slotSx.tagChip + slotSx.tagOverflow" size="small" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.7rem', height: 20 }} />
        <Autocomplete
          multiple
          label="Amber theme with custom +N badge"
          options={FRAMEWORK_OPTIONS}
          value={amberVals}
          onValueChange={setAmberVals}
          maxVisibleTags={1}
          slotSx={{
            tagChip: {
              bgcolor: 'rgba(245, 158, 11, 0.12)',
              borderColor: 'rgba(245, 158, 11, 0.5)',
              color: '#B45309',
              fontWeight: 700,
              '& .MuiChip-deleteIcon': { color: '#B45309', '&:hover': { color: '#78350F' } },
            },
            tagOverflow: {
              bgcolor: '#F59E0B',
              color: '#fff',
              fontWeight: 800,
              border: 'none',
            },
          }}
          helperText="tagChip: amber border & text. tagOverflow: solid amber badge"
        />
      </Box>

      <Box>
        <Chip label="slotSx.tagAvatar + slotSx.tagIcon + slotSx.tagLabel" size="small" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.7rem', height: 20 }} />
        <Autocomplete
          multiple
          label="Square avatars with wider gap (tagAvatar + tagLabel)"
          options={FRAMEWORK_OPTIONS}
          value={squareVals}
          onValueChange={setSquareVals}
          maxVisibleTags={3}
          tagDisplay="avatar+label"
          slotSx={{
            tagAvatar: {
              borderRadius: '3px',
              width: 18,
              height: 18,
            },
            tagLabel: {
              gap: 1,
            },
          }}
          helperText="tagAvatar: square 3px radius. tagLabel: wider gap between avatar and text"
        />
      </Box>

      <Box>
        <Chip label="slotSx.tagChip (Indigo Slate)" size="small" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.7rem', height: 20 }} />
        <Autocomplete
          multiple
          label="Indigo Slate chips"
          options={FRAMEWORK_OPTIONS}
          value={indigoVals}
          onValueChange={setIndigoVals}
          slotSx={{
            tagChip: {
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              borderColor: 'rgba(99, 102, 241, 0.45)',
              color: '#4338CA',
              fontWeight: 700,
              '& .MuiChip-deleteIcon': { color: '#4338CA', '&:hover': { color: '#312E81' } },
            },
          }}
          helperText="tagChip: Indigo Slate palette"
        />
      </Box>
    </Stack>
  )
}
export const SlotSxTagChip: Story = {
  name: 'slotSx — Tag Chip Sub-Slots',
  render: () => <SlotSxTagsComponent />,
}

// ── 12. slotSx.paper — Dropdown Popover Styles ────────────────────────────
function SlotSxPaperComponent() {
  const [val, setVal] = useState<AutocompleteOption | null>(null)
  return (
    <Box sx={{ maxWidth: 440 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, fontFamily: 'monospace' }}>
        slotSx.paper · slotSx.listbox
      </Typography>
      <Autocomplete
        label="Custom Popover Menu (slotSx.paper)"
        placeholder="Open to see custom dropdown shadow..."
        options={INFAQ_OPTIONS}
        value={val}
        onValueChange={setVal}
        slotSx={{
          paper: {
            boxShadow: '0 20px 48px rgba(0, 163, 157, 0.2)',
            border: '1.5px solid #00A39D',
            borderRadius: '16px',
          },
          listbox: {
            p: 1,
            '& .MuiAutocomplete-option': {
              borderRadius: '8px',
            },
          },
        }}
        helperText="Open dropdown — teal border, elevated shadow, rounded listbox items"
      />
    </Box>
  )
}
export const SlotSxPaperAndListbox: Story = {
  name: 'slotSx — Paper & Listbox',
  render: () => <SlotSxPaperComponent />,
}

// ── 13. Bank Account Select (Real-World) ──────────────────────────────────
function BankAccountSelectComponent() {
  const [selected, setSelected] = useState<AutocompleteOption | null>(null)
  return (
    <Paper elevation={0} sx={{ maxWidth: 480, p: 3, borderRadius: '16px', border: '1px solid #E2E8F0' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Pilih Rekening Tujuan</Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Rekening terverifikasi yang terdaftar pada akun Anda
      </Typography>
      <Autocomplete
        label="Rekening Bank"
        placeholder="Cari rekening..."
        options={BANK_OPTIONS}
        value={selected}
        onValueChange={setSelected}
        borderRadius={12}
        slotSx={{
          optionLabel: { fontWeight: 700 },
          optionSubtitle: { fontFamily: 'monospace', fontSize: '0.7rem' },
        }}
        helperText={
          selected
            ? `✓ ${selected.label} — ${String(selected.subtitle)}`
            : 'Ketik nama perusahaan atau nomor rekening'
        }
      />
    </Paper>
  )
}
export const BankAccountSelect: Story = { render: () => <BankAccountSelectComponent /> }

// ── 14. Nominal Currency with Prefix Block (Real-World) ───────────────────
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

function NominalCurrencyPrefixBlockComponent() {
  const [nominal, setNominal] = useState<AutocompleteOption | string | null>(NOMINAL_OPTIONS[2]) // 50.000

  return (
    <Paper elevation={0} sx={{ maxWidth: 440, p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Nominal Donasi / Infaq
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Pilih preset nominal donasi atau ketik nominal kustom bebas
      </Typography>

      <Autocomplete
        freeSolo
        prefixBlock="Rp"
        placeholder="50.000"
        options={NOMINAL_OPTIONS}
        value={nominal}
        onValueChange={setNominal}
        filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
        borderRadius={12}
        helperText="Pilih dari daftar preset atau ketik nominal (bisa ketik '50' atau '50.000')"
      />
    </Paper>
  )
}
export const NominalCurrencyPrefixBlock: Story = {
  name: 'Real-World — Nominal Currency with Prefix Block (Rp)',
  render: () => <NominalCurrencyPrefixBlockComponent />,
}

// ── 15. Numeric Amount Filter (Best Practice) ────────────────────────────────
function NumericAmountFilterComponent() {
  const [selected, setSelected] = useState<AutocompleteOption | null>(null)

  return (
    <Paper elevation={0} sx={{ maxWidth: 440, p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Paket Top-Up Pulsa / E-Money
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
        Data option menyimpan raw number ({`value: 50000`}), label terformat otomatis ({`label: '50.000'`}).
      </Typography>

      <Autocomplete
        label="Pilih Nominal"
        prefixBlock="Rp"
        placeholder="Ketik 50 atau 50.000..."
        options={NOMINAL_OPTIONS}
        value={selected}
        onValueChange={setSelected}
        filterOptions={filterNumericOptions({ thousandSeparator: '.' })}
        borderRadius={12}
        helperText={`Nilai tersimpan di form/state: ${selected ? JSON.stringify(selected.value) : 'null'}`}
      />
    </Paper>
  )
}
export const NumericAmountFilter: Story = {
  name: 'Real-World — Numeric Search & Filter Best Practice',
  render: () => <NumericAmountFilterComponent />,
}
