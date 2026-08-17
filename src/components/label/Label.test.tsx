import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from './Label'

describe('Label Primitive', () => {
  it('renders label text correctly', () => {
    render(<Label text="Nama Lengkap" />)
    expect(screen.getByText('Nama Lengkap')).toBeInTheDocument()
  })

  it('renders children as label content', () => {
    render(<Label>Nomor Telepon</Label>)
    expect(screen.getByText('Nomor Telepon')).toBeInTheDocument()
  })

  it('renders required asterisk when required=true', () => {
    render(<Label required>Email Perusahaan</Label>)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders optional indicator when optional=true', () => {
    render(<Label optional>Catatan Tambahan</Label>)
    expect(screen.getByText('(Opsional)')).toBeInTheDocument()
  })

  it('renders custom optional node when optional is ReactNode', () => {
    render(<Label optional="[Optional]">Catatan</Label>)
    expect(screen.getByText('[Optional]')).toBeInTheDocument()
  })

  it('renders trailing action element', () => {
    render(
      <Label action={<a href="#forgot">Lupa Password?</a>}>
        Kata Sandi
      </Label>
    )
    expect(screen.getByText('Lupa Password?')).toBeInTheDocument()
  })

  it('attaches htmlFor attribute properly', () => {
    const { container } = render(<Label htmlFor="user-email">Email</Label>)
    const labelEl = container.querySelector('label')
    expect(labelEl).toHaveAttribute('for', 'user-email')
  })

  it('renders nothing if no text, children, or action provided', () => {
    const { container } = render(<Label />)
    expect(container.firstChild).toBeNull()
  })
})
