import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DesingState = {
  mode: 'light' | 'dark'
}

const initialState: DesingState = {
  mode: 'dark',
}

export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
    },
  },
})

export const { setMode } = designSlice.actions

export default designSlice.reducer
