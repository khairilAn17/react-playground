import { useState } from 'react'
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoForm } from './features/demo/DemoForm'
import { MultiStepForm } from './features/multiStepDemo/MultiStepForm'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  shape: {
    borderRadius: 10,
  },
})

function App() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', pb: 6 }}>
          <Container maxWidth="md" sx={{ pt: 3 }}>
            <Paper variant="outlined" sx={{ mb: 2 }}>
              <Tabs
                value={tabIndex}
                onChange={(_, newValue) => setTabIndex(newValue)}
                centered
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="1. Single Page Form" />
                <Tab label="2. Multi-Step Wizard Form" />
              </Tabs>
            </Paper>

            {tabIndex === 0 && <DemoForm />}
            {tabIndex === 1 && <MultiStepForm />}
          </Container>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
