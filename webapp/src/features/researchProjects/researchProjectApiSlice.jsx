import { apiSlice  } from "../../app/api/apiSlice";

export const researchProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getResearchProjects: builder.query({
      query: () => ({
        url: '/activities/research_projects/',
        method: 'GET'
      }),
      providesTags: ['ResearchProjects'],
    }),
    addResearchProject: builder.mutation({
      query: (research_project) => ({
        url: '/activities/research_projects/',
        method: 'POST',
        body: research_project
      }),
      invalidatesTags: ['ResearchProjects'],
    }),
    updateResearchProject: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/research_projects/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['ResearchProjects'],
    }),
    deleteResearchProject: builder.mutation({
      query: (id) => ({
        url: `/activities/research_projects/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ResearchProjects'],
    }),
  })
})

export const {
  useGetResearchProjectsQuery,
  useAddResearchProjectMutation,
  useDeleteResearchProjectMutation,
  useUpdateResearchProjectMutation,
} = researchProjectApiSlice