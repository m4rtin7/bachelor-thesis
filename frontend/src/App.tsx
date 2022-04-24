import { Container, createTheme } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { Header } from './components/header/Header'
import { ExercisePage } from './pages/ExercisePage'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './design/theme'

import { CssBaseline } from '@mui/material'
import { setMode } from './features/designSlice'
import { LoginPage } from './pages/login/LoginPage'
import { AdminPage } from './pages/admin/AdminPage'

function App() {
  const logged = useSelector((state: RootState) => state.logged.value)
  const mode = useSelector((state: RootState) => state.design.mode)

  const dispatch = useDispatch()

  const handleModeColor = () => {
    const color = mode === 'dark' ? 'light' : 'dark'
    dispatch(setMode(color))
  }

  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? lightTheme : darkTheme),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleModeColor={handleModeColor} />
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        {logged ? (
          <Routes>
            <Route path="/exercises" element={<ExercisePage />} />
            <Route path="/account" element={<>Account</>} />
            <Route path="/exercises/:id" element={<AdminPage />} />
            <Route path="/" element={<>Home</>} />
          </Routes>
        ) : (
          <LoginPage />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
