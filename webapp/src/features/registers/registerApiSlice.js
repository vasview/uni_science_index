import { apiSlice  } from "../../app/api/apiSlice";

export const registerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getResearchDatabase: builder.query({
      query: () => ({
        url: 'registers/research_databases/',
        method: 'GET'
      })
    }),
    getFundSources: builder.query({
      query: () => ({
        url: 'registers/fund_sources/',
        method: 'GET'
      })
    }),
  })
})

export const {
  useGetResearchDatabaseQuery,
  useLazyGetResearchDatabaseQuery,
  useGetFundSourcesQuery,
  useLazyGetFundSourcesQuery
} = registerApiSlice