import type { Preview, Decorator } from '@storybook/react-vite'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import React from 'react'

const theme = createTheme()

const withMuiTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [withMuiTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview