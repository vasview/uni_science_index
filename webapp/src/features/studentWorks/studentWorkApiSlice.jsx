import { apiSlice  } from "../../app/api/apiSlice";

export const studentWorkApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getStudentWorks: builder.query({
      query: () => ({
        url: '/activities/student_supervisions/',
        method: 'GET'
      }),
      providesTags: ['StudentWorks'],
    }),
    addStudentWork: builder.mutation({
      query: (std_work) => ({
        url: '/activities/student_supervisions/',
        method: 'POST',
        body: std_work
      }),
      invalidatesTags: ['StudentWorks'],
    }),
    updateStudentWork: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/student_supervisions/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['StudentWorks'],
    }),
    deleteStudentWork: builder.mutation({
      query: (id) => ({
        url: `/activities/student_supervisions/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['StudentWorks'],
    }),
    getStudentResearchWorkList: builder.query({
      query: () => ({
        url: '/activities/student_research_list/',
        method: 'GET'
      }),
      providesTags: ['StudentWorks'],
    }),
  })
})

export const {
  useGetStudentWorksQuery,
  useAddStudentWorkMutation,
  useDeleteStudentWorkMutation,
  useUpdateStudentWorkMutation,
  useGetStudentResearchWorkListQuery,
  useLazyGetStudentResearchWorkListQuery,
} = studentWorkApiSlice