import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UserHeader } from './UserHeader'

describe('UserHeader Widget', () => {
  it('renders user name and role', () => {
    render(<UserHeader user={{ name: 'Shafa Riani', role: 'Maker' }} />)
    expect(screen.getByText('Shafa Riani')).toBeInTheDocument()
    expect(screen.getByText('Maker')).toBeInTheDocument()
  })

  it('renders notification icon and opens popover on click', async () => {
    render(<UserHeader unreadCount={2} />)
    const btn = screen.getByLabelText('Open notifications')
    fireEvent.click(btn)
    expect(await screen.findByText('Notifikasi')).toBeInTheDocument()
    expect(screen.getByText('Persetujuan Payroll')).toBeInTheDocument()
  })

  it('opens user profile menu on pill click', async () => {
    render(<UserHeader user={{ name: 'Shafa Riani', role: 'Maker' }} />)
    fireEvent.click(screen.getByText('Shafa Riani'))
    expect(await screen.findByText('Profil Akun')).toBeInTheDocument()
    expect(screen.getByText('Keluar')).toBeInTheDocument()
  })

  it('calls onLogout when Keluar menu item is clicked', async () => {
    const handleLogout = vi.fn()
    render(<UserHeader onLogout={handleLogout} />)
    fireEvent.click(screen.getByText('Shafa Riani'))
    fireEvent.click(await screen.findByText('Keluar'))
    expect(handleLogout).toHaveBeenCalled()
  })

  it('renders skeleton loader when loading is true', () => {
    const { container } = render(<UserHeader loading={true} />)
    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
  })
})
