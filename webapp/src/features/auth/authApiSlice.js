import { apiSlice  } from "../../app/api/apiSlice";

export const authApiSlie = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'auth/jwt/create/',
        method: 'POST',
        body: { ...credentials }
      })
    }),
  })
})

export const {
  useLoginMutation
} = authApiSlie