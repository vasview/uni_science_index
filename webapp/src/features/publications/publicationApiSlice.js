import { apiSlice  } from "../../app/api/apiSlice";

export const registerApiSlie = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGSPublications: builder.query({
      query: () => ({
        url: 'publications/gscholar_pubs/',
        method: 'GET'
      })
    }),
  })
})

export const {
  useGetGSPublicationsQuery,
} = registerApiSlie