import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Exercise, ExerciseToSave, Test } from '../types'

// Define a service using a base URL and expected endpoints
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      headers.set('x-access-token', localStorage.getItem('token') || '')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllExercises: builder.query({
      query: () => ({ url: '/exercises', method: 'GET' }),
    }),
    //mutations
    saveExercise: builder.mutation({
      query: (exercise: ExerciseToSave) => ({
        url: '/saveExercise',
        method: 'PUT',
        body: exercise,
      }),
    }),
    getResultsById: builder.mutation({
      query: (id: number) => ({
        url: '/results',
        method: 'POST',
        body: { id },
      }),
    }),
    getSavedExercise: builder.mutation({
      query: (id: number) => ({
        url: '/savedExercise',
        method: 'POST',
        body: { id },
      }),
    }),
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
  useSaveExerciseMutation,
  useGetSavedExerciseMutation,
  useGetResultsByIdMutation,
} = exerciseApi
