import { apiSlice  } from "../../app/api/apiSlice";

export const publicationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGSPublications: builder.query({
      query: () => ({
        url: '/publications/gscholar_pubs/',
        method: 'GET'
      })
    }),
    getUserPubsBySciProfile: builder.query({
      query: (sci_profile_id) => ({
        url: `/publications/by_author_account/${sci_profile_id}`,
        method: 'GET'
      })
    }),
  })
})

export const {
  useGetGSPublicationsQuery,
  useGetUserPubsBySciProfileQuery,
  useLazyGetUserPubsBySciProfileQuery,
} = publicationApiSlice