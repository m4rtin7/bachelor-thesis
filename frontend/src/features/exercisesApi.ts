import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Exercise, Test } from '../types'

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getAllExercises: builder.query({
      query: () => ({ url: '/exercises', method: 'GET' }),
    }),
    //mutations
    addExercise: builder.mutation({
      query: (exercise: Exercise) => {
        return {
          url: '/exercise',
          method: 'POST',
          body: exercise,
        }
      },
    }),
    test: builder.mutation({
      query: (test: Test) => {
        console.log(test)

        return {
          url: '/test',
          method: 'POST',
          body: test,
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllExercisesQuery,
  useAddExerciseMutation,
  useTestMutation,
} = exerciseApi
