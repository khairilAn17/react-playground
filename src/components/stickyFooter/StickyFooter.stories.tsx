import type { Meta, StoryObj } from '@storybook/react'
import { Box, Button, Typography } from '@mui/material'
import { StickyFooter } from './StickyFooter'

const meta: Meta<typeof StickyFooter> = {
  title: 'Components/Layout/StickyFooter',
  component: StickyFooter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        sx={{
          maxWidth: 720,
          minHeight: 320,
          mx: 'auto',
          p: 3,
          bgcolor: '#F4F5F7',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1, mb: 2 }}>
          Page content lives here. The footer sticks to the bottom.
        </Typography>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'between'],
    },
  },
}

export default meta
type Story = StoryObj<typeof StickyFooter>

// ─── Default (right-aligned) ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    align: 'right',
    children: (
      <>
        <Button variant="outlined" color="inherit">
          Batal
        </Button>
        <Button variant="contained">Simpan</Button>
      </>
    ),
  },
}

// ─── Left aligned ─────────────────────────────────────────────────────────────

export const LeftAligned: Story = {
  name: 'Align: Left',
  args: {
    align: 'left',
    children: (
      <>
        <Button variant="outlined" color="inherit">
          Batal
        </Button>
        <Button variant="contained">Simpan</Button>
      </>
    ),
  },
}

// ─── Center aligned ───────────────────────────────────────────────────────────

export const CenterAligned: Story = {
  name: 'Align: Center',
  args: {
    align: 'center',
    children: (
      <>
        <Button variant="outlined" color="inherit">
          Batal
        </Button>
        <Button variant="contained">Lanjut</Button>
      </>
    ),
  },
}

// ─── Space between ────────────────────────────────────────────────────────────

export const SpaceBetween: Story = {
  name: 'Align: Between (Back & Next)',
  args: {
    align: 'between',
    children: (
      <>
        <Button variant="outlined" color="inherit">
          ← Kembali
        </Button>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" color="inherit">
            Batal
          </Button>
          <Button variant="contained">Lanjut →</Button>
        </Box>
      </>
    ),
  },
}

// ─── Single action ────────────────────────────────────────────────────────────

export const SingleAction: Story = {
  name: 'Single Action',
  args: {
    align: 'right',
    children: <Button variant="contained">Kirim Pengajuan</Button>,
  },
}

// ─── Custom sx ────────────────────────────────────────────────────────────────

export const CustomSx: Story = {
  name: 'Custom sx (no border)',
  args: {
    align: 'between',
    sx: {
      border: 'none',
      borderTop: '1px solid #E2E8F0',
      borderRadius: 0,
      mt: 0,
      boxShadow: '0 -2px 8px rgba(0,163,157,0.08)',
    },
    children: (
      <>
        <Button variant="text" color="inherit">
          Batal
        </Button>
        <Button variant="contained">Konfirmasi</Button>
      </>
    ),
  },
}
