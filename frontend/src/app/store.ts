import { configureStore } from '@reduxjs/toolkit'
import { exerciseApi } from '../features/exercisesApi'
import loggedReducer from '../features/loggedSlice'

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
