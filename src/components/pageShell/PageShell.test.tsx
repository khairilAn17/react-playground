import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button, Chip } from '@mui/material'
import { PageShell } from './PageShell'

describe('PageShell', () => {
  it('renders header title, subtitle, and breadcrumbs', () => {
    render(
      <PageShell maxWidth="lg">
        <PageShell.Header
          title="User Profile Settings"
          subtitle="Manage your personal preferences and notification rules"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Settings' },
          ]}
          status={<Chip label="Active" size="small" color="success" />}
        />
        <PageShell.Content>
          <div>Page Body Content</div>
        </PageShell.Content>
      </PageShell>
    )

    expect(screen.getByText('User Profile Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your personal preferences and notification rules')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Page Body Content')).toBeInTheDocument()
  })

  it('supports shorthand props mode (zero boilerplate)', () => {
    render(
      <PageShell
        title="Manajemen Akun"
        subtitle="Daftar Akun Maker"
        subtitleDescription="Tambah Maker dan kelola hingga 10 akun di halaman ini"
        actions={<Button variant="contained">Tambah Maker</Button>}
      >
        <div>Shorthand Body Content</div>
      </PageShell>
    )

    expect(screen.getByText('Manajemen Akun')).toBeInTheDocument()
    expect(screen.getByText('Daftar Akun Maker')).toBeInTheDocument()
    expect(screen.getByText('Tambah Maker dan kelola hingga 10 akun di halaman ini')).toBeInTheDocument()
    expect(screen.getByText('Tambah Maker')).toBeInTheDocument()
    expect(screen.getByText('Shorthand Body Content')).toBeInTheDocument()
  })

  it('renders horizontal step wizard indicator', () => {
    render(
      <PageShell
        title="Payroll"
        steps={['Detail Payroll', 'Tujuan Payroll', 'Validasi Tujuan', 'Periksa Detail']}
        currentStep={1}
      >
        <div>Payroll Step 2 Content</div>
      </PageShell>
    )

    expect(screen.getByText('Payroll')).toBeInTheDocument()
    expect(screen.getByText('Detail Payroll')).toBeInTheDocument()
    expect(screen.getByText('Tujuan Payroll')).toBeInTheDocument()
    expect(screen.getByText('Validasi Tujuan')).toBeInTheDocument()
    expect(screen.getByText('Periksa Detail')).toBeInTheDocument()
  })

  it('renders action buttons and fires click handler', () => {
    const handleSave = vi.fn()

    render(
      <PageShell>
        <PageShell.Header
          title="Security"
          actions={
            <Button variant="contained" onClick={handleSave}>
              Save Security Rules
            </Button>
          }
        />
      </PageShell>
    )

    const btn = screen.getByText('Save Security Rules')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(handleSave).toHaveBeenCalledTimes(1)
  })

  it('renders sticky footer with custom buttons', () => {
    render(
      <PageShell maxWidth="sm">
        <PageShell.Content>
          <div>Form Content</div>
        </PageShell.Content>
        <PageShell.StickyFooter>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Submit Form</Button>
        </PageShell.StickyFooter>
      </PageShell>
    )

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Submit Form')).toBeInTheDocument()
  })
})
