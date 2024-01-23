import { apiSlice  } from "../../app/api/apiSlice";

export const doctoralWorkApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDoctoralWorks: builder.query({
      query: () => ({
        url: '/activities/doctoral_supervisions/',
        method: 'GET'
      }),
      providesTags: ['DoctoralWorks'],
    }),
    addDoctoralWork: builder.mutation({
      query: (doc_work) => ({
        url: '/activities/doctoral_supervisions/',
        method: 'POST',
        body: doc_work
      }),
      invalidatesTags: ['DoctoralWorks'],
    }),
    updateDoctoralWork: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/doctoral_supervisions/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['DoctoralWorks'],
    }),
    deleteDoctoralWork: builder.mutation({
      query: (id) => ({
        url: `/activities/doctoral_supervisions/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['DoctoralWorks'],
    }),
  })
})

export const {
  useGetDoctoralWorksQuery,
  useAddDoctoralWorkMutation,
  useDeleteDoctoralWorkMutation,
  useUpdateDoctoralWorkMutation,
} = doctoralWorkApiSlice