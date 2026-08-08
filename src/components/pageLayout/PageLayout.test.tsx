import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button, Chip } from '@mui/material'
import { PageLayout } from './PageLayout'

describe('PageLayout', () => {
  it('renders header title, subtitle, and breadcrumbs', () => {
    render(
      <PageLayout maxWidth="lg">
        <PageLayout.Header
          title="User Profile Settings"
          subtitle="Manage your personal preferences and notification rules"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Settings' },
          ]}
          status={<Chip label="Active" size="small" color="success" />}
        />
        <PageLayout.Content>
          <div>Page Body Content</div>
        </PageLayout.Content>
      </PageLayout>
    )

    expect(screen.getByText('User Profile Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your personal preferences and notification rules')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Page Body Content')).toBeInTheDocument()
  })

  it('renders action buttons and fires click handler', () => {
    const handleSave = vi.fn()

    render(
      <PageLayout>
        <PageLayout.Header
          title="Security"
          actions={
            <Button variant="contained" onClick={handleSave}>
              Save Security Rules
            </Button>
          }
        />
      </PageLayout>
    )

    const btn = screen.getByText('Save Security Rules')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(handleSave).toHaveBeenCalledTimes(1)
  })

  it('renders sticky footer with custom buttons', () => {
    render(
      <PageLayout maxWidth="sm">
        <PageLayout.Content>
          <div>Form Content</div>
        </PageLayout.Content>
        <PageLayout.StickyFooter>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Submit Form</Button>
        </PageLayout.StickyFooter>
      </PageLayout>
    )

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Submit Form')).toBeInTheDocument()
  })
})
