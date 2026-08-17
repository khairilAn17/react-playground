import type { Meta, StoryObj } from '@storybook/react'
import { FormAutocomplete } from './FormAutocomplete'
import { TestFormWrapper } from '../../../test/test-utils'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import SchoolIcon from '@mui/icons-material/School'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MosqueIcon from '@mui/icons-material/Mosque'
import ChildCareIcon from '@mui/icons-material/ChildCare'

interface StoryFormValues {
  framework: string
  tags?: string[]
  kategori?: string
}

const SAMPLE_OPTIONS = [
  { label: 'React', value: 'react', subtitle: 'UI library', avatar: 'RC' },
  { label: 'Vue.js', value: 'vue', subtitle: 'Progressive framework', avatar: 'VU', avatarBg: '#42B883' },
  { label: 'Next.js', value: 'nextjs', subtitle: 'React framework', avatar: 'NX', avatarBg: '#000000' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Compiler framework', avatar: 'SV', avatarBg: '#FF3E00' },
  { label: 'Angular', value: 'angular', subtitle: 'Enterprise platform', avatar: 'NG', avatarBg: '#DD0031' },
]

const INFAQ_OPTIONS = [
  { label: 'Tanggap Bencana & Kemanusiaan', value: 'bencana', subtitle: 'Bantuan darurat', icon: <VolunteerActivismIcon fontSize="small" /> },
  { label: 'Pendidikan & Beasiswa', value: 'pendidikan', subtitle: 'Beasiswa dhuafa', icon: <SchoolIcon fontSize="small" /> },
  { label: 'Bantuan Medis & Kesehatan', value: 'kesehatan', subtitle: 'Biaya pengobatan', icon: <MedicalServicesIcon fontSize="small" /> },
  { label: 'Pembangunan Sarana & Masjid', value: 'masjid', subtitle: 'Pembangunan masjid', icon: <MosqueIcon fontSize="small" /> },
  { label: 'Santunan Yatim & Dhuafa', value: 'yatim', subtitle: 'Kebutuhan yatim', icon: <ChildCareIcon fontSize="small" /> },
]

const meta: Meta<typeof FormAutocomplete> = {
  title: 'Components/Form/FormAutocomplete',
  component: FormAutocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ framework: 'react', tags: ['react', 'nextjs'], kategori: '' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormAutocomplete>

export const Default: Story = {
  args: {
    name: 'framework',
    label: 'Primary Framework',
    options: SAMPLE_OPTIONS,
  },
}

export const WithHelperText: Story = {
  args: {
    name: 'framework',
    label: 'Primary Framework',
    options: SAMPLE_OPTIONS,
    helperText: 'Select your main frontend technology',
  },
}

export const KategoriInfaqForm: Story = {
  args: {
    name: 'kategori',
    label: 'Kategori Infaq',
    placeholder: 'Filter Berdasarkan Kategori',
    options: INFAQ_OPTIONS,
    borderRadius: 14,
  },
}

export const MultiSelectTags: Story = {
  args: {
    multiple: true,
    name: 'tags',
    label: 'Tech Stack (Multi-Select)',
    placeholder: 'Add technologies...',
    options: SAMPLE_OPTIONS,
  },
}
