import { configureStore } from '@reduxjs/toolkit'
import { exerciseApi } from '../features/exercisesApi'
import loggedReducer from '../features/loggedSlice'
import designReducer from '../features/designSlice'

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    design: designReducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
