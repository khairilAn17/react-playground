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
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'

import { AppShell } from './components/appShell'
import { Sidebar } from './components/sidebar'
import { DemoForm } from './features/demo/DemoForm'
import { MultiStepForm } from './features/multiStepDemo/MultiStepForm'
import { SidebarDemo } from './features/sidebarDemo/SidebarDemo'
import { PageLayoutDemo } from './features/pageLayoutDemo/PageLayoutDemo'
import { BusinessBankingDashboard } from './features/businessBankingDemo/BusinessBankingDashboard'
import { PayrollPage } from './features/businessBankingDemo/PayrollPage'
import { ManajemenAkunPage } from './features/businessBankingDemo/ManajemenAkunPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00A99D',
    },
    background: {
      default: '#F4F5F7',
    },
  },
  shape: {
    borderRadius: 10,
  },
})

function App() {
  const [activeKey, setActiveKey] = useState<string>('business-banking')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <AppShell
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          activeKey={activeKey}
          onSelect={setActiveKey}
          sidebarChildren={
            <>
              <Sidebar.Header
                logo={
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      bgcolor: '#00A99D',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      boxShadow: '0 2px 8px rgba(0,169,157,0.3)',
                    }}
                  >
                    R
                  </Box>
                }
                title="React Playground"
                subtitle="BYOND Design System"
              />

              <Sidebar.Nav>
                <Sidebar.Section title="Business Banking">
                  <Sidebar.Item
                    itemKey="business-banking"
                    icon={<AccountBalanceIcon />}
                    label="Dashboard"
                    badge={<Chip label="Design" size="small" sx={{ height: 18, fontSize: '0.7rem', bgcolor: '#EAA827', color: 'white', fontWeight: 700 }} />}
                  />
                  <Sidebar.Item
                    itemKey="payroll"
                    icon={<PaymentsOutlinedIcon />}
                    label="Payroll"
                  />
                  <Sidebar.Item
                    itemKey="manajemen-akun"
                    icon={<ManageAccountsOutlinedIcon />}
                    label="Manajemen Akun"
                  />
                </Sidebar.Section>

                <Sidebar.Section title="Form Workspaces" divider>
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
                    badge={<Chip label="New" size="small" sx={{ height: 18, fontSize: '0.7rem', bgcolor: '#00A99D', color: 'white', fontWeight: 700 }} />}
                  />
                </Sidebar.Section>

                <Sidebar.Section title="Component Docs" divider>
                  <Sidebar.Item
                    itemKey="page-layout-architecture"
                    icon={<ViewQuiltIcon />}
                    label="PageLayout Spec"
                  />
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
          {activeKey === 'business-banking' && <BusinessBankingDashboard />}
          {activeKey === 'payroll' && <PayrollPage onBack={() => setActiveKey('business-banking')} />}
          {activeKey === 'manajemen-akun' && <ManajemenAkunPage onBack={() => setActiveKey('business-banking')} />}
          {activeKey === 'single-form' && <DemoForm />}
          {activeKey === 'wizard-form' && <MultiStepForm />}
          {activeKey === 'page-layout-architecture' && <PageLayoutDemo />}
          {activeKey === 'sidebar-architecture' && <SidebarDemo />}
        </AppShell>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App

