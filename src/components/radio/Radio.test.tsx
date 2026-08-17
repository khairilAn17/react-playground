import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RadioGroup } from './RadioGroup'
import { RadioCard } from './RadioCard'
import type { RadioOption } from './types'

const OPTIONS: RadioOption[] = [
  { label: 'Sekali', value: 'once' },
  { label: 'Rutin', value: 'routine', description: 'Transaksi otomatis berulang' },
  { label: 'Terjadwal', value: 'scheduled', disabled: true },
]

describe('RadioGroup Primitive', () => {
  it('renders default radio buttons with label', () => {
    render(<RadioGroup label="Frekuensi Transfer" options={OPTIONS} value="once" />)

    expect(screen.getByText('Frekuensi Transfer')).toBeInTheDocument()
    expect(screen.getByLabelText('Sekali')).toBeInTheDocument()
    expect(screen.getByLabelText('Rutin')).toBeInTheDocument()
    expect(screen.getByLabelText('Terjadwal')).toBeDisabled()
  })

  it('renders card variant correctly (like reference image)', () => {
    render(
      <RadioGroup
        variant="card"
        label="Frekuensi Transfer"
        options={OPTIONS}
        value="routine"
      />
    )

    expect(screen.getByText('Sekali')).toBeInTheDocument()
    expect(screen.getByText('Rutin')).toBeInTheDocument()
    expect(screen.getByText('Transaksi otomatis berulang')).toBeInTheDocument()

    // Routine option should be checked
    const routineRadio = screen.getByRole('radio', { name: /Rutin/i })
    expect(routineRadio).toBeChecked()
  })

  it('triggers onChange and onValueChange callbacks on selection', () => {
    const handleValueChange = vi.fn()
    const handleChange = vi.fn()

    render(
      <RadioGroup
        variant="card"
        options={OPTIONS}
        defaultValue="once"
        onValueChange={handleValueChange}
        onChange={handleChange}
      />
    )

    const routineOption = screen.getByText('Rutin')
    fireEvent.click(routineOption)

    expect(handleValueChange).toHaveBeenCalledWith('routine')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays helper text and error message when configured', () => {
    render(
      <RadioGroup
        options={OPTIONS}
        error
        helperText="Pilihan ini wajib diisi"
      />
    )

    expect(screen.getByText('Pilihan ini wajib diisi')).toBeInTheDocument()
  })

  it('supports right-aligned radio placement and none placement in RadioCard', () => {
    const { rerender } = render(
      <RadioCard
        option={{ label: 'Transfer Cepat', value: 'fast', endContent: 'Rp 2.500' }}
        checked={false}
        radioPlacement="right"
      />
    )

    expect(screen.getByText('Transfer Cepat')).toBeInTheDocument()
    expect(screen.getByText('Rp 2.500')).toBeInTheDocument()

    rerender(
      <RadioCard
        option={{ label: 'Transfer Cepat', value: 'fast' }}
        checked={true}
        radioPlacement="none"
      />
    )
    expect(screen.getByText('Transfer Cepat')).toBeInTheDocument()
  })
})
