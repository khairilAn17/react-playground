import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TextField } from './TextField'

describe('TextField Primitive', () => {
  it('renders label and placeholder correctly (Image 1)', () => {
    render(
      <TextField
        label="Nama Lengkap"
        placeholder="Label"
      />
    )

    expect(screen.getByText('Nama Lengkap')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Label')).toBeInTheDocument()
  })

  it('updates value and calls onValueChange (Image 2)', () => {
    const handleValueChange = vi.fn()
    render(
      <TextField
        placeholder="Type here..."
        onValueChange={handleValueChange}
      />
    )

    const input = screen.getByPlaceholderText('Type here...') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Value' } })

    expect(input.value).toBe('Value')
    expect(handleValueChange).toHaveBeenCalledWith('Value')
  })

  it('renders error state and helper text (Image 3)', () => {
    render(
      <TextField
        value="87654321908"
        error
        helperText="No. Meter/IDPEL tidak terdaftar"
      />
    )

    expect(screen.getByDisplayValue('87654321908')).toBeInTheDocument()
    expect(screen.getByText('No. Meter/IDPEL tidak terdaftar')).toBeInTheDocument()
  })

  it('renders character counter correctly (Image 4)', () => {
    render(
      <TextField
        placeholder="Tulis Doa"
        defaultValue="Semoga berkah ya"
        showCount
        maxLength={75}
      />
    )

    expect(screen.getByPlaceholderText('Tulis Doa')).toBeInTheDocument()
    // 16 characters in "Semoga berkah ya" -> 16/75
    expect(screen.getByText('16/75')).toBeInTheDocument()
  })

  it('renders shaded prefix block correctly (Image 5)', () => {
    render(
      <TextField
        prefixBlock="Rp"
        placeholder="Dari"
      />
    )

    expect(screen.getByText('Rp')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Dari')).toBeInTheDocument()
  })

  it('clears value when clear button is clicked', () => {
    const handleClear = vi.fn()
    render(
      <TextField
        defaultValue="Initial text"
        clearable
        onClear={handleClear}
      />
    )

    const clearBtn = screen.getByLabelText('Clear input text')
    expect(clearBtn).toBeInTheDocument()

    fireEvent.click(clearBtn)
    expect(handleClear).toHaveBeenCalled()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })

  it('toggles password visibility when showPasswordToggle is enabled', () => {
    render(
      <TextField
        type="password"
        defaultValue="secret123"
        showPasswordToggle
      />
    )

    const input = screen.getByDisplayValue('secret123') as HTMLInputElement
    expect(input.type).toBe('password')

    const toggleBtn = screen.getByLabelText('Show password')
    fireEvent.click(toggleBtn)
    expect(input.type).toBe('text')

    const hideBtn = screen.getByLabelText('Hide password')
    fireEvent.click(hideBtn)
    expect(input.type).toBe('password')
  })

  it('handles type="number" with min, max, step, and scroll blur protection', () => {
    render(
      <TextField
        type="number"
        defaultValue={50000}
        min={10000}
        max={100000}
        step={1000}
        placeholder="Nominal"
      />
    )

    const input = screen.getByPlaceholderText('Nominal') as HTMLInputElement
    expect(input.type).toBe('number')
    expect(input.value).toBe('50000')
    expect(input.min).toBe('10000')
    expect(input.max).toBe('100000')
    expect(input.step).toBe('1000')

    // Wheel event triggers blur protection
    const blurSpy = vi.spyOn(input, 'blur')
    fireEvent.wheel(input)
    expect(blurSpy).toHaveBeenCalled()
  })
})
