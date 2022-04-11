import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from './App'

import { ThemeProvider } from '@emotion/react'

import './index.css'
import { ExercisePage } from './pages/ExercisePage'
import { CssBaseline } from '@mui/material'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
