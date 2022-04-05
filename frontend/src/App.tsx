import { Container } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { Header } from './components/header/Header'
import { setLogged } from './features/loggedSlice'
import { AdminPage } from './pages/admin/AdminPage'
import { ExercisePage } from './pages/ExercisePage'

function App({ children }: { children: React.ReactNode }) {
  const logged = useSelector((state: RootState) => state.logged.value)

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLogged(!logged))
  }

  const code = `#include "header.h"

bool jeParny(int i){
  return true;
}`

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        {children}
      </Container>
    </>
  )
}

export default App
