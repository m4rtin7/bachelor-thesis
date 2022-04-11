import {
  Button,
  Container,
  createTheme,
  Theme,
  ThemeOptions,
} from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { Header } from './components/header/Header'
import { setLogged } from './features/loggedSlice'
import { AdminPage } from './pages/admin/AdminPage'
import { ExercisePage } from './pages/ExercisePage'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, lightTheme } from './design/theme'

import { CssBaseline } from '@mui/material'
import designSlice, { setMode } from './features/designSlice'
import { light } from '@mui/material/styles/createPalette'

function App() {
  const logged = useSelector((state: RootState) => state.logged.value)
  const mode = useSelector((state: RootState) => state.design.mode)

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLogged(!logged))
  }

  const code = `#include "header.h"

bool jeParny(int i){
  return true;
}`

  const handleModeColor = () => {
    const color = mode === 'dark' ? 'light' : 'dark'
    dispatch(setMode(color))
  }

  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? lightTheme : darkTheme),
    [mode]
  )

  console.log(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Button onClick={handleModeColor}>Switch</Button>
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Routes>
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/account" element={<>Account</>} />
          <Route path="/" element={<>Home</>} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
