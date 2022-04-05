import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from './App'

import { ThemeProvider } from '@emotion/react'
import { theme } from './design/theme'

import './index.css'
import { ExercisePage } from './pages/ExercisePage'
import { CssBaseline } from '@mui/material'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App>
            <Routes>
              <Route path="/exercises" element={<ExercisePage />} />
              <Route path="/account" element={<>Account</>} />
              <Route path="/" element={<>Home</>} />
            </Routes>
          </App>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
