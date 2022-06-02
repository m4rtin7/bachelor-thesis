import { configureStore } from '@reduxjs/toolkit'
import { exerciseApi } from '../features/exercisesApi'
import { accountApi } from '../features/accountApi'
import loggedReducer from '../features/loggedSlice'
import designReducer from '../features/designSlice'

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    design: designReducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountApi.middleware,
      exerciseApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
