import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoggedStat = {
  logged: boolean
  isAdmin: boolean
  user: {
    name: string
    surname: string
  }
}

const initialState: LoggedStat = {
  logged: false,
  isAdmin: false,
  user: {
    name: '',
    surname: '',
  },
}

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    setUser: (
      state,
      action: PayloadAction<{ name: string; surname: string }>
    ) => {
      state.user = action.payload
    },
  },
})

export const { setLogged, setIsAdmin, setUser } = loggedSlice.actions

export default loggedSlice.reducer
