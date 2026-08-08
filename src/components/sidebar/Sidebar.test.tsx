import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import { Sidebar } from './Sidebar'
import type { SidebarItemConfig } from './types'

describe('Sidebar', () => {
  it('renders brand title and items in compound component mode', () => {
    render(
      <Sidebar activeKey="dashboard">
        <Sidebar.Header title="Acme Dashboard" />
        <Sidebar.Nav>
          <Sidebar.Section title="Main">
            <Sidebar.Item itemKey="dashboard" icon={<DashboardIcon />} label="Dashboard" />
            <Sidebar.Item itemKey="settings" icon={<SettingsIcon />} label="Settings" />
          </Sidebar.Section>
        </Sidebar.Nav>
      </Sidebar>
    )

    expect(screen.getByText('Acme Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('calls onSelect when navigation item is clicked', () => {
    const handleSelect = vi.fn()

    render(
      <Sidebar activeKey="dashboard" onSelect={handleSelect}>
        <Sidebar.Nav>
          <Sidebar.Item itemKey="dashboard" label="Dashboard" />
          <Sidebar.Item itemKey="projects" label="Projects" />
        </Sidebar.Nav>
      </Sidebar>
    )

    fireEvent.click(screen.getByText('Projects'))
    expect(handleSelect).toHaveBeenCalledWith('projects')
  })

  it('toggles collapse state when header toggle is clicked', () => {
    const handleToggle = vi.fn()

    render(
      <Sidebar defaultCollapsed={false} onToggleCollapsed={handleToggle}>
        <Sidebar.Header title="Acme Inc" showToggle />
        <Sidebar.Nav>
          <Sidebar.Item itemKey="dashboard" label="Dashboard" />
        </Sidebar.Nav>
      </Sidebar>
    )

    const toggleBtn = screen.getByLabelText('Collapse sidebar')
    fireEvent.click(toggleBtn)
    expect(handleToggle).toHaveBeenCalledWith(true)
  })

  it('expands nested collapsible menu on click', () => {
    render(
      <Sidebar activeKey="active-proj">
        <Sidebar.Nav>
          <Sidebar.Collapse icon={<FolderIcon />} label="Projects" defaultOpen={false}>
            <Sidebar.Item itemKey="active-proj" label="Active Projects" />
            <Sidebar.Item itemKey="archived-proj" label="Archived Projects" />
          </Sidebar.Collapse>
        </Sidebar.Nav>
      </Sidebar>
    )

    // Items inside collapsed section shouldn't be visible initially
    expect(screen.queryByText('Active Projects')).not.toBeInTheDocument()

    // Click section header to expand
    fireEvent.click(screen.getByText('Projects'))
    expect(screen.getByText('Active Projects')).toBeInTheDocument()
    expect(screen.getByText('Archived Projects')).toBeInTheDocument()
  })

  it('renders correctly from data-driven items configuration', () => {
    const sampleItems: SidebarItemConfig[] = [
      { kind: 'header', title: 'Workspace' },
      { kind: 'item', key: 'overview', label: 'Overview', icon: <DashboardIcon /> },
      {
        kind: 'group',
        key: 'documents',
        label: 'Documents',
        icon: <FolderIcon />,
        defaultOpen: true,
        children: [
          { kind: 'item', key: 'reports', label: 'Reports' },
        ],
      },
    ]

    render(<Sidebar items={sampleItems} activeKey="overview" />)

    expect(screen.getByText('Workspace')).toBeInTheDocument()
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Documents')).toBeInTheDocument()
    expect(screen.getByText('Reports')).toBeInTheDocument()
  })
})
