import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { DemoForm } from './features/demo/DemoForm'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  shape: {
    borderRadius: 8,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DemoForm />
    </ThemeProvider>
  )
}

export default App
