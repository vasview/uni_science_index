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
    getAcademicTitles: builder.query({
      query: () => ({
        url: 'registers/academic_titles/',
        method: 'GET'
      })
    }),
    getAcademicDegrees: builder.query({
      query: () => ({
        url: 'registers/academic_degrees/',
        method: 'GET'
      })
    })
  })
})

export const {
  useGetResearchDatabaseQuery,
  useLazyGetResearchDatabaseQuery,
  useGetFundSourcesQuery,
  useLazyGetFundSourcesQuery,
  useGetAcademicTitlesQuery,
  useLazyGetAcademicTitlesQuery,
  useGetAcademicDegreesQuery,
  useLazyGetAcademicDegreesQuery
} = registerApiSlice