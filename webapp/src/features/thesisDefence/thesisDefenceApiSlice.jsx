import { apiSlice  } from "../../app/api/apiSlice";

export const thesisDefenceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getThesisDefences: builder.query({
      query: () => ({
        url: '/activities/thesis_defences/',
        method: 'GET'
      }),
      providesTags: ['ThesisDefences'],
    }),
    addThesisDefence: builder.mutation({
      query: (thesis) => ({
        url: '/activities/thesis_defences/',
        method: 'POST',
        body: thesis
      }),
      invalidatesTags: ['ThesisDefences'],
    }),
    updateThesisDefence: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/thesis_defences/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['ThesisDefences'],
    }),
    deleteThesisDefence: builder.mutation({
      query: (id) => ({
        url: `/activities/thesis_defences/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ThesisDefences'],
    }),
  })
})

export const {
  useGetThesisDefencesQuery,
  useAddThesisDefenceMutation,
  useDeleteThesisDefenceMutation,
  useUpdateThesisDefenceMutation,
} = thesisDefenceApiSlice