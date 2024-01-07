import { apiSlice  } from "../../app/api/apiSlice";

export const conferenceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getConferences: builder.query({
      query: () => ({
        url: '/activities/conferences/',
        method: 'GET'
      }),
      providesTags: ['Conferences'],
    }),
    addConference: builder.mutation({
      query: (conference) => ({
        url: '/activities/conferences/',
        method: 'POST',
        body: conference
      }),
      invalidatesTags: ['Conferences'],
    }),
    updateConference: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/activities/conferences/${id}/`,
        method: 'PATCH',
        body: { ...formData },
      }),
      invalidatesTags: ['Conferences'],
    }),
    deleteConference: builder.mutation({
      query: (id) => ({
        url: `/activities/conferences/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Conferences'],
    }),
  })
})

export const {
  useGetConferencesQuery,
  useAddConferenceMutation,
  useDeleteConferenceMutation,
  useUpdateConferenceMutation,
} = conferenceApiSlice