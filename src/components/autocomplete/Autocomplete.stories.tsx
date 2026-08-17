import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Typography, Paper, Stack } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import NatureIcon from '@mui/icons-material/Nature'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SchoolIcon from '@mui/icons-material/School'
import MosqueIcon from '@mui/icons-material/Mosque'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'

import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'

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

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'BYOND BIZNIS Autocomplete component supporting single/multi-selection, checkable option rows, customizable pill chips (+N overflow tags), and the modern `onValueChange` pattern.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

// ── 1. Default Single Select (onValueChange) ───────────────────────────
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

export const Default: Story = {
  render: () => <DefaultStoryComponent />,
}

// ── 2. Multi-Select with Checkboxes & +N Overflow Tags ─────────────────
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

export const MultiSelectWithCheckboxes: Story = {
  render: () => <MultiSelectWithCheckboxesComponent />,
}

// ── 3. Checkbox Placement: Left vs Right ──────────────────────────────
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

export const CheckboxPlacements: Story = {
  render: () => <CheckboxPlacementsComponent />,
}

// ── 4. Tag Display: Avatar vs Label-only ───────────────────────────────
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

export const TagDisplayModes: Story = {
  render: () => <TagDisplayModesComponent />,
}

// ── 5. Infaq Filter Drawer Card Demo ──────────────────────────────────
function InfaqFilterCardDemoComponent() {
  const [selectedCategory, setSelectedCategory] = useState<AutocompleteOption | null>(null)

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 440,
        p: 3,
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Filter Berdasarkan Kategori
      </Typography>
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

export const InfaqFilterCardDemo: Story = {
  render: () => <InfaqFilterCardDemoComponent />,
}

// ── 6. Sizes ──────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <Box sx={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete
        size="small"
        label="Small (40px)"
        placeholder="Search items..."
        options={FRAMEWORK_OPTIONS}
      />
      <Autocomplete
        size="medium"
        label="Medium (48px - Default)"
        placeholder="Search items..."
        options={FRAMEWORK_OPTIONS}
      />
      <Autocomplete
        size="large"
        label="Large (56px)"
        placeholder="Search items..."
        options={FRAMEWORK_OPTIONS}
      />
    </Box>
  ),
}

// ── 7. States: Error & Disabled ───────────────────────────────────────
export const States: Story = {
  render: () => (
    <Box sx={{ maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete
        label="Error State"
        placeholder="Choose framework..."
        options={FRAMEWORK_OPTIONS}
        error
        helperText="This field is required. Please select a valid option."
      />
      <Autocomplete
        label="Disabled State"
        placeholder="Cannot interact..."
        options={FRAMEWORK_OPTIONS}
        disabled
        value={FRAMEWORK_OPTIONS[0]}
        helperText="This control has been disabled by form logic."
      />
    </Box>
  ),
}
