import { Container, createTheme } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { Header } from './components/header/Header'
import { ExercisesPage } from './pages/ExercisesPage'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './design/theme'

import { CssBaseline } from '@mui/material'
import { setMode } from './features/designSlice'
import { LoginPage } from './pages/login/LoginPage'
import { ExercisePage } from './pages/exercisePage/ExercisePage'
import { RegistrationPage } from './pages/registration/RegistrationPage'
import { ResetPasswordPage } from './pages/passwordReset/passwordResetPage'
import { HomePage } from './pages/home/HomePage'
import { AccountPage } from './pages/account/AccountPage'

function App() {
  const logged = useSelector((state: RootState) => state.logged.logged)
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

  console.log('LOGGED: ', logged)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleModeColor={handleModeColor} />
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Routes>
          {logged && (
            <>
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/exercises/:id" element={<ExercisePage />} />
              <Route path="/" element={<HomePage />} />
            </>
          )}
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />}></Route>
          <Route path="*" element={<>PAGE NOT FOUND</>}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
