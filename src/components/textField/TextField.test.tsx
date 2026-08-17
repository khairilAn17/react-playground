import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('formats Indonesian currency with live thousand separators (format="currency")', () => {
    const handleValueChange = vi.fn()
    render(
      <TextField
        format="currency"
        defaultValue="1000000"
        placeholder="0"
        onValueChange={handleValueChange}
      />
    )

    const input = screen.getByPlaceholderText('0') as HTMLInputElement
    // Initial display value formatted with dots
    expect(input.value).toBe('1.000.000')

    // Typing changes format to display with dots and comma for decimals
    fireEvent.change(input, { target: { value: '2500000,50' } })
    expect(input.value).toBe('2.500.000,50')
    expect(handleValueChange).toHaveBeenCalledWith('2500000.50')
  })

  it('formats with custom US separators when configured', () => {
    const handleValueChange = vi.fn()
    render(
      <TextField
        format="currency"
        thousandSeparator=","
        decimalSeparator="."
        defaultValue="1000000.50"
        placeholder="0"
        onValueChange={handleValueChange}
      />
    )

    const input = screen.getByPlaceholderText('0') as HTMLInputElement
    expect(input.value).toBe('1,000,000.50')

    fireEvent.change(input, { target: { value: '3,500,000.75' } })
    expect(input.value).toBe('3,500,000.75')
    expect(handleValueChange).toHaveBeenCalledWith('3500000.75')
  })

  it('allows live keystroke editing in international US Dollar format with userEvent', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()

    render(
      <TextField
        format="currency"
        prefixBlock="$"
        thousandSeparator=","
        decimalSeparator="."
        placeholder="0.00"
        onValueChange={handleValueChange}
      />
    )

    const input = screen.getByPlaceholderText('0.00') as HTMLInputElement

    await user.type(input, '1250000.5')
    expect(input.value).toBe('1,250,000.5')
    expect(handleValueChange).toHaveBeenLastCalledWith('1250000.5')

    // Add another digit
    await user.type(input, '9')
    expect(input.value).toBe('1,250,000.59')
    expect(handleValueChange).toHaveBeenLastCalledWith('1250000.59')
  })

  it('enforces type="text" when format="currency" even if type="number" was passed', () => {
    render(
      <TextField
        format="currency"
        type="number"
        thousandSeparator=","
        decimalSeparator="."
        defaultValue="1250000"
        placeholder="0"
      />
    )

    const input = screen.getByPlaceholderText('0') as HTMLInputElement
    expect(input.type).toBe('text')
    expect(input.value).toBe('1,250,000')
  })
})

