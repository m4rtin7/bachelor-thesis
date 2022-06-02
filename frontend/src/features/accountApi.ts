import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      headers.set('x-access-token', localStorage.getItem('token') || '')
      return headers
    },
  }),
  //mutations
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    registration: builder.mutation({
      query: (body: {
        name: string
        surname: string
        email: string
        password: string
      }) => ({
        url: '/registration',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: '/resetPassword',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: (body: { name: string; surname: string; password: string }) => ({
        url: '/updateUser',
        method: 'POST',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegistrationMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = accountApi
