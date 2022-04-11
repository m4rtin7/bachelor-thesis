import { ThemeOptions } from '@mui/material'

export const darkTheme: ThemeOptions = {
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
}

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
      contrastText: '#000',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#000',
    },
    background: {
      default: '#fff',
      paper: '#424242',
    },
    text: {
      primary: '#000',
    },
  },
  spacing: 4,
}
