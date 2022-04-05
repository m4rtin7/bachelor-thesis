import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#000',
    },
    background: {
      default: '#000',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
    },
  },
  spacing: 4,
})
