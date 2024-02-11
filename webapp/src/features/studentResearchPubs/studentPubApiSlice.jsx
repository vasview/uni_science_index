import { apiSlice  } from "../../app/api/apiSlice";

export const studentPubApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getStudentResearchPubs: builder.query({
      query: () => ({
        url: '/publications/student_research_works/',
        method: 'GET'
      }),
      providesTags: ['StudentResearchPubs'],
    }),
    addStudentResearchPub: builder.mutation({
      query: (monograph) => ({
        url: '/publications/student_research_works/',
        method: 'POST',
        body: monograph
      }),
      invalidatesTags: ['StudentResearchPubs'],
    }),
    updateStudentResearchPub: builder.mutation({
      query: ({id, formData}) => ({
        url: `/publications/student_research_works/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['StudentResearchPubs'],
    }),
    deleteStudentResearchPub: builder.mutation({
      query: (id) => ({
        url: `/publications/student_research_works/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['StudentResearchPubs'],
    }),
  })
})

export const {
  useGetStudentResearchPubsQuery,
  useAddStudentResearchPubMutation,
  useUpdateStudentResearchPubMutation,
  useDeleteStudentResearchPubMutation,
} = studentPubApiSlice