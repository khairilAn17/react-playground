import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'

const OPTIONS: AutocompleteOption[] = [
  { label: 'React', value: 'react', subtitle: 'Frontend library' },
  { label: 'Vue', value: 'vue', subtitle: 'Progressive framework' },
  { label: 'Svelte', value: 'svelte', subtitle: 'Cybernetically enhanced web apps' },
  { label: 'Angular', value: 'angular', disabled: true },
]

describe('Autocomplete', () => {
  it('renders label, placeholder, and helper text correctly', () => {
    render(
      <Autocomplete
        label="Framework"
        placeholder="Choose tech stack..."
        helperText="Select your primary framework"
        options={OPTIONS}
      />
    )

    expect(screen.getByText('Framework')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Choose tech stack...')).toBeInTheDocument()
    expect(screen.getByText('Select your primary framework')).toBeInTheDocument()
  })

  it('selects an option on click', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Autocomplete
        label="Framework"
        options={OPTIONS}
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)

    const option = await screen.findByRole('option', { name: /React/i })
    await user.click(option)

    expect(handleChange).toHaveBeenCalledWith(
      expect.anything(),
      OPTIONS[0],
      'selectOption',
      expect.anything()
    )
  })

  it('renders multi-select chips when multiple is true', async () => {
    const handleChange = vi.fn()

    render(
      <Autocomplete
        multiple
        label="Frameworks"
        options={OPTIONS}
        value={[OPTIONS[0], OPTIONS[1]]}
        onChange={handleChange}
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('renders in disabled state', () => {
    render(
      <Autocomplete
        disabled
        label="Framework"
        options={OPTIONS}
      />
    )

    const input = screen.getByRole('combobox')
    expect(input).toBeDisabled()
  })

  it('displays error state', () => {
    render(
      <Autocomplete
        error
        label="Framework"
        helperText="This field is required"
        options={OPTIONS}
      />
    )

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('renders maxVisibleTags with overflow chip', () => {
    render(
      <Autocomplete
        multiple
        label="Frameworks"
        options={OPTIONS}
        value={[OPTIONS[0], OPTIONS[1], OPTIONS[2]]}
        maxVisibleTags={2}
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.queryByText('Svelte')).not.toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('renders checkbox in options when multiple is true', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        multiple
        label="Frameworks"
        options={OPTIONS}
        checkboxPlacement="right"
      />
    )

    const input = screen.getByRole('combobox')
    await user.click(input)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })
})
