import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import PeopleIcon from '@mui/icons-material/People'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SecurityIcon from '@mui/icons-material/Security'
import HelpIcon from '@mui/icons-material/Help'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'

import { Sidebar } from '../../components/sidebar'
import type { SidebarItemConfig } from '../../components/sidebar'
import { PageLayout } from '../../components/pageLayout'
import { ExpandableSearch } from '../../components/search'

export function SidebarDemo() {
  const [activeKey, setActiveKey] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [apiType, setApiType] = useState<'compound' | 'data-driven'>('compound')

  const sampleDataDrivenItems: SidebarItemConfig[] = [
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
        { kind: 'item', key: 'active-projects', label: 'Active Projects', badge: '8' },
        { kind: 'item', key: 'archived-projects', label: 'Archived Projects' },
      ],
    },
    { kind: 'item', key: 'team', label: 'Team Members', icon: <PeopleIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'System' },
    { kind: 'item', key: 'security', label: 'Security & Audit', icon: <SecurityIcon /> },
    { kind: 'item', key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    { kind: 'item', key: 'help', label: 'Help Center', icon: <HelpIcon /> },
  ]

  return (
    <PageLayout maxWidth="xl">

      <PageLayout.Header
        title="Sidebar Navigation Kit"
        subtitle="Reusable · Customizable · Scalable · Readable · Maintainable — built with compound components and a data-driven config API."
        breadcrumbs={[
          { label: 'Navigation & Layout', href: '#' },
          { label: 'Sidebar Architecture' },
        ]}
        status={<Chip label="Live Preview" color="success" size="small" icon={<ViewSidebarIcon sx={{ fontSize: '0.9rem !important' }} />} />}
        actions={
          <Button
            variant={collapsed ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </Button>
        }
      />

      <PageLayout.Content>
        {/* API Mode Controls */}
        <PageLayout.Section
          title="API Architecture Mode"
          description="Switch between the Compound Component API and the Data-Driven JSON config API."
          variant="plain"
          divider
        >
          <RadioGroup
            row
            value={apiType}
            onChange={(e) => setApiType(e.target.value as 'compound' | 'data-driven')}
          >
            <FormControlLabel
              value="compound"
              control={<Radio size="small" />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Compound Components</Typography>
                  <Typography variant="caption" color="text.secondary">{'<Sidebar.Item />'} — explicit JSX composition</Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="data-driven"
              control={<Radio size="small" />}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Data-Driven Config</Typography>
                  <Typography variant="caption" color="text.secondary">{'items={[...]}'} — JSON-driven rendering</Typography>
                </Box>
              }
            />
          </RadioGroup>
        </PageLayout.Section>

        {/* Live Preview Frame */}
        <PageLayout.Section
          title="Live Sidebar Preview"
          description="Interact with the sidebar: click items, toggle collapse, and switch API modes to see real-time changes."
          variant="card"
        >
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              height: 580,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'background.default',
            }}
          >
            {/* Sidebar — Compound vs Data-Driven */}
            {apiType === 'compound' ? (
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
                        borderRadius: 1.5,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                      }}
                    >
                      R
                    </Box>
                  }
                  title="React Hub"
                  subtitle="Production App Layout"
                />

                <Sidebar.Nav>
                  <Sidebar.Section title="Main Overview">
                    <Sidebar.Item
                      itemKey="dashboard"
                      icon={<DashboardIcon />}
                      label="Dashboard"
                    />
                    <Sidebar.Item
                      itemKey="analytics"
                      icon={<AnalyticsIcon />}
                      label="Analytics"
                      badge={<Chip label="Live" size="small" color="success" sx={{ height: 18 }} />}
                    />
                  </Sidebar.Section>

                  <Sidebar.Section title="Workspaces" divider>
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

                  <Sidebar.Section title="System Settings" divider>
                    <Sidebar.Item
                      itemKey="security"
                      icon={<SecurityIcon />}
                      label="Security & Audit"
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
                    name: 'Alex Morgan',
                    email: 'alex.morgan@acme.io',
                  }}
                  onLogout={() => alert('Logged out successfully')}
                />
              </Sidebar>
            ) : (
              <Sidebar
                collapsed={collapsed}
                onToggleCollapsed={setCollapsed}
                items={sampleDataDrivenItems}
                activeKey={activeKey}
                onSelect={setActiveKey}
              />
            )}

            {/* Dynamic Content Panel */}
            <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50', overflowY: 'auto' }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                        {activeKey.replace('-', ' ')}
                      </Typography>
                      <Chip label={`Key: ${activeKey}`} size="small" color="primary" variant="outlined" />
                    </Box>
                    <Divider />

                    <Typography variant="body1" color="text.secondary">
                      You are currently viewing the content panel linked to <strong>{activeKey}</strong>.
                    </Typography>

                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px dashed',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Active Configuration
                      </Typography>
                      <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                        {JSON.stringify(
                          {
                            activeRouteKey: activeKey,
                            sidebarState: collapsed ? 'Collapsed (68px)' : 'Expanded (260px)',
                            apiPattern: apiType,
                          },
                          null,
                          2
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </PageLayout.Section>
      </PageLayout.Content>
    </PageLayout>
  )
}
