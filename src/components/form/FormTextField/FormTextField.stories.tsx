import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormTextField } from './FormTextField'
import { TestFormWrapper } from '../../../test/test-utils'

interface StoryFormValues {
  username: string
  password: string
  bio?: string
  accountNumber: string
}

const meta: Meta<typeof FormTextField> = {
  title: 'Components/Form/FormTextField',
  component: FormTextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TestFormWrapper<StoryFormValues> defaultValues={{ username: '', password: '', bio: '', accountNumber: '' }}>
        <Story />
      </TestFormWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormTextField>

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'e.g. john_doe',
  },
}

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}

export const Multiline: Story = {
  args: {
    name: 'bio',
    label: 'Bio',
    multiline: true,
    rows: 4,
    placeholder: 'Tell us about yourself...',
  },
}

export const Disabled: Story = {
  args: {
    name: 'username',
    label: 'Username',
    disabled: true,
    value: 'read_only_user',
  },
}

/** Helper that triggers a field error immediately on mount */
function TriggerError({ name, message }: { name: string; message: string }) {
  const { setError } = useFormContext()
  useEffect(() => {
    setError(name, { type: 'manual', message })
  }, [name, message, setError])
  return null
}

/** Error state — red border + inline validation error message below the field */
export const WithError: Story = {
  render: () => (
    <TestFormWrapper<StoryFormValues>
      defaultValues={{ username: '', password: '', bio: '', accountNumber: '' }}
    >
      <TriggerError name="accountNumber" message="Nomor rekening penerima wajib diisi" />
      <FormTextField<StoryFormValues>
        name="accountNumber"
        placeholder="Masukkan Nomor Rekening Penerima"
      />
    </TestFormWrapper>
  ),
}

/** Error state with a label */
export const WithErrorLabelled: Story = {
  render: () => (
    <TestFormWrapper<StoryFormValues>
      defaultValues={{ username: '', password: '', bio: '', accountNumber: '' }}
    >
      <TriggerError name="username" message="Username wajib diisi" />
      <FormTextField<StoryFormValues>
        name="username"
        label="Username"
        placeholder="e.g. john_doe"
      />
    </TestFormWrapper>
  ),
}

/** Error overrides helperText — error message takes priority over the static helper text */
export const ErrorOverridesHelperText: Story = {
  render: () => (
    <TestFormWrapper<StoryFormValues>
      defaultValues={{ username: '', password: '', bio: '', accountNumber: '' }}
    >
      <TriggerError name="password" message="Password minimal 8 karakter" />
      <FormTextField<StoryFormValues>
        name="password"
        label="Password"
        type="password"
        helperText="Must be at least 8 characters"
      />
    </TestFormWrapper>
  ),
}
