import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Box, Typography } from '@mui/material'
import { Steps } from './Steps'

const meta: Meta<typeof Steps> = {
  title: 'Components/Navigation/Steps',
  component: Steps,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 680, p: 4, bgcolor: '#F4F5F7' }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 4 } },
  },
}

export default meta
type Story = StoryObj<typeof Steps>

// ─── Static (read-only) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    steps: ['Detail', 'Review', 'Konfirmasi'],
    currentStep: 0,
  },
}

export const MiddleStep: Story = {
  name: 'Active: Middle Step',
  args: {
    steps: ['Detail', 'Review', 'Konfirmasi'],
    currentStep: 1,
  },
}

export const LastStep: Story = {
  name: 'Active: Last Step',
  args: {
    steps: ['Detail', 'Review', 'Konfirmasi'],
    currentStep: 2,
  },
}

export const FiveSteps: Story = {
  name: 'Five Steps',
  args: {
    steps: ['Identitas', 'Dokumen', 'Verifikasi', 'Review', 'Selesai'],
    currentStep: 2,
  },
}

// ─── With step objects (custom completed flag) ────────────────────────────────

export const ObjectSteps: Story = {
  name: 'Object Steps (Custom Completed)',
  args: {
    steps: [
      { key: 'identity', label: 'Identitas', completed: true },
      { key: 'docs', label: 'Dokumen', completed: true },
      { key: 'verify', label: 'Verifikasi', completed: false },
      { key: 'review', label: 'Review' },
    ],
    currentStep: 2,
  },
}

// ─── Interactive (clickable steps) ───────────────────────────────────────────

export const Clickable: Story = {
  name: 'Clickable Steps',
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [step, setStep] = useState(args.currentStep ?? 0)
    return (
      <Box>
        <Steps {...args} currentStep={step} onStepClick={setStep} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Active step: <strong>{step + 1}</strong> — click a step to navigate
        </Typography>
      </Box>
    )
  },
  args: {
    steps: ['Detail', 'Review', 'Konfirmasi'],
    currentStep: 0,
  },
}

// ─── Inline (no bottom margin) ────────────────────────────────────────────────

export const InlineNoMargin: Story = {
  name: 'Inline (sx override)',
  args: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    currentStep: 1,
    sx: { mb: 0, py: 0 },
  },
}
