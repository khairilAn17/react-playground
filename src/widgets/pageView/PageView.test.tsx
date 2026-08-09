import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@mui/material'
import { PageView } from './PageView'

describe('PageView Widget', () => {
  it('renders title, subtitle, and children content', () => {
    render(
      <PageView title="Manajemen Akun" subtitle="Daftar Akun Maker">
        <div>Account Table Content</div>
      </PageView>
    )

    expect(screen.getByText('Manajemen Akun')).toBeInTheDocument()
    expect(screen.getByText('Daftar Akun Maker')).toBeInTheDocument()
    expect(screen.getByText('Account Table Content')).toBeInTheDocument()
  })

  it('renders sticky footer when footerActions is passed', () => {
    render(
      <PageView
        title="Settings"
        footerActions={
          <>
            <Button>Cancel</Button>
            <Button variant="contained">Save Changes</Button>
          </>
        }
      >
        <div>Settings Content</div>
      </PageView>
    )

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders custom headerRight instead of ConnectedUserHeader when headerRight is passed', () => {
    render(
      <PageView title="Custom Header" headerRight={<Button>Custom Header Widget</Button>}>
        <div>Body Content</div>
      </PageView>
    )

    expect(screen.getByRole('button', { name: 'Custom Header Widget' })).toBeInTheDocument()
  })

  it('disables headerRight when null is passed', () => {
    const { container } = render(
      <PageView title="No Header Right" headerRight={null}>
        <div>Body Content</div>
      </PageView>
    )

    expect(screen.getByText('No Header Right')).toBeInTheDocument()
    // No expandable search or user avatar button in container
    expect(container.querySelector('[aria-label="search"]')).toBeNull()
  })
})
