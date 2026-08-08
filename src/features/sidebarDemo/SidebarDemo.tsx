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

import { Sidebar } from '../../components/sidebar'
import type { SidebarItemConfig } from '../../components/sidebar'

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
    <Box sx={{ py: 2 }}>
      {/* Top Banner Control Panel */}
      <Paper variant="outlined" sx={{ p: 2.5, mb: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Reusable Sidebar Navigation Kit
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 Pillars Architecture: Reusable, Customizable, Scalable, Readable, Maintainable.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Button
                variant={collapsed ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              </Button>
            </Stack>
          </Box>

          <Divider />

          {/* Controls */}
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              API Architecture Mode:
            </Typography>
            <RadioGroup
              row
              value={apiType}
              onChange={(e) => setApiType(e.target.value as 'compound' | 'data-driven')}
            >
              <FormControlLabel
                value="compound"
                control={<Radio size="small" />}
                label="Compound Components (<Sidebar.Item />)"
              />
              <FormControlLabel
                value="data-driven"
                control={<Radio size="small" />}
                label="Data-Driven Config (JSON items=[...])"
              />
            </RadioGroup>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Layout Preview Frame */}
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          height: 640,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        {/* Render Sidebar based on selected API Mode */}
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

        {/* Dynamic Content View Area */}
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
                    Active Configuration Summary
                  </Typography>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                    {JSON.stringify(
                      {
                        activeRouteKey: activeKey,
                        sidebarState: collapsed ? 'Collapsed (Mini Mode 68px)' : 'Expanded (260px)',
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
    </Box>
  )
}
