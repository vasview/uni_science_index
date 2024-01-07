import { apiSlice  } from "../../app/api/apiSlice";

export const inventionPatentApiSlie = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInventionPatents: builder.query({
      query: () => ({
        url: '/activities/invention_patents/',
        method: 'GET'
      }),
      providesTags: ['InventionPatents'],
    }),
    addInventionPatent: builder.mutation({
      query: (patent) => ({
        url: '/activities/invention_patents/',
        method: 'POST',
        body: patent
      }),
      invalidatesTags: ['InventionPatents'],
    }),
    updateInventionPatent: builder.mutation({
      query: ({id, formData}) => ({
        url: `/activities/invention_patents/${id}/`,
        method: 'PATCH',
        body: { ...formData }
      }),
      invalidatesTags: ['InventionPatents'],
    }),
    deleteInventionPatent: builder.mutation({
      query: (id) => ({
        url: `/activities/invention_patents/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['InventionPatents'],
    }),
  })
})

export const {
  useGetInventionPatentsQuery,
  useAddInventionPatentMutation,
  useDeleteInventionPatentMutation,
  useUpdateInventionPatentMutation,
} = inventionPatentApiSlie