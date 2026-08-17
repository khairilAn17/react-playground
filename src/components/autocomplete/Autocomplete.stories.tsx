import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import SchoolIcon from '@mui/icons-material/School'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MosqueIcon from '@mui/icons-material/Mosque'
import ChildCareIcon from '@mui/icons-material/ChildCare'

import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'

const FRAMEWORK_OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'A JavaScript library for building user interfaces', avatar: 'RC' },
  { label: 'Vue.js', value: 'vue', subtitle: 'The Progressive JavaScript Framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'The React Framework for the Web', avatar: 'NX', avatarBg: '#000000' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Deliver web apps with confidence', avatar: 'NG', avatarBg: '#DD0031' },
]

const INFAQ_CATEGORY_OPTIONS: AutocompleteOption[] = [
  {
    label: 'Tanggap Bencana & Kemanusiaan',
    value: 'bencana',
    subtitle: 'Bantuan darurat untuk korban bencana alam & kemanusiaan',
    icon: <VolunteerActivismIcon fontSize="small" />,
  },
  {
    label: 'Pendidikan & Beasiswa',
    value: 'pendidikan',
    subtitle: 'Bantuan pendidikan anak yatim dan dhuafa',
    icon: <SchoolIcon fontSize="small" />,
  },
  {
    label: 'Bantuan Medis & Kesehatan',
    value: 'kesehatan',
    subtitle: 'Biaya pengobatan dan fasilitas kesehatan',
    icon: <MedicalServicesIcon fontSize="small" />,
  },
  {
    label: 'Pembangunan Sarana & Masjid',
    value: 'masjid',
    subtitle: 'Renovasi dan pembangunan masjid pelosok',
    icon: <MosqueIcon fontSize="small" />,
  },
  {
    label: 'Santunan Yatim & Dhuafa',
    value: 'yatim',
    subtitle: 'Kebutuhan pokok & santunan rutin anak yatim',
    icon: <ChildCareIcon fontSize="small" />,
  },
]

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)

    return (
      <Box sx={{ maxWidth: 440 }}>
        <Autocomplete
          label="Framework"
          placeholder="Filter or choose framework..."
          options={FRAMEWORK_OPTIONS}
          value={value}
          onChange={(_, newValue) => setValue(newValue as AutocompleteOption | null)}
          helperText="Type directly into the field to search"
        />
      </Box>
    )
  },
}

export const KategoriInfaqFilterDemo: Story = {
  render: () => {
    const [category, setCategory] = useState<AutocompleteOption | null>(null)

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
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Filter Infaq
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
          Kategori Infaq
        </Typography>

        <Autocomplete
          placeholder="Filter Berdasarkan Kategori"
          options={INFAQ_CATEGORY_OPTIONS}
          value={category}
          onChange={(_, newVal) => setCategory(newVal as AutocompleteOption | null)}
          borderRadius={14}
        />
      </Paper>
    )
  },
}

export const MultiSelectChips: Story = {
  render: () => {
    const [values, setValues] = useState<AutocompleteOption[]>([FRAMEWORK_OPTIONS[0]])

    return (
      <Box sx={{ maxWidth: 480 }}>
        <Autocomplete
          multiple
          label="Selected Technologies"
          placeholder="Add technologies..."
          options={FRAMEWORK_OPTIONS}
          value={values}
          onChange={(_, newVal) => setValues(newVal as AutocompleteOption[])}
          helperText="Select multiple items as pill badges"
        />
      </Box>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    return (
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
    )
  },
}
