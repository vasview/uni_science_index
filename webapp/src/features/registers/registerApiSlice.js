import { apiSlice  } from "../../app/api/apiSlice";

export const registerApiSlie = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getResearchDatabase: builder.query({
      query: () => ({
        url: 'registers/research_databases/',
        method: 'GET'
      })
    }),
  })
})

export const {
  useGetResearchDatabaseQuery,
  useLazyGetResearchDatabaseQuery
} = registerApiSlie