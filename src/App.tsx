import { useState } from 'react'
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import AssignmentIcon from '@mui/icons-material/Assignment'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'
import GitHubIcon from '@mui/icons-material/GitHub'

import { AppShell } from './components/appShell'
import { Sidebar } from './components/sidebar'
import { DemoForm } from './features/demo/DemoForm'
import { MultiStepForm } from './features/multiStepDemo/MultiStepForm'
import { SidebarDemo } from './features/sidebarDemo/SidebarDemo'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f8fafc',
    },
  },
  shape: {
    borderRadius: 10,
  },
})

function App() {
  const [activeKey, setActiveKey] = useState<string>('single-form')
  const [collapsed, setCollapsed] = useState(false)

  const getPageTitle = (key: string) => {
    switch (key) {
      case 'single-form':
        return 'Single Page Form Workspace'
      case 'wizard-form':
        return 'Multi-Step Wizard Form'
      case 'sidebar-architecture':
        return 'Sidebar Component Kit Architecture'
      default:
        return 'React Playground'
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <AppShell
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          activeKey={activeKey}
          onSelect={setActiveKey}
          pageTitle={getPageTitle(activeKey)}
          toolbarActions={
            <Tooltip title="View Source Workspace">
              <IconButton
                color="default"
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
          sidebarChildren={
            <>
              <Sidebar.Header
                logo={
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
                    }}
                  >
                    R
                  </Box>
                }
                title="React Playground"
                subtitle="UI & Form Design System"
              />

              <Sidebar.Nav>
                <Sidebar.Section title="Form Workspaces">
                  <Sidebar.Item
                    itemKey="single-form"
                    icon={<AssignmentIcon />}
                    label="Single Page Form"
                    badge="Kit"
                  />
                  <Sidebar.Item
                    itemKey="wizard-form"
                    icon={<AutoAwesomeIcon />}
                    label="Multi-Step Wizard"
                    badge={<Chip label="New" color="primary" size="small" sx={{ height: 18, fontSize: '0.7rem' }} />}
                  />
                </Sidebar.Section>

                <Sidebar.Section title="Navigation & Layout" divider>
                  <Sidebar.Item
                    itemKey="sidebar-architecture"
                    icon={<ViewSidebarIcon />}
                    label="Sidebar Architecture"
                  />
                </Sidebar.Section>
              </Sidebar.Nav>

              <Sidebar.Footer
                user={{
                  name: 'Khairil Anwar',
                  email: 'khairil@dev.lab',
                }}
              />
            </>
          }
        >
          {activeKey === 'single-form' && <DemoForm />}
          {activeKey === 'wizard-form' && <MultiStepForm />}
          {activeKey === 'sidebar-architecture' && <SidebarDemo />}
        </AppShell>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
