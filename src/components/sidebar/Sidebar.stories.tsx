import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import PeopleIcon from '@mui/icons-material/People'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SecurityIcon from '@mui/icons-material/Security'
import HelpIcon from '@mui/icons-material/Help'
import { Box, Chip } from '@mui/material'

import { Sidebar } from './Sidebar'
import type { SidebarItemConfig } from './types'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ height: 600, display: 'flex', bgcolor: 'grey.100', p: 2 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const CompoundComponent: Story = {
  render: function CompoundSidebarStory() {
    const [activeKey, setActiveKey] = useState('dashboard')
    const [collapsed, setCollapsed] = useState(false)

    return (
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={setCollapsed}
        activeKey={activeKey}
        onSelect={setActiveKey}
      >
        <Sidebar.Header
          logo={
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              A
            </Box>
          }
          title="Acme Portal"
          subtitle="Enterprise v2.4"
        />

        <Sidebar.Nav>
          <Sidebar.Section title="Main">
            <Sidebar.Item
              itemKey="dashboard"
              icon={<DashboardIcon />}
              label="Dashboard"
            />
            <Sidebar.Item
              itemKey="analytics"
              icon={<AnalyticsIcon />}
              label="Analytics"
              badge={<Chip label="New" size="small" color="secondary" sx={{ height: 18 }} />}
            />
          </Sidebar.Section>

          <Sidebar.Section title="Management" divider>
            <Sidebar.Collapse
              itemKey="projects"
              icon={<FolderIcon />}
              label="Projects"
              defaultOpen
            >
              <Sidebar.Item itemKey="active-projects" label="Active Projects" badge="8" />
              <Sidebar.Item itemKey="archived-projects" label="Archived" />
            </Sidebar.Collapse>

            <Sidebar.Item
              itemKey="team"
              icon={<PeopleIcon />}
              label="Team Members"
            />
          </Sidebar.Section>

          <Sidebar.Section title="System" divider>
            <Sidebar.Item
              itemKey="security"
              icon={<SecurityIcon />}
              label="Security & Compliance"
            />
            <Sidebar.Item
              itemKey="settings"
              icon={<SettingsIcon />}
              label="Settings"
            />
            <Sidebar.Item
              itemKey="help"
              icon={<HelpIcon />}
              label="Help Center"
            />
          </Sidebar.Section>
        </Sidebar.Nav>

        <Sidebar.Footer
          user={{
            name: 'Jane Doe',
            email: 'jane.doe@acme.com',
          }}
          onLogout={() => alert('Logged out')}
        />
      </Sidebar>
    )
  },
}

export const DataDrivenConfig: Story = {
  render: function DataDrivenStory() {
    const [activeKey, setActiveKey] = useState('dashboard')

    const items: SidebarItemConfig[] = [
      { kind: 'header', title: 'Main Navigation' },
      { kind: 'item', key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { kind: 'item', key: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, badge: 'Live' },
      { kind: 'divider' },
      { kind: 'header', title: 'Workspaces' },
      {
        kind: 'group',
        key: 'projects',
        label: 'Projects',
        icon: <FolderIcon />,
        defaultOpen: true,
        children: [
          { kind: 'item', key: 'active', label: 'Active Projects', badge: '12' },
          { kind: 'item', key: 'archived', label: 'Archived Projects' },
        ],
      },
      { kind: 'item', key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ]

    return <Sidebar items={items} activeKey={activeKey} onSelect={setActiveKey} />
  },
}

export const CollapsedMiniMode: Story = {
  render: function CollapsedStory() {
    const [activeKey, setActiveKey] = useState('dashboard')

    return (
      <Sidebar collapsed activeKey={activeKey} onSelect={setActiveKey}>
        <Sidebar.Header
          logo={
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              A
            </Box>
          }
          title="Acme Portal"
        />

        <Sidebar.Nav>
          <Sidebar.Item itemKey="dashboard" icon={<DashboardIcon />} label="Dashboard" />
          <Sidebar.Item itemKey="analytics" icon={<AnalyticsIcon />} label="Analytics" />
          <Sidebar.Collapse icon={<FolderIcon />} label="Projects">
            <Sidebar.Item itemKey="active" label="Active" />
          </Sidebar.Collapse>
          <Sidebar.Item itemKey="settings" icon={<SettingsIcon />} label="Settings" />
        </Sidebar.Nav>

        <Sidebar.Footer user={{ name: 'Jane Doe' }} />
      </Sidebar>
    )
  },
}
